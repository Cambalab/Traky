<<<<<<< HEAD
import React from "react";
=======
import React, { useContext } from "react";
import { LAST_STEPS_TEXTS } from "./constants";
>>>>>>> Implement workflow design for validate user key
import "./KeyValidation.css";
import { AppContext } from "../../store/Store";
import {
  IonGrid,
  IonRow,
<<<<<<< HEAD
  IonCol,
  IonButton
=======
  IonButton,
  IonList,
  IonItem,
  IonCol
>>>>>>> Implement workflow design for validate user key
} from "@ionic/react";
import { Plugins } from "@capacitor/core";
const { Clipboard } = Plugins;

const KeyValidation: React.FC = () => {
  const copyKeyToClipboard = () => {
    Clipboard.write({
      string: key
    });
    document.execCommand(key);
  };

  const { state } = useContext(AppContext);
  const { key, settings } = state;
  const { serverAddress } = settings;

<<<<<<< HEAD
const KeyValidation: React.FC<ValidationProps> = ({ actionButton }) => (
  <div>
    <IonGrid>
      <IonRow className="key__row">
        <IonCol className="" sizeXs="8" offsetXs="2" sizeMd="2" offsetMd="10">
          <IonRow className="key__row--with-padding"/>
          <h5 className="key__title">{KEY_VALIDATION_PAGE_TEXTS.FINISHING}</h5>
          <IonRow>
            <IonCol>
              <IonButton
                color="secondary"
                className="login-button"
                onClick={() => actionButton()}
              >
                {LOGIN_PAGE_TEXTS.LOGIN_BUTTON}
              </IonButton>
            </IonCol>
          </IonRow>
        </IonCol>
      </IonRow>
=======
  return (
    <IonGrid className="key__container">
      <IonCol
        sizeMd="7"
        offsetMd="3"
        sizeXs="12"
        offsetXs="0"
        className="key__col"
      >
        <IonList inset className="key-list">
          <IonItem className="key-list__item">
            <IonRow className="key__row">
              <IonCol size="12" className="key__col">
                <h4 className="key__text">
                  {LAST_STEPS_TEXTS.TEXT_FIRST_STEP}
                </h4>
              </IonCol>
              <IonCol size="12" className="key__col">
                <IonButton onClick={copyKeyToClipboard} className="key__button">
                  {LAST_STEPS_TEXTS.BUTTON_FIRST_STEP}
                </IonButton>
              </IonCol>
            </IonRow>
          </IonItem>
          <IonItem className="key-list__item">
            <IonRow className="key__row">
              <IonCol size="12" className="key__col">
                <h4 className="key__text">
                  {LAST_STEPS_TEXTS.TEXT_SECOND_STEP}
                </h4>
              </IonCol>
              <IonCol size="12" className="key__col">
                <IonButton
                  color="secondary"
                  className="key__button"
                  href={serverAddress}
                >
                  {LAST_STEPS_TEXTS.BUTTON_SECOND_STEP}
                </IonButton>
              </IonCol>
            </IonRow>
          </IonItem>
          <IonItem className="key-list__item">
            <IonRow className="key__row">
              <IonCol size="12" className="key__col">
                <h4 className="key__text">
                  {LAST_STEPS_TEXTS.TEXT_THIRD_STEP}
                </h4>
              </IonCol>
              <IonCol size="12" className="key__col">
                <IonButton className="key__button" href={serverAddress}>
                  {LAST_STEPS_TEXTS.BUTTON_THIRD_STEP}
                </IonButton>
              </IonCol>
            </IonRow>
          </IonItem>
        </IonList>
      </IonCol>
>>>>>>> Implement workflow design for validate user key
    </IonGrid>
  );
};

export default KeyValidation;
