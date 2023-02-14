import React from "react";
import AnyChart from "anychart-react";

function Graph({ MiniMental }) {
  const complexSettings = {
    width: 800,
    height: 600,
    type: "radar",
    palette: ["black", "#0091EA", "Green"],
    area: [
      { x: "Orientación", value: MiniMental.orientacion },
      { x: "Registro, memoria inmediata", value: MiniMental.memoriaInmediata },
      { x: "Atención y cálculo", value: MiniMental.atencionCalculo },
      { x: "Lenguaje", value: MiniMental.lenguaje },
      { x: "Memoria diferida", value: MiniMental.memoriaDiferida },
      { x: "Viso / espacial", value: MiniMental.visoEspacial },
      { x: "Memoria semántica", value: MiniMental.memoriaSemantica },
      { x: "Lenguaje y repetición", value: MiniMental.lenguajeRepeticion },
    ],
    title: "Minimental por area",

    yScale: {
      minimum: 0,
      maximum: Math.max(
        MiniMental.orientacion,
        MiniMental.memoriaInmediata,
        MiniMental.atencionCalculo,
        MiniMental.lenguaje,
        MiniMental.memoriaDiferida,
        MiniMental.visoEspacial,
        MiniMental.memoriaSemantica,
        MiniMental.lenguajeRepeticion
      ),
    },
    legend: {
      items: [
        {
          index: 0,
          text: "Minimental",
          iconType: "circle",
          iconStroke: "2 #F44336",
          iconFill: "#0091EA",
        },
        { index: 1, text: "Paciente" },
      ],
      background: "lightgreen 1.4",
      padding: 1,
    },

    lineMarker: {
      value: 4.5,
    },
  };
  return <AnyChart {...complexSettings} />;
}

export default Graph;
