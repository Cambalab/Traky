import {
    IonButton,
    IonButtons,
    IonContent,
    IonDatetime,
    IonFooter,
    IonHeader,
    IonInput,
    IonItem,
    IonList,
    IonMenuButton,
    IonPage,
    IonSelect,
    IonSelectOption,
    IonText,
    IonTitle,
    IonToolbar,
    useIonViewDidEnter,
} from '@ionic/react';
import React, {FunctionComponent, useState, KeyboardEvent} from 'react';
import "./LogHourForm.css"
import {fetchAPI} from "../../utils/api";
import {IGroup} from "../../declarations";
import { SelectChangeEventDetail, DatetimeChangeEventDetail, InputChangeEventDetail } from '@ionic/core';

const LogHourForm: FunctionComponent = () => {
    const [groups, setGroups] = useState<IGroup[]>([]);
    const [description, setDescription] = useState<string>();
    const [selectedGroup, setSelectedGroup] = useState<number>();
    const [currentDate, setCurrentDate] = useState<string>((new Date()).toString());
    const [hours, setHours] = useState<string>();

    useIonViewDidEnter(() => {
        fetchGroups();
    });

    const fetchGroups = async () => {
        const onSuccess = (newGroups: IGroup[]) => {
            setGroups(newGroups);
        };

        await fetchAPI({ url: 'groups', method: 'GET', onSuccess});
    };

    const handleChange = (fn: Function) => (e: CustomEvent<InputChangeEventDetail | DatetimeChangeEventDetail | SelectChangeEventDetail>) => {
        const value = e.detail.value;

        fn(value);
    };

    const handleNumberValidation = (e: KeyboardEvent<HTMLIonInputElement>) => {
        const pattern = /[0-9.,]/;
        const inputChar: string = String.fromCharCode(e.charCode);

        if (!pattern.test(inputChar)) {
            e.preventDefault();
        }
    };
    return (
        <IonPage>
            <IonHeader className="ion-text-center">
                <IonToolbar className="toolbar--background">
                    <IonButtons>
                        <IonMenuButton className="menu__button"/>
                        <IonTitle className="header__title">Log your hours</IonTitle>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-text-center ion-padding">
                <IonList>
                    <IonText className="input__text--font" color="identity">Description</IonText>
                    <IonItem className="list__item list__item--margin">
                        <IonInput
                            name="description"
                            className="ion-text-center"
                            placeholder="Enter your description" type="text"
                            value={description} onIonChange={handleChange(setDescription)}/>
                    </IonItem>
                    <IonText className="input__text--font" color="identity">Registered Group</IonText>
                    <IonItem className="list__item--container list__item list__item--margin">
                        <IonSelect
                            name="group"
                            className="ion-text-center item__select--container"
                            color="identity"
                            value={selectedGroup} onIonChange={handleChange(setSelectedGroup)}
                            okText="Ok" cancelText="Cancel" placeholder="Select a Group"
                        >
                            {
                                groups.map(({id, name}) => (
                                    <IonSelectOption key={id} value={id}>{name}</IonSelectOption>)
                                )
                            }
                        </IonSelect>
                    </IonItem>
                    <IonText className="input__text--font" color="identity">Current Date</IonText>
                    <IonItem className="list__item list__item--margin">
                        <IonDatetime
                            name="currentDate"
                            className="input__datetime"
                            color="identity"
                            displayFormat="YYYY-MM-DD"
                            value={currentDate}
                            onIonChange={handleChange(setCurrentDate)}
                            placeholder="Enter your current date"
                        />
                    </IonItem>
                    <IonText className="input__text--font" color="identity">Spent Time</IonText>
                    <IonItem className="list__item list__item--margin">
                        <IonInput
                            name="hour"
                            className="ion-text-center"
                            placeholder="Enter your spent time"
                            type="number"
                            value={hours}
                            onKeyPress={handleNumberValidation}
                            onIonChange={handleChange(setHours)}
                        />
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
