import React, { useState, useContext, Fragment } from "react";
import useInput from "../../hooks/use-input";
import styles from "./Form.module.css";
import AuthContext from "../../store/Auth/auth-context";
import LoadingSpinner from "../UI/LoadingSpinner";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/UI/ui-slice";
import { pacientesActions } from "../../store/Pacientes/pacientes-slice";


const expresionNombre = new RegExp(/^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g); // string especial
const expresionTelefono = new RegExp(/^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{2,3}\)?[\s.-]?\d{3,4}[\s.-]?\d{4}$/);
/*
1-718-444-1122
718-444-1122
(718)-444-1122
17184441122
7184441122
718.444.1122
1718.444.1122
1-123-456-7890
1 123-456-7890
1 (123) 456-7890
1 123 456 7890
1.123.456.7890
+91 (123) 456-7890
18005551234
1 800 555 1234
+1 800 555-1234
+86 800 555 1234
1-800-555-1234
1 (800) 555-1234
(800)555-1234
(800) 555-1234
(800)5551234
800-555-1234
800.555.1234
18001234567
1 800 123 4567
1-800-123-4567
+18001234567
+1 800 123 4567
+1 (800) 123 4567
1(800)1234567
+1800 1234567
1.8001234567
1.800.123.4567
+1 (800) 123-4567
18001234567
1 800 123 4567
+1 800 123-4567
+86 800 123 4567
1-800-123-4567
1 (800) 123-4567
(800)123-4567
(800) 123-4567
(800)1234567
800-123-4567
800.123.4567
1231231231
123-1231231
123123-1231
123-123 1231
123 123-1231
123-123-1231
(123)123-1231
(123)123 1231
(123) 123-1231
(123) 123 1231
+99 1234567890
+991234567890
(555) 444-6789
555-444-6789
555.444.6789
555 444 6789
18005551234
1 800 555 1234
+1 800 555-1234
+86 800 555 1234
1-800-555-1234
1.800.555.1234
+1.800.555.1234
1 (800) 555-1234
(800)555-1234
(800) 555-1234
(800)5551234
800-555-1234
800.555.1234
(003) 555-1212
(103) 555-1212
(911) 555-1212
18005551234
1 800 555 1234
+86 800-555-1234
1 (800) 555-1234
*/
function AddPaciente(props) {
  const [isLoading, setIsLoading] = useState(false);
  const authCtx = useContext(AuthContext);
  const dispatch = useDispatch();

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
    value: enteredTelefono,
    hasError: telefonoHasError,
    isValid: telefonoIsValid,
    inputBlurHandler: telefonoBlurHandler,
    reset: telefonoReset,
    valueChangedHandler: telefonoChangedHandler,
  } = useInput((value) => value.trim() !== "" && value.match(expresionTelefono));

  const {
    value: enteredEscolaridad,
    hasError: escolaridadHasError,
    isValid: escolaridadIsValid,
    inputBlurHandler: escolaridadBlurHandler,
    reset: escolaridadReset,
    valueChangedHandler: escolaridadChangedHandler,
  } = useInput((value) => value.trim() !== "" && value<=20 && value>=0);

  const {
    value: enteredFechaNacimiento,
    hasError: fechaNacimientoHasError,
    isValid: fechaNacimientoIsValid,
    inputBlurHandler: fechaNacimientoBlurHandler,
    reset: fechaNacimientoReset,
    valueChangedHandler: fechaNacimientoChangedHandler,
  } = useInput((value) => value.trim() !== "" && year120(value) && year18(value));

  function year120(GivenDate){
    var CurrentDate = new Date();
    GivenDate = new Date(GivenDate);
    CurrentDate = CurrentDate.getFullYear();
    GivenDate = GivenDate.getFullYear();
    if((CurrentDate-GivenDate)>=120)
    {
      return false;
    } else {
      return true;
    }
  }

  function year18(GivenDate){
    var CurrentDate = new Date();
    GivenDate = new Date(GivenDate);
    CurrentDate = CurrentDate.getFullYear();
    GivenDate = GivenDate.getFullYear();
    console.log(CurrentDate)
    console.log(GivenDate)
    if((CurrentDate-GivenDate)<18)
    {
      return false;
    } else {
      return true;
    }
  }

  let isFormValid = false;

  if (
    nombreIsValid &&
    apellidoPIsValid &&
    apellidoMIsValid &&
    sexIsValid &&
    telefonoIsValid &&
    escolaridadIsValid &&
    fechaNacimientoIsValid
  ) {
    isFormValid = true;
  }

  const submitFormHandler = (event) => {
    event.preventDefault();

    if (!isFormValid) {
      return;
    }
    setIsLoading(true);

    fetch(`/api/pacientes/${authCtx.uuid}`, {
      method: "POST",
      body: JSON.stringify({
        nombre: enteredNombre,
        apellidoP: enteredApellidoP,
        apellidoM: enteredApellidoM,
        sexo: enteredSex,
        telefono: enteredTelefono,
        escolaridad: parseInt(enteredEscolaridad),
        fechaNacimiento: new Date(enteredFechaNacimiento)
          .toISOString()
          .slice(0, 10),
      }),
      headers: {
        "Content-Type": "application/json",
        "x-access-token": authCtx.token,
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let error = "No pudo agregar el paciente.";
            if (data.message) {
              error = data.message;
            }
            throw new Error(error);
          });
        }
      })
      .then((data) => {
        console.log(data);
        dispatch(pacientesActions.addPaciente(data));
        props.handleOutside();
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

    nombreReset();
    apellidoPReset();
    apellidoMReset();
    sexReset();
    telefonoReset();
    escolaridadReset();
    fechaNacimientoReset();

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
              <p className={styles["error-text"]}>El nombre es invalido.</p>
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
                Primer apellido invalido.
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
                Segundo apellido invalido.
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
              telefonoHasError && styles["invalid"]
            }`}
          >
            <label htmlFor="telefono">Teléfono de Contacto</label>
            <input
              id="telefono"
              onChange={telefonoChangedHandler}
              onBlur={telefonoBlurHandler}
              value={enteredTelefono}
              type="tel"
            />
            {telefonoHasError && (
              <p className={styles["error-text"]}>
                Ingrese un teléfono válido.
              </p>
            )}
          </div>
          <div
            className={`${styles["form-control"]} ${
              escolaridadHasError && styles["invalid"]
            }`}
          >
            <label htmlFor="escolaridad">Años de Escolaridad</label>
            <input
              id="escolaridad"
              onChange={escolaridadChangedHandler}
              onBlur={escolaridadBlurHandler}
              value={enteredEscolaridad}
              type="number"
            />
            {escolaridadHasError && (
              <p className={styles["error-text"]}>
                Ingrese una Escolaridad valida.
              </p>
            )}
          </div>

          <div
            className={`${styles["form-control"]} ${
              fechaNacimientoHasError && styles["invalid"]
            }`}
          >
            <label htmlFor="fecha">Fecha de Nacimiento</label>
            <input
              id="fecha"
              onChange={fechaNacimientoChangedHandler}
              onBlur={fechaNacimientoBlurHandler}
              value={enteredFechaNacimiento}
              type="date"
            />
            {fechaNacimientoHasError && (
              <p className={styles["error-text"]}>Fecha invalida.</p>
            )}
          </div>

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

export default AddPaciente;
