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
const { texekanqUidPrefix, permissionTexekanqMap } = require("./constants");
const { permissionsMap } = require("../../utils/constants");

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

const getTexekanqTypesDB = async (req) => {
  const types = await Texekanqtype.findAll({
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });

  return types;
};

const getTexekanqsDB = async (req) => {
  const user = req.user;
  let whereCondition = {};
  if (user.Role !== "Admin") {
    const userReportPermissions = [
      permissionsMap.CITIZENSHIP_REPORT.uid,
      permissionsMap.PASSPORTS_REPORT.uid,
      permissionsMap.PNUM_REPORT.uid,
    ].filter((permission) => user.permissions.includes(permission));
    const texekanqTypeIds = userReportPermissions?.map(
      (permissionId) => permissionTexekanqMap[permissionId]
    );

    whereCondition = {
      TexekanqtypeId: texekanqTypeIds,
    };
  }

  const texekanqs = await Texekanq.findAll({
    attributes: { exclude: ["userId", "TexekanqtypeId"] },
    include: [
      {
        model: User,
        attributes: ["firstName", "lastName"],
      },
      {
        model: Texekanqtype,
        attributes: ["name", "id"],
      },
    ],
    where: whereCondition,
    order: [["id", "DESC"]],
  });

  return {
    texekanqs,
  };
};

const createTexekanqDb = async (req) => {
  const { user, body } = req;
  const { id: userId, pashton, firstName, lastName } = user;
  const {
    pnum,
    person_birth,
    person_birth_place,
    person_fname,
    person_lname,
    person_mname,
    person_fname_en,
    person_lname_en,
    document,
    TexekanqtypeId,
    mul_number,
    validDocuments,
    invalidDocuments,
    passport_number,
    passport_series,
    passport_issue_date,
  } = body;

  if (TexekanqtypeId === 1) {
    const texekanqRow = await Texekanq.findOne({
      where: { mul_number, userId },
    });

    if (texekanqRow) {
      throw ApiError.BadRequest(
        "Տվյալ մալբերի համարով տեղեկանք արդեն գրանցված է"
      );
    }
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
    const document_number = getTexekanqTitle({
      lastTexekanq,
      currentYear,
      TexekanqtypeId,
    });
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

    const person_full_name = person_mname
      ? (
          person_fname +
          " " +
          person_mname +
          " " +
          person_lname +
          "ը"
        ).toUpperCase()
      : (person_fname + " " + person_lname + "ը").toUpperCase();
    function getShortName(fname, lname, mname) {
      return `${fname.charAt(0)}.${
        mname ? mname.charAt(0) + "." : ""
      }${lname}ը`?.toUpperCase();
    }
    const documentText =
      passport_number && passport_series && passport_issue_date
        ? ` ${passport_issue_date}թ. ՀՀ ՆԳՆ միգրացիայի և քաղաքացիության ծառայությունից  ստացել է ՀՀ քաղաքացու ${passport_series} սերիայի թիվ ${passport_number} անձնագիրը:`
        : undefined;
    const person_short_name = getShortName(
      person_fname,
      person_lname,
      person_mname
    );
    const fromatBirthDate = (date) => {
      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    };
    const fileName = await createPDF({
      data: {
        ...newTexekanq.dataValues,
        qrUrl,
        person_full_name,
        position: pashton,
        full_name: firstName + " " + lastName,
        person_fname_en,
        person_lname_en,
        person_birth: fromatBirthDate(newTexekanq.dataValues.person_birth),
        document,
        validDocuments,
        invalidDocuments,
        documentText,
        person_short_name,
        createdAt: formatDate(newTexekanq.dataValues.createdAt),
      },
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
  getTexekanqTypesDB,
};
