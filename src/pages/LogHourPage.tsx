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
import LogHourForm from "../components/LogHourForm/LogHourForm";

const LogHourPage: FunctionComponent = () => {
    return (
        <IonPage>
            <IonHeader className="ion-text-center">
                <IonToolbar className="toolbar--background">
                    <IonButtons>
                        <IonMenuButton/>
                        <IonTitle>Log Hours</IonTitle>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <LogHourForm />
        </IonPage>
    );
};

export default LogHourPage;
