const { Op } = require("sequelize");
const path = require("path");
const fs = require("fs");

const ApiError = require("../../exceptions/api-error");
const {
  Texekanq,
  sphereSequelize,
  User,
  Texekanqtype,
} = require("../../config/sphereDatabase");
const {
  getTexekanqUid,
  getTexekanqTitle,
  encodeUrl,
  generateQRCode,
  generatePdf,
  createPDF,
  formatDate,
} = require("./helpers");
const { texekanqUidPrefix } = require("./constants");

const getFileBase64DB = async (fileName) => {
  const texekanq = await Texekanq.findOne({
    attributes: ["file_name"],
    where: { file_name: fileName },
  });

  if (!texekanq) return { attachment: null };

  const pdfName = texekanq?.dataValues?.file_name;
  const pdfPath = path.join(__dirname, "../../pdf/reports", pdfName);

  const pdfData = fs.readFileSync(pdfPath);
  const attachment = pdfData.toString("base64");

  return {
    attachment,
  };
};

const getTexekanqsDB = async (req) => {
  const texekanqs = await Texekanq.findAll({
    attributes: { exclude: ["userId", "TexekanqtypeId"] },
    include: [
      {
        model: User,
        attributes: ["firstName", "lastName"],
      },
      {
        model: Texekanqtype,
        attributes: ["name"],
      },
    ],
    order: [["id", "DESC"]],
  });

  return {
    texekanqs,
  };
};

const createTexekanqDb = async (req) => {
  const { user, params, body } = req;
  const { id: userId, pashton, firstName, lastName } = user;
  const {
    pnum,
    person_birth,
    person_birth_place,
    person_fname,
    person_lname,
    person_mname,
    TexekanqtypeId,
    mul_number,
  } = body;

  const texekanqRow = await Texekanq.findOne({
    where: { mul_number, userId },
  });

  if (texekanqRow) {
    throw ApiError.BadRequest(
      "Տվյալ մալբերի համարով տեղեկանք արդեն գրանցված է"
    );
  }
  const uid = getTexekanqUid(texekanqUidPrefix);
  const currentYear = new Date().getFullYear();

  const result = await sphereSequelize.transaction(async (transaction) => {
    // Find the latest texekanq for the current year
    const lastTexekanq = await Texekanq.findOne({
      where: {
        createdAt: {
          [Op.gte]: new Date(`${currentYear}-01-01`), // Start of the current year
          [Op.lt]: new Date(`${currentYear + 1}-01-01`), // Start of the next year
        },
      },
      order: [["createdAt", "DESC"]],
      lock: transaction.LOCK.UPDATE, // Prevent concurrent reads
      transaction, // Ensure the query is part of the transaction
    });

    // Calculate the new document number
    const document_number = getTexekanqTitle({ lastTexekanq, currentYear });
    // Create the new texekanq

    const newTexekanq = await Texekanq.create(
      {
        uid,
        userId,
        document_number,
        pnum,
        person_birth,
        person_birth_place,
        person_fname,
        person_lname,
        person_mname,
        TexekanqtypeId,
        mul_number,
      },
      { transaction } // Ensure the creation is part of the transaction
    );
    const qrData = encodeUrl(newTexekanq.dataValues.uid);
    const qrUrl = await generateQRCode(qrData);
    newTexekanq.dataValues.qrUrl = qrUrl;
    newTexekanq.dataValues.position = pashton;
    newTexekanq.dataValues.full_name = firstName + " " + lastName;
    newTexekanq.dataValues.createdAt = formatDate(
      newTexekanq.dataValues.createdAt
    );
    newTexekanq.dataValues.person_full_name = person_mname
      ? person_fname + " " + person_lname + " " + person_mname
      : person_fname + " " + person_lname;

    const fileName = await createPDF({
      data: newTexekanq.dataValues,
      TexekanqtypeId,
    });

    await newTexekanq.update(
      { file_name: fileName },
      { transaction } // Ensure the update is part of the transaction
    );
    return newTexekanq;
  });

  const pdfPath = path.join(
    __dirname,
    "../../pdf/reports",
    result.dataValues.file_name
  );

  const pdfData = fs.readFileSync(pdfPath);
  const attachment = pdfData.toString("base64");

  return attachment;
};

module.exports = {
  createTexekanqDb,
  getTexekanqsDB,
  getFileBase64DB,
};
