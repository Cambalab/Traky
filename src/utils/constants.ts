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
    : "http://localhost:3000/api/"
};

export interface URL_CONFIG {
  name: string;
  path: string;
  params?: string;
}

export const LOGS_LIST_URL_CONFIG: URL_CONFIG = {
  name: "My hours",
  path: "/list"
};
export const LOGS_NEW_URL_CONFIG: URL_CONFIG = {
  name: "New log",
  path: "/new"
};

export const KEY_VALIDATION_URL_CONFIG: URL_CONFIG = {
  name: "Key validation",
  path: "/mykey"
};

export const KEY_INSTRUCTIONS_URL_CONFIG: URL_CONFIG = {
  name: "Login instructions",
  path: "/instructions"
};

export const LOGS_LOGIN_URL_CONFIG: URL_CONFIG = {
  name: "Login",
  path: "/login"
};
export const LOGS_EDIT_URL_CONFIG: URL_CONFIG = {
  name: "Edit",
  path: "/edit/:id",
  params: ":id"
};
export const LOGS_LOGOUT_URL_CONFIG: URL_CONFIG = {
  name: "Log Out",
  path: "/"
};
export const LOGS_SETTINGS_URL_CONFIG: URL_CONFIG = {
  name: "Login Settings",
  path: "/login"
};

export const URL_CONFIG: { [key: string]: URL_CONFIG } = {
  LOGS_LIST_URL_CONFIG,
  LOGS_NEW_URL_CONFIG,
  LOGS_LOGIN_URL_CONFIG,
  LOGS_EDIT_URL_CONFIG,
  LOGS_LOGOUT_URL_CONFIG,
  LOGS_SETTINGS_URL_CONFIG,
  KEY_VALIDATION_URL_CONFIG,
  KEY_INSTRUCTIONS_URL_CONFIG
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
  NEW_HOUR_SUCCESS_BODY: "The hour has been saved successfully",
  EDIT_HOUR_SUCCESS_HEADER: "Edit Success",
  EDIT_HOUR_SUCCESS_BODY: "The hour has been edited successfully",
  DELETE_HOUR_SUCCESS_HEADER: "Delete Success",
  DELETE_HOUR_SUCCESS_BODY: "The hour has been deleted successfully",
  SAVE_SETTINGS_SUCCESS_HEADER: "Key Generated Successfully",
  SAVE_SETTINGS_SUCCESS_BODY:
    "Your Application Key was generated successfully, go to validate It",
  SAVE_SETTINGS_ERROR_HEADER: "Error Generating Key",
  SAVE_SETTINGS_ERROR_BODY:
    "There is something wrong with your settings, please change them and try again",
  GET_STORAGE_KEY_HEADER: "Error Getting Key",
  GET_STORAGE_KEY_BODY: "There is none key in the Storage. Please generate a new key."
};

export const NOTIFICATION_TYPE = {
  ERROR: "danger",
  SUCCESS: "success",
  WARNING: "warning"
};

export const DATE_FORMAT = "MM/DD/YYYY";
export const DATE_FORMAT_COMPLETE = "YYYY-MM-DDTHH:mm:ss.SSSZ";
export const HOUR_FORMAT = "H:mm";
export const HOUR_FORMAT_DOUBLE_NUMBER = "HH:mm";
export const VALID_HOUR_VALUES = "0,1,2,3,4,5,6,7,8";
export const TRYTON_LINE_DATE_FORMAT = "YYYY-MM-DD";

export const APPLICATION_NAME = {
  TIMESHEET: "timesheet"
};

export const GENERATE_KEY_MESSAGE = "Generating key...";

export const GET_STORAGE_KEY = "Getting key of the Storage...";
