import {
  ILogs,
  IUser,
  INotificationOptions,
  IGroup,
  ILoginSettings
} from "../utils/declarations";
import {
  ERROR_LOGIN_SETTINGS_ACTION,
  SAVE_LOGIN_SETTINGS_ACTION,
  SET_KEY_ACTION
} from "../pages/LoginSettings/constants";
import {COPY_CLIPBOARD_ACTION} from "../pages/KeyInstructions/constants";

export type UPDATE_LIST_ACTION = {
  type: "UPDATE_LIST",
  payload: ILogs[]
}

export type UPDATE_LOADING = {
  type: "UPDATE_LOADING",
  payload: boolean
}

export type LOGIN = {
  type: "LOGIN",
  payload?: boolean
}

export type LOGOUT = {
  type: "LOGOUT";
  payload?: boolean;
}

export type UPDATE_ERROR = {
  type: "UPDATE_ERROR",
  payload: boolean
}

export type SET_USER = {
  type: "SET_USER";
  payload: IUser;
}

export type NOTIFICATION = {
  type: "NOTIFICATION";
  payload: INotificationOptions;
}

export type SHOW_NOTIFICATION = {
  type: "SHOW_NOTIFICATION";
  payload: boolean;
}

export type UPDATE_GROUPS = {
  type: "UPDATE_GROUPS";
  payload: IGroup[];
}
export type SET_SETTINGS = {
  type: "SET_SETTINGS";
  payload: ILoginSettings;
}

export type Action =
  | UPDATE_LIST_ACTION
  | UPDATE_LOADING
  | LOGIN
  | LOGOUT
  | UPDATE_ERROR
  | SET_USER
  | NOTIFICATION
  | SHOW_NOTIFICATION
  | UPDATE_GROUPS
  | SET_SETTINGS
  | SAVE_LOGIN_SETTINGS_ACTION
  | ERROR_LOGIN_SETTINGS_ACTION
  | SET_KEY_ACTION
  | COPY_CLIPBOARD_ACTION
