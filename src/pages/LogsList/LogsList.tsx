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
import { ILogs, IGroup, ILoginSettings, IUser } from "../../utils/declarations";
import "./LogsList.css";
import LogHourCard from "../../components/LogHourCard/LogHourCard";
import {
  LOGS_EDIT_URL_CONFIG,
  LOGS_LIST_URL_CONFIG
} from "../../utils/constants";
import { TEXTS, NEW_HOUR_BUTTON_OPTION } from "./constants";
import { calendar } from "ionicons/icons";

import { getGroups } from "../../utils/api";
import { formatDate, handleInputDatetime } from "../../utils/inputHandle";
import { DatetimeChangeEventDetail } from "@ionic/core";
import { getUrlFromParams } from "../../utils/utils";
import { getLogs, removeLog } from "../../utils/api/logs";
import { filterActiveGroups } from "../../utils/utils";
import { selectGroups } from "../../store/selectors/groups";
import { selectLogsState } from "../../store/selectors/logs";
import { selectUser, selectUserIsLogged } from "../../store/selectors/user";
import { selectSettings } from "../../store/selectors/settings";
import {
  createFetchGroupsStartAction,
  createFetchGroupsSuccessfulAction
} from "../../store/actions/groups";
import { selectKey } from "../../store/selectors/key";
import {
  createFetchLogsErrorAction,
  createFetchLogsStartAction,
  createFetchLogsSuccessfulAction,
  createRemoveLogErrorAction,
  createRemoveLogSuccessfulAction
} from "../../store/actions/logs";

interface LogsPageHistory {
  history: History;
}

const groupName = (groups: IGroup[], id?: number) => {
  const group = groups.find((g: IGroup) => g.id === id);
  return group ? group.name : null;
};

const isEmpty = (logs: ILogs[]) => logs.length === 0;

const LogsList: React.FC<LogsPageHistory> = ({ history }) => {
  const { state, dispatch } = useContext(AppContext);
  const groups = selectGroups(state);
  const { logs, isLoading, hasError } = selectLogsState(state);
  const user = selectUser(state);
  const isLogged = selectUserIsLogged(state);
  const settings = selectSettings(state);
  const key = selectKey(state);
  const [currentDate, setCurrentDate] = useState(formatDate(new Date()));

  const showEditView = (logHour: ILogs) => () => {
    if (logHour.id) {
      history.push(getUrlFromParams(LOGS_EDIT_URL_CONFIG, logHour.id));
    }
  };

  const onSuccessGetGroups = (res: IGroup[]) => {
    const activeGroups = filterActiveGroups(res);
    dispatch(createFetchGroupsSuccessfulAction(activeGroups));
  };

  const onSuccessGetHours = (res: ILogs[]) => {
    dispatch(createFetchLogsSuccessfulAction(res));
  };

  const onErrorGetHours = () => {
    dispatch(createFetchLogsErrorAction());
  };

  const initPage = async (
    user: IUser,
    settings: ILoginSettings,
    key: string
  ) => {
    dispatch(createFetchLogsStartAction());
    dispatch(createFetchGroupsStartAction());
    getGroups(user.id, settings, key, onSuccessGetGroups);
    getLogs(
      currentDate,
      user.id,
      settings,
      key,
      onSuccessGetHours,
      onErrorGetHours
    );
  };

  useIonViewDidEnter(() => {
    if (isLogged && isEmpty(logs)) {
      initPage(user, settings, key);
    }
  });

  const onDelete = (logHour: ILogs) => async () => {
    const onSuccess = () => {
      dispatch(createRemoveLogSuccessfulAction(logHour));
      history.push(LOGS_LIST_URL_CONFIG.path);
    };

    const onError = (e: any) => {
      dispatch(createRemoveLogErrorAction());
    };
    await removeLog(key, logHour, settings, onSuccess, onError);
  };

  const renderList = () =>
    logs.length >= 1 ? (
      logs.map(loggedHour => {
        return (
          <LogHourCard
            key={loggedHour.id}
            logHour={loggedHour}
            onEditClick={showEditView(loggedHour)}
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
    const getUpdated = (updatedDate: string) => {
      dispatch(createFetchLogsStartAction());
      setCurrentDate(updatedDate);
      getLogs(
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
