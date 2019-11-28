/* Identifiers */

/* LIST --> Logged hours list screen */
/* NEW --> Log new hour screen */
/* EDIT --> Edit logged hour screen */

export interface AppConfig {
  API_ENDPOINT: string;
}

export const CONFIG: AppConfig = {
  API_ENDPOINT: process.env.BASE_URL
    ? process.env.BASE_URL
    : "http://localhost:3000/api/"
};

export interface URLMapping {
  name: string;
  path: string;
}

export const URL_CONFIG: { [key: string]: URLMapping } = {
  LOGS_LIST: {
    name: "My hours",
    path: "/list"
  },
  LOGS_NEW: {
    name: "New log",
    path: "/new"
  },
  LOGS_LOGIN: {
    name: "Login",
    path: "/login"
  },
  LOGS_EDIT: {
    name: "Edit",
    path: "/edit/:data"
  }
};

export const DATE_FORMAT = "MM/DD/YYYY";
