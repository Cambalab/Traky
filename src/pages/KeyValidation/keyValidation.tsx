import React, { FunctionComponent, useContext } from "react";
import "./KeyValidation.css";

import {
  IonContent,
  IonBadge,
  IonGrid,
  IonRow,
  IonIcon,
  IonCol,
  IonButton,
  IonList,
  IonItem,
  IonLabel
} from "@ionic/react";

import { LOGIN_PAGE_TEXTS } from "../../components/LoginForm/constants";
import { ValidationProps } from "../../utils/declarations";
import { KEY_VALIDATION_PAGE_TEXTS } from "../KeyInstructions/constants";

const KeyValidation: React.FC<ValidationProps> = actionButton => (
  <div>
    <IonGrid>
      <IonRow className="key__row">
        <IonCol className="" sizeXs="8" offsetXs="2" sizeMd="2" offsetMd="10">
          <IonRow className="key__row--with-padding">
            <IonList inset className="key-list">
              <IonItem className="key-list__item">
                <IonLabel>1. {KEY_VALIDATION_PAGE_TEXTS.FIRST_STEP}</IonLabel>
              </IonItem>
              <IonItem className="key-list__item">
                <IonLabel>2. {KEY_VALIDATION_PAGE_TEXTS.SECOND_STEP}</IonLabel>
              </IonItem>
            </IonList>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButton
                color="secondary"
                className="login-button"
                onClick={() => actionButton}
              >
                {LOGIN_PAGE_TEXTS.LOGIN_BUTTON}
              </IonButton>
            </IonCol>
          </IonRow>
        </IonCol>
      </IonRow>
    </IonGrid>
  </div>
);

export default KeyValidation;
