"use strict";
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("Atiende", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      doctorUuid: {
        type: DataTypes.UUID,
        references: { model: "Doctores", key: "uuid" },
      },
      pacienteUuid: {
        type: DataTypes.UUID,
        references: { model: "Pacientes", key: "uuid" },
      },
      comentarios: DataTypes.STRING,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Atiende");
  },
};
