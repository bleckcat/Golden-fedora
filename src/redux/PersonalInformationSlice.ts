import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import PersonalInformationType from "../@types/PersonalInformation"

const initialState: PersonalInformationType & {
  errors: { [key: string]: boolean }
} = {
  picture: null,
  fullName: "",
  phoneNumber: "",
  dateOfBirth: "",
  sex: "",
  email: "",
  address: "",
  height: 0,
  weight: 0,
  hasHealthProblems: false,
  healthProblems: [],
  hasTattooOrPiercing: false,
  manequimSize: "",
  newHealthProblem: "",
  errors: {},
}

const personalInformationSlice = createSlice({
  name: "personalInformation",
  initialState,
  reducers: {
    handleChangePersonalInfo(
      state: any,
      action: PayloadAction<{ name: string; value: string | boolean }>
    ) {
      const { name, value } = action.payload
      state[name] = value
    },
    setPicture(state, action: PayloadAction<string | null>) {
      state.picture = action.payload
    },
    addHealthProblem(state, action: PayloadAction<string>) {
      state.healthProblems.push(action.payload)
    },
    removeHealthProblem(state, action: PayloadAction<number>) {
      state.healthProblems.splice(action.payload, 1)
    },
    setErrors(state, action: PayloadAction<{ [key: string]: boolean }>) {
      state.errors = action.payload
    },
  },
})

export const {
  handleChangePersonalInfo,
  setPicture,
  addHealthProblem,
  removeHealthProblem,
  setErrors,
} = personalInformationSlice.actions

export default personalInformationSlice.reducer
