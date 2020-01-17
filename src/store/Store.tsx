import React, { createContext, useReducer, useContext } from "react";
import {
  IContext,
  INotificationOptions,
  ILoginSettings,
  IUser,
  OverviewState
} from "../utils/declarations";
import { reducer } from "./reducer";

const AppContext = createContext<IContext>({} as IContext);

const useAppContext = () => useContext(AppContext);

const initialSettings: ILoginSettings = {
  serverAddress: "",
  database: "",
  username: ""
};

const getInitialSettings = () => initialSettings;

const initialUser: IUser = {
  id: null,
  name: ""
};

const getInitialUser = () => initialUser;

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
const getInitialNotification = () => initialNotification;

const getInitialState = (): OverviewState => ({
  isLogged: false,
  user: getInitialUser(),
  loggedHours: [],
  isLoading: false,
  hasError: false,
  showNotification: false,
  notificationOptions: getInitialNotification(),
  groups: [],
  settings: getInitialSettings(),
  isSettings: false,
  key: "",
});

const AppContextProvider = (props: any) => {
  const initialState: OverviewState = getInitialState();
  const [state, dispatch] = useReducer(reducer, initialState);
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
