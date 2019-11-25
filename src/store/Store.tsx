import React, { createContext, useReducer, useContext } from "react";
import { IContext, OverviewState, Action } from "../utils/declarations";

const AppContext = createContext<IContext>({} as IContext);

function useAppContext() {
  return useContext(AppContext);
}

const initialState = {
  loggedHours: []
};

function reducer(state: OverviewState, action: Action): OverviewState {
  switch (action.type) {
    case "UPDATE_LIST": {
      return { ...state, loggedHours: action.payload };
    }
    default:
      return state;
  }
}

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
