import React, { useContext } from "react";
import { History } from "history";

import {
  IonButton,
  IonSpinner,
  useIonViewDidEnter,
  IonList,
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonMenuButton
} from "@ionic/react";

import { AppContext } from "../../store/Store";
import { ILogs, IGroup } from "../../utils/declarations";
import "./LogsList.css";
import LogHourCard from "../../components/LogHourCard/LogHourCard";
import {
  NOTIFICATION_MESSAGES,
  NOTIFICATION_TYPE,
  LOGS_LIST_URL_CONFIG
} from "../../utils/constants";
import { TEXTS } from "./constants";

import { removeHours, getHours } from "../../utils/api";

interface LogsPageHistory {
  history: History;
}

const LogsList: React.FC<LogsPageHistory> = ({ history }) => {
  const { state, dispatch } = useContext(AppContext);
  const loggedHours: ILogs[] = state.loggedHours;
  const groups: IGroup[] = state.groups;
  const currentUser = state.user;
  const isLoading: boolean = state.isLoading;
  const hasError: boolean = state.hasError;

  const showEditView = (loggedHourId: number) => () => {
    history.push(`/edit/${loggedHourId}`);
  };

  const removeHour = (loggedHours: ILogs[], removingHour: ILogs) => {
    return loggedHours.filter(hour => hour.id !== removingHour.id);
  };

  const groupName = (id: Number) => {
    const group = groups.find((g: IGroup) => g.id === id);
    return group ? group.name : null;
  };

  useIonViewDidEnter(() => {
    if (currentUser.id !== null && loggedHours.length === 0) {
      const onSuccessGetHours = (res: ILogs[]) => {
        dispatch({
          type: "UPDATE_LIST",
          payload: res
        });
        dispatch({
          type: "UPDATE_LOADING",
          payload: false
        });
      };

      const onErrorGetHours = () => {
        dispatch({
          type: "UPDATE_ERROR",
          payload: true
        });
        dispatch({
          type: "UPDATE_LOADING",
          payload: false
        });
        dispatch({
          type: "NOTIFICATION",
          payload: {
            header: NOTIFICATION_MESSAGES.FETCH_HOURS_ERROR_HEADER,
            message: NOTIFICATION_MESSAGES.FETCH_HOURS_ERROR_BODY,
            color: NOTIFICATION_TYPE.ERROR
          }
        });
        dispatch({
          type: "SHOW_NOTIFICATION",
          payload: true
        });
      };
      dispatch({
        type: "UPDATE_LOADING",
        payload: true
      });
      getHours(currentUser.id, onSuccessGetHours, onErrorGetHours);
    }
  });

  const onDelete = (logHour: ILogs) => async () => {
    const onSuccess = () => {
      history.push(LOGS_LIST_URL_CONFIG.path);
      dispatch({
        type: "UPDATE_LIST",
        payload: removeHour(loggedHours, logHour)
      });
      dispatch({
        type: "UPDATE_LOADING",
        payload: false
      });
      dispatch({
        type: "NOTIFICATION",
        payload: {
          header: NOTIFICATION_MESSAGES.DELETE_HOUR_SUCCESS_HEADER,
          message: NOTIFICATION_MESSAGES.DELETE_HOUR_SUCCESS_BODY,
          color: NOTIFICATION_TYPE.SUCCESS
        }
      });
      dispatch({
        type: "SHOW_NOTIFICATION",
        payload: true
      });
    };

    const onError = () => {
      dispatch({
        type: "UPDATE_LOADING",
        payload: false
      });
      dispatch({
        type: "UPDATE_ERROR",
        payload: true
      });
      dispatch({
        type: "NOTIFICATION",
        payload: {
          header: NOTIFICATION_MESSAGES.DELETE_HOUR_ERROR_HEADER,
          message: NOTIFICATION_MESSAGES.DELETE_HOUR_ERROR_BODY,
          color: NOTIFICATION_TYPE.ERROR
        }
      });
      dispatch({
        type: "SHOW_NOTIFICATION",
        payload: true
      });
    };
    dispatch({
      type: "UPDATE_LOADING",
      payload: true
    });

    await removeHours(currentUser, logHour, onSuccess, onError);
  };

  const renderList = () =>
    loggedHours && loggedHours.length >= 1 ? (
      loggedHours.map(loggedHour => {
        return (
          <LogHourCard
            key={loggedHour.id}
            logHour={loggedHour}
            onEditClick={showEditView(loggedHour.id)}
            onDeleteClick={onDelete(loggedHour)}
            group={groupName(loggedHour.groupId)}
          />
        );
      })
    ) : (
      <div className="content___message">
        <p>{TEXTS.LIST_NO_LOGS_YET_MSG}</p>
        <IonButton routerLink="/new" expand="full">
          {TEXTS.BUTTON_NO_LOGS_YET_MSG}
        </IonButton>
      </div>
    );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="#00c79a" className="header__toolbar">
          <IonButtons>
            <IonMenuButton className="menu__button" />
            <IonTitle className="header__title">{TEXTS.LIST_TITLE}</IonTitle>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {/*-- List of logged hours --*/}
        {isLoading ? (
          <IonSpinner className="content__spinner" name="lines" />
        ) : hasError ? (
          <div className="content___message">
            <p>{TEXTS.LIST_ERROR_MSG}</p>
          </div>
        ) : (
          <IonList>{renderList()}</IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default LogsList;
