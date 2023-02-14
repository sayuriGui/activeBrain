import React, { Fragment } from "react";
import useInput from "../../hooks/use-input";
import styles from "./Form.module.css";


function Escolaridad(props) {
  const {
    value: enteredEscolaridad,
    hasError: escolaridadHasError,
    isValid: escolaridadIsValid,
    inputBlurHandler: escolaridadBlurHandler,
    reset: escolaridadReset,
    valueChangedHandler: escolaridadChangedHandler,
  } = useInput((value) => value.trim() !== "" && value<=20 && value>=0);

  const submitFormHandler = (event) => {
    event.preventDefault();

    if (!escolaridadIsValid) {
      return;
    }

    props.escolaridadHandler(enteredEscolaridad);

    escolaridadReset();
  };

  return (
    <form onSubmit={submitFormHandler}>
      <Fragment>
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

        <div className={styles["form-actions"]}>
          <button
            disabled={!escolaridadIsValid}
            className={styles["button"]}
            type="submit"
          >
            Siguiente
          </button>
        </div>
      </Fragment>
    </form>
  );
}

export default Escolaridad;
