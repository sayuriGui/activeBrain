"use strict";
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("Pacientes", {
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
      },
      telefono: {
        allowNull: false,
        type: DataTypes.STRING(20),
      },
      escolaridad: {
        allowNull: false,
        type: DataTypes.TINYINT,
      },
      fechaNacimiento: {
        allowNull: false,
        type: DataTypes.DATEONLY,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Pacientes");
  },
};
