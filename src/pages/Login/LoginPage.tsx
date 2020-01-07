import React, { FunctionComponent, useContext } from 'react';
import "./LoginPage.css";
import { AppContext } from "../../store/Store";
import { History } from "history";
import LoginForm from "../../components/LoginForm/LoginForm";
import {
  NOTIFICATION_MESSAGES,
  NOTIFICATION_TYPE,
  LOGS_LIST_URL_CONFIG
 } from "../../utils/constants";
import { loginUser } from "../../utils/api";
import {
  IonPage,
  IonContent,
  useIonViewDidEnter
} from '@ionic/react';
import { Plugins } from "@capacitor/core";
const CapApp = Plugins.App

interface LoginPageHistory {
  history: History
}

const LoginPage: FunctionComponent<LoginPageHistory> = ({ history }) => {

  const { dispatch } = useContext(AppContext);

  useIonViewDidEnter(() => {
    CapApp.addListener("backButton", () => {
      history.goBack()
    })
  })

  const onClickLogin = async (body: LoginForm) => {
    const onSuccess = (res: any) => {
      dispatch({
        type: 'SET_USER',
        payload: {id: res.id, name: body.username}
      })
      dispatch({
        type: 'LOGIN'
      })
      history.push(LOGS_LIST_URL_CONFIG.path)
    }
    const onError = () => {
      dispatch({
        type: 'NOTIFICATION',
        payload: {
          header: NOTIFICATION_MESSAGES.AUTH_ERROR_HEADER,
          message: NOTIFICATION_MESSAGES.AUTH_ERROR_BODY,
          color: NOTIFICATION_TYPE.ERROR
        }
      })
      dispatch({
        type: "SHOW_NOTIFICATION",
        payload: true
      })
    }
    await loginUser(body, onSuccess, onError) // llamada a api
  }

  return (
    <IonPage>
      <IonContent color="tertiary">
        <LoginForm onClickLogin={onClickLogin}/>
      </IonContent>
    </IonPage>
  )
}

export default LoginPage;
