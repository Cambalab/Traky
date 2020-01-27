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
import React, {
  FunctionComponent,
  useState
} from "react";
import "./LogHourForm.css";
import { IGroup, ILogs } from "../../utils/declarations";
import {
  formatDate,
  handleInput,
  handleInputDatetime,
  handleInputHour
} from "../../utils/inputHandle";
import { createNumberFromStringDate, createStringDateFromNumber, LOG_HOUR_FORM_TEXTS } from "./constants";
import {
  InputChangeEventDetail,
  SelectChangeEventDetail,
  DatetimeChangeEventDetail
} from "@ionic/core";
import { isEmptyString, isValidNumber, compareGroups } from "../../utils/utils";
import {
  HOUR_FORMAT,
  DATE_FORMAT,
  VALID_HOUR_VALUES
} from "../../utils/constants";

interface OnButtonClickEventFunction extends Function {
  (body: ILogs): void;
}

interface LogHourFormProps {
  onClickSave: OnButtonClickEventFunction;
  onClickCancel: Function;
  groups: IGroup[];
  logHour?: ILogs
}

const LogHourForm: FunctionComponent<LogHourFormProps> = ({
  onClickSave,
  onClickCancel,
  groups,
  logHour
}) => {
  const initialDescription = logHour ? logHour.description : '';
  const [description, setDescription] = useState<string>(initialDescription);

  const initialSelectedGroup = logHour && logHour.groupId;
  const [selectedGroup, setSelectedGroup] = useState<number | undefined>(initialSelectedGroup);

  const initialCurrentDate = formatDate(logHour ? logHour.timestamp : new Date());
  const [currentDate, setCurrentDate] = useState<string>(initialCurrentDate);

  const initialHours = logHour ? createStringDateFromNumber(logHour.duration) : '';
  const [hours, setHours] = useState<string>(initialHours);

  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  useIonViewDidEnter(() => {
    clearData();
  });

  const clearData = () => {
    setDescription(initialDescription);
    setSelectedGroup(initialSelectedGroup);
    setCurrentDate(initialCurrentDate);
    setHours(initialHours);
    setIsDisabled(isEmptyString(initialHours));
  };

  const getLogForm = (): ILogs | null => {
    if (!selectedGroup) {
      return null;
    }
    return {
      ...logHour,
      groupId: selectedGroup,
      duration: createNumberFromStringDate(hours),
      timestamp: currentDate,
      description
    };
  };

  const handleOnClickSave = () => {
    const logForm = getLogForm();

    logForm && onClickSave(logForm);
  };

  const handleOnClickCancel = () => {
    onClickCancel();
  };

  const validateSpentTime = (e: CustomEvent<DatetimeChangeEventDetail>) => {
    const disabled =
      isEmptyString(e.detail.value) || isValidNumber(selectedGroup);

    setIsDisabled(disabled);
    handleInputHour(setHours)(e);
  };

  const validateSelectedGroup = (
    e: CustomEvent<InputChangeEventDetail | SelectChangeEventDetail>
  ) => {
    const disabled = isEmptyString(hours) || isValidNumber(e.detail.value);

    setIsDisabled(disabled);
    handleInput(setSelectedGroup)(e);
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
            displayFormat={DATE_FORMAT}
            value={currentDate}
            onIonChange={handleInputDatetime(setCurrentDate)}
            placeholder={LOG_HOUR_FORM_TEXTS.INPUT_PLACEHOLDER_DATE_TEXT}
          />
        </IonItem>
        <IonText className="input__text--font" color="identity">
          {LOG_HOUR_FORM_TEXTS.INPUT_SPENT_TIME_TEXT}
        </IonText>
        <IonItem className="list__item list__item--margin">
          <IonDatetime
            display-format={HOUR_FORMAT}
            picker-format={HOUR_FORMAT}
            name="hour"
            hourValues={VALID_HOUR_VALUES}
            className="input__datetime"
            value={hours}
            onIonChange={validateSpentTime}
            placeholder={LOG_HOUR_FORM_TEXTS.INPUT_PLACEHOLDER_SPENT_TIME_TEXT}
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
