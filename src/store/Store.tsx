import React, { createContext, useReducer, useContext } from "react";
import { IContext, INotificationOptions } from "../utils/declarations";
import { reducer } from "./reducer";

const AppContext = createContext<IContext>({} as IContext);

function useAppContext() {
  return useContext(AppContext);
}

const initialNotification: INotificationOptions = {
  message: "",
  duration: 2000,
  showCloseButton: false,
  closeButtonText: "x",
  position: "bottom",
  color: "danger",
  mode: "md",
  header: ""
};

const initialState = {
  isLoged: false,
  user: { id: null, name: "" },
  loggedHours: [],
  isLoading: false,
  hasError: false,
  showNotification: false,
  notificationOptions: initialNotification,
  groups: [],
  localHistory: null
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
