import React, { FunctionComponent, useEffect, useState } from "react";
import { SETTINGS_PAGE_TEXTS } from "./constants";
import "./LoginSettingsForm.css";
import { handleInput } from "../../utils/inputHandle";
import {
  IonButton,
  IonItem,
  IonLabel,
  IonInput,
  IonGrid,
  IonRow,
  IonCol,
  IonLoading
} from "@ionic/react";
import { ILoginSettings } from "../../utils/declarations";

interface OnButtonClickEventFunction extends Function {
  (body: ILoginSettings): void;
}

interface LoginSettingsFormProps {
  history?: History;
  initialServerAddress?: string;
  initialDatabase?: string;
  initialUsername?: string;
  onClickSave: OnButtonClickEventFunction;
  editMode?: boolean;
  isLoadingGlobal?: boolean;
  loadingMessage?: string;
}

const LoginSettingsForm: FunctionComponent<LoginSettingsFormProps> = ({
  initialServerAddress = "",
  initialDatabase = "",
  initialUsername = "",
  onClickSave,
  editMode,
  isLoadingGlobal = false,
  loadingMessage = ""
}) => {
  const [serverAddress, setServerAddress] = useState(initialServerAddress);
  const [database, setDatabase] = useState(initialDatabase);
  const [username, setUsername] = useState(initialUsername);
  const [editEnable, setEditEnable] = useState(editMode);

  useEffect(() => {
    setServerAddress(initialServerAddress);
  }, [initialServerAddress]);

  useEffect(() => {
    setDatabase(initialDatabase);
  }, [initialDatabase]);

  useEffect(() => {
    setUsername(initialUsername);
  }, [initialUsername]);

  useEffect(() => {
    setEditEnable(editMode);
  }, [editMode]);

  const saveData = (event: any) => {
    event.preventDefault();
    onClickSave(getFormData());
  };

  const getFormData = () => {
    return {
      serverAddress,
      database,
      username
    };
  };

  const hasSettings = (settings: ILoginSettings) => {
    return settings.serverAddress && settings.database && settings.username;
  };

  return (
    <IonGrid>
      <IonRow>
        {isLoadingGlobal ? (
          <IonLoading isOpen={isLoadingGlobal} message={loadingMessage} />
        ) : (
          <IonCol sizeXs="10" offsetXs="1" sizeMd="4" offsetMd="4">
            <IonItem className={`settings-input`}>
              <IonLabel position="floating">{SETTINGS_PAGE_TEXTS.URL}</IonLabel>
              <IonInput
                name="serverAddress"
                value={serverAddress}
                onIonChange={handleInput(setServerAddress)}
                autofocus={true}
                disabled={editEnable}
                type="url"
                inputmode="url"
              />
            </IonItem>
            <IonItem className={`settings-input`}>
              <IonLabel position="floating">
                {SETTINGS_PAGE_TEXTS.DATABASE}
              </IonLabel>
              <IonInput
                name="database"
                value={database}
                onIonChange={handleInput(setDatabase)}
                disabled={editEnable}
                inputmode="text"
                type="text"
              />
            </IonItem>
            <IonItem className={`settings-input`}>
              <IonLabel position="floating">
                {SETTINGS_PAGE_TEXTS.USERNAME}
              </IonLabel>
              <IonInput
                name="username"
                value={username}
                onIonChange={handleInput(setUsername)}
                disabled={editEnable}
                inputmode="text"
                type="text"
              />
            </IonItem>
            <IonButton
              color="secondary"
              className="settings-button"
              onClick={saveData}
              disabled={editMode || !hasSettings(getFormData())}
            >
              {SETTINGS_PAGE_TEXTS.SAVE_BUTTON}
            </IonButton>
          </IonCol>
        )}
      </IonRow>
    </IonGrid>
  );
};

export default LoginSettingsForm;
