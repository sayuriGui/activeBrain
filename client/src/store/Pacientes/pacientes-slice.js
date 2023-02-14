import { createSlice } from "@reduxjs/toolkit";

const pacientesSlice = createSlice({
  name: "pacientes",
  initialState: {
    list: [],
    changed: false,
  },
  reducers: {
    addPaciente(state, action) {
      const newPaciente = action.payload;

      const existingPaciente = state.list.find(
        (paciente) => paciente.uuid === newPaciente.uuid
      );

      state.changed = true;

      if (!existingPaciente) {
        state.list.push(newPaciente);
      } else {
        existingPaciente.uuidEvaluador = newPaciente.uuidEvaluador;
      }
    },
    loadPacientes(state, action) {
      state.list = action.payload;
      state.changed = false;
    },
    setChanged(state) {
      state.changed = true;
    },
  },
});

export const pacientesActions = pacientesSlice.actions;

export default pacientesSlice;
