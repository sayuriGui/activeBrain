import { createSlice } from "@reduxjs/toolkit";

const evaluadoresSlice = createSlice({
  name: "evaluadores",
  initialState: {
    //? uuidDoctor: null,
    list: [],
    changed: false,
  },
  reducers: {
    loadEvaluadores(state, action) {
      state.list = action.payload;
      state.changed = false;
    },
  },
});

export const evaluadoresActions = evaluadoresSlice.actions;

export default evaluadoresSlice;
