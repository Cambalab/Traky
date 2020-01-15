import React, { FunctionComponent, useContext } from "react";
import "./KeyValidation.css";
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
  IonCol
} from "@ionic/react";
import { Plugins } from "@capacitor/core";
import { getUserFromKey } from "../../utils/api";
import { KEY_VALIDATION_PAGE_TEXTS } from "./constants";
import { key } from "ionicons/icons";
import { TEXTS } from "../LogsList/constants";
const CapApp = Plugins.App;

interface LoginPageHistory {
  history: History;
}

const KeyValidationPage: FunctionComponent<LoginPageHistory> = ({
  history
}) => {
  const { state, dispatch } = useContext(AppContext);
  //const timesheetUserKey = state.key;

  useIonViewDidEnter(() => {
    CapApp.addListener("backButton", () => {
      history.goBack();
    });
  });

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

    getUserFromKey("ddddd21122", onSuccess, onError);
  };

  return (
    <IonPage>
      <IonContent color="tertiary">
        <IonGrid>
          <IonRow>
            <IonCol className="key__col">
              <h3 className="key__title">{KEY_VALIDATION_PAGE_TEXTS.TITLE}</h3>
            </IonCol>
          </IonRow>
          <IonRow className="key__row">
            <IonCol className="key__col" offset="2" size="2">
              <IonIcon size={"large"} icon={key} />
            </IonCol>
            <IonCol className="key__col" size="6">
              <IonBadge>
                <h5 className="key-badge__text">
                  222bbb444999k222222222eeeeeee2qqqqqqqqqqqqqqqqk
                </h5>
              </IonBadge>
            </IonCol>
          </IonRow>
          <IonRow align-items-center>
            <IonList inset className="key-list">
              <IonItem className="key-list__item">
                <IonLabel>1. {KEY_VALIDATION_PAGE_TEXTS.FIRST_STEP}</IonLabel>
              </IonItem>
              <IonItem className="key-list__item">
                <IonLabel>2. {KEY_VALIDATION_PAGE_TEXTS.SECOND_STEP}</IonLabel>
              </IonItem>
              <IonItem className="key-list__item">
                <IonLabel>3. {KEY_VALIDATION_PAGE_TEXTS.THIRD_STEP}</IonLabel>
              </IonItem>
              <IonItem className="key-list__item">
                <IonLabel>4. {KEY_VALIDATION_PAGE_TEXTS.FOURTH_STEP}</IonLabel>
              </IonItem>
            </IonList>
            <button onClick={onClickActivatedKey}></button>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default KeyValidationPage;
