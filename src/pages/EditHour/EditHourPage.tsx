import {
  IonButtons,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import React, { FunctionComponent, useContext } from "react";
import { AppContext } from "../../store/Store";
import "./LogHourPage.css";
import LogHourForm from "../../components/LogHourForm/LogHourForm";
import { editHours } from "../../utils/api";
import { ILogs } from "../../utils/declarations";
import {NOTIFICATION_MESSAGES, NOTIFICATION_TYPE, LOGS_LIST_URL_CONFIG} from "../../utils/constants";
import { EDIT_HOUR_PAGE_TEXTS } from "./constants";
import { RouteComponentProps } from "react-router-dom";
import { formatDate } from "../../utils/inputHandle";

const filterLoggedHour = (loggedHours: ILogs[], id: number) => {
  return loggedHours.find((e: ILogs) => e.id === id);
};

const updateLoggedHour = (loggedHours: ILogs[], editedHour: ILogs) => {
  return loggedHours.map((hour) => (hour.id === editedHour.id ? editedHour : hour));
};

interface EditHourPageProps extends RouteComponentProps<{
  id: string;
}> {}

const EditHourPage: FunctionComponent<EditHourPageProps> = ({
  history,
  match
}) => {
  const { state, dispatch } = useContext(AppContext);
  const { user, groups, loggedHours, settings } = state;
  const loggedHourId = Number(match.params.id);
  const loggedHour = filterLoggedHour(loggedHours, loggedHourId);

  const onClickSave = async (body: LogHourForm) => {
    const onSuccess = (res: any) => {
      dispatch({
        type: "UPDATE_LIST",
        payload: updateLoggedHour(state.loggedHours, res)
      });
      dispatch({
        type: "NOTIFICATION",
        payload: {
          header: NOTIFICATION_MESSAGES.EDIT_HOUR_SUCCESS_HEADER,
          message: NOTIFICATION_MESSAGES.EDIT_HOUR_SUCCESS_BODY,
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

    await editHours(user.id, loggedHourId, body, settings, onSuccess, onError);
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
          initialDescription={loggedHour.description}
          initialSelectedGroup={loggedHour.groupId}
          initialCurrentDate={formatDate(loggedHour.timestamp)}
          initialHours={String(loggedHour.spent_time)}
          onClickSave={onClickSave}
          onClickCancel={onClickCancel}
          userId={user.id}
          groups={groups}
        />
      )}
    </IonPage>
  );
};

export default EditHourPage;
