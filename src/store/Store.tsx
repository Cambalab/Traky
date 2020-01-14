import React, { createContext, useReducer, useContext } from "react";
import { IContext, INotificationOptions, ISettings, IUser, OverviewState } from "../utils/declarations";
import { reducer } from "./reducer";
import { Plugins } from '@capacitor/core';
import { getStoringSettingsName } from "../utils/utils";
import SettingForm from "../components/SettingsForm/SettingForm";

const { Storage } = Plugins;

const AppContext = createContext<IContext>({} as IContext);

const useAppContext = () => (
  useContext(AppContext)
);

const initialSettings: ISettings = {
  serverAddress: "",
  database: "",
  key: ""
};

export const getStoredSettings = async (): Promise<ISettings | null> => {
  const storingSettingsName = getStoringSettingsName();
  const { value } = await Storage.get({ key: storingSettingsName });

  if(value) {
    return JSON.parse(value);
  }
  return null;
};

export const storeSettings = async (body: SettingForm) => {
    const storingSettingsName = getStoringSettingsName();
    await Storage.set({
        key: storingSettingsName,
        value: JSON.stringify({
            serverAddress: body.serverAddress,
            database: body.database,
            key: body.key
        })
    });
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
    isSettings: false
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
