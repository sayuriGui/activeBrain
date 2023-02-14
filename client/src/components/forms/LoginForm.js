import React, { Fragment, useContext, useState } from "react";
import useInput from "../../hooks/use-input";
import styles from "./Form.module.css";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/Auth/auth-context";
import LoadingSpinner from "../UI/LoadingSpinner";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/UI/ui-slice";
const expresionEmail = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

function LoginForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const authCtx = useContext(AuthContext);
  const dispatch = useDispatch();

  const {
    value: enteredEmail,
    hasError: emailHasError,
    isValid: emailIsValid,
    inputBlurHandler: emailBlurHandler,
    reset: emailReset,
    valueChangedHandler: emailChangedHandler,
  } = useInput((value) => value.trim() !== "" && value.match(expresionEmail));
  const {
    value: enteredPassword,
    hasError: passordHasError,
    isValid: passwordIsValid,
    inputBlurHandler: passwordBlurHandler,
    reset: passwordReset,
    valueChangedHandler: passwordChangedHandler,
  } = useInput((value) => value.trim());

  let isFormValid = false;

  if (emailIsValid && passwordIsValid) {
    isFormValid = true;
  }

  const submitFormHandler = (event) => {
    event.preventDefault();
    if (!isFormValid) {
      return;
    }

    console.log(`Correo: ${enteredEmail}`);
    console.log(`Contraseña: ${enteredPassword}`);

    setIsLoading(true);

    fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ email: enteredEmail, password: enteredPassword }),
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
            let error = "No pudo iniciar sesión";
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

    emailReset();
    passwordReset();
  };

  return (
    <form onSubmit={submitFormHandler}>
      {!isLoading && (
        <Fragment>
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
              placeholder="example@mail.com"
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
              placeholder="********"
              type="password"
            />
            {passordHasError && (
              <p className={styles["error-text"]}>
                La contraseña no puede estar vacía.
              </p>
            )}
          </div>
          {/*TODO AUN NO TIENES CUENTA*/}
          <div className={styles["form-actions"]}>
            <button
              disabled={!isFormValid}
              className={styles["button"]}
              type="submit"
            >
              Iniciar Sesión
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

export default LoginForm;
