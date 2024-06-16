const path = require("path");
const fs = require("fs");
const axios = require("axios");
const puppeteer = require("puppeteer");
const handlebars = require("handlebars");
const { Op } = require("sequelize");

const { activityCodes } = require("./spheres");
const { Sphere } = require("../config/sphereDatabase");
const { bulkUpsert } = require("../modules/sphere/services");
const { log } = require("console");
const { getCompanyByHvhhDb } =
  process.env.NODE_ENV === "local"
    ? require("../modules/persons/services-local")
    : require("../modules/persons/services");
// const jwt = require('jsonwebtoken');
// const nodemailer = require('nodemailer');
// const ApiError = require('../exceptions/api-error');
// const sendActivationMail = async (to, link) => {
//     try {
//         const transporter = nodemailer.createTransport({
//             host: process.env.MAIL_HOST,
//             port: process.env.MAIL_PORT,
//             secure: false,
//             auth: {
//                 user: process.env.MAIL_USER,
//                 pass: process.env.MAIL_PASS,
//             },
//         });

//         await transporter.sendMail({
//             from: 'Best Application',
//             to,
//             subject: 'Activate your account',
//             text: '',
//             html: `
//                 <div>
//                     <h1>Activate your account</h1>
//                     <p>Please click on the link below to activate your account</p>
//                     <a href="${process.env.API_URL}/api/users/active/${link}">${process.env.API_URL}/api/users/active/${link}</a>
//                 </div>
//                 `,
//         });
//     } catch (err) {
//         console.log(err);
//     }
// };

// const generateTokens = async (payload) => {
//     const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
//         expiresIn: '1d',
//     });

//     const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
//         expiresIn: '30d',
//     });

//     return { accessToken, refreshToken };
// };

// const createUserData = (userObject) => {
//     return {
//         id: userObject.id,
//         email: userObject.email,
//         firstName: userObject.firstName,
//         lastName: userObject.lastName,
//         isActivated: userObject.isActivated,
//     };
// };

// const validateRefreshToken = async (refreshToken) => {
//     try {
//         const decoded = jwt.verify(
//             refreshToken,
//             process.env.REFRESH_TOKEN_SECRET
//         );
//         return decoded;
//     } catch (err) {
//         return null;
//     }
// };

// const validateAccessToken = (accessToken) => {
//     try {
//         const decoded = jwt.verify(
//             accessToken,
//             process.env.ACCESS_TOKEN_SECRET
//         );
//         return decoded;
//     } catch (error) {
//         return null;
//     }
// };

// const validateSchema = (schema) => {
//     if (typeof schema !== 'object' || schema === null)
//         throw new Error(JOI_VALIDATION_MESSAGES.SCHEMA_OBJECT);

//     return async (req, res, next) => {
//         const { params, body } = req;

//         try {
//             schema.params && (await schema.params.validateAsync(params));
//             schema.body && (await schema.body.validateAsync(body));
//             return next();
//         } catch (error) {
//             next(ApiError.BadRequest(error.message));
//         }
//     };
// };

const createPDF = async (data) => {
  const generatedPath = path.join(process.cwd(), "src/pdf-templates/bpr.html");

  var templateHtml = fs.readFileSync(generatedPath, "utf8");
  var template = handlebars.compile(templateHtml);
  var html = template(data);

  var milis = new Date();
  milis = milis.getTime();

  var pdfPath = path.join("src", "pdf", `${milis}.pdf`);

  var options = {
    width: "1230px",
    headerTemplate: "<p></p>",
    footerTemplate: "<p></p>",
    displayHeaderFooter: false,
    margin: {
      top: "10px",
      bottom: "30px",
    },
    printBackground: true,
    path: pdfPath,
  };

  const browser = await puppeteer.launch({
    args: ["--no-sandbox"],
    headless: "new",
  });

  var page = await browser.newPage();

  await page.setContent(html, {
    waitUntil: "networkidle0",
  });

  await page.pdf(options);
  await browser.close();
  return pdfPath;
};

const isPetregisterDataAvailable = (data) => {
  const isDataAvailable =
    process.env.NODE_ENV === "local" ? data.length !== 0 : !!data.result;

  return isDataAvailable;
};

const getCompanyFromApi = async (hvhh) => {
  const taxUrl = process.env.PETREGISTR_URL;

  const { data } =
    process.env.NODE_ENV === "local"
      ? await axios.get(`${taxUrl}?fake_tax_id=${hvhh}`)
      : await axios.post(taxUrl, {
          jsonrpc: "2.0",
          id: 1,
          method: "company_info",
          params: { tax_id: hvhh },
        });

  if (!isPetregisterDataAvailable(data)) {
    return { company: { taxid: hvhh } };
  }

  const { result } = process.env.NODE_ENV === "local" ? data[0] : data;

  return result;
};

const cronUpdateSphereText = async () => {
  try {
    const unCheckedSpheres = await Sphere.findAll({
      attributes: ["tin", "sphere_code"],
      where: {
        [Op.and]: [
          { sphere_text: null },
          {
            sphere_code: {
              [Op.not]: null,
            },
          },
        ],
      },
    });

    if (unCheckedSpheres.length === 0) return;

    const companiesTins = unCheckedSpheres.map(({ tin, sphere_code }) => {
      const shortSphereCode = sphere_code.substring(0, sphere_code.length - 2);
      console.log("shortSphereCode", shortSphereCode);
      console.log(" sphere_code.slice(-2)", sphere_code.slice(-2));
      const sphereName = activityCodes[sphere_code]
        ? activityCodes[sphere_code]
        : sphere_code.slice(-2) === ".0" && activityCodes[shortSphereCode]
        ? activityCodes[shortSphereCode]
        : null;

      return {
        tin: tin,
        sphere_text: sphereName,
      };
    });

    await bulkUpsert(Sphere, companiesTins, "tin");
  } catch (error) {
    console.log("Crone Error", error);
  }
};

const cronUpdateSphere = async () => {
  try {
    const unCheckedSpheres = await Sphere.findAll({
      attributes: ["tin"],
      where: {
        is_checked: 0,
      },
    });

    console.log("unCheckedSpheres", unCheckedSpheres);

    if (unCheckedSpheres.length === 0) return;

    const promises = unCheckedSpheres.map(({ tin }) => {
      return new Promise(async (resolve, reject) => {
        try {
          const { company } = await getCompanyFromApi(tin);

          resolve(company);
        } catch (error) {
          reject(error);
        }
      });
    });

    const companyObjectArray = await Promise.allSettled(promises);

    const companiesTins = companyObjectArray
      .filter((obj) => obj.status === "fulfilled")
      .map((company) => ({
        tin: company.value.taxid,
        name: company.value.name_am,
        sphere_code: company.value.industry_code,
        is_inactive: company.value.inactive,
        is_blocked: company.value.is_blocked,
        is_checked: true,
      }));

    if (companiesTins.length === 0) return;

    await bulkUpsert(Sphere, companiesTins, "tin");
  } catch (error) {
    console.log("error::::::", error);
  }
};

module.exports = {
  createPDF,
  cronUpdateSphere,
  cronUpdateSphereText,
};
