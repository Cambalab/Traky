import React, { FunctionComponent, useContext, useState } from "react";
import "./keyInstructions.css";
import { AppContext } from "../../store/Store";
import { History } from "history";
import {
  NOTIFICATION_MESSAGES,
  NOTIFICATION_TYPE,
  LOGS_LIST_URL_CONFIG
} from "../../utils/constants";
import {
  IonPage,
  IonContent,
  useIonViewDidEnter,
  IonItem,
  IonLabel,
  IonList,
  IonChip,
  IonBadge,
  IonGrid,
  IonRow,
  IonIcon,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonCol,
  IonButton,
  IonSlides,
  IonSlide,
  IonFab,
  IonFabButton
} from "@ionic/react";
import { Plugins } from "@capacitor/core";
import { getUserFromKey } from "../../utils/api";
import { KEY_VALIDATION_PAGE_TEXTS } from "./constants";
import { key as keyIcon, arrowDropleft, arrowForward } from "ionicons/icons";
import { LOGIN_PAGE_TEXTS } from "../../components/LoginForm/constants";
import { InstructionsSlides } from "../../components/InstructionsSlides/Instructions";
const CapApp = Plugins.App;
const { Clipboard } = Plugins;

interface LoginPageHistory {
  history: History;
}

const KeyInstructionsPage: FunctionComponent<LoginPageHistory> = ({
  history
}) => {
  const { state, dispatch } = useContext(AppContext);
  const { settings, key } = state;
  const { serverAddress, database } = settings;
  const [showSlides, setstateshowSlides] = useState(false);

  useIonViewDidEnter(() => {
    CapApp.addListener("backButton", () => {
      history.goBack();
    });
  });

  const copyKeyToClipboard = () => {
    Clipboard.write({
      string: key
    });
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
      console.log(res);
    };
    const onError = () => {
      dispatch({
        type: "NOTIFICATION",
        payload: {
          header: NOTIFICATION_MESSAGES.AUTH_ERROR_HEADER,
          message: NOTIFICATION_MESSAGES.AUTH_ERROR_BODY,
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
    return <InstructionsSlides onLastStepAction={onClickActivatedKey} />;
  };

  const renderKey = () => {
    return (
      <IonContent color="tertiary">
        <IonGrid>
          <IonRow className="key__row">
            <IonCol
              className=""
              sizeXs="10"
              offsetXs="1"
              sizeMd="4"
              offsetMd="4"
            >
              <IonRow className="key__row--with-padding">
                <IonCol className="key__col">
                  <h4 className="key__title">
                    {KEY_VALIDATION_PAGE_TEXTS.TITLE}
                  </h4>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol className="key__col" size="2">
                  <IonIcon
                    onClick={copyKeyToClipboard}
                    size={"large"}
                    icon={keyIcon}
                    className="item-card__icon"
                  />
                </IonCol>
                <IonCol className="key__col" size="10">
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
