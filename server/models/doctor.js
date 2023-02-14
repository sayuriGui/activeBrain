"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Doctor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Usuario, Paciente }) {
      // define association here
      this.belongsTo(Usuario, { foreignKey: "uuid", targetKey: "uuid" });
      this.belongsToMany(Paciente, {
        through: "Atiende",
        targetKey: "uuid",
        sourceKey: "uuid",
      });
    }
  }
  Doctor.init(
    {
      uuid: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: "Usuarios", key: "uuid" },
        primaryKey: true,
      },
      especialidad: {
        type: DataTypes.ENUM,
        values: [
          "Geriatría",
          "Cardiología",
          "Cirugía General",
          "Dermatología",
          "Gastroenterología",
          "Rehabilitación",
          "Psiquiatría",
          "Neurológía",
          "Nefrología",
          "Otro",
        ],
      },
      cedula: {
        type: DataTypes.STRING(8),
        allowNull: false,
        validate: {
          len: [0,8]
        }
      },
    },
    {
      sequelize,
      modelName: "Doctor",
      tableName: "Doctores",
      timestamps: false,
    }
  );
  return Doctor;
};
