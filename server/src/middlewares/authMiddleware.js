// const { validateAccessToken } = require('../utils/common');

// const authMiddleware = (req, res, next) => {
//     if (req.method === 'OPTIONS') {
//         next();
//     }

//     try {
//         const token = req.headers.authorization.split(' ')[1];
//         if (!token) {
//             return res
//                 .status(401)
//                 .json({ statusCode: 401, message: 'User is not authorized' });
//         }
//         const decodedData = validateAccessToken(token);

//         if (!decodedData) {
//             return res
//                 .status(401)
//                 .json({ statusCode: 401, message: 'User is not authorized' });
//         }
//         req.user = decodedData;
//         next();
//     } catch (err) {
//         return res
//             .status(401)
//             .json({ statusCode: 401, message: 'User is not authorized' });
//     }
// };

// module.exports = { authMiddleware };
