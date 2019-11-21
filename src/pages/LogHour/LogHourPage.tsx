import {
    IonButtons,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
} from '@ionic/react';
import React, {FunctionComponent} from 'react';
import "./LogHourPage.css"
import LogHourForm from "../../components/LogHourForm/LogHourForm";
import {getCurrentUser, logHours} from "../../utils/api";
import { History } from 'history';
import {IUser} from "../../utils/declarations";
import {URL_CONFIG} from "../../utils/constants";
import {LOG_HOUR_PAGE_TEXTS} from "./constants";

interface LogHourPage {
    history: History
}

const LogHourPage: FunctionComponent<LogHourPage> = ({ history }) => {

    const currentUser: IUser = getCurrentUser();

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
                        <IonMenuButton className="menu__button"/>
                        <IonTitle className="header__title">{LOG_HOUR_PAGE_TEXTS.HEADER_TITLE}</IonTitle>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <LogHourForm onClickSave={onClickSave} onClickCancel={onClickCancel}/>
        </IonPage>
    );
};

export default LogHourPage;
