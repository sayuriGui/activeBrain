import React from "react";

import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { pruebaActions } from "../store/Prueba/prueba-slice";

function BackButton() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const backHandler = () => {
    dispatch(pruebaActions.resetInformation());
    navigate(-1);
  };

  return (
    <button
      className="bg-green-700 hover:bg-green-400 text-white font-bold py-4 px-8 rounded-full border-none text-xl"
      onClick={backHandler}
    >
      <FontAwesomeIcon icon={faArrowLeft} />
    </button>
  );
}

export default BackButton;
