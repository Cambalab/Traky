import { getPlatforms } from "@ionic/react";
import {ILogs, IGroup} from "./declarations";

export function isMobile() {
  if (getPlatforms().includes("mobile")) {
    return true;
  }
}

export const isValid = (data: string, dataValidate: boolean): boolean => {
  return dataValidate || data.length === 0
};

export const getElementClassNameError = (element: string, elementValidate: boolean): string => {
  return isValid(element, elementValidate) ? '': 'error'
};

export const getElementColor = (element: string, elementValidate: boolean): string => {
  return getElementClassNameError(element, elementValidate) === 'error' ? 'danger': 'dark';
};

export const getUsernameClassNameError = (username: string, usernameValidate: boolean): string => {
  return getElementClassNameError(username, usernameValidate)
};

export const getPasswordClassNameError = (password: string, passwordValidate: boolean): string => {
  return getElementClassNameError(password, passwordValidate)
};

export const getPasswordColor = (password: string, passwordValidate: boolean): string => {
  return getElementColor(password, passwordValidate)
};

export const getUsernameColor = (username: string, usernameValidate: boolean): string => {
  return getElementColor(username, usernameValidate)
};

export const isEmptyString = (str: string | null | undefined): boolean => str !== null && str !== undefined && str.length === 0;

export const isValidNumber = (str: any) => isNaN(Number(str));

export const transformNumberToString = (num : number) => {
  if (num === null || num === undefined) {
    return ""
  }
  return String(num);
};

export const sortByDate = (list: ILogs[]) => {
  return list.sort((a, b) => {
    if (a.timestamp < b.timestamp) {
      return 1;
    } else if (a.timestamp > b.timestamp) {
      return -1;
    } else {
      return 0;
    }
  });
};

export const compareGroups = (group1: IGroup, group2: IGroup): boolean => {
  if (group1 && group2) {
    if (group1.id && group2.id) {
      return group1.id === group2.id;
    }
    return group1 === group2;
  }
  return false;
};

export const getStoringSettingsName = () => {
  return process.env.REACT_APP_STORING_SETTINGS_NAME || "settings";
};
