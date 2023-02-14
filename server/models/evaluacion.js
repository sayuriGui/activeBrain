"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Evaluacion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Usuario, Paciente, Doctor, MiniMental }) {
      this.belongsTo(Usuario, {
        foreignKey: "uuidEvaluador",
        targetKey: "uuid",
      });
      this.belongsTo(Paciente, {
        foreignKey: "uuidPaciente",
        targetKey: "uuid",
      });
      this.hasOne(MiniMental, { foreignKey: "id" });
      // define association heres
    }
  }
  Evaluacion.init(
    {
      uuidEvaluador: {
        type: DataTypes.UUID,
        references: { model: "Usuarios", key: "uuid" },
      },
      uuidPaciente: {
        type: DataTypes.UUID,
        references: { model: "Pacientes", key: "uuid" },
      },

      tipoEvaluacion: {
        type: DataTypes.ENUM,
        values: ["MiniMental"],
      },
      fecha: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
      comentarios: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Evaluacion",
      timestamps: false,
      tableName: "Evaluaciones",
    }
  );
  return Evaluacion;
};
