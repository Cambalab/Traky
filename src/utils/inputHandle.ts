import {
  DatetimeChangeEventDetail,
  InputChangeEventDetail,
  SelectChangeEventDetail
} from "@ionic/core";
import moment from "moment";
import { FormEvent, KeyboardEvent } from "react";
import {
  DATE_FORMAT,
  DATE_FORMAT_COMPLETE,
  HOUR_FORMAT_DOUBLE_NUMBER
} from "./constants";

export const handleInput = (fn: Function) => (
  e: CustomEvent<InputChangeEventDetail | SelectChangeEventDetail>
) => {
  const value = e.detail.value;

  fn(value);
};

export const handleInputElement = (fn: Function) => (
  e: FormEvent<HTMLIonInputElement>
) => {
  const value = e.currentTarget.value;

  fn(value);
};

export const handleInputDatetime = (fn: Function) => (
  e: CustomEvent<DatetimeChangeEventDetail>
) => {
  const value = e.detail.value || "";

  fn(formatDate(value));
};

export const handleInputHour = (fn: Function) => (
  e: CustomEvent<DatetimeChangeEventDetail>
) => {
  const value = e.detail.value || "";

  fn(value);
};

export const formatHour = (date: string | Date): string => {
  return moment(date, DATE_FORMAT_COMPLETE).format(HOUR_FORMAT_DOUBLE_NUMBER);
}

export const formatDate = (date: string | Date, date_format = DATE_FORMAT): string => {
    return moment(date).format(date_format);
};

export const isValidDate = (date: string | Date): boolean => {
  return moment(date).isValid();
};

export const handleInputOnlyNumber = (
  e: KeyboardEvent<HTMLIonInputElement>
) => {
  const pattern = /[0-9.,]/;
  const inputChar: string = String.fromCharCode(e.charCode);

  if (!pattern.test(inputChar)) {
    e.preventDefault();
  }
};

export const isValidEmail = (email: string): boolean => {
  const pattern = /^(.*[@].*[.]*)$/;
  return pattern.test(email);
};

export const isValidPassword = (password: string): boolean => {
  return password.length > 5;
};
