import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Card from "../../UI/Card";
import { faFileLines } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { pruebaActions } from "../../../store/Prueba/prueba-slice";
import { useNavigate } from "react-router-dom";
import ListaEvaluadores from "../evaluadores/ListaEvaluadores";
import { uiActions } from "../../../store/UI/ui-slice";
import AuthContext from "../../../store/Auth/auth-context";

function PacienteItem(props) {
  const dispatch = useDispatch();
  const pruebaData = useSelector((store) => store.prueba);
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  const aplicarPruebaHandler = () => {
    dispatch(
      pruebaActions.addPaciente({
        uuid: props.id,
        escolaridad: props.escolaridad,
      })
    );
    navigate("/prueba-rapida");
    dispatch(pruebaActions.toggleIsAplicandoPrueba());
  };

  const sendToUserProfile = () => {
    navigate(`/profile/${props.id}`);
  };

  const selectPaciente = () => {
    dispatch(
      uiActions.showNotification({
        status: "success",
        title: "Paciente Seleccionado",
        message: `La prueba se agregara al expediente de ${props.nombre}`,
      })
    );

    setTimeout(() => {
      dispatch(
        pruebaActions.addPaciente({
          uuid: props.id,
          escolaridad: props.escolaridad,
        })
      );
    }, 3000);
  };

  return (
    <Card>
      <li className="flex w-full gap-4 justify-evenly">
        <div
          className="flex-grow-[0] cursor-pointer"
          onClick={
            !pruebaData.isAplicandoPrueba ? sendToUserProfile : selectPaciente
          }
        >
          <img
            src={
              props.sexo === "H"
                ? "https://cdn-icons-png.flaticon.com/512/1320/1320912.png"
                : "https://cdn-icons-png.flaticon.com/512/2829/2829745.png"
            }
            alt={props.sexo}
            className="w-40"
          />
        </div>
        <div
          className="flex-grow-[0] cursor-pointer"
          onClick={
            !pruebaData.isAplicandoPrueba ? sendToUserProfile : selectPaciente
          }
        >
          <h2 className="font-bold">{props.nombre}</h2>
          <h3>{props.edad} años</h3>
        </div>
        {!pruebaData.isAplicandoPrueba && (
          <div className="flex-grow-[0]">
            <button
              onClick={aplicarPruebaHandler}
              to=""
              className="w-full no-underline self-auto bg-camogreen p-2 my-6 text-white rounded-xl hover:bg-copperred text-base font-bold"
            >
              <FontAwesomeIcon className="mr-3" icon={faFileLines} />
              Aplicar Prueba
            </button>

            {authCtx.isDoctor && (
              <ListaEvaluadores
                paciente={props.id}
                currentEvaluador={props.evaluador}
              />
            )}
          </div>
        )}
      </li>
    </Card>
  );
}

export default PacienteItem;
