import { ILoginSettings, INotificationOptions } from "../../utils/declarations";
import { NOTIFICATION_MESSAGES, NOTIFICATION_TYPE } from "../../utils/constants";

export enum LOGIN_SETTINGS_TYPE {
  SAVE_LOGIN_SETTINGS_ACTION = "SAVE_LOGIN_SETTINGS_ACTION",
  ERROR_LOGIN_SETTINGS_ACTION = "ERROR_LOGIN_SETTINGS_ACTION"
}

export interface ILoginSettingsAction {
  type: LOGIN_SETTINGS_TYPE;
}

export interface SAVE_LOGIN_SETTINGS_ACTION extends ILoginSettingsAction {
  type: LOGIN_SETTINGS_TYPE.SAVE_LOGIN_SETTINGS_ACTION,
  payload: {
    loginSettings: ILoginSettings,
    notificationOptions: INotificationOptions,
    key: string
  }
}

export const createSaveLoginSettingsAction = (body: ILoginSettings, key: string): SAVE_LOGIN_SETTINGS_ACTION => ({
  type: LOGIN_SETTINGS_TYPE.SAVE_LOGIN_SETTINGS_ACTION,
  payload: {
    loginSettings: body,
    notificationOptions: {
      header: NOTIFICATION_MESSAGES.SAVE_SETTINGS_SUCCESS_HEADER,
      message: NOTIFICATION_MESSAGES.SAVE_SETTINGS_SUCCESS_BODY,
      color: NOTIFICATION_TYPE.SUCCESS
    },
    key
  }
});

export interface ERROR_LOGIN_SETTINGS_ACTION extends ILoginSettingsAction {
  type: LOGIN_SETTINGS_TYPE.ERROR_LOGIN_SETTINGS_ACTION,
  payload: {
    notificationOptions: INotificationOptions
  }
}

export const createErrorLoginSettingsAction = (): ERROR_LOGIN_SETTINGS_ACTION => ({
  type: LOGIN_SETTINGS_TYPE.ERROR_LOGIN_SETTINGS_ACTION,
  payload: {
    notificationOptions: {
      header: NOTIFICATION_MESSAGES.SAVE_SETTINGS_ERROR_HEADER,
      message: NOTIFICATION_MESSAGES.SAVE_SETTINGS_ERROR_BODY,
      color: NOTIFICATION_TYPE.ERROR
    }
  }
});
