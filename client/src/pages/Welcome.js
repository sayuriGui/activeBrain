import React, { Fragment } from "react";
import Card from "../components/UI/Card";

function Welcome() {
  return (
    <Fragment>
      <h1 className="font-sans">Bienvenido a ActiveBrain</h1>
      <section className="relative block" style={{ height: "370px" }}>
        <div
          className="absolute top-0 w-full h-full  bg-cover round-xl"
          style={{
            backgroundImage:
              "url('https://igurco.imq.es/estaticoswemdel/contenidos/igurco/servicios/02_04_t-valoracion-geriatrica-integral_servicios_imq-igurco.jpg')",
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
      <section className="relative py-5 bg-orange-50">
        <div className="container mx-auto px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 rounded-lg -mt-64">
            <Card>
              <section>
                <h2 className="font-sans">¿Qué es ActiveBrain?</h2>
                <p className="text-justify font-sans">
                  Es un proyecto interactivo y eficiente, el cual se utiliza
                  para realizar un examen mini-mental. El examen mini-mental es
                  una prueba utilizada para evaluar el deterioro cognitivo y la
                  demencia. La prueba la realizará un médico o evaluador, con el
                  fin de mantener un registro, controlar el desempeño, evaluar
                  las capacidades cognitivas y analizar los resultados de sus
                  distintos pacientes.
                </p>
              </section>
              <section>
                <h2 className="font-sans">La importancia de la geriatria</h2>
                <p className="text-justify font-sans">
                  La geriatría es una especialidad médica, la cual se encarga
                  del estudio, prevención y tratamiento de las enfermedades
                  presentadas en los adultos mayores. El principal objetivo de
                  la geriatría es alcanzar el máximo nivel de autonomía e
                  independencia de un adulto mayor, esto se logra a través de
                  atención individualizada de calidad. Una atención de calidad
                  promueve la autonomía, el autocuidado, evita situaciones de
                  riesgo y busca una mejora continua, lo que permite una mejor
                  calidad de vida para los adultos mayores que son tratados.
                </p>
              </section>
            </Card>
          </div>
        </div>
      </section>
    </Fragment>
  );
}

export default Welcome;
