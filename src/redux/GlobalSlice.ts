import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import i18n from "../i18n";

type applyOnlineType = {
  enableNextButton: boolean;
  language: string;
};

const initialState: applyOnlineType = {
  enableNextButton: true,
  language: "en",
};

const onlineApplication = createSlice({
  name: "Global",
  initialState,
  reducers: {
    enableStepperNextButton(state, action: PayloadAction<boolean>) {
      state.enableNextButton = action.payload;
    },
    setLanguage(state, action: PayloadAction<string>) {
      state.language = action.payload;
      i18n.changeLanguage(action.payload);
    },
  },
});

export const { enableStepperNextButton, setLanguage } =
  onlineApplication.actions;
export default onlineApplication.reducer;
