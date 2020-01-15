import React, { FunctionComponent } from "react";
import { getStoredSettings, storeSettings, useAppContext } from "../../store/Store";
import { History } from "history";
import SettingForm from "../../components/SettingForm/SettingForm";
import "./SettingPage.css";
import {
  NOTIFICATION_MESSAGES,
  NOTIFICATION_TYPE,
  LOGS_LOGIN_URL_CONFIG,
  LOGS_LIST_URL_CONFIG
 } from "../../utils/constants";
import {
  IonPage,
  IonContent,
  useIonViewDidEnter
} from "@ionic/react";

interface SettingsPageProps {
  history: History
}

const SettingPage: FunctionComponent<SettingsPageProps> = ({ history }) => {
  const { state, dispatch } = useAppContext();
  const { settings } = state;

  const onClickSave = async (body: SettingForm) => {
    await storeSettings(body);
    dispatch({
      type: "SET_SETTINGS",
      payload: body
    });
    dispatch({
      type: 'NOTIFICATION',
      payload: {
        header: NOTIFICATION_MESSAGES.SAVE_SETTINGS_SUCCESS_HEADER,
        message: NOTIFICATION_MESSAGES.SAVE_SETTINGS_SUCCESS_BODY,
        color: NOTIFICATION_TYPE.SUCCESS
      }
    });
    dispatch({
      type: "SHOW_NOTIFICATION",
      payload: true
    });
    state.isLogged
      ? history.push(LOGS_LIST_URL_CONFIG.path)
      : history.push(LOGS_LOGIN_URL_CONFIG.path)
  };

  useIonViewDidEnter(() => {
    const fetchSettings = async () => {
      if (!settings.serverAddress || !settings.database) {
        const fetchedSettings = await getStoredSettings();

        if (fetchedSettings) {
          dispatch({ type: "SET_SETTINGS", payload: fetchedSettings });
        }
      }
    };

    fetchSettings();
  });

  return (
    <IonPage>
      <IonContent color="tertiary">
        <SettingForm
            onClickSave={onClickSave}
            initialServerAddress={settings.serverAddress}
            initialDatabase={settings.database}
            initialKey={settings.key}
        />
      </IonContent>
    </IonPage>
  )
};

export default SettingPage;
