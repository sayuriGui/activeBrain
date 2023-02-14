import React, { useEffect, useContext, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { fetchEvaluadores } from "../../../store/Evaluadores/evaluadores-actions";

import Combobox from "react-widgets/Combobox";
import AuthContext from "../../../store/Auth/auth-context";
import { uiActions } from "../../../store/UI/ui-slice";
import { pacientesActions } from "../../../store/Pacientes/pacientes-slice";

function ListaEvaluadores({ currentEvaluador, paciente }) {
  const evaluadores = useSelector((store) => store.evaluadores.list);
  const dispatch = useDispatch();
  const authCtx = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [evaluador, setEvaluador] = useState(currentEvaluador);

  useEffect(() => {
    dispatch(fetchEvaluadores());
  }, [dispatch]);

  const addEvaluador = (evaluador) => {
    setIsLoading(true);
    fetch(`/api/paciente/${paciente}/${evaluador.uuid}`, {
      method: "POST",
      headers: {
        "x-access-token": authCtx.token,
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let error = "No pudo asignar el evaluador.";
            if (data.message) {
              error = data.message;
            }
            throw new Error(error);
          });
        }
      })
      .then((data) => {
        dispatch(
          uiActions.showNotification({
            status: "success",
            title: "¡Exito!",
            message: "Se asigno el evaluador correctamente.",
          })
        );
        setEvaluador(evaluador.uuid);
        dispatch(pacientesActions.addPaciente(data));
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
  };

  return (
    <Combobox
      autoSelectMatches
      hideEmptyPopup
      data={evaluadores}
      textField="email"
      dataKey={"uuid"}
      value={evaluador}
      busy={isLoading}
      onSelect={addEvaluador}
      onChange={(e) => setEvaluador(e.uuid)}
      renderListItem={({ item }) => (
        <span>
          <strong>{item.nombre}</strong>
          {" " + item.email}
        </span>
      )}
      placeholder="Asigna Evaluador"
      // onSelect={}
    />
  );
}

export default ListaEvaluadores;
