const { Sequelize, DataTypes } = require('sequelize');

const host = process.env.DATABASE_HOST;
const DB = process.env.DATABASE_NAME;
const username = process.env.DATABASE_USERNAME;
const password = process.env.DATABASE_PASSWORD;

const sequelize = new Sequelize(DB, username, password, {
    host: host,
    dialect: 'mysql',
    logging: (...msg) => console.log(msg),
});

const Sphere = sequelize.define(
    'Sphere',
    {
        name: {
            type: DataTypes.STRING,
            validate: { len: [0, 500] },
        },
        tin: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                args: [7, 8],
                msg: 'Display name must be between 3 and 30 characters in length',
            },
        },
        sphere_code: {
            type: DataTypes.STRING,
        },
        sphere_text: {
            type: DataTypes.STRING,
        },
        is_chacked: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        // Other model options go here
    }
);

sequelize.authenticate();

module.exports = { sequelize, Sphere };
