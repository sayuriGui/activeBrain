import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../../store/Auth/auth-context";

import Card from "../../UI/Card";
import GraphModal from "../../UI/GraphModal";

function PruebaItem({ fecha, MiniMental, uuidEvaluador }) {
  const authCtx = useContext(AuthContext);
  const [evaluador, setEvaluador] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/user/${uuidEvaluador}`, {
        method: "GET",
        headers: {
          "x-access-token": authCtx.token,
        },
      });

      if (!response.ok) {
        throw new Error("Could not fetch user data!");
      }

      const data = await response.json();

      return data;
    };
    fetchData().then((data) => setEvaluador(data));
  }, [authCtx.token, uuidEvaluador]);

  return (
    <li className="list-none">
      <section className="text-sm text-black no-underline">
        <Card>
          <div className="flex flex-row justify-around">
            <div className="flex-ro w-26 h-full place-self-center">
              <h1>Fecha</h1>
              <p>{fecha}</p>
              <h1>Evaluador</h1>
              <p>{`${evaluador.nombre} ${evaluador.apellidoP}`}</p>
              <h1>Total</h1>
              <p>{MiniMental.total}</p>
            </div>
            <div className="flex-col w-36 h-full place-self-center">
              <p className="font-bold">Orientación</p>
              <p>{MiniMental.orientacion} / 10 pts</p>
              <p className="font-bold">Registro, memoria inmediata</p>
              <p>{MiniMental.memoriaInmediata} / 3 pts</p>
              <p className="font-bold">Atención y cálculo</p>
              <p>{MiniMental.atencionCalculo} / 5 pts</p>
              <p className="font-bold">Lenguaje</p>
              <p>{MiniMental.lenguaje} / 5 pts</p>
            </div>

            <div className="flex-col w-36 h-full place-self-center">
              <p className="font-bold text-sm">Memoria diferida</p>
              <p>{MiniMental.memoriaDiferida} / 3 pts</p>
              <p className="font-bold">Viso / espacial</p>
              <p>{MiniMental.visoEspacial} / 1 pts</p>
              <p className="font-bold">Memoria semántica</p>
              <p>{MiniMental.memoriaSemantica} / 2 pts</p>
              <p className="font-bold">Lenguaje y repetición</p>
              <p>{MiniMental.lenguajeRepeticion} / 1 pts</p>
            </div>

            <div className="flex flex-col justify-evenly">
              <GraphModal MiniMental={MiniMental} />
            </div>
          </div>
        </Card>
      </section>
    </li>
  );
}

export default PruebaItem;
