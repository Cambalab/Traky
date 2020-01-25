import {ILogs, INotificationOptions} from "../../utils/declarations";
import {NOTIFICATION_MESSAGES, NOTIFICATION_TYPE} from "../../utils/constants";

export interface EditHourPageTexts {
  HEADER_TITLE: string;
}
export const EDIT_HOUR_PAGE_TEXTS: EditHourPageTexts = {
  HEADER_TITLE: "Edit your hour"
};

export enum EDIT_HOUR_TYPE {
  SUCCESSFUL_ACTION = "SUCCESSFUL_ACTION"
}

export interface EditHourAction {
  type: EDIT_HOUR_TYPE;
}

export interface EDIT_HOUR_SUCCESSFUL_ACTION extends EditHourAction {
  type: EDIT_HOUR_TYPE.SUCCESSFUL_ACTION,
  payload: {
    log: ILogs,
    notificationOptions: INotificationOptions
  }
}

export const createEditSuccessfulAction = (log: ILogs): EDIT_HOUR_SUCCESSFUL_ACTION => ({
  type: EDIT_HOUR_TYPE.SUCCESSFUL_ACTION,
  payload: {
    log,
    notificationOptions: {
      header: NOTIFICATION_MESSAGES.EDIT_HOUR_SUCCESS_HEADER,
      message: NOTIFICATION_MESSAGES.EDIT_HOUR_SUCCESS_BODY,
      color: NOTIFICATION_TYPE.SUCCESS
    }
  }
});
