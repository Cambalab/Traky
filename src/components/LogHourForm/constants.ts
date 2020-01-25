
export interface LogHourFormTexts {
  INPUT_DESCRIPTION_TEXT: string;
  INPUT_PLACEHOLDER_DESCRIPTION_TEXT: string;
  INPUT_SELECT_GROUP_TEXT: string;
  INPUT_PLACEHOLDER_GROUP_TEXT: string;
  INPUT_DATE_TEXT: string;
  INPUT_PLACEHOLDER_DATE_TEXT: string;
  INPUT_SPENT_TIME_TEXT: string;
  INPUT_PLACEHOLDER_SPENT_TIME_TEXT: string;
  BUTTON_SAVE_TEXT: string;
  BUTTON_CANCEL_TEXT: string;
}
export const LOG_HOUR_FORM_TEXTS: LogHourFormTexts = {
  INPUT_DESCRIPTION_TEXT: "Description",
  INPUT_PLACEHOLDER_DESCRIPTION_TEXT: "Enter your description",
  INPUT_SELECT_GROUP_TEXT: "Group",
  INPUT_PLACEHOLDER_GROUP_TEXT: "Select a Group",
  INPUT_DATE_TEXT: "Date",
  INPUT_PLACEHOLDER_DATE_TEXT: "Enter your date",
  INPUT_SPENT_TIME_TEXT: "Spent Time",
  INPUT_PLACEHOLDER_SPENT_TIME_TEXT: "Enter your spent time",
  BUTTON_SAVE_TEXT: "Save",
  BUTTON_CANCEL_TEXT: "Cancel"
};

export const createStringDateFromNumber = (duration: number): string => {
  return String(new Date(duration));
};

export const createNumberFromStringDate = (date: string): number => {
  return new Date(date).valueOf();
};
