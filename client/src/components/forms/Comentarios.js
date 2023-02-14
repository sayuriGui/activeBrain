import React, { Fragment } from "react";
import useInput from "../../hooks/use-input";
import styles from "./Form.module.css";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/UI/ui-slice";

function Comentarios({ comentarioHandler }) {
  const dispatch = useDispatch();

  const {
    value: enteredComentarios,
    hasError: comentariosHasError,
    isValid: comentariosIsValid,
    inputBlurHandler: comentariosBlurHandler,
    reset: comentariosReset,
    valueChangedHandler: comentariosChangedHandler,
  } = useInput((comentario) => comentario.length <= 254);

  const submitFormHandler = (event) => {
    event.preventDefault();

    if (!comentariosIsValid) {
      return;
    }

    comentarioHandler(enteredComentarios);

    dispatch(
      uiActions.showNotification({
        status: "success",
        title: "¡Exito!",
        message: "Se cargaron los datos de los pacientes",
      })
    );

    setTimeout(() => {
      dispatch(uiActions.removeNotification());
    }, 2000);

    comentariosReset();
  };

  return (
    <form onSubmit={submitFormHandler}>
      <Fragment>
        <div
          className={`${styles["form-control"]} ${
            comentariosHasError && styles["invalid"]
          }`}
        >
          <label htmlFor="comentarios">
            Comentarios y Observaciones de la Prueba
          </label>
          <label className="text-gray-700" htmlFor="name">
            <textarea
              className="flex-1 appearance-none border border-gray-300 w-5/11 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
              id="comentarios"
              onChange={comentariosChangedHandler}
              onBlur={comentariosBlurHandler}
              value={enteredComentarios}
              placeholder="Ingresa el comentario"
              name="comment"
              rows="5"
              cols="40"
              type="text"
            />
          </label>

          {comentariosHasError && (
            <p className={styles["error-text"]}>Comentario Invalido.</p>
          )}
        </div>

        <div className={styles["form-actions"]}>
          <button
            disabled={!comentariosIsValid}
            className={styles["button"]}
            type="submit"
          >
            Agregar Comentario
          </button>
        </div>
      </Fragment>
    </form>
  );
}

export default Comentarios;
