import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Card from "../../UI/Card";
import { faFileLines } from "@fortawesome/free-solid-svg-icons";

function EvaluadorItem(props) {
  return (
    <li className="list-none">
      <section className="text-sm text-black no-underline">
        <Card>
          <div className="flex justify-evenly content-center flex-1 ">
            <div className="flex w-20 relative rounded-xl">
              <img
                src="/assets/img/user.jpeg"
                alt=""
                className="rounded-xl absolute inset-0 w-full h-full object-cover"
              />
            </div>

            <div>
              <p className="font-bold">{props.nombre}</p>
              <p>Contacto: {props.email}</p>
            </div>
          </div>
        </Card>
      </section>
    </li>
  );
}

export default EvaluadorItem;
