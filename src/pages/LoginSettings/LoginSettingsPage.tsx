import React, { FunctionComponent, useContext } from "react";
import { AppContext } from "../../store/Store";
import { History } from "history";
import LoginSettingsForm from "../../components/LoginSettingsForm/LoginSettingsForm";
import "./LoginSettingsPage.css";
import {
  IonPage,
  IonContent,
  useIonViewDidEnter,
  IonImg,
  IonGrid,
  IonCol,
  IonRow
} from "@ionic/react";

import {
  KEY_INSTRUCTIONS_URL_CONFIG,
  GENERATE_KEY_MESSAGE,
  GET_STORAGE_SETTINGS
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
import { selectSettings } from "../../store/selectors/settings";
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
  createSaveKeySuccessfulAction,
  createIsNotFirstTimeStateAction
} from "../../store/actions/key";

import {
  createLoadingModalAction,
  createHideLoadingModalAction
} from "../../store/actions/loadingModal";
import {
  selectIsLoadingModal,
  selectLoadingModalMessage
} from "../../store/selectors/loadingModal";

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

  const isLoading = selectIsLoadingModal(state);
  const loadingMessage = selectLoadingModalMessage(state);

  const STORAGE_MESSAGE = { message: GET_STORAGE_SETTINGS };
  const GENERATE_MESSAGE = { message: GENERATE_KEY_MESSAGE };

  const onClickSave = async (body: ILoginSettings) => {
    const onSuccess = async (generatedKey: string) => {
      await storeSettings(body);
      await storeKey(generatedKey);
      await storeIsFirstTime(true);
      dispatch(createSaveSettingsSuccessfulAction(body));
      dispatch(createSaveKeySuccessfulAction(generatedKey));
      history.push(KEY_INSTRUCTIONS_URL_CONFIG.path);

      //disparo acción para setear estado global de loading en false
      dispatch(createHideLoadingModalAction());
    };

    const onError = async () => {
      dispatch(createHideLoadingModalAction());
      dispatch(createSaveSettingsErrorAction());
    };

    //disparo accion para setear mensaje para loading y poner estado global en true
    dispatch(createLoadingModalAction(GENERATE_MESSAGE));
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
          dispatch(createLoadingModalAction(STORAGE_MESSAGE));

          dispatch(createFetchSettingsStartAction());
          const fetchedSettings = await getStoredSettings();
          dispatch(createIsNotFirstTimeStateAction());

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
          <LoginSettingsForm
            onClickSave={onClickSave}
            initialServerAddress={settings.serverAddress}
            initialDatabase={settings.database}
            initialUsername={settings.username}
            isLoadingGlobal={isLoading}
            loadingMessage={loadingMessage}
          />
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default LoginSettingsPage;
