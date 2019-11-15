import {
    IonButton,
    IonButtons,
    IonContent,
    IonDatetime, IonFooter,
    IonHeader,
    IonInput, IonItem, IonList,
    IonMenuButton,
    IonPage, IonSelect, IonSelectOption, IonText,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import React, {FC, useState} from 'react';
import "./LogHourForm.css"

const LogHourForm: FC = () => {
    const [groups] = useState([]);

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
            <IonContent className="ion-text-center ion-padding">
                <IonList>
                    <IonText className="input__text--font" color="identity">Description</IonText>
                    <IonItem className="list__item list__item--margin">
                        <IonInput className="ion-text-center" placeholder="Enter your description" type="text"/>
                    </IonItem>
                    <IonText className="input__text--font" color="identity">Registered Group</IonText>
                    <IonItem className="list__item--container list__item list__item--margin">
                        <IonSelect
                            className="ion-text-center item__select--container"
                            color="identity"
                            value="" okText="Ok" cancelText="Cancel" placeholder="Select a Group"
                        >
                            {
                                groups.map(({id, name}) => (
                                    <IonSelectOption value={id}>{name}</IonSelectOption>)
                                )
                            }
                        </IonSelect>
                    </IonItem>
                    <IonText className="input__text--font" color="identity">Current Day</IonText>
                    <IonItem className="list__item list__item--margin">
                        <IonDatetime
                            className="input__datetime"
                            color="identity"
                            displayFormat="YYYY-MM-DD"
                            placeholder="Enter your current day"
                        />
                    </IonItem>
                    <IonText className="input__text--font" color="identity">Spent Time</IonText>
                    <IonItem className="list__item list__item--margin">
                        <IonInput className="ion-text-center" placeholder="Enter your spent time" type="number"/>
                    </IonItem>
                </IonList>
            </IonContent>
            <IonFooter>
                    <IonButtons className="toolbar__buttons--container">
                        <IonButton className="buttons__button" color="identity">Save</IonButton>
                        <IonButton className="buttons__button" color="danger">Cancel</IonButton>
                    </IonButtons>
            </IonFooter>
        </IonPage>
    );
};

export default LogHourForm;
