import React, { useState, useEffect } from 'react';
import { IonPage, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent } from '@ionic/react';

const LogsList: React.FC = () => {
    const [hasError, setError] = useState(false);
    const [loggedHours, setLoggedHours] = useState({});

    async function fetchData() {
        const res = await fetch("https://swapi.co/api/planets/4/");
        res.json()
            .then(res => setLoggedHours(res))
            .catch(error => setError(error));
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <IonPage>
            <IonContent>
                {/*-- List of logged hours --*/}
                <IonCard>
                    <IonCardHeader>
                        <IonCardSubtitle>Date</IonCardSubtitle>
                        <IonCardTitle>LoggedHours</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        descripciondescripciondescripciosndescripcion
                        {JSON.stringify(loggedHours)}
                        {hasError}
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
    )
};

export default LogsList;
