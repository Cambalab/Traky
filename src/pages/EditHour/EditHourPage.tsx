import { IonButtons, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import React, { FunctionComponent, useContext } from "react";
import { AppContext } from "../../store/Store";
import "./LogHourPage.css";
import LogHourForm from "../../components/LogHourForm/LogHourForm";
import { editHours, getCurrentUser } from "../../utils/api";
import { ILogs, IMatchParams, IUser } from "../../utils/declarations";
import { URL_CONFIG } from "../../utils/constants";
import { EDIT_HOUR_PAGE_TEXTS } from "./constants";
import { RouteComponentProps } from "react-router-dom";
import { formatDate } from "../../utils/inputHandle";
import { transformNumberToString } from "../../utils/utils";

const EditHourPage: FunctionComponent<RouteComponentProps<IMatchParams>> = ({
  history,
  match
}) => {
  const currentUser: IUser = getCurrentUser();
  const { state, dispatch } = useContext(AppContext);

  function filterLoggedHour(id: number) {
    const element = state.loggedHours.find((e: ILogs) => e.id === id);
    return element;
  }

  const data = filterLoggedHour(Number(match.params.data));

  const updateHour = (loggedHours: ILogs[], editedHour: ILogs) => {
    const loggedHoursNew: ILogs[] = loggedHours.map(function(hour) {
      return hour.id == editedHour.id ? editedHour : hour;
    });
    return loggedHoursNew;
  };

  const onClickSave = async (body: LogHourForm) => {
    const onSuccess = (res: any) => {
      dispatch({
        type: "UPDATE_LIST",
        payload: updateHour(state.loggedHours, res)
      });
      history.push(URL_CONFIG.LOGS_LIST.path);
    };

    await editHours(currentUser.id, match.params.data, body, onSuccess);
  };

  const onClickCancel = async () => {
    history.push(URL_CONFIG.LOGS_LIST.path);
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
      {data ? (
        <LogHourForm
          initialDescription={data.description}
          initialSelectedGroup={data.groupId}
          initialCurrentDate={formatDate(data.timestamp)}
          initialHours={transformNumberToString(data.spent_time)}
          onClickSave={onClickSave}
          onClickCancel={onClickCancel}
        />
      ) : null}
    </IonPage>
  );
};

export default EditHourPage;
