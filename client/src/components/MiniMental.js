import Unity, { UnityContext } from "react-unity-webgl";
import React, { useEffect, useState, Fragment, useContext } from "react";
import LoadingSpinner from "./UI/LoadingSpinner";
import BackButton from "./BackButton";
import AuthContext from "../store/Auth/auth-context";
import { uiActions } from "../store/UI/ui-slice";
import { useDispatch } from "react-redux";
import ListaPacientes from "./listas/pacientes/ListaPacientes";
import { pruebaActions } from "../store/Prueba/prueba-slice";
import Resultados from "./Resultados";
import Comentarios from "./forms/Comentarios";
import { useNavigate } from "react-router-dom";

const unityContext = new UnityContext({
  loaderUrl: "/assets/unity/unity.loader.js",
  dataUrl: "/assets/unity/unity.data.unityweb",
  frameworkUrl: "/assets/unity/unity.framework.js.unityweb",
  codeUrl: "/assets/unity/unity.wasm.unityweb",
});

function MiniMental({ escolaridad, pacienteId }) {
  const [resultados, setResultados] = useState(null);
  const [comentarios, setComentarios] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const authCtx = useContext(AuthContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //* Prueba RAPIDA realizada por evaluador
  // No tiene paciente seleccionado,
  //! Solo debe de desplegar los resultados no debe de guardarse
  //? NO COMENTARIO
  // (!pacienteId && !authCtx.isDoctor)
  // ! COMPLETE

  //* Prueba NORMAL realizada por por evaluador
  // Se selecciono uno de los pacientess que se le fue asignado.
  //! Se despligan los resultados al final, se guardan en el paciente y se borra la uuidevaluador del paciente.
  //? SI COMENTARIO
  // (pacienteId && !authCtx.isDoctor)

  //* Prueba NORMAL realizada por doctor
  // Selecciona uno de los pacientes de la lista
  //! Se despliegan los resultados y los guarda en la base de datos
  //? SI COMENTARIO
  // (pacienteId && authCtx.isDoctor)
  // ! COMPLETE

  //* Prueba RAPIDA realizada por doctor
  // No tiene paciente seleccionado,
  //! Se despliegan los resultados y se pregunta si e debe attach la prueba a un paciente existente o a uno nuevo
  //? SI COMENTARIO
  // (!pacienteId && authCtx.isDoctor)
  //! COMPLETE

  //! Pasamos Escolaridad React --> Unity
  useEffect(() => {
    unityContext.on("loaded", () => {
      setIsLoaded(true);
      unityContext.send("GameManager", "iniciarTest", escolaridad);
    });
  }, [escolaridad]);

  //! Recibimos resultados Unity --> React
  useEffect(() => {
    unityContext.on("GameOver", (resultados) => {
      const parsedResults = JSON.parse(resultados);
      const total = Object.values(parsedResults).reduce((a, b) => a + b);

      const resultsTotal = {
        ...parsedResults,
        total: escolaridad >= 3 ? total : total + 8,
      };

      setResultados(resultsTotal);
    });
  }, [escolaridad]);

  const sendResultsHandler = () => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Enviando...",
        message: "Se estan enviando los resultados.",
      })
    );

    fetch(`/api/paciente/${pacienteId}`, {
      method: "POST",
      body: JSON.stringify({
        evaluacion: {
          evaluador: authCtx.uuid,
          tipoEvaluacion: "MiniMental",
          comentarios: comentarios,
        },

        resultados: resultados,
      }),
      headers: {
        "Content-Type": "application/json",
        "x-access-token": authCtx.token,
      },
    })
      .then((res) => {
        if (res.ok) {
          dispatch(
            uiActions.showNotification({
              status: "success",
              title: "¡Exito!",
              message: "Se guardaron los resultados.",
            })
          );
          return res.json();
        } else {
          return res.json().then((data) => {
            let error = "No pudo guardar los resultados.";
            if (JSON.parse(JSON.stringify(data)).message) {
              error = data.message;
            }
            throw new Error(error);
          });
        }
      })
      .then((data) => {
        // console.log(data);
        // dispatch(pacientesActions.addPaciente(data));
      })
      .catch((err) => {
        console.log(err);
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
  };

  const comentarioHandler = (comentario) => {
    setComentarios(comentario);
  };

  const doneWithPruebaHandler = () => {
    if ((pacienteId && authCtx.isDoctor) || (pacienteId && !authCtx.isDoctor)) {
      //! Se despliegan los resultados y los guarda en la base de datos
      sendResultsHandler();
    }

    dispatch(pruebaActions.resetInformation());

    navigate("/home");
  };

  return (
    <Fragment>
      {!isLoaded && (
        <center>
          <LoadingSpinner />
        </center>
      )}
      {/*  Poner nombre de paciente si es que lo tenemos*/}

      {!resultados && (
        <center>
          <Unity
            style={{ width: "1133px", height: "714px" }}
            unityContext={unityContext}
          />

          {/* <button onClick={() => dispatch(pruebaActions.resetInformation())}>
            Cancelar
          </button> */}
        </center>
      )}

      {resultados && (
        <Fragment>
          <BackButton />
          <div className="flex gap-20 justify-center place-self-center">
            <div className="flex-grow">
              <Resultados resultados={resultados} />
            </div>

            {!pacienteId && authCtx.isDoctor && (
              <div className="flex-grow-0">
                <ListaPacientes />
              </div>
            )}
            {}
          </div>

          {((pacienteId && !authCtx.isDoctor) ||
            (pacienteId && authCtx.isDoctor) ||
            (!pacienteId && authCtx.isDoctor)) && (
            <div className="flex gap-20 mt-5 ml-3">
              {!comentarios && (
                <Comentarios comentarioHandler={comentarioHandler} />
              )}

              <button
                className="bg-green-700 hover:bg-green-400 text-white font-bold p-8  w-full h-1/2 border-none text-xl rounded-3xl  self-center"
                onClick={doneWithPruebaHandler}
              >
                Terminar
              </button>
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
}

export default MiniMental;
