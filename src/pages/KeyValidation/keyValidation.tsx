import React from "react";
import { LAST_STEPS_TEXTS } from "./constants";
import "./KeyValidation.css";
import {
  IonGrid,
  IonRow,
  IonButton,
  IonList,
  IonItem,
  IonCol
} from "@ionic/react";
import { Plugins } from "@capacitor/core";
import { isMobile } from "../../utils/utils";
import { OnHandleClickEventFunction } from "../../utils/declarations";
const { Clipboard } = Plugins;

type KeyValidationProps = {
  loginFunction: OnHandleClickEventFunction;
  serverAddressLink: string;
  authKey: string;
};

const KeyValidation: React.FC<KeyValidationProps> = ({
  authKey,
  serverAddressLink,
  loginFunction
}) => {
  const copyKeyToClipboard = () => {
    Clipboard.write({
      string: authKey
    });
    document.execCommand(authKey);
  };

  return (
    <IonGrid className="key__container">
      <IonCol
        sizeMd="7"
        offsetMd="3"
        sizeXs="12"
        offsetXs="0"
        className="key__col"
      >
        <IonList
          inset
          className={isMobile() ? "key__list" : "key__list--desktop"}
        >
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
                  href={serverAddressLink}
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
                <IonButton onClick={loginFunction} className="key__button">
                  {LAST_STEPS_TEXTS.BUTTON_THIRD_STEP}
                </IonButton>
              </IonCol>
            </IonRow>
          </IonItem>
        </IonList>
      </IonCol>
    </IonGrid>
  );
};

export default KeyValidation;
