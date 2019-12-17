/* Identifiers */

/* LIST --> Logged hours list screen */
/* NEW --> Log new hour screen */
/* EDIT --> Edit logged hour screen */

export interface AppConfig {
  API_ENDPOINT: string;
}

export const CONFIG: AppConfig = {
  API_ENDPOINT: process.env.REACT_APP_BASE_API_URL
    ? process.env.REACT_APP_BASE_API_URL
    : "https://traky-ionic-react.herokuapp.com/api/"
};

export interface URL_CONFIG {
  name: string;
  path: string;
}

export const LOGS_LIST_URL_CONFIG: URL_CONFIG = {
  name: "My hours",
  path: "/list"
};
export const LOGS_NEW_URL_CONFIG: URL_CONFIG = {
  name: "New log",
  path: "/new"
};
export const LOGS_LOGIN_URL_CONFIG: URL_CONFIG = {
  name: "Login",
  path: "/login"
};
export const LOGS_EDIT_URL_CONFIG: URL_CONFIG = {
  name: "Edit",
  path: "/edit/:data"
};
export const LOGS_LOGOUT_URL_CONFIG: URL_CONFIG = {
  name: "Log Out",
  path: "/"
};

export const URL_CONFIG: { [key: string]: URL_CONFIG } = {
  LOGS_LIST_URL_CONFIG,
  LOGS_NEW_URL_CONFIG,
  LOGS_LOGIN_URL_CONFIG,
  LOGS_EDIT_URL_CONFIG,
  LOGS_LOGOUT_URL_CONFIG
};

export const NOTIFICATION_MESSAGES = {
  AUTH_ERROR_HEADER: "Authentication Error",
  AUTH_ERROR_BODY: "Username or Password are wrong",
  NEW_HOUR_ERROR_HEADER: "Save Error",
  NEW_HOUR_ERROR_BODY: "Verify that each data is Ok",
  EDIT_HOUR_ERROR_HEADER: "Edit Error",
  EDIT_HOUR_ERROR_BODY: "Can't edit hour",
  DELETE_HOUR_ERROR_HEADER: "Delete Error",
  DELETE_HOUR_ERROR_BODY: "Can't delete hour",
  FETCH_HOURS_ERROR_HEADER: "Fetch Error",
  FETCH_HOURS_ERROR_BODY: "Don't fetch data from server",
  NEW_HOUR_SUCCESS_HEADER: "Save Success",
  NEW_HOUR_SUCCESS_BODY: "The hour has been saved successfuly",
  EDIT_HOUR_SUCCESS_HEADER: "Edit Success",
  EDIT_HOUR_SUCCESS_BODY: "The hour has been edited successfuly",
  DELETE_HOUR_SUCCESS_HEADER: "Delete Success",
  DELETE_HOUR_SUCCESS_BODY: "The hour has been deleted successfuly"
};

export const NOTIFICATION_TYPE = {
  ERROR: "danger",
  SUCCESS: "success",
  WARNING: "warning"
};

export const DATE_FORMAT = "MM/DD/YYYY";
export const HOUR_FORMAT = "h:mm";
