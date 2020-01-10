import {
  LOGS_LIST_URL_CONFIG,
  LOGS_LOGIN_URL_CONFIG,
  LOGS_LOGOUT_URL_CONFIG,
  LOGS_NEW_URL_CONFIG,
  LOGS_SETTINGS_URL_CONFIG
} from "../../utils/constants";
import { list, logIn, logOut, timer, person, settings } from "ionicons/icons";

export interface MenuOption {
    url: string;
    icon: object;
    title: string;
}

export const LOGIN_MENU_OPTION: MenuOption = {
    title: LOGS_LOGIN_URL_CONFIG.name,
    url: LOGS_LOGIN_URL_CONFIG.path,
    icon: logIn,
};
export const LOGOUT_MENU_OPTION: MenuOption = {
    title: LOGS_LOGOUT_URL_CONFIG.name,
    url: LOGS_LOGOUT_URL_CONFIG.path,
    icon: logOut,
};
export const NEW_LOG_MENU_OPTION: MenuOption = {
    title: LOGS_NEW_URL_CONFIG.name,
    url: LOGS_NEW_URL_CONFIG.path,
    icon: timer,
};
export const LOG_LIST_MENU_OPTION: MenuOption = {
    title: LOGS_LIST_URL_CONFIG.name,
    url: LOGS_LIST_URL_CONFIG.path,
    icon: list,
};
export const USER_OPTION = {
  icon: person
}
export const SETTINGS_MENU_OPTION: MenuOption = {
  title: LOGS_SETTINGS_URL_CONFIG.name,
  url: LOGS_SETTINGS_URL_CONFIG.path,
  icon: settings
};
