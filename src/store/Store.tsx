import React, { createContext, useReducer, useContext } from "react";
import {
  IContext,
} from "../utils/declarations";
import {getInitialState, mainReducer, OverviewState} from "./reducer";

const AppContext = createContext<IContext>({} as IContext);

const useAppContext = () => useContext(AppContext);

const AppContextProvider = (props: any) => {
  const initialState: OverviewState = getInitialState();
  const [state, dispatch] = useReducer(mainReducer, initialState);
  const value = { state, dispatch };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

let AppContextConsumer = AppContext.Consumer;

export {
  AppContext,
  useAppContext,
  AppContextProvider,
  AppContextConsumer
};
