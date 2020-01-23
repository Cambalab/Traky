import { INotificationOptions } from "../../utils/declarations";
import { NOTIFICATION_TYPE } from "../../utils/constants";

export interface KeyValidationPageTexts {
  KEY_VALIDATION_ERROR_MESSAGE: string;
  KEY_VALIDATION_ERROR_HEADER: string;
  HEADER_TITLE: string;
  FIRST_STEP: string;
  SECOND_STEP: string;
  THIRD_STEP: string;
  FOURTH_STEP: string;
  TITLE: string;
  INSTRUCTIONS: string;
  FIRST_STEP_TITLE: string;
  SECOND_STEP_TITLE: string;
  THIRD_STEP_TITLE: string;
  FINISHING: string;
  COPY_CLIPBOARD_HEADER: string;
  COPY_CLIPBOARD_MESSAGE: string;
}
export const KEY_VALIDATION_PAGE_TEXTS: KeyValidationPageTexts = {
  KEY_VALIDATION_ERROR_HEADER: "Invalid Key Error",
  KEY_VALIDATION_ERROR_MESSAGE: "This key is not validated",
  HEADER_TITLE: "Validate your key",
  TITLE: "Click to copy your new key",
  INSTRUCTIONS: "Follow the guide to connect with your Tryton account",
  FIRST_STEP_TITLE: "STEP 1",
  SECOND_STEP_TITLE: "STEP 2",
  THIRD_STEP_TITLE: "STEP 3",
  FIRST_STEP: "Login into your Tryton account",
  SECOND_STEP:
    "Go to Preferences, on Tab Application click on marked icon to add your key",
  THIRD_STEP: "Paste your key and validate it",
  FOURTH_STEP: "Press this button and lets start log your hours:)",
  FINISHING: "Your are ready to start log your hours",
  COPY_CLIPBOARD_HEADER: "Key copied",
  COPY_CLIPBOARD_MESSAGE: "Your key was copied on your clipboard"
};

export enum KEY_INSTRUCTIONS_TYPE {
  NOTIFICATION = "NOTIFICATION",
  COPY_CLIPBOARD_ACTION = "COPY_CLIPBOARD_ACTION"
}
export interface IKeyInstructionsAction {
  type: KEY_INSTRUCTIONS_TYPE;
}

export interface COPY_CLIPBOARD_ACTION extends IKeyInstructionsAction {
  type: KEY_INSTRUCTIONS_TYPE.COPY_CLIPBOARD_ACTION;
  payload: INotificationOptions;
}

export const createCopyClipboardAction = (): COPY_CLIPBOARD_ACTION => ({
  type: KEY_INSTRUCTIONS_TYPE.COPY_CLIPBOARD_ACTION,
  payload: {
    header: KEY_VALIDATION_PAGE_TEXTS.COPY_CLIPBOARD_HEADER,
    message: KEY_VALIDATION_PAGE_TEXTS.COPY_CLIPBOARD_MESSAGE,
    color: NOTIFICATION_TYPE.SUCCESS
  }
});
