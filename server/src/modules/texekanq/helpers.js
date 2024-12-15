const v4 = require("uuid").v4;
const fs = require("fs");
const qr = require("qrcode");
const path = require("path");
const { templatesMap } = require("./constants");
const ejs = require("ejs");
const pdf = require("html-pdf");

const getTexekanqUid = (prefix) => {
  function randomHexSegment() {
    return Array.from({ length: 4 }, () =>
      Math.floor(Math.random() * 16)
        .toString(16)
        .toUpperCase()
    ).join("");
  }

  // Get the last 4 digits of the current timestamp in milliseconds
  function timestampSegment() {
    const now = Date.now(); // Current time in milliseconds
    return now.toString().slice(-4); // Last 4 digits
  }

  // Construct the UID
  const uid = `${prefix}${randomHexSegment().slice(
    2
  )}-${randomHexSegment()}-${randomHexSegment()}-${timestampSegment()}`;

  return uid;
};

const getTexekanqTitle = ({ lastTexekanq, currentYear }) => {
  const prevDocNum = lastTexekanq?.dataValues?.document_number;
  const texekanqCorNumber = !prevDocNum
    ? 1
    : Number(prevDocNum.split("/")[1].split("-")[1]) + 1;
  return `Ք/${currentYear}-${texekanqCorNumber}`;
};

const encodeUrl = (uid) => {
  return `https://verify.e-gov.am/?tnum=${uid}`;
};

const generateQRCode = async (data) => {
  const url = await qr.toDataURL(data);
  return url;
};

const createPDF = async ({ data, TexekanqtypeId }) => {
  const templateName = templatesMap[TexekanqtypeId];

  const templatePath = path.join(
    process.cwd(),
    `src/pdf-templates/${templateName}.ejs`
  );

  var milis = new Date();
  milis = milis.getTime();
  const fileName = `${data.pnum}_${templateName}_${milis}.pdf`;

  const responseFilePath = path.join("src", "pdf", "reports", `${fileName}`);

  const directoryPath = path.dirname(responseFilePath);
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true });
  }

  // Render the EJS template to HTML with dynamic data
  const htmlContent = await ejs.renderFile(templatePath, data);

  // PDF options
  const options = {
    format: "A4",
    orientation: "landscape",
    border: "0mm",
  };

  // Generate the PDF
  const pdfBuffer = await new Promise((resolve, reject) => {
    pdf.create(htmlContent, options).toBuffer((err, buffer) => {
      if (err) return reject(err);
      resolve(buffer);
    });
  });

  // Save buffer to file
  fs.writeFileSync(responseFilePath, pdfBuffer);

  return fileName;
};

function formatDate(date) {
  const formatedDate = new Date(date);
  const day = String(formatedDate.getDate()).padStart(2, "0");
  const month = String(formatedDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = formatedDate.getFullYear();

  return `${day}/${month}/${year}`;
}

module.exports = {
  createPDF,
  formatDate,
  generateQRCode,
  getTexekanqUid,
  getTexekanqTitle,
  encodeUrl,
};
