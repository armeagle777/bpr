const { getUserBySsnDb } = require('./services');

const getPersonBySsn = async (req, res, next) => {
    try {
        const person = await getUserBySsnDb(req.params);

        res.status(200).json(person);
    } catch (err) {
        next(err);
    }
};

// async getAll(req, res) {
//     try {
//         const { count, data } = await getPaginatedResults(
//             req,
//             'Settlement',
//             {
//                 settlement_id: true,
//                 set_name_arm: true,
//             }
//         );
//         res.set({
//             'Content-Range': `posts 0-${data.length}/${count}`,
//         });
//         const modifiedData = data.map((set) => ({
//             id: set.settlement_id,
//             name: set.set_name_arm,
//         }));
//         res.send(modifiedData);
//     } catch (err) {
//         return res.json({ message: 'Try later...' });
//     }
// }

// async updateSingleCategory(req, res) {
//     try {
//         const { categoryId } = req.params;
//         const { name } = req.body;
//         const updatedCategory = await prisma.Category.update({
//             where: {
//                 id: +categoryId,
//             },
//             data: {
//                 name,
//             },
//         });
//         return res.status(200).send(updatedCategory);
//     } catch (err) {
//         logger.error(err.message);
//         res.json(err);
//     }
// }
// async createCategory(req, res) {
//     try {
//         const category = await prisma.Category.create({
//             data: req.body,
//         });
//         return res.status(200).send(category);
//     } catch (err) {
//         logger.error(err);
//         return res.json({ message: 'Check sent data and try again' });
//     }
// }

module.exports = { getPersonBySsn };
