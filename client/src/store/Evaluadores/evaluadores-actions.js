import { uiActions } from "../UI/ui-slice";
import { evaluadoresActions } from "./evaluadores-slice";

export const fetchEvaluadores = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    const uuid = localStorage.getItem("uuid");
    const isDoctor = JSON.parse(localStorage.getItem("isDoctor"));

    if (token === null || uuid === null || !isDoctor) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sesión Inválida",
        })
      );
    }

    const fetchData = async () => {
      dispatch(
        uiActions.showNotification({
          status: "pending",
          title: "Cargando...",
          message: "Obteniendo datos de evaluadoress.",
        })
      );

      const response = await fetch(`/api/evaluadores`, {
        method: "GET",
        headers: {
          "x-access-token": token,
        },
      });

      if (!response.ok) {
        throw new Error("Could not fetch evaluator!");
      }

      const data = await response.json();

      return data;
    };

    try {
      const evaluadores = await fetchData();

      dispatch(evaluadoresActions.loadEvaluadores(evaluadores || []));
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "¡Exito!",
          message: "Se cargaron los datos de los evaluadores",
        })
      );

      setTimeout(() => {
        dispatch(uiActions.removeNotification());
      }, 5000);

      // TODO
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Fetching evaluator data failed!",
        })
      );
    }
  };
};
