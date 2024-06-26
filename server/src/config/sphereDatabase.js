const { Sequelize, DataTypes } = require("sequelize");

const host = process.env.DATABASE_HOST;
const DB = process.env.DATABASE_NAME;
const username = process.env.DATABASE_USERNAME;
const password = process.env.DATABASE_PASSWORD;

const sphereSequelize = new Sequelize(DB, username, password, {
  host: host,
  dialect: "mysql",
  // logging: (...msg) => console.log(msg),
});

const Sphere = sphereSequelize.define(
  "Sphere",
  {
    name: {
      type: DataTypes.STRING,
      validate: { len: [0, 255] },
    },
    tin: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        args: [7, 8],
        msg: "Display name must be between 3 and 30 characters in length",
      },
    },
    sphere_code: {
      type: DataTypes.STRING,
    },
    sphere_text: {
      type: DataTypes.TEXT("long"),
    },
    is_inactive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_blocked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_checked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    createdAt: {
      type: "TIMESTAMP",
      defaultValue: sphereSequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    },
    updatedAt: {
      type: "TIMESTAMP",
      defaultValue: sphereSequelize.literal(
        "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
      ),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

sphereSequelize.authenticate();

module.exports = { sphereSequelize, Sphere };
