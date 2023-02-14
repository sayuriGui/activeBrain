"use strict";
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("MiniMental", {
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("MiniMental");
  },
};
