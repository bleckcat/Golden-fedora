import { combineReducers, configureStore } from "@reduxjs/toolkit";
import globalReducer from "./redux/GlobalSlice";
import personalInformationReducer from "./redux/PersonalInformationSlice";
import legalInformationReducer from "./redux/LegalInformationSlice";
import educationWork from "./redux/EducationWorkSlice";

const rootReducer = combineReducers({
  global: globalReducer,
  personalInformation: personalInformationReducer,
  legalInformation: legalInformationReducer,
  educationWork: educationWork,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore(
    {
      reducer: rootReducer,
      preloadedState,
    },
    // @ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
