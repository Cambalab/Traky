import React, { createContext, useReducer, useContext } from "react";
import { IContext, INotificationOptions, ISettings } from "../utils/declarations";
import { reducer } from "./reducer";
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

const AppContext = createContext<IContext>({} as IContext);

function useAppContext() {
  return useContext(AppContext);
}

async function toCheckSettings() {
  const { value } = await Storage.get({key: "tryton-settings"});
  let settings: ISettings = { serverAddress: "", database: "", key: "" };
  if(value) {
    settings = JSON.parse(value);
    reducer(initialState, {type: "SET_SETTINGS", payload: settings});
  }
  return settings;
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
  settings: toCheckSettings().then((settings :ISettings) => settings),
  isSettings: false
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
