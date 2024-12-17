const v4 = require("uuid").v4;
const fs = require("fs");
const qr = require("qrcode");
const path = require("path");
const { templatesMap } = require("./constants");
const ejs = require("ejs");
const puppeteer = require("puppeteer");

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

  var milis = new Date().getTime();
  const fileName = `${data.pnum}_${templateName}_${milis}.pdf`;

  const responseFilePath = path.join("src", "pdf", "reports", `${fileName}`);

  const directoryPath = path.dirname(responseFilePath);
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true });
  }

  if (TexekanqtypeId === 1) {
    const imagePath = path.join(__dirname, "../../public", "asd.jpg");
    const imageBase64 = fs.readFileSync(imagePath).toString("base64");
    const imageMimeType = "image/jpeg";
    data.signBase64 = `data:${imageMimeType};base64,${imageBase64}`;
  }

  if (TexekanqtypeId === 2 || TexekanqtypeId === 3) {
    const imagePath = path.join(
      __dirname,
      "../../public",
      "Coat_of_arms_of_Armenia.png"
    );
    const imageBase64 = fs.readFileSync(imagePath).toString("base64");
    const imageMimeType = "image/png";
    data.logoBase64 = `data:${imageMimeType};base64,${imageBase64}`;
  }

  // Render the EJS template to HTML with dynamic data
  const htmlContent = await ejs.renderFile(templatePath, data);

  // Launch Puppeteer
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Set the HTML content
  await page.setContent(htmlContent, { waitUntil: "domcontentloaded" });

  // Generate the PDF
  const pdfBuffer = await page.pdf({
    format: "A4", // Set paper format
    landscape: TexekanqtypeId === 1 ? true : false,
    printBackground: true,
    margin: {
      top: "0mm",
      bottom: "0mm",
      left: "0mm",
      right: "0mm",
    },
  });

  // Save buffer to file
  fs.writeFileSync(responseFilePath, pdfBuffer);
  await browser.close();

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
