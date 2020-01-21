import React, { FunctionComponent, useState, useEffect } from "react";
import {
  useAppContext
} from "../../store/Store";
import { History } from "history";
import LoginSettingsForm from "../../components/LoginSettingsForm/LoginSettingsForm";
import "./LoginSettingsPage.css";
import { IonPage, IonContent, IonLoading, useIonViewDidEnter } from "@ionic/react";

import {
  createErrorLoginSettingsAction,
  createSaveLoginSettingsAction,
  createSetKeyAction
} from "./constants";
import { KEY_INSTRUCTIONS_URL_CONFIG, GENERATE_KEY_MESSAGE } from "../../utils/constants";
import { getUserAppKey } from "../../utils/api";
import { ILoginSettings } from "../../utils/declarations";
import {getStoredKey, getStoredSettings, storeKey, storeSettings} from "../../utils/utils";

interface LoginSettingsPageProps {
  history: History;
  initialShowLoading?: boolean
}

const LoginSettingsPage: FunctionComponent<LoginSettingsPageProps> = ({
  history,
  initialShowLoading = false
}) => {
  const { state, dispatch } = useAppContext();
  const { settings } = state;

  const [showLoading, setShowLoading] = useState(initialShowLoading);

  useEffect(() => {
    setShowLoading(initialShowLoading);
  }, [initialShowLoading]);

  const onClickSave = async (body: ILoginSettings) => {
    setShowLoading(true);
    const onSuccess = async (generatedKey: string) => {
      await storeSettings(body);
      await storeKey(generatedKey);
      dispatch(createSaveLoginSettingsAction(body, generatedKey));
      history.push(KEY_INSTRUCTIONS_URL_CONFIG.path);
    };

    const onError = async () => {
      dispatch(createErrorLoginSettingsAction());
    };

    getUserAppKey(
      body.username,
      body.serverAddress,
      body.database,
      onSuccess,
      onError
    );
  };

  useIonViewDidEnter(() => {
    const fetchSettings = async () => {
      if (!settings.serverAddress || !settings.database) {
        const fetchedSettings = await getStoredSettings();

        if (fetchedSettings) {
          const key = await getStoredKey();

          dispatch({ type: "SET_SETTINGS", payload: fetchedSettings });
          if (key) {
            dispatch(createSetKeyAction(key));
            history.push(KEY_INSTRUCTIONS_URL_CONFIG.path);
          }
        }
      }
    };

    fetchSettings();
  });

  return (
    <IonPage>
      <IonContent color="tertiary">
      {
        showLoading &&
        <IonLoading
        isOpen={showLoading}
        message={GENERATE_KEY_MESSAGE}
        duration={2500}
        onDidDismiss={() => setShowLoading(false)}
        />
      }
        <LoginSettingsForm
          onClickSave={onClickSave}
          initialServerAddress={settings.serverAddress}
          initialDatabase={settings.database}
          initialUsername={settings.username}
          showLoading={showLoading}
        />
      </IonContent>
    </IonPage>
  );
};

export default LoginSettingsPage;
