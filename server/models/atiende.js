"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Atiende extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Atiende.init(
    {
      doctorUuid: {
        type: DataTypes.UUID,
        references: { model: "Doctores", key: "uuid" },
      },
      pacienteUuid: {
        type: DataTypes.UUID,
        references: { model: "Pacientes", key: "uuid" },
      },
      comentarios: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Atiende",
      tableName: "Atiende",
      timestamps: false,
    }
  );
  return Atiende;
};
