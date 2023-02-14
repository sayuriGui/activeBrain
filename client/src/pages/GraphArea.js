import React from "react";
import ReactDOM from "react-dom";
import AnyChart from "anychart-react";
import series from "../components/listas/pacientes/dataEvalu.json";

function graph() {
  const complexSettings = {
    width: 800,
    height: 600,
    type: "radar",
    palette: ["black", "#0091EA", "Green"],
    area: series,
    title: "Minimental por area",

    yScale: {
      minimum: 0,
      maximum: 10,
    },
    legend: {
      items: [
        {
          index: 0,
          text: "hola",
          iconType: "circle",
          iconStroke: "2 #F44336",
          iconFill: "#0091EA",
        },
        { index: 1, text: "Adios" },
      ],
      background: "lightgreen 1.4",
      padding: 1,
    },

    lineMarker: {
      value: 4.5,
    },
  };
  return ReactDOM.render(
    <AnyChart {...complexSettings} />,
    document.getElementById("root")
  );
}

export default graph;
