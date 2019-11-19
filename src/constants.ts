/* Identifiers */

/* LIST --> Logged hours list screen */
/* NEW --> Log new hour screen */
/* EDIT --> Edit logged hour screen */

export interface AppConfig {
  API_ENDPOINT: string;
  LIST_NO_LOGS_YET_MSG: string;
  LIST_TITLE: string;
  LIST_ERROR_MSG: string;
}

export const CONFIG: AppConfig = {
  API_ENDPOINT: "http://localhost:3000/",
  LIST_NO_LOGS_YET_MSG: "You dont have any log yet..",
  LIST_ERROR_MSG:
    "An error has occurred while triying to get the logged hours.",
  LIST_TITLE: "My logged hours"
};
