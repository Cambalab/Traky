import React, { FunctionComponent, useState, useContext } from "react";
import { AppContext } from "../../store/Store";
import { History } from "history";
import LoginSettingsForm from "../../components/LoginSettingsForm/LoginSettingsForm";
import "./EditSettingsPage.css";
import {
  IonPage,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonToggle
} from "@ionic/react";

import {
  KEY_INSTRUCTIONS_URL_CONFIG,
  GENERATE_KEY_MESSAGE
} from "../../utils/constants";
import { getUserAppKey } from "../../utils/api";
import { ILoginSettings } from "../../utils/declarations";
import { storeKey, storeSettings, storeIsFirstTime } from "../../utils/utils";
import { selectSettings } from "../../store/selectors/settings";
import {
  createSaveSettingsErrorAction,
  createSaveSettingsStartAction,
  createSaveSettingsSuccessfulAction
} from "../../store/actions/settings";
import {
  createSaveKeySuccessfulAction,
  createIsNotFirstTimeStateAction
} from "../../store/actions/key";

import { EDIT_SETTINGS_TEXT } from "./constants";

import {
  createHideLoadingModalAction,
  createLoadingModalAction
} from "../../store/actions/loadingModal";
import {
  selectIsLoadingModal,
  selectLoadingModalMessage
} from "../../store/selectors/loadingModal";
import { createLogoutAction } from "../../store/actions/user";

interface EditSettingsPageProps {
  history: History;
  initialShowLoading?: boolean;
  initialIsFetchingSettingsFromStorage?: boolean;
}

const EditSettingsPage: FunctionComponent<EditSettingsPageProps> = ({
  history
}) => {
  const { state, dispatch } = useContext(AppContext);
  const settings = selectSettings(state);
  const isLoading = selectIsLoadingModal(state);
  const loadingMessage = selectLoadingModalMessage(state);
  const [isEditMode, setEditMode] = useState(true);

  const GENERATE_MESSAGE = { message: GENERATE_KEY_MESSAGE };

  const onClickSave = async (body: ILoginSettings) => {
    const onSuccess = async (generatedKey: string) => {
      await storeIsFirstTime(true);
      await storeSettings(body);
      await storeKey(generatedKey);

      dispatch(createLogoutAction());
      dispatch(createSaveSettingsSuccessfulAction(body));
      dispatch(createSaveKeySuccessfulAction(generatedKey));
      dispatch(createIsNotFirstTimeStateAction());

      history.push(KEY_INSTRUCTIONS_URL_CONFIG.path);
    };

    const onError = async () => {
      dispatch(createHideLoadingModalAction());
      dispatch(createSaveSettingsErrorAction());
    };
    dispatch(createLoadingModalAction(GENERATE_MESSAGE));
    dispatch(createSaveSettingsStartAction());
    getUserAppKey(
      body.username,
      body.serverAddress,
      body.database,
      onSuccess,
      onError
    );
    dispatch(createHideLoadingModalAction());
  };

  return (
    <IonPage>
      <IonContent color="tertiary">
        <IonGrid>
          <IonRow className="edit-settings__row">
            <IonCol
              className="edit-settings__col"
              sizeXs="10"
              offsetXs="1"
              sizeMd="8"
              offsetMd="2"
            >
              <h3 className="edit-settings__text">
                {EDIT_SETTINGS_TEXT.INFO_TEXT}
              </h3>
              <IonToggle
                color="primary"
                onIonChange={() => setEditMode(!isEditMode)}
              />
              {EDIT_SETTINGS_TEXT.TOGGLE}
            </IonCol>
            <LoginSettingsForm
              onClickSave={onClickSave}
              initialServerAddress={settings.serverAddress}
              initialDatabase={settings.database}
              initialUsername={settings.username}
              editMode={isEditMode}
              isLoadingGlobal={isLoading}
              loadingMessage={loadingMessage}
            />
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default EditSettingsPage;
