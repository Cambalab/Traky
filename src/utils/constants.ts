/* Identifiers */

/* LIST --> Logged hours list screen */
/* NEW --> Log new hour screen */
/* EDIT --> Edit logged hour screen */

export interface AppConfig {
  API_ENDPOINT: string;
}

export const CONFIG: AppConfig = {
  API_ENDPOINT: process.env.BASE_URL ? process.env.BASE_URL : 'http://localhost:3000/api/'
};

export interface AppTexts {
  LIST_NO_LOGS_YET_MSG: string;
  LIST_TITLE: string;
  LIST_ERROR_MSG: string;
}
export const TEXTS: AppTexts = {
  LIST_NO_LOGS_YET_MSG: "You dont have any log yet..",
  LIST_ERROR_MSG:
    "An error has occurred while triying to get the logged hours.",
  LIST_TITLE: "My logged hours"
};

export interface URLMapping {
  name: string,
  path: string
}

export const URL_CONFIG: {[key: string]: URLMapping} = {
  LOGS_LIST: {
    name: "My hours",
    path: "/list"
  },
  LOGS_NEW: {
    name: "New log",
    path: "/new"
  }
};

export const DATE_FORMAT = "MM/DD/YYYY";
