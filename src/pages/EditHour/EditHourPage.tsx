import {
  IonButtons,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import React, { FunctionComponent, useContext } from "react";
import { RouteComponentProps } from "react-router-dom";
import { AppContext } from "../../store/Store";
import LogHourForm from "../../components/LogHourForm/LogHourForm";
import { ILogs } from "../../utils/declarations";
import { NOTIFICATION_MESSAGES, NOTIFICATION_TYPE, LOGS_LIST_URL_CONFIG } from "../../utils/constants";
import { createEditSuccessfulAction, EDIT_HOUR_PAGE_TEXTS } from "./constants";
import { editLog } from "../../utils/api/logs";
import "./LogHourPage.css";

const filterLoggedHour = (loggedHours: ILogs[], id: number) => {
  return loggedHours.find((e: ILogs) => e.id === id);
};

interface EditHourPageProps extends RouteComponentProps<{
  id: string;
}> {}

const EditHourPage: FunctionComponent<EditHourPageProps> = ({
  history,
  match
}) => {
  const { state, dispatch } = useContext(AppContext);
  const { user, groups, loggedHours, settings, key } = state;
  const loggedHourId = Number(match.params.id);
  const loggedHour = filterLoggedHour(loggedHours, loggedHourId);

  const onClickSave = async (body: ILogs) => {
    const onSuccess = (res: ILogs) => {
      dispatch(createEditSuccessfulAction(res));
      history.push(LOGS_LIST_URL_CONFIG.path);
    };

    const onError = () => {
      dispatch({
        type: "NOTIFICATION",
        payload: {
          header: NOTIFICATION_MESSAGES.EDIT_HOUR_ERROR_HEADER,
          message: NOTIFICATION_MESSAGES.EDIT_HOUR_ERROR_BODY,
          color: NOTIFICATION_TYPE.ERROR
        }
      });
      dispatch({
        type: "SHOW_NOTIFICATION",
        payload: true
      })
    };

    await editLog({...body, userId: user.id}, settings, key, onSuccess, onError);
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
              {EDIT_HOUR_PAGE_TEXTS.HEADER_TITLE}
            </IonTitle>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      {loggedHour && (
        <LogHourForm
          logHour={loggedHour}
          onClickSave={onClickSave}
          onClickCancel={onClickCancel}
          groups={groups}
        />
      )}
    </IonPage>
  );
};

export default EditHourPage;
