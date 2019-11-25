import React, {FunctionComponent} from 'react';
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

interface LoginPage {
    history: History
}

const LoginPage: FunctionComponent<LoginPage> = ({ history }) => {
  return (
    <IonPage>
      <IonContent className="toolbar--background ">
        <IonGrid>
          <IonRow >
            <IonCol sizeXs="10" offsetXs="1" sizeMd="4" offsetMd="4">
              <IonImg className="login-img" src="https://recursos.camba.coop/uploads/-/system/project/avatar/299/logo-traky2.png?width=40"/>
              <IonItem className="login-input">
                <IonLabel position="floating" >{LOGIN_PAGE_TEXTS.USERNAME}</IonLabel>
                <IonInput type="email" />
              </IonItem>
              <IonItem className="login-input">
                <IonLabel position="floating">{LOGIN_PAGE_TEXTS.PASSWORD}</IonLabel>
                <IonInput type="password" />
              </IonItem>
              <IonButton color="dark" className="login-button" >{LOGIN_PAGE_TEXTS.LOGIN_BUTTON}</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  )
}

export default LoginPage;
