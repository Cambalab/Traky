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
import { IUser } from "../../utils/declarations";
import {
  URL_CONFIG,
  NOTIFICATION_MESSAGES,
  NOTIFICATION_TYPE,
  LOGS_LIST_URL_CONFIG
} from "../../utils/constants";
import { LOG_HOUR_PAGE_TEXTS } from "./constants";
import { AppContext } from "../../store/Store";

interface LogHourPageHistory {
  history: History;
}

const LogHourPage: FunctionComponent<LogHourPageHistory> = ({ history }) => {
  const { state, dispatch } = useContext(AppContext);

  const currentUser: IUser = state.user;

  const onClickSave = async (body: LogHourForm) => {
    const onSuccess = (res: any) => {
      dispatch({
        type: "UPDATE_LIST",
        payload: state.loggedHours.concat(res)
      });
      dispatch({
        type: "NOTIFICATION",
        payload: {
          header: NOTIFICATION_MESSAGES.newHourSuccessHeader,
          message: NOTIFICATION_MESSAGES.newHourSuccessBody,
          color: NOTIFICATION_TYPE.SUCCESS
        }
      })
      dispatch({
        type: "SHOW_NOTIFICATION",
        payload: true
      })
      history.push(LOGS_LIST_URL_CONFIG.path);
    };

    const onError = () => {
      dispatch({
        type: "NOTIFICATION",
        payload: {
          header: NOTIFICATION_MESSAGES.newHourErrorHeader,
          message: NOTIFICATION_MESSAGES.newHourErrorBody,
          color: NOTIFICATION_TYPE.ERROR
        }
      })
      dispatch({
        type: "SHOW_NOTIFICATION",
        payload: true
      })
    }

    await logHours(currentUser.id, body, onSuccess, onError);
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
      <LogHourForm onClickSave={onClickSave} onClickCancel={onClickCancel} />
    </IonPage>
  );
};

export default LogHourPage;
