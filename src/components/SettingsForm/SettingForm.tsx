import React, { FunctionComponent, useState } from "react";
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
import {
  handleInput
} from "../../utils/inputHandle";
import {SETTINGS_PAGE_TEXTS} from "./constants";
import "./SettingForm.css";

const IMAGE_URL = "/assets/icon/favicon.png"

interface OnButtonClickEventFunction extends Function {
  (body: SettingForm) : void
}

interface SettingFormProps {
  history? : History,
  initialServerAddress? : string,
  initialDatabase? : string,
  initialKey? : string,
  onClickSave: OnButtonClickEventFunction
}

interface SettingForm {
    serverAddress : string,
    database: string,
    key : string
}

const SettingForm: FunctionComponent<SettingFormProps> = ({
  initialServerAddress = "",
  initialDatabase = "",
  initialKey = "",
  onClickSave
}) => {

    const [serverAddress, setServerAddress] = useState(initialServerAddress);
    const [key, setKey] = useState(initialKey);
    const [database, setDatabase] = useState(initialDatabase);

    const saveData = (event: any) => {
      event.preventDefault();
      onClickSave(getFormData())
    }

    const getFormData = () => {
      return {
        serverAddress: serverAddress,
        database: database,
        key: key
      }
    }

    return (
          <IonGrid>
            <IonRow>
              <IonCol sizeXs="10" offsetXs="1" sizeMd="4" offsetMd="4">
                <IonImg className="login-img" src={IMAGE_URL}/>
                <IonItem className={`login-input`} >
                  <IonLabel position="floating" >{SETTINGS_PAGE_TEXTS.URL}</IonLabel>
                  <IonInput
                    name="serverAddress"
                    inputmode="email"
                    value={serverAddress}
                    onIonChange={handleInput(setServerAddress)}
                    autofocus={true}
                  />
                  </IonItem>
                <IonItem className={`login-input`}>
                  <IonLabel position="floating">{SETTINGS_PAGE_TEXTS.DATABASE}</IonLabel>
                  <IonInput
                    name="database"
                    value={database}
                    onIonChange={handleInput(setDatabase)}
                  />
                </IonItem>
                <IonItem className={`login-input`}>
                  <IonLabel position="floating">{SETTINGS_PAGE_TEXTS.KEY}</IonLabel>
                  <IonInput
                    name="key"
                    value={key}
                    onIonChange={handleInput(setKey)}
                  />
                </IonItem>
                <IonButton
                  color="secondary"
                  className="login-button"
                  onClick={saveData}
                >{SETTINGS_PAGE_TEXTS.SAVE_BUTTON}</IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
    )
}

export default SettingForm;
