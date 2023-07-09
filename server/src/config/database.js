const { Sequelize, DataTypes } = require('sequelize');

const host = process.env.DATABASE_HOST;
const DB = process.env.DATABASE_NAME;
const username = process.env.DATABASE_USERNAME;
const password = process.env.DATABASE_PASSWORD;

const sequelize = new Sequelize(DB, username, password, {
    host: host,
    dialect: 'mysql',
    // logging: (...msg) => console.log(msg),
});

const Sphere = sequelize.define(
    'Sphere',
    {
        name: {
            type: DataTypes.STRING,
            validate: { len: [0, 255] },
        },
        tin: {
            type: DataTypes.STRING,
            unique: true,
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
            type: DataTypes.TEXT('long'),
        },
        is_checked: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        createdAt: {
            type: 'TIMESTAMP',
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false,
        },
        updatedAt: {
            type: 'TIMESTAMP',
            defaultValue: sequelize.literal(
                'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
            ),
            allowNull: false,
        },
    },
    {
        timestamps: false,
    }
);

sequelize.authenticate();

module.exports = { sequelize, Sphere };
