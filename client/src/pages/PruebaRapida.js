import React, { Fragment } from "react";
import Escolaridad from "../components/forms/Escolaridad";
import MiniMental from "../components/MiniMental";
import Card from "../components/UI/Card";
import { useDispatch, useSelector } from "react-redux";
import { pruebaActions } from "../store/Prueba/prueba-slice";
import Header from "../components/UI/Header";

function PruebaRapida() {
  const dispatch = useDispatch();

  const pruebaData = useSelector((store) => store.prueba);

  const escolaridadHandler = (escolaridad) => {
    dispatch(pruebaActions.setEscolaridad(escolaridad));
    dispatch(pruebaActions.toggleIsAplicandoPrueba());
  };

  return (
    <Fragment>
      {!pruebaData.paciente.escolaridad && (
        <Card>
          <Header text="Prueba Rapida" />
          <Escolaridad escolaridadHandler={escolaridadHandler} />
        </Card>
      )}

      {pruebaData.paciente.escolaridad && (
        <MiniMental
          escolaridad={pruebaData.paciente.escolaridad}
          pacienteId={pruebaData.paciente.uuid}
        />
      )}
    </Fragment>
  );
}

export default PruebaRapida;
