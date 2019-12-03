import React, { useContext } from "react";
import { IonButton, IonSpinner } from "@ionic/react";
import { History } from "history";

import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonMenuButton,
} from "@ionic/react";

import "./LogsList.css";
import { TEXTS } from "./constants";
import { AppContext } from "../../store/Store";
import { ILogs } from "../../utils/declarations";
import LogHourCard from "../../components/LogHourCard/LogHourCard";
import {URL_CONFIG} from "../../utils/constants";
import {getCurrentUser, removeHours} from "../../utils/api";

interface LogsPageHistory {
  history: History;
}

const LogsList: React.FC<LogsPageHistory> = ({ history }) => {
  const { state, dispatch } = useContext(AppContext);
  const loggedHours: ILogs[] = state.loggedHours;
  const currentUser = getCurrentUser();
  const isLoading: boolean = state.isLoading;
  const hasError: boolean = state.hasError;

  const showEditView = (loggedHourId: number) => () => {
    history.push(`/edit/${loggedHourId}`);
  };

  const onDelete = (logHour: ILogs) => async () => {
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
          renderList()
        )}
      </IonContent>
    </IonPage>
  );
};

export default LogsList;
