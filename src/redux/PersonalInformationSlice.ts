import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import PersonalInformationType from "../@types/PersonalInformation";

const initialState: PersonalInformationType = {
  picture: null,
  fullName: "",
  dateOfBirth: "",
  sex: "",
  height: 0,
  weight: 0,
  hasHealthProblems: "no",
  healthProblems: [],
  hasTattooOrPiercing: "no",
  manequimSize: "",
  newHealthProblem: "",
};

const personalInformationSlice = createSlice({
  name: "personalInformation",
  initialState,
  reducers: {
    setPicture(state, action: PayloadAction<string | null>) {
      state.picture = action.payload;
    },
    setNewHealthProblem(state, action: PayloadAction<string>) {
      state.newHealthProblem = action.payload;
    },
    setFullName(state, action: PayloadAction<string>) {
      state.fullName = action.payload;
    },
    setDateOfBirth(state, action: PayloadAction<string>) {
      state.dateOfBirth = action.payload;
    },
    setSex(state, action: PayloadAction<string>) {
      state.sex = action.payload;
    },
    setHeight(state, action: PayloadAction<number>) {
      state.height = action.payload;
    },
    setWeight(state, action: PayloadAction<number>) {
      state.weight = action.payload;
    },
    setHasHealthProblems(state, action: PayloadAction<string>) {
      state.hasHealthProblems = action.payload;
    },
    addHealthProblem(state, action: PayloadAction<string>) {
      state.healthProblems.push(action.payload);
    },
    removeHealthProblem(state, action: PayloadAction<number>) {
      state.healthProblems.splice(action.payload, 1);
    },
    setHasTattooOrPiercing(state, action: PayloadAction<string>) {
      state.hasTattooOrPiercing = action.payload;
    },
    setManequimSize(state, action: PayloadAction<string>) {
      state.manequimSize = action.payload;
    },
  },
});

export const {
  setPicture,
  setFullName,
  setDateOfBirth,
  setSex,
  setHeight,
  setWeight,
  setHasHealthProblems,
  addHealthProblem,
  removeHealthProblem,
  setHasTattooOrPiercing,
  setManequimSize,
  setNewHealthProblem,
} = personalInformationSlice.actions;

export default personalInformationSlice.reducer;
