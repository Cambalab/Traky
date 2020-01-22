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
  IonMenuButton,
  IonFab,
  IonFabButton,
  IonIcon
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
import { TEXTS, NEW_HOUR_BUTTON_OPTION } from "./constants";

import { removeHours, getHours, getGroups } from "../../utils/api";

interface LogsPageHistory {
  history: History;
}


const removeHour = (loggedHours: ILogs[], removingHour: ILogs) => {
  return loggedHours.filter(hour => hour.id !== removingHour.id);
};

const groupName = (groups: IGroup[], id: Number) => {
  const group = groups.find((g: IGroup) => g.id === id);
  return group ? group.name : null;
};

const LogsList: React.FC<LogsPageHistory> = ({ history }) => {
  const { state, dispatch } = useContext(AppContext);
  const { groups, loggedHours, user, isLoading, hasError, settings, key } = state;

  const showEditView = (loggedHourId: number) => () => {
    history.push(`/edit/${loggedHourId}`);
  };

  const onSuccessGetGroups = (res: IGroup[]) => {
    dispatch({
      type: "UPDATE_GROUPS",
      payload: res
    });
  };

  useIonViewDidEnter(() => {
    if (user.id !== null && loggedHours.length === 0) {
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
      getGroups(user.id, settings, key, onSuccessGetGroups);
      getHours(user.id, settings, key, onSuccessGetHours, onErrorGetHours);
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

    await removeHours(user, logHour, onSuccess, onError);
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
            group={groupName(groups, loggedHour.groupId)}
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
            <IonSpinner className="content__spinner" name="crescent" color="primary" />
          ) : hasError ? (
            <div className="content___message">
              <p>{TEXTS.LIST_ERROR_MSG}</p>
            </div>
          ) : (
            <IonList className="hours_list">{renderList()}</IonList>
          )}
          <IonFab horizontal="end" vertical="bottom" slot="fixed">
            <IonFabButton color="primary" routerLink={NEW_HOUR_BUTTON_OPTION.url} >
              <IonIcon icon={NEW_HOUR_BUTTON_OPTION.icon} />
            </IonFabButton>
          </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default LogsList;
