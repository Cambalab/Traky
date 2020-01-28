import React, { FunctionComponent, useState, useContext } from "react";
import { AppContext } from "../../store/Store";
import { History } from "history";
import LoginSettingsForm from "../../components/LoginSettingsForm/LoginSettingsForm";
import "./EditSettingsPage.css";
import {
  IonPage,
  IonContent,
  IonLoading,
  IonGrid,
  IonRow,
  IonCol,
  IonToggle
} from "@ionic/react";

import {
  KEY_INSTRUCTIONS_URL_CONFIG,
  GET_STORAGE_KEY
} from "../../utils/constants";
import { getUserAppKey } from "../../utils/api";
import { ILoginSettings } from "../../utils/declarations";
import { storeKey, storeSettings } from "../../utils/utils";
import { selectSettings } from "../../store/selectors/settings";
import {
  createSaveSettingsErrorAction,
  createSaveSettingsStartAction,
  createSaveSettingsSuccessfulAction
} from "../../store/actions/settings";
import { createSaveKeySuccessfulAction } from "../../store/actions/key";
import { selectIsLoadingKey } from "../../store/selectors/key";

import { EDIT_SETTINGS_TEXT } from "./constants";

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
  const isLoadingKey = selectIsLoadingKey(state);
  const [isEditMode, setEditMode] = useState(true);

  const onClickSave = async (body: ILoginSettings) => {
    const onSuccess = async (generatedKey: string) => {
      await storeSettings(body);
      await storeKey(generatedKey);

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
              {isLoadingKey && (
                <IonLoading
                  isOpen={isLoadingKey}
                  message={GET_STORAGE_KEY}
                  duration={1000}
                />
              )}
            </IonCol>
            <LoginSettingsForm
              onClickSave={onClickSave}
              initialServerAddress={settings.serverAddress}
              initialDatabase={settings.database}
              initialUsername={settings.username}
              editMode={isEditMode}
            />
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default EditSettingsPage;
