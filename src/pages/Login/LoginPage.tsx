import React, { FunctionComponent, useContext} from 'react';
import "./LoginPage.css";
import { AppContext } from "../../store/Store";
import { History } from "history";
import LoginForm from "../../components/LoginForm/LoginForm";
import { URL_CONFIG } from "../../utils/constants";
import { loginUser } from "../../utils/api";
import {
  IonPage,
  IonContent
} from '@ionic/react';

interface LoginPage {
  history: History
}

const LoginPage: FunctionComponent<LoginPage> = ({ history }) => {

  const { dispatch } = useContext(AppContext);

  const onClickLogin = async (body: LoginForm) => {
    const onSuccess = (res: any) => {
      dispatch({
        type: 'SET_USER',
        payload: {id: res.id, name: body.username}
      })
      dispatch({
        type: 'LOGIN',
        payload: true
      })
      history.push(URL_CONFIG.LOGS_LIST.path)
    }
    await loginUser(body, onSuccess) // llamada a api
  }

  return (
    <IonPage>
      <IonContent color="primary">
        <LoginForm onClickLogin={onClickLogin}/>
      </IonContent>
    </IonPage>
  )
}

export default LoginPage;
