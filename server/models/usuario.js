"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Doctor, Paciente, Evaluacion }) {
      this.hasOne(Doctor, { foreignKey: "uuid", sourceKey: "uuid" });
      this.hasMany(Evaluacion, {
        foreignKey: "uuidEvaluador",
        sourceKey: "uuid",
      });
      this.hasMany(Paciente, {
        foreignKey: "uuidEvaluador",
        sourceKey: "uuid",
      });
    }
    validatePassword = (password) => {
      return bcrypt.compareSync(password, this.password);
    };
  }

  Usuario.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      nombre: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
          is: /^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g,
        },
      },
      apellidoP: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
          is: /^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g,
        },
      },
      apellidoM: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
          is: /^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g,
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sexo: {
        type: DataTypes.ENUM,
        values: ["H", "M"],
        allowNull: false,
      },
      token: {
        type: DataTypes.STRING,
      },
      fullName: {
        type: DataTypes.VIRTUAL,
        get() {
          return `${this.nombre} ${this.apellidoP} ${this.apellidoM}`;
        },
        set(value) {
          throw new Error("Do not try to set the `fullName` value!");
        },
      },
    },

    {
      sequelize,
      modelName: "Usuario",
      timestamps: true,
      tableName: "Usuarios",

      hooks: {
        beforeCreate: async (user) => {
          const salt = await bcrypt.genSaltSync(10, "a");
          user.password = bcrypt.hashSync(user.password, salt);
        },
        beforeUpdate: async (user) => {
          if (user.password) {
            const salt = await bcrypt.genSaltSync(10, "a");
            user.password = bcrypt.hashSync(user.password, salt);
          }
        },
      },
    }
  );

  return Usuario;
};
