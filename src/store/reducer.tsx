import {ILogs, OverviewState} from "../utils/declarations";
import {Action} from "./actions";
import {sortByDate} from "../utils/utils";
import {LOGIN_SETTINGS_TYPE} from "../pages/LoginSettings/constants";
import {KEY_INSTRUCTIONS_TYPE} from "../pages/KeyInstructions/constants";
import {EDIT_HOUR_TYPE} from "../pages/EditHour/constants";

const updateLoggedHour = (loggedHours: ILogs[], editedHour: ILogs) => {
  return loggedHours.map((hour) => (hour.id === editedHour.id ? editedHour : hour));
};

export function reducer(state: OverviewState, action: Action): OverviewState {
  switch (action.type) {
    case "UPDATE_LIST": {
      return {
        ...state,
        loggedHours: sortByDate(action.payload),
        hasError: false
      };
    }
    case "UPDATE_LOADING": {
      return { ...state, isLoading: action.payload, hasError: false };
    }
    case "UPDATE_ERROR": {
      return { ...state, hasError: action.payload };
    }
    case "LOGIN": {
      return { ...state, isLogged: true };
    }
    case "LOGOUT": {
      return { ...state, isLogged: false, key: "", settings: { serverAddress: "", database: "", username: "" } };
    }
    case "SET_USER": {
      return {
        ...state,
        user: { id: action.payload.id, name: action.payload.name }
      };
    }
    case "UPDATE_GROUPS": {
      return { ...state, groups: action.payload };
    }
    case "NOTIFICATION": {
      return { ...state, notificationOptions: action.payload };
    }
    case "SHOW_NOTIFICATION": {
      return { ...state, showNotification: action.payload };
    }
    case "SET_SETTINGS": {
      return { ...state, settings: action.payload, isSettings: true };
    }
    case LOGIN_SETTINGS_TYPE.SET_KEY_ACTION: {
      return { ...state, key: action.payload, isLogged: true };
    }
    case LOGIN_SETTINGS_TYPE.SAVE_LOGIN_SETTINGS_ACTION: {
      return {
        ...state,
        settings: action.payload.loginSettings,
        key: action.payload.key,
        notificationOptions: action.payload.notificationOptions,
        showNotification: true,
        isLogged: true
      }
    }
    case LOGIN_SETTINGS_TYPE.ERROR_LOGIN_SETTINGS_ACTION: {
      return {
        ...state,
        notificationOptions: action.payload.notificationOptions,
        showNotification: true
      };
    }
    case KEY_INSTRUCTIONS_TYPE.COPY_CLIPBOARD_ACTION: {
      return {
          ...state,
        notificationOptions: action.payload,
        showNotification: true
      }
    }
    case EDIT_HOUR_TYPE.SUCCESSFUL_ACTION: {
      return {
        ...state,
        loggedHours: updateLoggedHour(state.loggedHours, action.payload.log),
        notificationOptions: action.payload.notificationOptions,
        showNotification: true
      }
    }
    default:
      return state;
  }
}
