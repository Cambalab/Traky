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
  LOGS_LOGOUT_URL_CONFIG,
};

export const DATE_FORMAT = "MM/DD/YYYY";
