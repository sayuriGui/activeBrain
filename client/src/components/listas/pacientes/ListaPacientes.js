import React, { useEffect, useState, useContext } from "react";

import PacienteItem from "./PacienteItem";
// import { pacientesActions } from "../../store/Pacientes/pacientes-slice";
import { useSelector, useDispatch } from "react-redux";
import { fetchPacientes } from "../../../store/Pacientes/pacientes-actions";

import styles from "../Lista.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faX } from "@fortawesome/free-solid-svg-icons";
import AddPacienteModal from "./AddPacienteModal";
import AuthContext from "../../../store/Auth/auth-context";

function ListaPacientes() {
  const pacientes = useSelector((store) => store.pacientes.list);
  const dispatch = useDispatch();
  const [pacientesFiltrados, setPacientesFiltrados] = useState([]);
  const [enteredSearch, setEnteredSearch] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    dispatch(fetchPacientes());
  }, [dispatch]);

  const handleFilter = (event) => {
    setIsTouched(true);
    setEnteredSearch(event.target.value);
    const filter = pacientes.filter((paciente) => {
      return paciente.fullName
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });

    if (event.target.value === "") {
      setPacientesFiltrados(pacientes);
    } else {
      setPacientesFiltrados(filter);
    }
  };

  const resetInput = () => {
    setPacientesFiltrados([]);
    setEnteredSearch("");
    setIsTouched(false);
  };

  return (
    <div>
      <div className="flex justify-center mt-10 ">
        {authCtx.isDoctor && <AddPacienteModal />}
      </div>
      <div className={styles.search}>
        <div className={styles.searchInputs}>
          <input
            onChange={handleFilter}
            value={enteredSearch}
            placeholder="Buscar Paciente..."
            type="text"
          />

          <div className={styles.searchIcon}>
            {enteredSearch === "" && pacientesFiltrados.length === 0 ? (
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            ) : (
              <FontAwesomeIcon
                onClick={resetInput}
                className="hover:cursor-pointer"
                icon={faX}
              />
            )}
          </div>
        </div>

        {pacientes.length > 0 && (
          <div className={styles.dataResult}>
            {!isTouched &&
              pacientes
                .slice(0, 15)
                .map((paciente) => (
                  <PacienteItem
                    key={paciente.uuid}
                    id={paciente.uuid}
                    nombre={paciente.fullName}
                    edad={paciente.edad}
                    sexo={paciente.sexo}
                    escolaridad={paciente.escolaridad}
                    evaluador={paciente.uuidEvaluador}
                  />
                ))}

            {isTouched &&
              pacientesFiltrados
                .slice(0, 15)
                .map((paciente) => (
                  <PacienteItem
                    key={paciente.uuid}
                    id={paciente.uuid}
                    nombre={paciente.fullName}
                    edad={paciente.edad}
                    sexo={paciente.sexo}
                    escolaridad={paciente.escolaridad}
                    evaluador={paciente.uuidEvaluador}
                  />
                ))}
          </div>
        )}

        {pacientes.length === 0 && (
          <center>
            <h3>Aun no tienes pacientes</h3>
          </center>
        )}
      </div>
    </div>
  );
}

export default ListaPacientes;
