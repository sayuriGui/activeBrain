import React, { useEffect, useState, useContext } from "react";

import PruebaItem from "./PruebaItem";
import { useDispatch } from "react-redux";

import styles from "../Lista.module.css";
import AuthContext from "../../../store/Auth/auth-context";
import { uiActions } from "../../../store/UI/ui-slice";

function PruebaList({ pacienteId }) {
  // recibe paciente uuid por prop
  //   const pruebas = useSelector((store) => store.pacientes.list);
  const dispatch = useDispatch();
  const authCtx = useContext(AuthContext);
  const [pruebas, setPruebas] = useState([]);

  useEffect(() => {
    console.log("Fetching...");
    fetch(`/api/paciente/${pacienteId}/pruebas`, {
      method: "GET",
      headers: {
        "x-access-token": authCtx.token,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let error = "No pudo obtener resultados del paciente.";
            if (data.message) {
              error = data.message;
            }
            throw new Error(error);
          });
        }
      })
      .then((data) => {
        // console.log(data);
        setPruebas(data);
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
  }, [pacienteId, authCtx.token, dispatch]);

  return (
    <div>
      {pruebas.length > 0 && (
        <div className={styles.dataResult}>
          {pruebas.slice(0, 15).map((p) => (
            <PruebaItem
              key={p.id}
              fecha={p.fecha}
              MiniMental={p.MiniMental}
              uuidEvaluador={p.uuidEvaluador}
            />
          ))}
        </div>
      )}

      {pruebas.length === 0 && (
        <center>
          <h3>Aún no hay resultados de pruebas</h3>
        </center>
      )}
    </div>
  );
}

export default PruebaList;
