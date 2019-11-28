import React, { createContext, useReducer, useContext } from "react";
import { IContext } from "../utils/declarations";
import { reducer } from "./reducer";

const AppContext = createContext<IContext>({} as IContext);

function useAppContext() {
  return useContext(AppContext);
}

const initialState = {
  loggedHours: [],
  isLoading: false,
  hasError: false
};

const AppContextProvider = (props: any) => {
  const fullInitialState = {
    ...initialState
  };

  const [state, dispatch] = useReducer(reducer, fullInitialState);
  const value = { state, dispatch };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

let AppContextConsumer = AppContext.Consumer;

export {
  AppContext,
  reducer,
  useAppContext,
  AppContextProvider,
  AppContextConsumer
};
