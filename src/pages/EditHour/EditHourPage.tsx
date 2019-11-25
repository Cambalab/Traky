import {
  IonButtons,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import React, { useContext, FunctionComponent } from "react";
import { AppContext } from "../../store/Store";
import "./LogHourPage.css";
import LogHourForm from "../../components/LogHourForm/LogHourForm";
import { getCurrentUser, logHours, editHours, getHours } from "../../utils/api";
import { IUser, ILogs, IMatchParams } from "../../utils/declarations";
import { URL_CONFIG } from "../../utils/constants";
import { LOG_HOUR_PAGE_TEXTS } from "./constants";
import { RouteComponentProps } from "react-router-dom";

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

  function onSuccessGetHours(res: ILogs[]) {
    dispatch({
      type: "UPDATE_LIST",
      payload: res
    });
  }

  const onErrorGetHours = (error: any) => {};

  const onClickSave = async (body: LogHourForm) => {
    const onSuccess = () => {
      getHours(currentUser.id, onSuccessGetHours, onErrorGetHours);
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
              {LOG_HOUR_PAGE_TEXTS.HEADER_TITLE}
            </IonTitle>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      {data ? (
        <LogHourForm
          initialDescription={data.description}
          initialSelectedGroup={data.groupId}
          initialCurrentDate={data.timestamp.toString()}
          initialHours={data.spent_time.toString()}
          onClickSave={onClickSave}
          onClickCancel={onClickCancel}
        />
      ) : null}
    </IonPage>
  );
};

export default EditHourPage;
