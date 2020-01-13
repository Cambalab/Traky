import React, { FunctionComponent, useState, useContext } from "react";
import {SETTINGS_PAGE_TEXTS} from "./constants";
import "./SettingForm.css";
import { AppContext } from "../../store/Store";
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
  useIonViewDidEnter
} from '@ionic/react';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

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

  const { dispatch } = useContext(AppContext);
  const [serverAddress, setServerAddress] = useState(initialServerAddress);
  const [key, setKey] = useState(initialKey);
  const [database, setDatabase] = useState(initialDatabase);

  useIonViewDidEnter(async() => {
    const { value } = await Storage.get({key: "tryton-settings"})
    let settings
    if(value) {
      settings = JSON.parse(value)
      setServerAddress(settings.serverAddress);
      setDatabase(settings.database);
      setKey(settings.key)
      dispatch({
        type: "SET_SETTINGS",
        payload: settings
      })
    }
  })

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
                <IonLabel position="floating">{SETTINGS_PAGE_TEXTS.KEY}</IonLabel>
                <IonInput
                  name="key"
                  value={key}
                  onIonChange={handleInput(setKey)}
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
}

export default SettingForm;
