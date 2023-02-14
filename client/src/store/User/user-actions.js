import { uiActions } from "../UI/ui-slice";
import { userActions } from "./user-slice";

export const fetchUserData = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    const uuid = localStorage.getItem("uuid");

    if (token === null || uuid === null) {
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
      const response = await fetch(`/api/user/${uuid}`, {
        method: "GET",
        headers: {
          "x-access-token": token,
        },
      });

      if (!response.ok) {
        throw new Error("Could not fetch user data!");
      }

      const data = await response.json();

      return data;
    };

    try {
      const userData = await fetchData();
      dispatch(userActions.setUserInfo(userData));
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Fetching user data failed!",
        })
      );
    }
  };
};
