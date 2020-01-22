import React, { FunctionComponent, useContext, useState } from "react";
import "./keyInstructions.css";
import { AppContext } from "../../store/Store";
import { History } from "history";
import { copy, arrowForward } from "ionicons/icons";
import {
  IonPage,
  IonContent,
  useIonViewDidEnter,
  IonBadge,
  IonGrid,
  IonRow,
  IonIcon,
  IonCol,
  IonButton,
  IonFab,
  IonFabButton
} from "@ionic/react";
import {
  NOTIFICATION_MESSAGES,
  NOTIFICATION_TYPE,
  LOGS_LIST_URL_CONFIG
} from "../../utils/constants";
import { Plugins } from "@capacitor/core";

import { getUserFromKey } from "../../utils/api";
import { KEY_VALIDATION_PAGE_TEXTS } from "./constants";
import { InstructionsSlides } from "../../components/InstructionsSlides/Instructions";

const CapApp = Plugins.App;
const { Clipboard } = Plugins;

interface PageHistory {
  history: History;
}

const KeyInstructionsPage: FunctionComponent<PageHistory> = ({ history }) => {
  const { state, dispatch } = useContext(AppContext);
  const { settings, key } = state;
  const { serverAddress, database } = settings;
  const [showSlides, setstateshowSlides] = useState(false);

  useIonViewDidEnter(() => {
    CapApp.addListener("backButton", () => {
      history.goBack();
    });
    if (key && serverAddress && database) {
      onClickActivatedKey();
    }
  });

  const copyKeyToClipboard = async () => {
    await Clipboard.write({
      string: key
    });
    dispatch(createCopyClipboardAction());
  };

  const onClickActivatedKey = () => {
    const onSuccess = (res: any) => {
      const user = res[0];
      dispatch({
        type: "SET_USER",
        payload: { id: user.id, name: user.username }
      });
      dispatch({
        type: "LOGIN"
      });
      history.push(LOGS_LIST_URL_CONFIG.path);
    };
    const onError = () => {
      dispatch({
        type: KEY_INSTRUCTIONS_TYPE.NOTIFICATION,
        payload: {
          header: KEY_VALIDATION_PAGE_TEXTS.KEY_VALIDATION_ERROR_HEADER,
          message: KEY_VALIDATION_PAGE_TEXTS.KEY_VALIDATION_ERROR_MESSAGE,
          color: NOTIFICATION_TYPE.ERROR
        }
      });
      dispatch({
        type: "SHOW_NOTIFICATION",
        payload: true
      });
    };

    getUserFromKey(key, serverAddress, database, onSuccess, onError);
  };

  const renderInstructions = () => {
    return <InstructionsSlides />;
  };

  const renderKey = () => {
    return (
      <IonContent color="tertiary">
        <IonGrid>
          <IonRow className="key__row">
            <IonCol sizeXs="10" offsetXs="1" sizeMd="4" offsetMd="4">
              <IonRow className="key__row--with-padding">
                <IonCol className="key__col">
                  <h4 className="key__title">
                    {KEY_VALIDATION_PAGE_TEXTS.TITLE}
                  </h4>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol className="key__col" size="1">
                  <IonButton
                    className="key__copy-button"
                    onClick={copyKeyToClipboard}
                  >
                    <IonIcon size={"large"} icon={copy} />
                  </IonButton>
                </IonCol>
                <IonCol className="key__col" offsetXs="2" size="9">
                  <IonBadge color="light">
                    <h5 className="key-badge__text">{key}</h5>
                  </IonBadge>
                </IonCol>
              </IonRow>
              <IonRow className="key__row">
                <IonCol className="key__col">
                  <h5 className="key__title">
                    {KEY_VALIDATION_PAGE_TEXTS.INSTRUCTIONS}
                  </h5>
                </IonCol>
              </IonRow>
              <IonRow className="key__row">
                <IonCol className="key__col">
                  <IonFab
                    color="secondary"
                    vertical="center"
                    horizontal="center"
                    className="key__fab-button"
                  >
                    <IonFabButton onClick={e => setstateshowSlides(true)}>
                      <IonIcon
                        size={"large"}
                        icon={arrowForward}
                        className="item-card__icon"
                      />
                    </IonFabButton>
                  </IonFab>
                </IonCol>
              </IonRow>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    );
  };

  return (
    <IonPage>
      {!showSlides && renderKey()}
      {showSlides && renderInstructions()}
    </IonPage>
  );
};

export default KeyInstructionsPage;
