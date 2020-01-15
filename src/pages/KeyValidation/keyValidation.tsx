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
  IonIcon
} from "@ionic/react";
import { Plugins } from "@capacitor/core";
import { getUserFromKey } from "../../utils/api";
import { KEY_VALIDATION_PAGE_TEXTS } from "./constants";
import { key } from "ionicons/icons";
const CapApp = Plugins.App;

interface LoginPageHistory {
  history: History;
}

const KeyValidationPage: FunctionComponent<LoginPageHistory> = ({
  history
}) => {
  const { state, dispatch } = useContext(AppContext);
  //const timesheetUserKey = state.userKey;

  useIonViewDidEnter(() => {
    CapApp.addListener("backButton", () => {
      history.goBack();
    });
  });

  const onClickActivatedKey = async (user: string) => {
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
    await getUserFromKey(user, onSuccess, onError); // llamada a api
  };

  return (
    <IonPage>
      <IonContent color="tertiary">
        <IonGrid>
          <IonRow align-items-center>
            <h3>{KEY_VALIDATION_PAGE_TEXTS.TITLE}</h3>
          </IonRow>
          <IonRow align-items-center>
            <IonIcon size={"large"} icon={key} />
            <IonBadge>
              <h5>222bbb444999k222222222eeeeeee2qqqqqqqqqqqqqqqqk</h5>
            </IonBadge>
          </IonRow>
          <IonRow align-items-center>
            <IonList color="tertiary">
              <IonItem>
                <IonLabel>1. {KEY_VALIDATION_PAGE_TEXTS.FIRST_STEP}</IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>2. {KEY_VALIDATION_PAGE_TEXTS.SECOND_STEP}</IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>3. {KEY_VALIDATION_PAGE_TEXTS.THIRD_STEP}</IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>4. {KEY_VALIDATION_PAGE_TEXTS.FOURTH_STEP}</IonLabel>
              </IonItem>
            </IonList>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default KeyValidationPage;
