import { getPlatforms } from "@ionic/react";

export function isMobile() {
  if (getPlatforms().includes("mobile")) {
    return true;
  }
}

export const isValid = (data: string, dataValidate: boolean): boolean => {
  return dataValidate || data.length === 0
}

export const getElementClassNameError = (element: string, elementValidate: boolean): string => {
  return isValid(element, elementValidate) ? '': 'error'
}

export const getElementColor = (element: string, elementValidate: boolean): string => {
  return getElementClassNameError(element, elementValidate) === 'error' ? 'danger': 'dark';
}

export const getUsernameClassNameError = (username: string, usernameValidate: boolean): string => {
  return getElementClassNameError(username, usernameValidate)
}

export const getPasswordClassNameError = (password: string, passwordValidate: boolean): string => {
  return getElementClassNameError(password, passwordValidate)
}

export const getPasswordColor = (password: string, passwordValidate: boolean): string => {
  return getElementColor(password, passwordValidate)
}

export const getUsernameColor = (username: string, usernameValidate: boolean): string => {
  return getElementColor(username, usernameValidate)
}
