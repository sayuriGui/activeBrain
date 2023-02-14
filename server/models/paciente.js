"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Paciente extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Evaluacion, Doctor, Usuario }) {
      this.hasMany(Evaluacion, {
        foreignKey: "uuidPaciente",
        sourceKey: "uuid",
      });
      this.belongsToMany(Doctor, {
        through: "Atiende",
        targetKey: "uuid",
        sourceKey: "uuid",
      });
      this.belongsTo(Usuario, {
        foreignKey: "uuid",
        sourceKey: "uuidEvaluador",
      });
      // define association here
      // this.belongsTo(Usuario, { foreignKey: "uuid" });
    }
  }
  Paciente.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      uuidEvaluador: {
        type: DataTypes.UUID,

        references: { model: "Usuarios", key: "uuid" },
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
      sexo: {
        type: DataTypes.ENUM,
        values: ["H", "M"],
        allowNull: false,
        validate: {
          isIn: [['H', 'M']]
        }
      },
      telefono: {
        allowNull: false,
        type: DataTypes.STRING(20),
        validate: {
          is: /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{2,3}\)?[\s.-]?\d{3,4}[\s.-]?\d{4}$/
        }
      },
      escolaridad: {
        allowNull: false,
        type: DataTypes.TINYINT,
        validate: {
          max: 20,                  
          min: 0,                  
        }
      },
      fechaNacimiento: {
        allowNull: false,
        type: DataTypes.DATEONLY,
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
      edad: {
        type: DataTypes.VIRTUAL,
        get() {
          let today = new Date();
          let birthDate = new Date(this.fechaNacimiento);
          let age = today.getFullYear() - birthDate.getFullYear();
          let m = today.getMonth() - birthDate.getMonth();
          if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
          }
          return age;
        },
        set(value) {
          throw new Error("Do not try to set the `edad` value!");
        },
      },
    },
    {
      sequelize,
      modelName: "Paciente",
      timestamps: false,
      tableName: "Pacientes",
    }
  );
  return Paciente;
};

function getAge(dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}
