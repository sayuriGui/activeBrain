"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MiniMental extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Evaluacion }) {
      this.belongsTo(Evaluacion, {
        foreignKey: "id",
        targetKey: "id",
      });
    }
  }
  MiniMental.init(
    {
      id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: { model: "Evaluaciones", key: "id" },
      },
      orientacion: {
        allowNull: false,
        type: DataTypes.TINYINT,
      },
      memoriaInmediata: {
        allowNull: false,
        type: DataTypes.TINYINT,
      },
      atencionCalculo: {
        allowNull: false,
        type: DataTypes.TINYINT,
      },
      lenguaje: {
        allowNull: false,
        type: DataTypes.TINYINT,
      },
      memoriaDiferida: {
        allowNull: false,
        type: DataTypes.TINYINT,
      },
      visoEspacial: {
        allowNull: false,
        type: DataTypes.TINYINT,
      },
      memoriaSemantica: {
        allowNull: false,
        type: DataTypes.TINYINT,
      },
      lenguajeRepeticion: {
        allowNull: false,
        type: DataTypes.TINYINT,
      },
      total: {
        type: DataTypes.TINYINT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "MiniMental",
      tableName: "MiniMental",
      timestamps: false,
    }
  );
  return MiniMental;
};
