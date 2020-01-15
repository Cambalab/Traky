import { ILoginSettings, INotificationOptions } from "../../utils/declarations";
import { NOTIFICATION_MESSAGES, NOTIFICATION_TYPE } from "../../utils/constants";

export enum LOGIN_SETTINGS_TYPE {
  SAVE_LOGIN_SETTINGS_ACTION = "SAVE_LOGIN_SETTINGS_ACTION"
}

export type SAVE_LOGIN_SETTINGS_ACTION = {
  type: LOGIN_SETTINGS_TYPE.SAVE_LOGIN_SETTINGS_ACTION,
  payload: {
    loginSettings: ILoginSettings,
    notificationOptions: INotificationOptions
  }
}

export const createSaveLoginSettingsAction = (body: ILoginSettings) => ({
  type: LOGIN_SETTINGS_TYPE.SAVE_LOGIN_SETTINGS_ACTION,
  payload: {
    loginSettings: body,
    notificationOptions: {
      header: NOTIFICATION_MESSAGES.SAVE_SETTINGS_SUCCES_HEADER,
      message: NOTIFICATION_MESSAGES.SAVE_SETTINGS_SUCCES_BODY,
      color: NOTIFICATION_TYPE.SUCCESS
    }
  }
});
