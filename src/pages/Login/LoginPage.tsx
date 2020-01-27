import React, { FunctionComponent, useContext } from 'react';
import "./LoginPage.css";
import { AppContext } from "../../store/Store";
import { History } from "history";
import LoginForm from "../../components/LoginForm/LoginForm";
import {
  LOGS_LIST_URL_CONFIG
 } from "../../utils/constants";
import { loginUser } from "../../utils/api";
import {
  IonPage,
  IonContent,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  useIonViewDidEnter
} from '@ionic/react';
import { Plugins } from "@capacitor/core";
import {createLoginErrorAction, createLoginSuccessfulAction} from "../../store/actions/user";
const CapApp = Plugins.App;

interface LoginPageHistory {
  history: History
}

const LoginPage: FunctionComponent<LoginPageHistory> = ({ history }) => {

  const { dispatch } = useContext(AppContext);

  useIonViewDidEnter(() => {
    CapApp.addListener("backButton", () => {
      history.goBack()
    })
  });

  const onClickLogin = async (body: LoginForm) => {
    const onSuccess = (res: any) => {
      dispatch(createLoginSuccessfulAction({id: res.id, name: body.username }));
      history.push(LOGS_LIST_URL_CONFIG.path)
    };
    const onError = () => {
      dispatch(createLoginErrorAction());
    };
    await loginUser(body, onSuccess, onError) // llamada a api
  };

  return (
    <IonPage>
    <IonToolbar color="tertiary">
      <IonButtons>
        <IonMenuButton className="menu__button" />
      </IonButtons>
    </IonToolbar>
      <IonContent color="tertiary">
        <LoginForm onClickLogin={onClickLogin}/>
      </IonContent>
    </IonPage>
  )
}

export default LoginPage;
