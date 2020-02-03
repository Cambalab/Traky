import { INotificationOptions } from "../../utils/declarations";
import { Action } from "../actions";
import { LOGS_TYPES } from "./logs";
import {
  NOTIFICATION_MESSAGES,
  NOTIFICATION_TYPE
} from "../../utils/constants";
import { SETTINGS_TYPES } from "./settings";
import { USER_TYPES } from "./user";
import { KEY_VALIDATION_PAGE_TEXTS } from "../../pages/KeyInstructions/constants";

export interface NotificationState {
  showNotification: boolean;
  notificationOptions: INotificationOptions;
}

export enum NOTIFICATION_TYPES {
  SHOW_NOTIFICATION_ACTION = "SHOW_NOTIFICATION_ACTION",
  HIDE_NOTIFICATION_ACTION = "HIDE_NOTIFICATION_ACTION"
}

export type SHOW_NOTIFICATION_ACTION = {
  type: NOTIFICATION_TYPES.SHOW_NOTIFICATION_ACTION;
  payload: INotificationOptions;
};

export type HIDE_NOTIFICATION_ACTION = {
  type: NOTIFICATION_TYPES.HIDE_NOTIFICATION_ACTION;
};

export type NotificationAction =
  | SHOW_NOTIFICATION_ACTION
  | HIDE_NOTIFICATION_ACTION;

const initialNotificationState: NotificationState = {
  showNotification: false,
  notificationOptions: {
    color: "danger",
    duration: 2000,
    header: "",
    message: ""
  }
};

export const getInitialNotificationState = () => initialNotificationState;

export const notification = (
  state: NotificationState = initialNotificationState,
  action: Action
): NotificationState => {
  switch (action.type) {
    case NOTIFICATION_TYPES.SHOW_NOTIFICATION_ACTION: {
      return {
        ...state,
        notificationOptions: action.payload,
        showNotification: true
      };
    }
    case NOTIFICATION_TYPES.HIDE_NOTIFICATION_ACTION: {
      return { ...state, showNotification: false };
    }
    // case LOGS_TYPES.FETCH_LOGS_SUCCESSFUL_ACTION: {
    //     return {
    //         ...state,
    //         notificationOptions: {
    //             header: NOTIFICATION_MESSAGES.FETCH_HOURS_ERROR_HEADER,
    //             message: NOTIFICATION_MESSAGES.FETCH_HOURS_ERROR_BODY,
    //             color: NOTIFICATION_TYPE.ERROR
    //         },
    //         showNotification: true
    //     }
    // }
    case LOGS_TYPES.REMOVE_LOG_SUCCESSFUL_ACTION: {
      return {
        ...state,
        notificationOptions: {
          header: NOTIFICATION_MESSAGES.DELETE_HOUR_SUCCESS_HEADER,
          message: NOTIFICATION_MESSAGES.DELETE_HOUR_SUCCESS_BODY,
          color: NOTIFICATION_TYPE.SUCCESS
        },
        showNotification: true
      };
    }
    case LOGS_TYPES.REMOVE_LOG_ERROR_ACTION: {
      return {
        ...state,
        notificationOptions: {
          header: NOTIFICATION_MESSAGES.DELETE_HOUR_ERROR_HEADER,
          message: NOTIFICATION_MESSAGES.DELETE_HOUR_ERROR_BODY,
          color: NOTIFICATION_TYPE.ERROR
        },
        showNotification: true
      };
    }
    case SETTINGS_TYPES.FETCH_SETTINGS_ERROR_ACTION: {
      return {
        ...state,
        notificationOptions: {
          header: NOTIFICATION_MESSAGES.GET_STORAGE_KEY_HEADER,
          message: NOTIFICATION_MESSAGES.GET_STORAGE_KEY_BODY,
          color: NOTIFICATION_TYPE.ERROR
        },
        showNotification: true
      };
    }
    case SETTINGS_TYPES.SAVE_SETTINGS_SUCCESSFUL_ACTION: {
      return {
        ...state,
        notificationOptions: {
          header: NOTIFICATION_MESSAGES.SAVE_SETTINGS_SUCCESS_HEADER,
          message: NOTIFICATION_MESSAGES.SAVE_SETTINGS_SUCCESS_BODY,
          color: NOTIFICATION_TYPE.SUCCESS
        },
        showNotification: true
      };
    }
    case USER_TYPES.LOGIN_USER_ERROR_ACTION: {
      return {
        ...state,
        notificationOptions: {
          header: KEY_VALIDATION_PAGE_TEXTS.KEY_VALIDATION_ERROR_HEADER,
          message: KEY_VALIDATION_PAGE_TEXTS.KEY_VALIDATION_ERROR_MESSAGE,
          color: NOTIFICATION_TYPE.ERROR
        },
        showNotification: true
      };
    }
    case LOGS_TYPES.UPDATE_LOG_SUCCESSFUL_ACTION: {
      return {
        ...state,
        notificationOptions: {
          header: NOTIFICATION_MESSAGES.EDIT_HOUR_SUCCESS_HEADER,
          message: NOTIFICATION_MESSAGES.EDIT_HOUR_SUCCESS_BODY,
          color: NOTIFICATION_TYPE.SUCCESS
        },
        showNotification: true
      };
    }
    case LOGS_TYPES.UPDATE_LOG_ERROR_ACTION: {
      return {
        ...state,
        notificationOptions: {
          header: NOTIFICATION_MESSAGES.EDIT_HOUR_ERROR_HEADER,
          message: NOTIFICATION_MESSAGES.EDIT_HOUR_ERROR_BODY,
          color: NOTIFICATION_TYPE.ERROR
        },
        showNotification: true
      };
    }
    case LOGS_TYPES.ADD_LOG_SUCCESSFUL_ACTION: {
      return {
        ...state,
        notificationOptions: {
          header: NOTIFICATION_MESSAGES.NEW_HOUR_SUCCESS_HEADER,
          message: NOTIFICATION_MESSAGES.NEW_HOUR_SUCCESS_BODY,
          color: NOTIFICATION_TYPE.SUCCESS
        },
        showNotification: true
      };
    }
    case LOGS_TYPES.ADD_LOG_ERROR_ACTION: {
      return {
        ...state,
        notificationOptions: {
          header: NOTIFICATION_MESSAGES.NEW_HOUR_ERROR_HEADER,
          message: NOTIFICATION_MESSAGES.NEW_HOUR_ERROR_BODY,
          color: NOTIFICATION_TYPE.ERROR
        },
        showNotification: true
      };
    }
    case USER_TYPES.LOGOUT_USER_ACTION: {
      return initialNotificationState;
    }
    default:
      return state;
  }
};
