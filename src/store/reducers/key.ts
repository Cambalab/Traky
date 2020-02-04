import { Action } from "../actions";
import { USER_TYPES } from "./user";

export interface KeyState {
  key: string;
  isLoading: boolean;
  isFirstTime: boolean;
}

export enum KEY_TYPES {
  FETCH_KEY_START_ACTION = "FETCH_KEY_START_ACTION",
  FETCH_KEY_SUCCESSFUL_ACTION = "FETCH_KEY_SUCCESSFUL_ACTION",
  FETCH_KEY_ERROR_ACTION = "FETCH_KEY_ERROR_ACTION",
  SAVE_KEY_SUCCESSFUL_ACTION = "SAVE_KEY_SUCCESSFUL_ACTION",
  NOT_FIRST_TIME_ACTION = "NOT_FIRST_TIME_ACTION"
}

export type FETCH_KEY_START_ACTION = {
  type: KEY_TYPES.FETCH_KEY_START_ACTION;
};

export type FETCH_KEY_SUCCESSFUL_ACTION = {
  type: KEY_TYPES.FETCH_KEY_SUCCESSFUL_ACTION;
  payload: string;
};

export type FETCH_KEY_ERROR_ACTION = {
  type: KEY_TYPES.FETCH_KEY_ERROR_ACTION;
};

export type SAVE_KEY_SUCCESSFUL_ACTION = {
  type: KEY_TYPES.SAVE_KEY_SUCCESSFUL_ACTION;
  payload: string;
};

export type NOT_FIRST_TIME_ACTION = {
  type: KEY_TYPES.NOT_FIRST_TIME_ACTION;
};

export type KeyAction =
  | FETCH_KEY_START_ACTION
  | FETCH_KEY_SUCCESSFUL_ACTION
  | FETCH_KEY_ERROR_ACTION
  | SAVE_KEY_SUCCESSFUL_ACTION
  | NOT_FIRST_TIME_ACTION;

const initialKeyState = {
  key: "",
  isLoading: false,
  isFirstTime: false
};

export const getInitialKeyState = () => initialKeyState;

export const key = (
  state: KeyState = initialKeyState,
  action: Action
): KeyState => {
  switch (action.type) {
    case KEY_TYPES.FETCH_KEY_START_ACTION: {
      return { ...state, isLoading: true };
    }
    case KEY_TYPES.FETCH_KEY_SUCCESSFUL_ACTION: {
      return { ...state, key: action.payload, isLoading: false };
    }
    case KEY_TYPES.FETCH_KEY_ERROR_ACTION: {
      return { ...state, isLoading: false };
    }
    case KEY_TYPES.NOT_FIRST_TIME_ACTION: {
      return { ...state, isFirstTime: false };
    }
    case KEY_TYPES.SAVE_KEY_SUCCESSFUL_ACTION: {
      return { ...state, key: action.payload, isFirstTime: true };
    }
    case USER_TYPES.LOGOUT_USER_ACTION: {
      return initialKeyState;
    }
    default:
      return state;
  }
};
