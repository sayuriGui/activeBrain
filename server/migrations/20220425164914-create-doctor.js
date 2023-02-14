"use strict";
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("Doctores", {
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
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Doctores");
  },
};
