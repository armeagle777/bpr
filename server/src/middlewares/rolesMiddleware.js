// import jwt from 'jsonwebtoken'
// import {MIDDLEWARE_MESSAGES} from '../helpers/constants.js'

// export const rolesMiddleware = (allowedRolesArray) => {
//     return function (req, res, next) {
//         if (req.method === 'OPTIONS') {
//             next()
//         }
//         try {
//             const token = req.headers.authorization.split(' ')[1]
//             if (!token) {
//                 return res.status(403).json({message: MIDDLEWARE_MESSAGES.NOT_AUTHORIZED})
//             }
//             const {roles: userRole} = jwt.verify(token, process.env.TOKEN_SECRET)
//             let hasRole = false
//             allowedRolesArray.forEach(role => {
//                 if (role === userRole) {
//                     hasRole = true
//                 }
//             })
//             if (!hasRole) {
//                 return res.status(200).json({message: MIDDLEWARE_MESSAGES.HAS_NO_RIGHTS})
//             }
//             next()
//         } catch (err) {
//             return res.status(403).json({message: MIDDLEWARE_MESSAGES.NOT_AUTHORIZED})
//         }
//     }
// }
