import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LegalInformationState {
  maritalStatus: string;
  spouseName: string;
  spouseBirthDate: string;
  childrenCount: string;
}

const initialState: LegalInformationState = {
  maritalStatus: "",
  spouseName: "",
  spouseBirthDate: "",
  childrenCount: "",
};

const legalInformationSlice = createSlice({
  name: "legalInformation",
  initialState,
  reducers: {
    setMaritalStatus(state, action: PayloadAction<string>) {
      state.maritalStatus = action.payload;
    },
    setSpouseName(state, action: PayloadAction<string>) {
      state.spouseName = action.payload;
    },
    setSpouseBirthDate(state, action: PayloadAction<string>) {
      state.spouseBirthDate = action.payload;
    },
    setChildrenCount(state, action: PayloadAction<string>) {
      state.childrenCount = action.payload;
    },
  },
});

export const {
  setMaritalStatus,
  setSpouseName,
  setSpouseBirthDate,
  setChildrenCount,
} = legalInformationSlice.actions;

export default legalInformationSlice.reducer;
