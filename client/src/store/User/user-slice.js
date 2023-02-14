import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    uuid: "",
    fullName: "",
    nombre: "",
    apellidoP: "",
    apellidoM: "",
    sexo: "",
    Doctor: null,
  },
  reducers: {
    setUserInfo(state, action) {
      state.uuid = action.payload.uuid;
      state.fullName = action.payload.fullName;
      state.nombre = action.payload.nombre;
      state.apellidoP = action.payload.apellidoP;
      state.apellidoM = action.payload.apellidoM;
      state.sexo = action.payload.sexo;
      state.Doctor = action.payload.Doctor;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;
