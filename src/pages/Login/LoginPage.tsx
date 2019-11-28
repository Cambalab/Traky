import React, { FunctionComponent, useState, CElement } from 'react';
import {LOGIN_PAGE_TEXTS} from "./constants";
import "./LoginPage.css";
import {
  IonPage,
  IonContent,
  IonButton,
  IonItem,
  IonLabel,
  IonInput,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
} from '@ionic/react';

interface LoginPageProps {
  history: History,
  initialUsername: string,
  initialPassword: string
}

interface LoginPage {
    history: History,
    username: string,
    password: string
}

const IMAGE_URL = "https://recursos.camba.coop/uploads/-/system/project/avatar/299/logo-traky2.png?width=40";

const LoginPage: FunctionComponent<LoginPageProps> = ({ history,
  initialUsername = "",
  initialPassword = "",
}) => {
    const [username, setUsername] = useState<string>(initialUsername);
    const [password, setPassword] = useState<string>(initialPassword);

    const onChangeValue = (event :any) => {
      setUsername(event.detail.value);
    }

    const validateEmail = (event :any) => {
      const reg = /^(.*[@].*[.com])$/;
      const isValid = reg.test(username);
      let element = event.srcElement;

      element.color = isValid ? "dark" : "danger";
    }

    const logUser = (event :any) => {
      console.log(event)
      var a = event.preventDefault();
      console.log("ASD ", a)
    }

    return (
      <IonPage>
        <IonContent className="toolbar--background ">
          <IonGrid>
            <IonRow>
              <IonCol sizeXs="10" offsetXs="1" sizeMd="4" offsetMd="4">
                <IonImg className="login-img" src={IMAGE_URL}/>
                <IonItem className="login-input">
                  <IonLabel position="floating" >{LOGIN_PAGE_TEXTS.USERNAME}</IonLabel>
                  <IonInput
                    color="dark"
                    name="username"
                    type="email"
                    inputmode="email"
                    pattern="/^(.*[@].*[.com])$/"
                    value={username}
                    autofocus={true}
                    onIonChange={onChangeValue}
                    onIonBlur={validateEmail}
                  />
                </IonItem>
                <IonItem className="login-input">
                  <IonLabel position="floating">{LOGIN_PAGE_TEXTS.PASSWORD}</IonLabel>
                  <IonInput
                    name="password"
                    type="password"
                    value={password}
                    minlength={6}
                  />
                </IonItem>
                <IonButton
                  color="dark"
                  className="login-button"
                  onClick={e => logUser(e)}
                >{LOGIN_PAGE_TEXTS.LOGIN_BUTTON}</IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    )
}

export default LoginPage;
