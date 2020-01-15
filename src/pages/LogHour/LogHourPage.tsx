import {
  IonButtons,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import React, { FunctionComponent, useContext } from "react";
import "./LogHourPage.css";
import LogHourForm from "../../components/LogHourForm/LogHourForm";
import { logHours } from "../../utils/api";
import { History } from "history";
import {
  NOTIFICATION_MESSAGES,
  NOTIFICATION_TYPE,
  LOGS_LIST_URL_CONFIG
} from "../../utils/constants";
import { LOG_HOUR_PAGE_TEXTS } from "./constants";
import { AppContext } from "../../store/Store";

interface LogHourPage {
  history: History;
}

const LogHourPage: FunctionComponent<LogHourPage> = ({ history }) => {
  const { state, dispatch } = useContext(AppContext);
  const { user, loggedHours, groups } = state;

  const onClickSave = async (body: LogHourForm) => {
    const onSuccess = (res: any) => {
      dispatch({
        type: "UPDATE_LIST",
        payload: loggedHours.concat(res)
      });
      dispatch({
        type: "NOTIFICATION",
        payload: {
          header: NOTIFICATION_MESSAGES.NEW_HOUR_SUCCESS_HEADER,
          message: NOTIFICATION_MESSAGES.NEW_HOUR_SUCCESS_BODY,
          color: NOTIFICATION_TYPE.SUCCESS
        }
      });
      dispatch({
        type: "SHOW_NOTIFICATION",
        payload: true
      });
      history.push(LOGS_LIST_URL_CONFIG.path);
    };

    const onError = () => {
      dispatch({
        type: "NOTIFICATION",
        payload: {
          header: NOTIFICATION_MESSAGES.NEW_HOUR_ERROR_HEADER,
          message: NOTIFICATION_MESSAGES.NEW_HOUR_ERROR_BODY,
          color: NOTIFICATION_TYPE.ERROR
        }
      });
      dispatch({
        type: "SHOW_NOTIFICATION",
        payload: true
      })
    };

    await logHours(user.id, body, onSuccess, onError);
  };

  const onClickCancel = async () => {
    history.push(LOGS_LIST_URL_CONFIG.path);
  };

  return (
    <IonPage>
      <IonHeader className="ion-text-center">
        <IonToolbar className="toolbar--background">
          <IonButtons>
            <IonMenuButton className="menu__button" />
            <IonTitle className="header__title">
              {LOG_HOUR_PAGE_TEXTS.HEADER_TITLE}
            </IonTitle>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <LogHourForm onClickSave={onClickSave} onClickCancel={onClickCancel} userId={user.id} groups={groups} />
    </IonPage>
  );
};

export default LogHourPage;
