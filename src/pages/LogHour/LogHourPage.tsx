import {
  IonButtons,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import React, { FunctionComponent, useContext } from "react";
import "./LogHourPage.css";
import LogHourForm from "../../components/LogHourForm/LogHourForm";
import { History } from "history";
import {
  LOGS_LIST_URL_CONFIG
} from "../../utils/constants";
import { LOG_HOUR_PAGE_TEXTS } from "./constants";
import { AppContext } from "../../store/Store";
import { ILogs } from "../../utils/declarations";
import { createLog } from "../../utils/api/logs";
import {selectUser} from "../../store/selectors/user";
import {selectSettings} from "../../store/selectors/settings";
import {selectKey} from "../../store/selectors/key";
import {createAddLogErrorAction, createAddLogStartAction, createAddLogSuccessfulAction} from "../../store/actions/logs";
import {selectGroups} from "../../store/selectors/groups";

interface LogHourPage {
  history: History;
}

const LogHourPage: FunctionComponent<LogHourPage> = ({ history }) => {
  const { state, dispatch } = useContext(AppContext);
  const user = selectUser(state);
  const groups = selectGroups(state);
  const settings = selectSettings(state);
  const key = selectKey(state);

  const onClickSave = async (body: ILogs) => {
    const onSuccess = (res: ILogs) => {
      dispatch(createAddLogSuccessfulAction(res));
      history.push(LOGS_LIST_URL_CONFIG.path);
    };

    const onError = () => {
      dispatch(createAddLogErrorAction());
    };

    dispatch(createAddLogStartAction());
    await createLog({ ...body, userId: user.id }, settings, key, onSuccess, onError);
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
              {LOG_HOUR_PAGE_TEXTS.HEADER_TITLE}
            </IonTitle>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <LogHourForm onClickSave={onClickSave} onClickCancel={onClickCancel} groups={groups} />
    </IonPage>
  );
};

export default LogHourPage;
