import {
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonFooter,
  IonInput,
  IonItem,
  IonList,
  IonSelect,
  IonSelectOption,
  IonText,
  useIonViewDidEnter
} from "@ionic/react";
import React, {FormEvent, FunctionComponent, useContext, useState} from "react";
import "./LogHourForm.css";
import { getGroups } from "../../utils/api";
import { IGroup } from "../../utils/declarations";
import {
  formatDate,
  handleInput,
  handleInputDatetime,
  handleInputElement,
  handleInputOnlyNumber
} from "../../utils/inputHandle";
import { LOG_HOUR_FORM_TEXTS } from "./constants";
import { InputChangeEventDetail, SelectChangeEventDetail } from "@ionic/core";
import { isEmptyString, isValidNumber } from "../../utils/utils";
import {AppContext} from "../../store/Store";

interface OnButtonClickEventFunction extends Function {
  (body: LogHourForm): void;
}

interface LogHourFormProps {
  initialDescription?: string;
  initialSelectedGroup?: number;
  initialCurrentDate?: string;
  initialHours?: string;
  onClickSave: OnButtonClickEventFunction;
  onClickCancel: OnButtonClickEventFunction;
}

interface LogHourForm {
  id?: string;
  userId: number;
  groupId?: number;
  description?: string;
  spent_time?: number;
  timestamp: string;
}

const LogHourForm: FunctionComponent<LogHourFormProps> = ({
  initialDescription = "",
  initialSelectedGroup,
  initialCurrentDate = formatDate(new Date()),
  initialHours = "",
  onClickSave,
  onClickCancel
}) => {
  const { state } = useContext(AppContext);
  const [groups, setGroups] = useState<IGroup[]>([]);
  const [description, setDescription] = useState<string>(initialDescription);
  const [selectedGroup, setSelectedGroup] = useState<number | undefined>(
    initialSelectedGroup
  );
  const [currentDate, setCurrentDate] = useState<string>(initialCurrentDate);
  const [hours, setHours] = useState<string>(initialHours);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const currentUser = state.user;

  const onSuccessGetGroups = (newGroups: IGroup[]) => {
    setGroups(newGroups);
  };

  useIonViewDidEnter(() => {
    clearData();
    getGroups(currentUser.id, onSuccessGetGroups);
  });

  const clearData = () => {
    setDescription(initialDescription);
    setSelectedGroup(initialSelectedGroup);
    setCurrentDate(initialCurrentDate);
    setHours(initialHours);
    setIsDisabled(isEmptyString(initialHours));
  };

  const getLogForm = () => {
    return {
      userId: currentUser.id,
      groupId: selectedGroup,
      description,
      spent_time: parseInt(hours),
      timestamp: currentDate
    };
  };

  const handleOnClickSave = () => {
    onClickSave(getLogForm());
  };

  const handleOnClickCancel = () => {
    onClickCancel(getLogForm());
  };

  const validateSpentTime = (e: FormEvent<HTMLIonInputElement>) => {
    const disabled = isEmptyString(e.currentTarget.value) || isValidNumber(selectedGroup);

    setIsDisabled(disabled);
    handleInputElement(setHours)(e);
  };

  const validateSelectedGroup = (e: CustomEvent<InputChangeEventDetail | SelectChangeEventDetail>) => {
    const disabled = isEmptyString(hours) || isValidNumber(e.detail.value);

    setIsDisabled(disabled);
    handleInput(setSelectedGroup)(e)
  };

  const compareGroups = (group1: IGroup, group2: IGroup): boolean => {
    if (group1 && group2) {
      if (group1.id && group2.id) {
        return group1.id === group2.id;
      }
      return group1 === group2;
    }
    return false;
  };

  return (
    <IonContent className="ion-text-center ion-padding">
      <IonList>
        <IonText className="input__text--font" color="identity">
          {LOG_HOUR_FORM_TEXTS.INPUT_DESCRIPTION_TEXT}
        </IonText>
        <IonItem className="list__item list__item--margin">
          <IonInput
            name="description"
            className="ion-text-center"
            placeholder={LOG_HOUR_FORM_TEXTS.INPUT_PLACEHOLDER_DESCRIPTION_TEXT}
            type="text"
            maxlength={100}
            value={description}
            onIonChange={handleInput(setDescription)}
          />
        </IonItem>
        <IonText className="input__text--font" color="identity">
          {LOG_HOUR_FORM_TEXTS.INPUT_SELECT_GROUP_TEXT}
        </IonText>
        <IonItem className="list__item--container list__item list__item--margin">
          <IonSelect
            name="group"
            className="ion-text-center item__select--container"
            color="identity"
            value={selectedGroup}
            onIonChange={validateSelectedGroup}
            compareWith={compareGroups}
            okText="Ok"
            cancelText="Cancel"
            placeholder={LOG_HOUR_FORM_TEXTS.INPUT_PLACEHOLDER_GROUP_TEXT}
          >
            {groups.map(({ id, name }) => (
              <IonSelectOption
                selected={selectedGroup === id}
                key={id}
                value={id}
              >
                {name}
              </IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>
        <IonText className="input__text--font" color="identity">
          {LOG_HOUR_FORM_TEXTS.INPUT_DATE_TEXT}
        </IonText>
        <IonItem className="list__item list__item--margin">
          <IonDatetime
            name="currentDate"
            className="input__datetime"
            color="identity"
            displayFormat="MM/DD/YYYY"
            value={currentDate}
            onIonChange={handleInputDatetime(setCurrentDate)}
            placeholder={LOG_HOUR_FORM_TEXTS.INPUT_PLACEHOLDER_DATE_TEXT}
          />
        </IonItem>
        <IonText className="input__text--font" color="identity">
          {LOG_HOUR_FORM_TEXTS.INPUT_SPENT_TIME_TEXT}
        </IonText>
        <IonItem className="list__item list__item--margin">
          <IonInput
            name="hour"
            className="ion-text-center"
            placeholder={LOG_HOUR_FORM_TEXTS.INPUT_PLACEHOLDER_SPENT_TIME_TEXT}
            type="number"
            value={hours}
            min="0"
            onInput={validateSpentTime}
            onKeyPress={handleInputOnlyNumber}
            required
          />
        </IonItem>
      </IonList>
      <IonFooter>
        <IonButtons className="toolbar__buttons--container">
          <IonButton
            className="buttons__button"
            color="identity"
            onClick={handleOnClickSave}
            disabled={isDisabled}
          >
            {LOG_HOUR_FORM_TEXTS.BUTTON_SAVE_TEXT}
          </IonButton>
          <IonButton
            className="buttons__button"
            color="danger"
            onClick={handleOnClickCancel}
          >
            {LOG_HOUR_FORM_TEXTS.BUTTON_CANCEL_TEXT}
          </IonButton>
        </IonButtons>
      </IonFooter>
    </IonContent>
  );
};

export default LogHourForm;
