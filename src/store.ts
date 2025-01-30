import { combineReducers, configureStore } from "@reduxjs/toolkit";
import globalReducer from "./redux/GlobalSlice";
import personalInformationReducer from "./redux/PersonalInformationSlice";

const rootReducer = combineReducers({
  global: globalReducer,
  personalInformation: personalInformationReducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore(
    {
      reducer: rootReducer,
      preloadedState,
    },
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
