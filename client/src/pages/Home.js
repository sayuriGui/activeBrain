import React, { Fragment, useEffect } from "react";
import ListaPacientes from "../components/listas/pacientes/ListaPacientes";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserData } from "../store/User/user-actions";

function Home() {
  // const authCtx = useContext(AuthContext);
  const userData = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  return (
    <Fragment>
      <h1>{`Bienvenido ${userData.fullName}`}</h1>

      <ListaPacientes />
    </Fragment>
  );
}

export default Home;
