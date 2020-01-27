import {ILoginSettings} from "../../utils/declarations";
import {Action} from "../actions";
import {USER_TYPES} from "./user";

export interface SettingsState {
    settings: ILoginSettings;
    isLoading: boolean;
    hasError: boolean;
}

const initialSettingsState: SettingsState = {
    settings: {
        serverAddress: "",
        database: "",
        username: ""
    },
    isLoading: false,
    hasError: false
};

export const getInitialSettingsState = () => initialSettingsState;

export enum SETTINGS_TYPES {
    FETCH_SETTINGS_START_ACTION = "FETCH_SETTINGS_START_ACTION",
    FETCH_SETTINGS_SUCCESSFUL_ACTION = "FETCH_SETTINGS_SUCCESSFUL_ACTION",
    FETCH_SETTINGS_ERROR_ACTION = "FETCH_SETTINGS_ERROR_ACTION",
    SAVE_SETTINGS_START_ACTION = "SAVE_SETTINGS_START_ACTION",
    SAVE_SETTINGS_SUCCESSFUL_ACTION = "SAVE_SETTINGS_SUCCESSFUL_ACTION",
    SAVE_SETTINGS_ERROR_ACTION = "SAVE_SETTINGS_ERROR_ACTION"
}

export type FETCH_SETTINGS_START_ACTION = {
    type: SETTINGS_TYPES.FETCH_SETTINGS_START_ACTION
}

export type FETCH_SETTINGS_SUCCESSFUL_ACTION = {
    type: SETTINGS_TYPES.FETCH_SETTINGS_SUCCESSFUL_ACTION,
    payload: ILoginSettings
}

export type FETCH_SETTINGS_ERROR_ACTION = {
    type: SETTINGS_TYPES.FETCH_SETTINGS_ERROR_ACTION
}

export type SAVE_SETTINGS_START_ACTION = {
    type: SETTINGS_TYPES.SAVE_SETTINGS_START_ACTION
}

export type SAVE_SETTINGS_SUCCESSFUL_ACTION = {
    type: SETTINGS_TYPES.SAVE_SETTINGS_SUCCESSFUL_ACTION,
    payload: ILoginSettings
}

export type SAVE_SETTINGS_ERROR_ACTION = {
    type: SETTINGS_TYPES.SAVE_SETTINGS_ERROR_ACTION
}

export type SettingsAction =
    FETCH_SETTINGS_START_ACTION |
    FETCH_SETTINGS_SUCCESSFUL_ACTION |
    FETCH_SETTINGS_ERROR_ACTION |
    SAVE_SETTINGS_START_ACTION |
    SAVE_SETTINGS_SUCCESSFUL_ACTION |
    SAVE_SETTINGS_ERROR_ACTION

export const settings = (state: SettingsState = initialSettingsState, action: Action): SettingsState => {
    switch(action.type) {
        case SETTINGS_TYPES.FETCH_SETTINGS_START_ACTION: {
            return { ...state, isLoading: true, hasError: false };
        }
        case SETTINGS_TYPES.FETCH_SETTINGS_SUCCESSFUL_ACTION: {
            return { ...state, settings: action.payload, isLoading: false, hasError: false };
        }
        case SETTINGS_TYPES.FETCH_SETTINGS_ERROR_ACTION: {
            return { ...state, isLoading: false, hasError: true };
        }
        case SETTINGS_TYPES.SAVE_SETTINGS_START_ACTION: {
            return { ...state, isLoading: true, hasError: false };
        }
        case SETTINGS_TYPES.SAVE_SETTINGS_SUCCESSFUL_ACTION: {
            return { ...state, isLoading: false, hasError: false, settings: action.payload };
        }
        case USER_TYPES.LOGOUT_USER_ACTION: {
            return initialSettingsState;
        }
        default:
            return state;
    }
};
