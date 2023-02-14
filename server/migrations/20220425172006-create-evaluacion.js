"use strict";
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("Evaluaciones", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },

      uuidEvaluador: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: "Usuarios", key: "uuid" },
      },
      uuidPaciente: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: "Pacientes", key: "uuid" },
      },

      tipoEvaluacion: {
        type: DataTypes.ENUM,
        values: ["MiniMental"],
        allowNull: false,
      },
      fecha: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
      comentarios: {
        type: DataTypes.STRING,
      },
      resultados: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Evaluaciones");
  },
};
