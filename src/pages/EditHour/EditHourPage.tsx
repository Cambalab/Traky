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
import LogHourForm from "../../components/LogHourForm/LogHourForm";
import { LOGS_LIST_URL_CONFIG } from "../../utils/constants";
import { EDIT_HOUR_PAGE_TEXTS } from "./constants";
import {selectUser} from "../../store/selectors/user";
import {selectGroups} from "../../store/selectors/groups";
import {selectSettings} from "../../store/selectors/settings";
import {selectLog} from "../../store/selectors/logs";
import {
  createUpdateLogErrorAction,
  createUpdateLogStartAction,
  createUpdateLogSuccessfulAction
} from "../../store/actions/logs";
import {selectKey} from "../../store/selectors/key";
import {RouteComponentProps} from "react-router";
import {editLog} from "../../utils/api/logs";
import {ILogs} from "../../utils/declarations";

interface EditHourPageProps extends RouteComponentProps<{
  id: string;
}> {}

const EditHourPage: FunctionComponent<EditHourPageProps> = ({
  history,
  match
}) => {
  const { state, dispatch } = useContext(AppContext);
  const user = selectUser(state);
  const groups = selectGroups(state);
  const key = selectKey(state);
  const settings = selectSettings(state);
  const log = selectLog(Number(match.params.id), state);

  const onClickSave = async (body: ILogs) => {
    const onSuccess = (res: ILogs) => {
      dispatch(createUpdateLogSuccessfulAction(res));
      history.push(LOGS_LIST_URL_CONFIG.path);
    };

    const onError = () => {
      dispatch(createUpdateLogErrorAction());
    };
    dispatch(createUpdateLogStartAction());
    await editLog({...body, userId: user.id}, settings, key, onSuccess, onError);
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
      {log && (
        <LogHourForm
          logHour={log}
          onClickSave={onClickSave}
          onClickCancel={onClickCancel}
          groups={groups}
        />
      )}
    </IonPage>
  );
};

export default EditHourPage;
