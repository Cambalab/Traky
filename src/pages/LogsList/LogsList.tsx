import React, { useContext, useState } from "react";
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
  IonIcon,
  IonItem,
  IonDatetime
} from "@ionic/react";

import { AppContext } from "../../store/Store";
import { ILogs, IGroup } from "../../utils/declarations";
import "./LogsList.css";
import LogHourCard from "../../components/LogHourCard/LogHourCard";
import {
  NOTIFICATION_MESSAGES,
  NOTIFICATION_TYPE,
  LOGS_LIST_URL_CONFIG,
  LOGS_EDIT_URL_CONFIG
} from "../../utils/constants";
import { TEXTS, NEW_HOUR_BUTTON_OPTION } from "./constants";
import { calendar } from "ionicons/icons";

import { removeHours, getHours, getGroups } from "../../utils/api";
import { formatDate, handleInputDatetime } from "../../utils/inputHandle";
import { DatetimeChangeEventDetail } from "@ionic/core";
import { filterActiveGroups, getUrlFromParams } from "../../utils/utils";

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
  const {
    groups,
    loggedHours,
    user,
    isLoading,
    hasError,
    settings,
    key
  } = state;
  const [currentDate, setCurrentDate] = useState(formatDate(new Date()));

  const showEditView = (loggedHourId: number) => () => {
    history.push(getUrlFromParams(LOGS_EDIT_URL_CONFIG, loggedHourId));
  };

  const onSuccessGetGroups = (res: IGroup[]) => {
    const activeGroups = filterActiveGroups(res);
    dispatch({
      type: "UPDATE_GROUPS",
      payload: activeGroups
    });
  };

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

  useIonViewDidEnter(() => {
    if (user.id !== null && loggedHours.length === 0) {
      dispatch({
        type: "UPDATE_LOADING",
        payload: true
      });
      getGroups(user.id, settings, key, onSuccessGetGroups);
      getHours(
        currentDate,
        user.id,
        settings,
        key,
        onSuccessGetHours,
        onErrorGetHours
      );
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

    await removeHours(user, logHour, settings, onSuccess, onError);
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

  const updateLoggedHoursPerDay = (
    e: CustomEvent<DatetimeChangeEventDetail>
  ) => {
    handleInputDatetime(setCurrentDate)(e);
    const getUpdated = (updatedDate: string) => {
      dispatch({
        type: "UPDATE_LOADING",
        payload: true
      });
      getHours(
        updatedDate,
        user.id,
        settings,
        key,
        onSuccessGetHours,
        onErrorGetHours
      );
    };
    handleInputDatetime(getUpdated)(e);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="tertiary" className="header__toolbar">
          <IonButtons>
            <IonMenuButton className="menu__button" />
            <IonTitle>
              <IonItem color="tertiary">
                <IonDatetime
                  name="currentDate"
                  className="hour-card__date"
                  displayFormat="YYYY, MMMM DD"
                  color="light"
                  value={currentDate}
                  onIonChange={updateLoggedHoursPerDay}
                />
                <IonIcon slot="end" icon={calendar} />
              </IonItem>
            </IonTitle>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {/*-- List of logged hours --*/}
        {isLoading ? (
          <IonSpinner
            className="content__spinner"
            name="crescent"
            color="primary"
          />
        ) : hasError ? (
          <div className="content___message">
            <p>{TEXTS.LIST_ERROR_MSG}</p>
          </div>
        ) : (
          <IonList className="hours_list">{renderList()}</IonList>
        )}
        <IonFab horizontal="end" vertical="bottom" slot="fixed">
          <IonFabButton color="primary" routerLink={NEW_HOUR_BUTTON_OPTION.url}>
            <IonIcon icon={NEW_HOUR_BUTTON_OPTION.icon} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default LogsList;
