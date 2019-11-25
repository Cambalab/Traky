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
import { getCurrentUser, logHours } from "../../utils/api";
import { IUser } from "../../utils/declarations";
import { URL_CONFIG } from "../../utils/constants";
import { LOG_HOUR_PAGE_TEXTS } from "./constants";
import { RouteComponentProps } from "react-router-dom";

interface ILogs {
  id: number;
  description: string;
  timestamp: Date;
  spent_time: number;
}

interface IMatchParams {
  data: string;
}

const EditHourPage: FunctionComponent<RouteComponentProps<IMatchParams>> = ({
  history,
  match
}) => {
  const currentUser: IUser = getCurrentUser();

  const Store: any = useContext(AppContext);

  function filterLoggedHour(id: number) {
    //const element: ILogs = state.loggedHours.filter((e: ILogs) => e.id === id);
    const element: number = Store.loggedHours;
    return element;
  }

  //const data: ILogs = filterLoggedHour(Number(match.params.data));
  const data: number = filterLoggedHour(Number(match.params.data));

  const onClickSave = async (body: LogHourForm) => {
    const onSuccess = () => {
      history.push(URL_CONFIG.LOGS_LIST.path);
    };

    await logHours(currentUser.id, body, onSuccess);
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
      <LogHourForm onClickSave={() => {}} onClickCancel={() => {}} />
    </IonPage>
  );
};

export default EditHourPage;
