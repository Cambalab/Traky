import React, { FunctionComponent, useState, useContext } from "react";
import { AppContext } from "../../store/Store";
import { History } from "history";
import LoginSettingsForm from "../../components/LoginSettingsForm/LoginSettingsForm";
import "./LoginSettingsPage.css";
import {
  IonPage,
  IonContent,
  IonLoading,
  useIonViewDidEnter,
  IonImg,
  IonGrid,
  IonCol,
  IonRow
} from "@ionic/react";

import {
  KEY_INSTRUCTIONS_URL_CONFIG,
  GENERATE_KEY_MESSAGE,
  GET_STORAGE_KEY,
  FETCHING_SETTINGS
} from "../../utils/constants";
import { getUserAppKey } from "../../utils/api";
import { ILoginSettings } from "../../utils/declarations";
import {
  getIsFirstTime,
  getStoredKey,
  getStoredSettings,
  storeIsFirstTime,
  storeKey,
  storeSettings
} from "../../utils/utils";
import {
  selectIsLoadingSettings,
  selectSettings
} from "../../store/selectors/settings";
import {
  createFetchSettingsErrorAction,
  createFetchSettingsStartAction,
  createFetchSettingsSuccessfulAction,
  createSaveSettingsErrorAction,
  createSaveSettingsStartAction,
  createSaveSettingsSuccessfulAction
} from "../../store/actions/settings";
import {
  createFetchKeyErrorAction,
  createFetchKeyStartAction,
  createFetchKeySuccessfulAction,
  createSaveKeySuccessfulAction
} from "../../store/actions/key";
import { selectIsLoadingKey } from "../../store/selectors/key";

interface LoginSettingsPageProps {
  history: History;
  initialShowLoading?: boolean;
  initialIsFetchingSettingsFromStorage?: boolean;
}

const IMAGE_URL = "/assets/icon/favicon.png";

const hasSettings = (settings: ILoginSettings) => {
  return settings.serverAddress && settings.database;
};

const LoginSettingsPage: FunctionComponent<LoginSettingsPageProps> = ({
  history
}) => {
  const { state, dispatch } = useContext(AppContext);
  const settings = selectSettings(state);
  const isLoadingSettings = selectIsLoadingSettings(state);
  const isLoadingKey = selectIsLoadingKey(state);
  const [
    isFetchingSettingsFromStorage,
    setIsFetchingSettingsFromStorage
  ] = useState(isLoadingSettings);
  // const [isFetchingKeyFromStorage, setIsFetchingKeyFromStorage] = useState(isLoadingKey);

  // useEffect(() => {
  //   setIsFetchingSettingsFromStorage(isLoadingSettings);
  // }, [isLoadingSettings]);
  // useEffect(() => {
  //   setIsFetchingKeyFromStorage(isLoadingKey);
  // }, [isLoadingKey]);

  const onClickSave = async (body: ILoginSettings) => {
    const onSuccess = async (generatedKey: string) => {
      await storeSettings(body);
      await storeKey(generatedKey);
      await storeIsFirstTime(true);
      dispatch(createSaveSettingsSuccessfulAction(body));
      dispatch(createSaveKeySuccessfulAction(generatedKey));
      history.push(KEY_INSTRUCTIONS_URL_CONFIG.path);
    };

    const onError = async () => {
      dispatch(createSaveSettingsErrorAction());
    };

    dispatch(createSaveSettingsStartAction());
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
      const isFirstTime = await getIsFirstTime();

      if (!isFirstTime) {
        if (!hasSettings(settings)) {
          setIsFetchingSettingsFromStorage(true);
          dispatch(createFetchSettingsStartAction());
          const fetchedSettings = await getStoredSettings();
          setIsFetchingSettingsFromStorage(false);
          if (fetchedSettings) {
            dispatch(createFetchSettingsSuccessfulAction(fetchedSettings));
            dispatch(createFetchKeyStartAction());
            const key = await getStoredKey();
            if (key) {
              dispatch(createFetchKeySuccessfulAction(key));
              history.push(KEY_INSTRUCTIONS_URL_CONFIG.path);
            } else {
              // if is not the first time trying to use the key or has never pressed the generate show error
              dispatch(createFetchKeyErrorAction());
            }
          } else {
            // turn - off notifications
            dispatch(createFetchSettingsErrorAction());
          }
        }
      }
    };

    fetchSettings();
  });

  return (
    <IonPage>
      <IonContent color="tertiary">
        <IonGrid>
          <IonRow>
            <IonCol sizeXs="10" offsetXs="1" sizeMd="4" offsetMd="4">
              <IonImg className="settings-img" src={IMAGE_URL} />
            </IonCol>
          </IonRow>
          {isFetchingSettingsFromStorage ? (
            <IonLoading
              isOpen={isFetchingSettingsFromStorage}
              message={
                isFetchingSettingsFromStorage
                  ? FETCHING_SETTINGS
                  : GENERATE_KEY_MESSAGE
              }
              duration={1000}
            />
          ) : (
            isLoadingKey && (
              <IonLoading
                isOpen={isLoadingKey}
                message={GET_STORAGE_KEY}
                duration={1000}
              />
            )
          )}
          <LoginSettingsForm
            onClickSave={onClickSave}
            initialServerAddress={settings.serverAddress}
            initialDatabase={settings.database}
            initialUsername={settings.username}
          />
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default LoginSettingsPage;
