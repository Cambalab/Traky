import React, { FunctionComponent, useState } from "react";
import {LOGIN_PAGE_TEXTS} from "./constants";
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
const IMAGE_URL = "/assets/icon/favicon.png"

interface OnButtonClickEventFunction extends Function {
  (body: LoginForm) : void
}

interface LoginFormProps {
  history?                 : History,
  initialUsername?         : string,
  initialPassword?         : string,
  initialUserValidate?     : boolean,
  initialPasswordValidate? : boolean,
  onClickLogin             : OnButtonClickEventFunction
}

interface LoginForm {
    username         : string,
    password         : string
}

const LoginForm: FunctionComponent<LoginFormProps> = ({
  onClickLogin,
  initialUsername         = "",
  initialPassword         = "",
  initialUserValidate     = null,
  initialPasswordValidate = null
}) => {

    const [username, setUsername]                 = useState(initialUsername);
    const [password, setPassword]                 = useState(initialPassword);
    const [userValidate, setUserValidate]         = useState(initialUserValidate);
    const [passwordValidate, setPasswordValidate] = useState(initialPasswordValidate);


    const validateEmail = (email: string) => {
      setUserValidate(isValidEmail(email))
      setUsername(email);
   }

    const validatePassword = (password: string) => {
      setPasswordValidate(isValidPassword(password))
      setPassword(password)
    }

    const getFormData = () => {
      return {
        username: username,
        password: password // Hashing password
      }
    }

    const logUser = (event :any) => {
      event.preventDefault();
      onClickLogin(getFormData())
    }

    const getUsernameClassNameError = (): string => {
      return userValidate === null || userValidate  ? '': 'error'
    }

    const getUsernameColor = (): string => {
      return getUsernameClassNameError() === 'error' ? 'danger': 'dark';
    }

    const getPasswordClassNameError = (): string => {
      return passwordValidate === null || passwordValidate ? '': 'error'
    }

    const getPasswordColor = (): string => {
      return getPasswordClassNameError() === 'error' ? 'danger': 'dark'
    }

    return (
          <IonGrid>
            <IonRow>
              <IonCol sizeXs="10" offsetXs="1" sizeMd="4" offsetMd="4">
                <IonImg className="login-img" src={IMAGE_URL}/>
                <IonItem className={`login-input ${getUsernameClassNameError()}`} >
                  <IonLabel position="floating" >{LOGIN_PAGE_TEXTS.USERNAME}</IonLabel>
                  <IonInput
                    color={getUsernameColor()}
                    name="username"
                    type="email"
                    inputmode="email"
                    pattern="/^(.*[@].*[.]*)$/"
                    value={username}
                    autofocus={true}
                    onIonChange={handleInput(validateEmail)}
                  />
                  </IonItem>
                  <IonLabel color="danger" hidden={userValidate !== false}>
                    <b>{LOGIN_PAGE_TEXTS.USERNAME_ERROR}</b>
                  </IonLabel>
                <IonItem className={`login-input ${getPasswordClassNameError()}`}>
                  <IonLabel position="floating">{LOGIN_PAGE_TEXTS.PASSWORD}</IonLabel>
                  <IonInput
                    color={getPasswordColor()}
                    name="password"
                    type="password"
                    value={password}
                    minlength={6}
                    onIonChange={handleInput(validatePassword)}
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
