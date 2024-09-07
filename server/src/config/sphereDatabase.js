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

const User = sphereSequelize.define(
  "User",
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      // unique: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.TEXT("long"),
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isActivated: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    activationLink: {
      type: DataTypes.STRING(255),
      unique: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

const Token = sphereSequelize.define(
  "Token",
  {
    refreshToken: { type: DataTypes.TEXT("long") },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

const Role = sphereSequelize.define(
  "Role",
  {
    name: { type: DataTypes.STRING, allowNull: false },
    value: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    timestamps: true,
  }
);

User.belongsToMany(Role, { through: "User_Roles" });
Role.belongsToMany(User, { through: "User_Roles" });

User.hasMany(Token, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

Token.belongsTo(User, {
  foreignKey: "userId",
});

const LogType = sphereSequelize.define(
  "LogType",
  {
    name: { type: DataTypes.STRING, allowNull: false },
  },
  {
    timestamps: true,
  }
);

const Log = sphereSequelize.define(
  "Log",
  {
    text: { type: DataTypes.STRING, allowNull: false },
    logTypeId: {
      type: DataTypes.INTEGER,
      references: {
        model: LogType,
        key: "id",
      },
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

User.hasMany(Log, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

Log.belongsTo(User, {
  foreignKey: "userId",
});

LogType.hasMany(Log, {
  foreignKey: "logTypeId",
  onDelete: "CASCADE",
});

Log.belongsTo(LogType, {
  foreignKey: "logTypeId",
});

sphereSequelize.authenticate();

module.exports = {
  sphereSequelize,
  Sphere,
  User,
  Token,
  Role,
  Log,
  LogType,
};
