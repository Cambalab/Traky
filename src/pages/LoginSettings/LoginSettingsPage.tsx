import React, { FunctionComponent } from "react";
import {
  getStoredSettings,
  storeSettings,
  useAppContext
} from "../../store/Store";
import { History } from "history";
import LoginSettingsForm from "../../components/LoginSettingsForm/LoginSettingsForm";
import "./LoginSettingsPage.css";
import {
  IonPage,
  IonContent,
  useIonViewDidEnter
} from "@ionic/react";
import {createErrorLoginSettingsAction, createSaveLoginSettingsAction} from "./constants";
import {KEY_VALIDATION_URL_CONFIG} from "../../utils/constants";
import {getUserAppKey} from "../../utils/api";
import {ILoginSettings} from "../../utils/declarations";

interface LoginSettingsPageProps {
  history: History;
}

const LoginSettingsPage: FunctionComponent<LoginSettingsPageProps> = ({
  history
}) => {
  const { state, dispatch } = useAppContext();
  const { settings } = state;

  const onClickSave = async (body: ILoginSettings) => {

    const onSuccess = async (generatedKey: string) => {
      await storeSettings(body);
      dispatch(createSaveLoginSettingsAction(body, generatedKey));
      history.push(KEY_VALIDATION_URL_CONFIG.path);
    };

    const onError = async () => {
      dispatch(createErrorLoginSettingsAction());
    };

    getUserAppKey(body.username, body.serverAddress, body.database, onSuccess, onError);
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
        <LoginSettingsForm
          onClickSave={onClickSave}
          initialServerAddress={settings.serverAddress}
          initialDatabase={settings.database}
          initialUsername={settings.username}
        />
      </IonContent>
    </IonPage>
  );
};

export default LoginSettingsPage;
