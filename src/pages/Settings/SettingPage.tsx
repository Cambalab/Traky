import React, { FunctionComponent, useContext } from "react";
import { AppContext } from "../../store/Store";
import { History } from "history";
import SettingForm from "../../components/SettingsForm/SettingForm";
import "./SettingPage.css";
import {
  NOTIFICATION_MESSAGES,
  NOTIFICATION_TYPE,
  LOGS_LOGIN_URL_CONFIG
 } from "../../utils/constants";
import {
  IonPage,
  IonContent
} from "@ionic/react";
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

interface SettingsPageProps {
  history: History
}

const SettingPage: FunctionComponent<SettingsPageProps> = ({ history }) => {

  const { dispatch } = useContext(AppContext);

  const onClickSave = async (body: SettingForm) => {
    await Storage.set({
      key: 'tryton-settings',
      value: JSON.stringify({
        serverAddress: body.serverAddress,
        database: body.database,
        key: body.key
      })
    });
    dispatch({
      type: "SET_SETTINGS",
      payload: body
    })
    dispatch({
      type: 'NOTIFICATION',
      payload: {
        header: NOTIFICATION_MESSAGES.SAVE_SETTINGS_SUCCESS_HEADER,
        message: NOTIFICATION_MESSAGES.SAVE_SETTINGS_SUCCESS_BODY,
        color: NOTIFICATION_TYPE.SUCCESS
      }
    })
    dispatch({
      type: "SHOW_NOTIFICATION",
      payload: true
    })
    history.push(LOGS_LOGIN_URL_CONFIG.path)
  }

  return (
    <IonPage>
      <IonContent color="tertiary">
        <SettingForm onClickSave={onClickSave} />
      </IonContent>
    </IonPage>
  )
}

export default SettingPage;
