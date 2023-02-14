import { createSlice } from "@reduxjs/toolkit";

const pruebaSlice = createSlice({
  name: "prueba",
  initialState: {
    isAplicandoPrueba: false,
    paciente: {},
  },
  reducers: {
    toggleIsAplicandoPrueba(state) {
      state.isAplicandoPrueba = !state.isAplicandoPrueba;
    },
    addPaciente(state, action) {
      state.paciente = action.payload; // pacienteuuid
    },

    resetInformation(state) {
      state.isAplicandoPrueba = false;
      state.paciente = {};
    },

    setEscolaridad(state, action) {
      state.paciente.escolaridad = parseInt(action.payload);
    },

    // loadEvaluadores(state, action) {
    //   state.list = action.payload;
    //   state.changed = false;
    // },
  },
});

export const pruebaActions = pruebaSlice.actions;

export default pruebaSlice;
