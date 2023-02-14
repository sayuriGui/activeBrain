import React, { Fragment, useEffect, useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AuthContext from "../store/Auth/auth-context";
import { useDispatch } from "react-redux";
import { uiActions } from "../store/UI/ui-slice";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import BackButton from "../components/BackButton";
import { pruebaActions } from "../store/Prueba/prueba-slice";
import PruebaList from "../components/listas/pruebas/PruebaList";

export default function Profile() {
  const params = useParams();
  const pacienteId = params.pacienteId;
  const authCtx = useContext(AuthContext);
  const dispatch = useDispatch();
  const [paciente, setPaciente] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getPatientData = async () => {
      dispatch(
        uiActions.showNotification({
          status: "pending",
          title: "Cargando...",
          message: "Obteniendo datos de paciente.",
        })
      );
      const response = await fetch(`/api/paciente/${pacienteId}`, {
        method: "GET",
        headers: {
          "x-access-token": authCtx.token,
        },
      });
      if (!response.ok) {
        throw new Error("Could not fetch patient data");
      }

      const data = await response.json();

      return data;
    };

    getPatientData()
      .then((data) => {
        setPaciente(data);
        dispatch(
          uiActions.showNotification({
            status: "success",
            title: "¡Exito!",
            message: "Se cargaron los datos del paciente",
          })
        );

        setTimeout(() => {
          dispatch(uiActions.removeNotification());
        }, 5000);
      })
      .catch((err) => {
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Error!",
            message: "Fetching patient data failed!",
          })
        );
      });
  }, [authCtx.token, dispatch, pacienteId]);

  const aplicarPruebaHandler = () => {
    dispatch(
      pruebaActions.addPaciente({
        uuid: paciente.uuid,
        escolaridad: paciente.escolaridad,
      })
    );
    navigate("/prueba-rapida");
    dispatch(pruebaActions.toggleIsAplicandoPrueba());
  };

  return (
    <Fragment>
      {!paciente && (
        <center>
          <LoadingSpinner />
        </center>
      )}
      {paciente && (
        <Fragment>
          <BackButton />
          <section className="relative block" style={{ height: "400px" }}>
            <div
              className="absolute top-0 w-full h-full bg-center bg-cover round-xl"
              style={{
                backgroundImage:
                  "url('https://889noticias.mx/wp-content/uploads/2020/03/AndrewLozovyi_Depositphotos.jpg')",
              }}
            >
              <span
                id="blackOverlay"
                className="w-full h-full absolute opacity-50 bg-black"
              ></span>
            </div>
            <div
              className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden "
              style={{ height: "70px" }}
            >
              <svg
                className="absolute bottom-0 overflow-hidden"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="text-gray-300 fill-current"
                  points="2560 0 2560 100 0 100"
                ></polygon>
              </svg>
            </div>
          </section>
          <section className="relative py-16 bg-orange-200">
            <div className="container mx-auto px-4">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                <div className="px-6">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                      <div className="relative">
                        <img
                          alt="..."
                          src="/assets/img/user.jpeg"
                          className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16"
                          style={{ maxWidth: "150px" }}
                        />
                      </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                      <div className="py-6 px-3 mt-32 sm:mt-0">
                        <button
                          className="bg-green-700 active:bg-green-400 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 cursor-pointer"
                          type="button"
                          style={{ transition: "all .15s ease" }}
                          onClick={aplicarPruebaHandler}
                        >
                          Aplicar Prueba
                        </button>
                      </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4 lg:order-1">
                      <div className="flex justify-center py-4 lg:pt-4 pt-8">
                        <div className="mr-4 p-3 text-center">
                          <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                            {paciente.edad}
                          </span>
                          <span className="text-sm text-gray-500">Edad</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center mt-8">
                    <h3 className="text-4xl font-semibold leading-normal mb-2 text-gray-800">
                      {paciente.nombre}
                    </h3>
                    <div className="text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold uppercase">
                      <i className="fas fa-map-marker-alt mr-2 text-lg text-gray-500"></i>{" "}
                      {`${paciente.apellidoP} ${paciente.apellidoM}`}
                    </div>
                    <div className="mb-2 text-gray-700 mt-10">
                      <i className="fas fa-briefcase mr-2 text-lg text-gray-500"></i>
                      Teléfono: {paciente.telefono}
                    </div>
                  </div>
                  <div className="mt-10 py-10 border-t border-pink-300 text-center">
                    <PruebaList pacienteId={paciente.uuid} />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
}
