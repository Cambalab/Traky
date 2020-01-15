import React, {FunctionComponent, useEffect, useState} from "react";
import {SETTINGS_PAGE_TEXTS} from "./constants";
import "./LoginSettingsForm.css";
import {
  handleInput
} from "../../utils/inputHandle";
import {
  IonButton,
  IonItem,
  IonLabel,
  IonInput,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
} from '@ionic/react';
import {ILoginSettings} from "../../utils/declarations";

const IMAGE_URL = "/assets/icon/favicon.png";

interface OnButtonClickEventFunction extends Function {
  (body: ILoginSettings) : void
}

interface LoginSettingsFormProps {
  history? : History,
  initialServerAddress? : string,
  initialDatabase? : string,
  initialUsername? : string,
  onClickSave: OnButtonClickEventFunction
}

const LoginSettingsForm: FunctionComponent<LoginSettingsFormProps> = ({
  initialServerAddress = "",
  initialDatabase = "",
  initialUsername = "",
  onClickSave
}) => {
  const [serverAddress, setServerAddress] = useState(initialServerAddress);
  const [database, setDatabase] = useState(initialDatabase);
  const [username, setUsername] = useState(initialUsername);

  useEffect(() => {
    setServerAddress(initialServerAddress);
  }, [initialServerAddress]);

  useEffect(() => {
    setDatabase(initialDatabase);
  }, [initialDatabase]);

  useEffect(() => {
    setUsername(initialUsername);
  }, [initialUsername]);

  const saveData = (event: any) => {
    event.preventDefault();
    onClickSave(getFormData())
  };

  const getFormData = () => {
    return {
      serverAddress, database, username
    }
  };

  return (
    <IonGrid>
      <IonRow>
        <IonCol sizeXs="10" offsetXs="1" sizeMd="4" offsetMd="4">
          <IonImg className="settings-img" src={IMAGE_URL}/>
          <IonItem className={`settings-input`} >
            <IonLabel position="floating" >{SETTINGS_PAGE_TEXTS.URL}</IonLabel>
            <IonInput
              name="serverAddress"
              value={serverAddress}
              onIonChange={handleInput(setServerAddress)}
              autofocus={true}
            />
            </IonItem>
          <IonItem className={`settings-input`}>
            <IonLabel position="floating">{SETTINGS_PAGE_TEXTS.DATABASE}</IonLabel>
            <IonInput
              name="database"
              value={database}
              onIonChange={handleInput(setDatabase)}
            />
          </IonItem>
          <IonItem className={`settings-input`}>
            <IonLabel position="floating">{SETTINGS_PAGE_TEXTS.USERNAME}</IonLabel>
            <IonInput
              name="username"
              value={username}
              onIonChange={handleInput(setUsername)}
            />
          </IonItem>
          <IonButton
            color="secondary"
            className="settings-button"
            onClick={saveData}
          >{SETTINGS_PAGE_TEXTS.SAVE_BUTTON}</IonButton>
        </IonCol>
      </IonRow>
    </IonGrid>
  )
};

export default LoginSettingsForm;
