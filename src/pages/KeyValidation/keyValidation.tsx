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
  IonBadge
} from "@ionic/react";
import { Plugins } from "@capacitor/core";
import { getUserFromKey } from "../../utils/api";
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
      <IonContent>
        <IonList>
          <IonItem>
            <IonLabel>1.</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>2.</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>3.</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>4.</IonLabel>
          </IonItem>
        </IonList>
        <IonBadge color="tertiary">
          222bbb444999k222222222eeeeeee2qqqqqqqqqqqqqqqqk
        </IonBadge>
      </IonContent>
    </IonPage>
  );
};

export default KeyValidationPage;
