import { OverviewState } from "../utils/declarations";
import { Action } from "./actions";

export function reducer(state: OverviewState, action: Action): OverviewState {
  switch (action.type) {
    case "UPDATE_LIST": {
      return { ...state, loggedHours: action.payload };
    }
    case "UPDATE_LOADING": {
      return { ...state, isLoading: action.payload };
    }
    case "UPDATE_ERROR": {
      return { ...state, hasError: action.payload };
    }
    case "LOGIN": {
      return { ...state, isLoged: true };
    }
    case "LOGOUT": {
      return { ...state, isLoged: false }
    }
    case "SET_USER": {
      return { ...state, user: {id: action.payload.id, name: action.payload.name} };
    }
    default:
      return state;
  }
}
