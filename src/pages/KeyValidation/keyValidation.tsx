import React, { useContext } from "react";
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
import { AppContext } from "../../store/Store";
import {createCopyClipboardNotificationAction} from "../../store/actions/notification";
const { Clipboard, Browser } = Plugins;

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
  const { dispatch } = useContext(AppContext);

  const copyKeyToClipboard = async () => {
    await Clipboard.write({
      string: authKey
    });

    dispatch(createCopyClipboardNotificationAction());
  };

  const openServerAddressBrowser = async () => {
    await Browser.open({ url: serverAddressLink });
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
          className={isMobile() ? "key-list" : "key-list--desktop"}
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
                  onClick={openServerAddressBrowser}
                  color="secondary"
                  className="key__button"
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
