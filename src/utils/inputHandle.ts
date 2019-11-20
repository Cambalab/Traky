import {DatetimeChangeEventDetail, InputChangeEventDetail, SelectChangeEventDetail} from "@ionic/core";
import moment from "moment";
import {KeyboardEvent} from "react";

export const handleInput = (fn: Function) => (e: CustomEvent<InputChangeEventDetail | SelectChangeEventDetail>) => {
    const value = e.detail.value;

    if(value) {
        fn(value);
    }
};

export const handleInputDatetime = (fn: Function) => (e: CustomEvent<DatetimeChangeEventDetail>) => {
    const value = e.detail.value || "";

    fn(formatDate(value));
};

export const formatDate = (date: string | Date): string => {
    return moment(date).format(DATE_FORMAT);
};

export const isValidDate = (date: string | Date): boolean => {
    return moment(date).isValid();
};

const DATE_FORMAT = "DD/MM/YYYY";

export const handleInputOnlyNumber = (e: KeyboardEvent<HTMLIonInputElement>) => {
    const pattern = /[0-9.,]/;
    const inputChar: string = String.fromCharCode(e.charCode);

    if (!pattern.test(inputChar)) {
        e.preventDefault();
    }
};
