import { uiActions } from "../UI/ui-slice";
import { pacientesActions } from "./pacientes-slice";

export const fetchPacientes = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    const uuid = localStorage.getItem("uuid");
    const isDoctor = JSON.parse(localStorage.getItem("isDoctor"));

    if (token === null || uuid === null || isDoctor === null) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sesión Inválida",
        })
      );
      //? maybe forzamos logout
    }

    const fetchData = async () => {
      dispatch(
        uiActions.showNotification({
          status: "pending",
          title: "Cargando...",
          message: "Obteniendo datos de pacientes.",
        })
      );

      const response = await fetch(
        isDoctor
          ? `/api/pacientes/${uuid}`
          : `/api/evaluador/${uuid}/pacientes`,
        {
          method: "GET",
          headers: {
            "x-access-token": token,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Could not fetch patients!");
      }

      const data = await response.json();

      return data;
    };

    try {
      const pacientes = await fetchData();

      dispatch(pacientesActions.loadPacientes(pacientes || []));
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "¡Exito!",
          message: "Se cargaron los datos de los pacientes",
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
          message: "Fetching patient data failed!",
        })
      );
    }
  };
};
