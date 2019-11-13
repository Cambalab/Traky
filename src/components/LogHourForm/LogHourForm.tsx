import {
    IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,
    IonContent,
    IonHeader, IonInput,
    IonMenuButton,
    IonPage, IonSelect, IonSelectOption,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import React from 'react';

const LogHourForm: React.FC = () => (
    <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonButtons>
                    <IonMenuButton />
                </IonButtons>
                <IonTitle>Log Hour Form</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent>
            <IonCard>
                <IonCardHeader>
                    <IonCardSubtitle>Log Hour Form</IonCardSubtitle>
                    <IonCardTitle>CamApp Traky</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                    <IonInput placeholder="Enter Description" type="text"/>
                    <IonSelect value="" okText="Okay" cancelText="Dismiss" placeholder="Select a Group">
                        <IonSelectOption value="brown">Brown</IonSelectOption>
                        <IonSelectOption value="blonde">Blonde</IonSelectOption>
                        <IonSelectOption value="black">Black</IonSelectOption>
                        <IonSelectOption value="red">Red</IonSelectOption>
                    </IonSelect>
                    <IonInput placeholder="Enter Date" type="date"/>
                    <IonInput placeholder="Enter Hours" type="number"/>
                </IonCardContent>
            </IonCard>
        </IonContent>
    </IonPage>
);

export default LogHourForm;
