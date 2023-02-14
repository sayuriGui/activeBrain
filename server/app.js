const express = require("express");
const logger = require("morgan");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const auth = require("./middleware/auth");
const { Op } = require("sequelize");
const path = require("path");

const {
  sequelize,
  Doctor,
  Usuario,
  Paciente,
  Atiende,
  Evaluacion,
  MiniMental,
} = require("./models");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Esto hace que NodeJS sirva los archivos resultado del build de ReactJS
// Esto va antes de nuestros endpoints pero después de la declaración de app.
app.use(express.static(path.resolve(__dirname, "../client/build")));

app.use(logger("dev"));

const PORT = process.env.PORT || 3001;

//! Registro de Usuarios
app.post("/api/register", async (req, res) => {
  try {
    const type = req.body.type;

    if (type === "USER") {
      const { nombre, apellidoP, apellidoM, email, password, sexo } =
        req.body.info;

      const user = await Usuario.create({
        nombre,
        apellidoP,
        apellidoM,
        email,
        password,
        sexo,
      });

      // Create token
      const token = jwt.sign(
        { user_id: user.uuid, email },
        process.env.TOKEN_SECRET,
        {
          expiresIn: "2h",
        }
      );

      // Appeend Token
      await Usuario.update(
        { token: token },
        {
          where: {
            uuid: user.uuid,
          },
        }
      );

      const expirationTime = new Date(new Date().getTime() + 7200 * 1000);

      res.status(201).json({
        token,
        uuid: user.uuid,
        email: user.email,
        expirationTime: expirationTime.toISOString(),
        isDoctor: false,
      });
    } else if (type === "DOCTOR") {
      const {
        nombre,
        apellidoP,
        apellidoM,
        email,
        password,
        sexo,
        cedula,
        especialidad,
      } = req.body.info;

      if (!cedula) {
        res.status(206).json({ message: "Necesita ingresar cedula" });
        return;
      }

      const user = await Usuario.create({
        nombre,
        apellidoP,
        apellidoM,
        email,
        password,
        sexo,
      });

      // Create token
      const token = jwt.sign(
        { user_id: user.uuid, email },
        process.env.TOKEN_SECRET,
        {
          expiresIn: "2h",
        }
      );
      // Appeend Token
      await Usuario.update(
        { token: token },
        {
          where: {
            uuid: user.uuid,
          },
        }
      );

      await Doctor.create({ uuid: user.uuid, cedula, especialidad });

      const expirationTime = new Date(new Date().getTime() + 7200 * 1000);

      res.status(201).json({
        token,
        uuid: user.uuid,
        email: user.email,
        expirationTime: expirationTime.toISOString(),
        isDoctor: true,
      });
    } else {
      res
        .status(500)
        .json({ message: `${req.body.type} is not a supported type.` });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

//! Login de Usuarios
app.post("/api/login", async (req, res) => {
  try {
    const email = req.body.email;
    const user = await Usuario.findOne({
      where: { email },
      include: Doctor,
      attributes: {},
    });

    if (user === null) {
      return res.status(400).json({ message: "Usuario no encontrado." });
    }

    if (user.validatePassword(req.body.password)) {
      // Create token
      const token = jwt.sign(
        { user_id: user.uuid, email },
        process.env.TOKEN_SECRET,
        {
          expiresIn: "2h",
        }
      );
      // Appeend Token
      await Usuario.update(
        { token: token },
        {
          where: {
            uuid: user.uuid,
          },
        }
      );

      const expirationTime = new Date(new Date().getTime() + 7200 * 1000);

      return res.status(200).json({
        token,
        uuid: user.uuid,
        email: user.email,
        expirationTime: expirationTime.toISOString(),
        isDoctor: user.Doctor ? true : false,
      });
    } else {
      // En realidad solo es contraseña incorrecta
      return res
        .status(400)
        .json({ message: "Correo o contraseña incorrectos." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

//! Get User Data from UUID
app.get("/api/user/:userId", auth, async (req, res) => {
  try {
    const user = await Usuario.findByPk(req.params.userId, {
      attributes: {
        exclude: ["password", "createdAt", "updatedAt", "uuid", "token"],
      },
      include: {
        model: Doctor,
        attributes: {
          exclude: ["uuid"],
        },
      },
    });

    if (user === null) {
      return res.status(400).json({ message: "User not found." });
    }

    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

//! Add Paciente Doctor
app.post("/api/pacientes/:doctorId", auth, async (req, res) => {
  const doctor = await Doctor.findByPk(req.params.doctorId);

  if (doctor === null) {
    return res.status(400).json({ message: "Doctor not found." });
  }
  const {
    nombre,
    apellidoP,
    apellidoM,
    sexo,
    escolaridad,
    telefono,
    fechaNacimiento,
  } = req.body;

  if (
    await Paciente.findOne({
      where: {
        nombre,
        apellidoP,
        apellidoM,
        sexo,
        telefono,
        escolaridad,
        fechaNacimiento,
      },
    })
  ) {
    return res.status(400).json({ message: "El paciente ya existe" });
  }

  const paciente = await doctor.createPaciente({
    nombre,
    apellidoP,
    apellidoM,
    sexo,
    telefono,
    escolaridad,
    fechaNacimiento,
  });

  res.status(200).json(paciente);
});

//! Get Basic Patient data from doctor UUID
app.get("/api/pacientes/:doctorId", auth, async (req, res) => {
  try {
    const doctor = await Doctor.findByPk(req.params.doctorId);

    const pacientes = await doctor.getPacientes({
      joinTableAttributes: [],
    });

    res.json(pacientes);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

//! Gets all users that are not doctors
app.get("/api/evaluadores", auth, async (req, res) => {
  try {
    const uuids = await Doctor.findAll({ attributes: ["uuid"] });

    const users = await Usuario.findAll({
      where: {
        uuid: {
          [Op.notIn]: JSON.parse(JSON.stringify(uuids)).map((a) => a.uuid),
        },
      },
      attributes: {
        exclude: ["password", "createdAt", "updatedAt", "token"],
      },
    });

    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

//* Get Results from Patient UUID

app.get("/api/paciente/:idPaciente/pruebas", auth, async (req, res) => {
  try {
    const paciente = await Paciente.findByPk(req.params.idPaciente);

    const pruebas = await paciente.getEvaluacions({
      include: { model: MiniMental, attributes: { exclude: ["id"] } },

      attributes: { exclude: ["uuidPaciente"] },
    });

    //lo truw

    res.json(pruebas);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

//! Conseguimos pacientes de un evaluador

app.get("/api/evaluador/:idEvaluador/pacientes", auth, async (req, res) => {
  try {
    const evaluador = await Usuario.findByPk(req.params.idEvaluador);

    if (evaluador === null) {
      res.status(400).json({ message: "No se encontro el evaluador." });
    }

    const pacientes = await evaluador.getPacientes({
      attributes: {
        exclude: ["uuidEvaluador"],
      },
    });

    res.json(pacientes);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

//! Agregar Evaluador a paciente
app.post("/api/paciente/:idPaciente/:idEvaluador", auth, async (req, res) => {
  try {
    let paciente = await Paciente.findByPk(req.params.idPaciente);
    const evaluador = await Usuario.findByPk(req.params.idEvaluador);

    if (paciente === null || evaluador === null) {
      res
        .status(400)
        .json({ message: "No se pudo agregar el evaluador al paciente" });
    }

    await Paciente.update(
      { uuidEvaluador: evaluador.uuid },
      {
        where: {
          uuid: paciente.uuid,
        },
      }
    );

    paciente = await Paciente.findByPk(req.params.idPaciente);

    res.status(200).json(paciente);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

//! Add results to patient

app.post("/api/paciente/:idPaciente", auth, async (req, res) => {
  const evaluacionData = req.body.evaluacion;

  const {
    orientacion,
    memoriaInmediata,
    atencionCalculo,
    lenguaje,
    memoriaDiferida,
    memoriaSemantica,
    lenguajeRepeticion,
    visoEspacial,
    total,
  } = req.body.resultados;
  const paciente = await Paciente.findByPk(req.params.idPaciente);

  if (paciente === null) {
    return res.status(400).json({ message: "Ese Paciente no existe." });
  }

  const evaluacion = await Evaluacion.create({
    uuidEvaluador: evaluacionData.evaluador,
    uuidPaciente: req.params.idPaciente,
    tipoEvaluacion: evaluacionData.tipoEvaluacion,
    comentarios: evaluacionData.comentarios,
  });
  await evaluacion.createMiniMental({
    orientacion,
    memoriaInmediata,
    atencionCalculo,
    lenguaje,
    memoriaDiferida,
    memoriaSemantica,
    lenguajeRepeticion,
    visoEspacial,
    total,
  });

  const isDoctor = await Doctor.findByPk(evaluacion.uuidEvaluador);
  if (!isDoctor) {
    await Paciente.update(
      { uuidEvaluador: null },
      {
        where: {
          uuid: paciente.uuid,
          uuidEvaluador: evaluacion.uuidEvaluador,
        },
      }
    );
  }

  res.status(200).json({ message: "Se agregaron los resultados con exito." });
});

//! Get datos paciente

app.get("/api/paciente/:idPaciente", auth, async (req, res) => {
  try {
    const paciente = await Paciente.findByPk(req.params.idPaciente);

    if (paciente === null) {
      return res.status(400).json({ message: "Ese Paciente no existe." });
    }

    res.json(paciente);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// Todas las peticiones GET que no manejamos ahora regresarán nuestra React App
// Agrega esto antes del “app.listen”
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, async () => {
  console.log(`Server is running on PORT: ${PORT}`);
  await sequelize.authenticate();
  console.log("Database Connected!");
});

module.exports = app;
