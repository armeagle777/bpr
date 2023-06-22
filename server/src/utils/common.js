const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer');
const handlebars = require('handlebars');
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
    const generatedPath = path.join(
        process.cwd(),
        'src/pdf-templates/bpr.html'
    );

    var templateHtml = fs.readFileSync(generatedPath, 'utf8');
    var template = handlebars.compile(templateHtml);
    var html = template(data);

    var milis = new Date();
    milis = milis.getTime();

    var pdfPath = path.join('src', 'pdf', `${milis}.pdf`);

    var options = {
        width: '1230px',
        headerTemplate: '<p></p>',
        footerTemplate: '<p></p>',
        displayHeaderFooter: false,
        margin: {
            top: '10px',
            bottom: '30px',
        },
        printBackground: true,
        path: pdfPath,
    };

    const browser = await puppeteer.launch({
        args: ['--no-sandbox'],
        headless: 'new',
    });

    var page = await browser.newPage();

    await page.setContent(html, {
        waitUntil: 'networkidle0',
    });

    await page.pdf(options);
    await browser.close();
    return pdfPath;
};

module.exports = {
    createPDF,
    //     sendActivationMail,
    //     generateTokens,
    //     createUserData,
    //     validateRefreshToken,
    //     validateAccessToken,
    //     validateSchema,
};
