import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./User/user-slice";
import uiSlice from "./UI/ui-slice";
import pacientesSlice from "./Pacientes/pacientes-slice";
import evaluadoresSlice from "./Evaluadores/evaluadores-slice";
import pruebaSlice from "./Prueba/prueba-slice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    ui: uiSlice.reducer,
    pacientes: pacientesSlice.reducer,
    evaluadores: evaluadoresSlice.reducer,
    prueba: pruebaSlice.reducer,
  },
});

export default store;
