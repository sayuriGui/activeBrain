import React, { useState, useContext, Fragment } from "react";
import useInput from "../../hooks/use-input";
import styles from "./Form.module.css";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/Auth/auth-context";
import LoadingSpinner from "../UI/LoadingSpinner";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/UI/ui-slice";

const isEmpty = (value) => value.trim() !== "";
const expresionNombre = new RegExp(/^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g); // string especial
const expresionEmail = new RegExp(
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);
const expresionClave = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\-*+/])(?=.{8,})/
);

function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isDoctor, setIsDoctor] = useState(false);
  const authCtx = useContext(AuthContext);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const isDoctorHandler = () => {
    setIsDoctor((state) => !state);
  };

  const {
    value: enteredNombre,
    hasError: nombreHasError,
    isValid: nombreIsValid,
    inputBlurHandler: nombreBlurHandler,
    reset: nombreReset,
    valueChangedHandler: nombreValueChangedHandler,
  } = useInput((value) => value.trim() !== "" && value.match(expresionNombre));

  const {
    value: enteredApellidoP,
    hasError: apellidoPHasError,
    isValid: apellidoPIsValid,
    inputBlurHandler: apellidoPBlurHandler,
    reset: apellidoPReset,
    valueChangedHandler: apellidoPValueChangedHandler,
  } = useInput((value) => value.trim() !== "" && value.match(expresionNombre));

  const {
    value: enteredApellidoM,
    hasError: apellidoMHasError,
    isValid: apellidoMIsValid,
    inputBlurHandler: apellidoMBlurHandler,
    reset: apellidoMReset,
    valueChangedHandler: apellidoMValueChangedHandler,
  } = useInput((value) => value.trim() !== "" && value.match(expresionNombre));

  const {
    value: enteredSex,
    hasError: sexHasError,
    isValid: sexIsValid,
    inputBlurHandler: sexBlurHandler,
    reset: sexReset,
    valueChangedHandler: sexValueChangedHandler,
  } = useInput((value) => value.trim() == "H" || value.trim() == "M");

  const {
    value: enteredEmail,
    hasError: emailHasError,
    isValid: emailIsValid,
    inputBlurHandler: emailBlurHandler,
    reset: emailReset,
    valueChangedHandler: emailChangedHandler,
  } = useInput((value) => value.trim() !== "" && value.match(expresionEmail));

  const {
    value: enteredCedula,
    hasError: cedulaHasError,
    isValid: cedulaIsValid,
    inputBlurHandler: cedulaBlurHandler,
    reset: cedulaReset,
    valueChangedHandler: cedulaChangedHandler,
  } = useInput((cedula) => cedula.length <= 8 && cedula.length !== 0); // Debe de ser una cedula valida

  const {
    value: enteredEspecialidad,
    hasError: especialidadHasError,
    isValid: especialidadIsValid,
    inputBlurHandler: especialidadBlurHandler,
    reset: especialidadReset,
    valueChangedHandler: especialidadChangedHandler,
  } = useInput((value) =>
    [
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
    ].includes(value)
  ); // Debe formar parte de la lista predeterminada o null

  const {
    value: enteredPassword,
    hasError: passordHasError,
    isValid: passwordIsValid,
    inputBlurHandler: passwordBlurHandler,
    reset: passwordReset,
    valueChangedHandler: passwordChangedHandler,
  } = useInput((value) => value.trim() !== "" && value.match(expresionClave));

  let isFormValid = false;

  if (
    emailIsValid &&
    passwordIsValid &&
    nombreIsValid &&
    apellidoPIsValid &&
    apellidoMIsValid &&
    sexIsValid
  ) {
    if (!isDoctor) {
      isFormValid = true;
    } else {
      if (cedulaIsValid && especialidadIsValid) {
        isFormValid = true;
      }
    }
  }

  const submitFormHandler = (event) => {
    event.preventDefault();

    if (!isFormValid) {
      return;
    }
    setIsLoading(true);

    let doctorInfo = {};

    if (isDoctor) {
      doctorInfo = {
        cedula: enteredCedula,
        especialidad: enteredEspecialidad,
      };
    }

    fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({
        type: !isDoctor ? "USER" : "DOCTOR",
        info: {
          nombre: enteredNombre,
          apellidoP: enteredApellidoP,
          apellidoM: enteredApellidoM,
          email: enteredEmail,
          sexo: enteredSex,
          password: enteredPassword,
          ...doctorInfo,
        },
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let error = "No pudo registrar el usuario";
            if (data.message) {
              error = data.message;
            }
            throw new Error(error);
          });
        }
      })
      .then((data) => {
        authCtx.login(data);
        navigate("/home");
      })
      .catch((err) => {
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Error!",
            message: err.message,
          })
        );
        setTimeout(() => {
          dispatch(uiActions.removeNotification());
        }, 5000);
      });

    // console.log(`Correo: ${enteredEmail}`);
    // console.log(`Contraseña: ${enteredPassword}`);
    // console.log(`Nombre: ${enteredNombre}`);
    // console.log(`ApellidoP: ${enteredApellidoP}`);
    // console.log(`ApellidoM: ${enteredApellidoM}`);
    // console.log(`Sexo: ${enteredSex}`);

    emailReset();
    passwordReset();
    nombreReset();
    apellidoPReset();
    apellidoMReset();
    sexReset();

    if (isDoctor) {
      especialidadReset();
      cedulaReset();
      setIsDoctor(false);
    }

    // navigate("/home");
  };

  return (
    <form onSubmit={submitFormHandler}>
      {!isLoading && (
        <Fragment>
          <div
            className={`${styles["form-control"]} ${
              nombreHasError && styles["invalid"]
            }`}
          >
            <label htmlFor="nombre">Nombre</label>
            <input
              id="nombre"
              onChange={nombreValueChangedHandler}
              onBlur={nombreBlurHandler}
              value={enteredNombre}
              type="text"
            />
            {nombreHasError && (
              <p className={styles["error-text"]}>
                El nombre ingresado no es valido.
              </p>
            )}
          </div>

          <div
            className={`${styles["form-control"]} ${
              apellidoPHasError && styles["invalid"]
            }`}
          >
            <label htmlFor="apellidoP">Primer Apellido</label>
            <input
              id="apellidoP"
              onChange={apellidoPValueChangedHandler}
              onBlur={apellidoPBlurHandler}
              value={enteredApellidoP}
              type="text"
            />
            {apellidoPHasError && (
              <p className={styles["error-text"]}>
                El apellido ingresado no es valido.
              </p>
            )}
          </div>

          <div
            className={`${styles["form-control"]} ${
              apellidoMHasError && styles["invalid"]
            }`}
          >
            <label htmlFor="apellidoM">Segundo Apellido</label>
            <input
              id="apellidoM"
              onChange={apellidoMValueChangedHandler}
              onBlur={apellidoMBlurHandler}
              value={enteredApellidoM}
              type="text"
            />
            {apellidoMHasError && (
              <p className={styles["error-text"]}>
                El apellido ingresado no es valido.
              </p>
            )}
          </div>

          <div
            className={`${styles["form-control"]} ${
              sexHasError && styles["invalid"]
            }`}
          >
            <label htmlFor="sex">Sexo</label>
            <select
              id="sex"
              onChange={sexValueChangedHandler}
              onBlur={sexBlurHandler}
              value={enteredSex}
            >
              <option value=""></option>
              <option value="H">Hombre</option>
              <option value="M">Mujer</option>
            </select>
            {sexHasError && (
              <p className={styles["error-text"]}>
                Se debe especificar el sexo.
              </p>
            )}
          </div>

          <div
            className={`${styles["form-control"]} ${
              emailHasError && styles["invalid"]
            }`}
          >
            <label htmlFor="email">Correo Electrónico</label>
            <input
              id="email"
              onChange={emailChangedHandler}
              onBlur={emailBlurHandler}
              value={enteredEmail}
              type="email"
            />
            {emailHasError && (
              <p className={styles["error-text"]}>
                Ingrese un Correo Electrónico válido.
              </p>
            )}
          </div>
          <div
            className={`${styles["form-control"]} ${
              passordHasError && styles["invalid"]
            }`}
          >
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              onChange={passwordChangedHandler}
              onBlur={passwordBlurHandler}
              value={enteredPassword}
              type="password"
            />
            {passordHasError && (
              <p className={styles["error-text"]}>
                Ingrese Contraseña con mínimo 8 caracteres, una letra mayúscula,
                una letra minúscula, un número y un carácter especial
                (!@#\$%\^&\-*+/).
              </p>
            )}
          </div>

          <div className={styles["form-control"]}>
            <label htmlFor="isDoctor">¿Es usted doctor?</label>
            <input
              value={isDoctor}
              onChange={isDoctorHandler}
              id="isDoctor"
              type="checkbox"
            />
          </div>
          {isDoctor && (
            <div
              className={`${styles["form-control"]} ${
                cedulaHasError && styles["invalid"]
              }`}
            >
              <label htmlFor="cedula">Cedula Profesional</label>
              <input
                id="cedula"
                onChange={cedulaChangedHandler}
                onBlur={cedulaBlurHandler}
                value={enteredCedula}
                type="text"
              />
              {cedulaHasError && (
                <p className={styles["error-text"]}>
                  El formato de la cedula es incorrecto.
                </p>
              )}
            </div>
          )}
          {isDoctor && (
            <div
              className={`${styles["form-control"]} ${
                especialidadHasError && styles["invalid"]
              }`}
            >
              <label htmlFor="especialidad">Especialidad</label>
              <select
                id="especialidad"
                onChange={especialidadChangedHandler}
                onBlur={especialidadBlurHandler}
                value={enteredEspecialidad}
              >
                <option value=""></option>
                <option value="Geriatría">Geriatría</option>
                <option value="Cardiología">Cardiología</option>
                <option value="Cirugía General">Cirugía General</option>
                <option value="Dermatología">Dermatología</option>
                <option value="Gastroenterología">Gastroenterología</option>
                <option value="Rehabilitación">Rehabilitación</option>
                <option value="Psiquiatría">Psiquiatría</option>
                <option value="Neurológía">Neurológía</option>
                <option value="Nefrología">Nefrología</option>
                <option value="Otro">Otro</option>
              </select>
              {especialidadHasError && (
                <p className={styles["error-text"]}>Error de formato.</p>
              )}
            </div>
          )}
          <div className={styles["form-actions"]}>
            <button
              disabled={!isFormValid}
              className={styles["button"]}
              type="submit"
            >
              Registro
            </button>
          </div>
        </Fragment>
      )}
      {isLoading && (
        <center>
          <LoadingSpinner />
        </center>
      )}
    </form>
  );
}

export default RegisterForm;
