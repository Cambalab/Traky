import { OverviewState } from "../utils/declarations";
import { Action } from "./actions";
import { sortByDate } from "../utils/utils";
import { LOGIN_SETTINGS_TYPE } from "../pages/LoginSettings/constants";

export function reducer(state: OverviewState, action: Action): OverviewState {
  switch (action.type) {
    case "UPDATE_LIST": {
      return { ...state, loggedHours: sortByDate(action.payload), hasError: false };
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
      return { ...state, isLogged: false };
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
      return { ...state, notificationOptions: action.payload }
    }
    case "SHOW_NOTIFICATION": {
      return { ...state, showNotification: action.payload }
    }
    case "SET_SETTINGS": {
      return { ...state, settings: action.payload, isSettings: true }
    }
    case LOGIN_SETTINGS_TYPE.SAVE_LOGIN_SETTINGS_ACTION: {
      return {
        ...state,
        settings: action.payload.loginSettings,
        notificationOptions: action.payload.notificationOptions,
        showNotification: true
      }
    }
    default:
      return state;
  }
}
