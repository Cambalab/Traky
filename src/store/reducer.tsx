import { OverviewState } from "../utils/declarations";
import { Action } from "./actions";
import {sortByDate} from "../utils/utils";

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
      return { ...state, isLoged: true };
    }
    case "LOGOUT": {
      return { ...state, isLoged: false };
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
    case "GO_BACK": {
        const { localHistory } = state;
        if (localHistory != null) {
          localHistory.goBack()
        }
      return { ...state, localHistory: localHistory}
    }
    case "SET_HISTORY": {
      return { ...state, localHistory: action.payload}
    }
    default:
      return state;
  }
}
