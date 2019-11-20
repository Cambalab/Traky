import {
    IonButton,
    IonButtons,
    IonContent,
    IonDatetime, IonFooter,
    IonInput,
    IonItem,
    IonList,
    IonSelect,
    IonSelectOption,
    IonText,
    useIonViewDidEnter,
} from '@ionic/react';
import React, {FunctionComponent, useState} from 'react';
import "./LogHourForm.css"
import {fetchAPI} from "../../utils/api";
import {IGroup} from "../../declarations";
import {formatDate, handleInput, handleInputDatetime, handleInputOnlyNumber} from "../../utils/inputHandle";

interface LogHourForm {
    initialDescription?: string,
    initialSelectedGroup?: number,
    initialCurrentDate?: string,
    initialHours?: string
}

const LogHourForm: FunctionComponent<LogHourForm> = ({ initialDescription, initialSelectedGroup, initialCurrentDate = formatDate(new Date()), initialHours}) => {
    const [groups, setGroups] = useState<IGroup[]>([]);
    const [description, setDescription] = useState<string>(initialDescription || "");
    const [selectedGroup, setSelectedGroup] = useState<number | undefined>(initialSelectedGroup);
    const [currentDate, setCurrentDate] = useState<string>(initialCurrentDate);
    const [hours, setHours] = useState<string>(initialHours || "");

    useIonViewDidEnter(() => {
        fetchGroups();
    });

    const fetchGroups = async () => {
        const onSuccess = (newGroups: IGroup[]) => {
            setGroups(newGroups);
        };

        await fetchAPI({ url: 'groups', method: 'GET', onSuccess});
    };

    return (
        <IonContent className="ion-text-center ion-padding">
            <IonList>
                <IonText className="input__text--font" color="identity">Description</IonText>
                <IonItem className="list__item list__item--margin">
                    <IonInput
                        name="description"
                        className="ion-text-center"
                        placeholder="Enter your description" type="text" maxlength={100}
                        value={description} onIonChange={handleInput(setDescription)}
                    />
                </IonItem>
                <IonText className="input__text--font" color="identity">Registered Group</IonText>
                <IonItem className="list__item--container list__item list__item--margin">
                    <IonSelect
                        name="group"
                        className="ion-text-center item__select--container"
                        color="identity"
                        value={selectedGroup} onIonChange={handleInput(setSelectedGroup)}
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
                        displayFormat="MM/DD/YYYY"
                        value={currentDate}
                        onIonChange={handleInputDatetime(setCurrentDate)}
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
                        onKeyPress={handleInputOnlyNumber}
                        onIonChange={handleInput(setHours)}
                    />
                </IonItem>
            </IonList>
            <IonFooter>
                <IonButtons className="toolbar__buttons--container">
                    <IonButton className="buttons__button" color="identity">Save</IonButton>
                    <IonButton className="buttons__button" color="danger">Cancel</IonButton>
                </IonButtons>
            </IonFooter>
        </IonContent>
    );
};

export default LogHourForm;
