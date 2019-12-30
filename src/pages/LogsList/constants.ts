import { LOGS_NEW_URL_CONFIG } from "../../utils/constants";
import { alarm } from "ionicons/icons";

export interface LogsListTexts {
    LIST_NO_LOGS_YET_MSG: string;
    LIST_TITLE: string;
    LIST_ERROR_MSG: string;
    BUTTON_NO_LOGS_YET_MSG: string;
}

export interface FabButtonOptions {
    title: string;
    url: string;
    icon: object;
}

export const TEXTS: LogsListTexts = {
    BUTTON_NO_LOGS_YET_MSG: "OK, start now!",
    LIST_NO_LOGS_YET_MSG: "You dont have any log yet..",
    LIST_ERROR_MSG:
        "An error has occurred while triying to get the logged hours.",
    LIST_TITLE: "My logged hours"
};

export const NEW_HOUR_BUTTON_OPTION: FabButtonOptions = {
    title: LOGS_NEW_URL_CONFIG.name,
    url: LOGS_NEW_URL_CONFIG.path,
    icon: alarm,
};
