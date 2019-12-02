import React, { FunctionComponent, useState } from "react";
import {LOGIN_PAGE_TEXTS} from "./constants";

// import TRAKY_LOGO from "@public/assets/icon/favicon.png";
import "./LoginForm.css";
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
  handleInput,
  isValidEmail,
  isValidPassword
} from "../../utils/inputHandle";
import {
  handleValidation
} from "../../utils/stylesHandle";

interface OnButtonClickEventFunction extends Function {
  (body: LoginForm) : void
}

interface LoginFormProps {
  history?                 : History,
  initialUsername?         : string,
  initialPassword?         : string,
  initlaUserValidate?      : boolean,
  initialPasswordValidate? : boolean,
  onClickLogin             : OnButtonClickEventFunction
}

interface LoginForm {
    username         : string,
    password         : string
}

const IMAGE_URL = "https://recursos.camba.coop/uploads/-/system/project/avatar/299/logo-traky2.png?width=40";

const LoginForm: FunctionComponent<LoginFormProps> = ({
  onClickLogin,
  initialUsername         = "",
  initialPassword         = "",
  initlaUserValidate      = null,
  initialPasswordValidate = null
}) => {

    const [username, setUsername]                 = useState(initialUsername);
    const [password, setPassword]                 = useState(initialPassword);
    const [userValidate, setUserValidate]         = useState(initlaUserValidate);
    const [passwordValidate, setPasswordValidate] = useState(initialPasswordValidate);

    const validateEmail = (event: CustomEvent<any>) => {
      handleInput(setUsername)(event)
      let element   = document.getElementById('username-item');
      let text      = event.srcElement;
      let data      = {
              data: username,
              elem: element,
              text: text,
              event: event,
              styles: {
                correct: 'dark',
                error: 'danger',
                classError: 'error'
              }
            }
      setUserValidate(handleValidation(isValidEmail, data))
    }

    const validatePassword = async (event: CustomEvent<any>) => {
      handleInput(setPassword)(event)
      let element   = document.getElementById('password-item');
      let text      = event.srcElement;
      let data      = {
              data: password,
              elem: element,
              text: text,
              event: event,
              styles: {
                correct: 'dark',
                error: 'danger',
                classError: 'error'
              }
            }
      setPasswordValidate(handleValidation(isValidPassword, data))
    }

    const getFormData = () => {
      return {
        username: username,
        password: password // Hashing password
      }
    }

    const logUser = (event :any) => {
      console.log(event.type)
      event.preventDefault();
      onClickLogin(getFormData())
    }


    return (
          <IonGrid>
            <IonRow>
              <IonCol sizeXs="10" offsetXs="1" sizeMd="4" offsetMd="4">
                <IonImg className="login-img" src={IMAGE_URL}/>
                <IonItem className="login-input" id="username-item">
                  <IonLabel position="floating" >{LOGIN_PAGE_TEXTS.USERNAME}</IonLabel>
                  <IonInput
                    color="dark"
                    name="username"
                    type="email"
                    inputmode="email"
                    pattern="/^(.*[@].*[.]+[c]+[o]+[o]+[p])$/"
                    value={username}
                    autofocus={true}
                    onIonChange={validateEmail}
                  />
                  </IonItem>
                  <IonLabel color="danger" hidden={userValidate !== false}>
                    <b>{LOGIN_PAGE_TEXTS.USERNAME_ERROR}</b>
                  </IonLabel>
                <IonItem className="login-input" id="password-item">
                  <IonLabel position="floating">{LOGIN_PAGE_TEXTS.PASSWORD}</IonLabel>
                  <IonInput
                    name="password"
                    type="password"
                    value={password}
                    minlength={6}
                    onIonChange={validatePassword}
                  />
                </IonItem>
                <IonLabel color="danger" hidden={passwordValidate !== false}>
                  <b>{LOGIN_PAGE_TEXTS.PASSWORD_ERROR}</b>
                </IonLabel>
                <IonButton
                  color="dark"
                  className="login-button"
                  disabled={!(userValidate && passwordValidate)}
                  onClick={logUser}
                >{LOGIN_PAGE_TEXTS.LOGIN_BUTTON}</IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
    )
}

export default LoginForm;
