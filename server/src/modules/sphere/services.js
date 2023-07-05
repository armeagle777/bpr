const fs = require('fs');
const XLSX = require('xlsx');
const v4 = require('uuid').v4;
const { Sphere } = require('../../config/database');

const insertDataFromFile = async (files) => {
    const excelDocument = files.filepond;
    const filePath = './src/public/' + v4() + '_' + excelDocument.name;
    await excelDocument.mv(filePath);

    const workBook = XLSX.readFile(filePath);
    const workSheet = workBook.Sheets[workBook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_row_object_array(workSheet);

    await Sphere.bulkCreate(data);
    fs.rmSync(filePath, {
        force: true,
    });
    return {
        status: true,
        message: 'File is uploaded',
        data: {
            name: excelDocument.name,
            mimetype: excelDocument.mimetype,
            size: excelDocument.size,
        },
    };
};

const getSpheresDataDb = async () => {
    const data = await Sphere.findAll();

    console.log('data::::::', data);

    return data;
};

module.exports = {
    insertDataFromFile,
    getSpheresDataDb,
};
