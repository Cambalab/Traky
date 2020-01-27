import {ILogs} from "../../utils/declarations";
import {Action} from "../actions";
import {USER_TYPES} from "./user";

export interface LogsState {
    logs: ILogs[],
    isLoading: boolean,
    hasError: boolean
}

export enum LOGS_TYPES {
    FETCH_LOGS_START_ACTION = "FETCH_LOGS_START_ACTION",
    FETCH_LOGS_SUCCESSFUL_ACTION = "FETCH_LOGS_SUCCESSFUL_ACTION",
    FETCH_LOGS_ERROR_ACTION = "FETCH_LOGS_ERROR_ACTION",
    UPDATE_LOGS_ACTION = "UPDATE_LOGS_ACTION",
    REMOVE_LOG_START_ACTION = "REMOVE_LOG_START_ACTION",
    REMOVE_LOG_SUCCESSFUL_ACTION = "REMOVE_LOG_SUCCESSFUL_ACTION",
    REMOVE_LOG_ERROR_ACTION = "REMOVE_LOG_ERROR_ACTION",
    UPDATE_LOG_START_ACTION = "UPDATE_LOG_START_ACTION",
    UPDATE_LOG_SUCCESSFUL_ACTION = "UPDATE_LOG_SUCCESSFUL_ACTION",
    UPDATE_LOG_ERROR_ACTION = "UPDATE_LOG_ERROR_ACTION",
    ADD_LOG_START_ACTION = "ADD_LOG_START_ACTION",
    ADD_LOG_SUCCESSFUL_ACTION = "ADD_LOG_SUCCESSFUL_ACTION",
    ADD_LOG_ERROR_ACTION = "ADD_LOG_ERROR_ACTION"
}

export type FETCH_LOGS_START_ACTION = {
    type: LOGS_TYPES.FETCH_LOGS_START_ACTION
}

export type FETCH_LOGS_SUCCESSFUL_ACTION = {
    type: LOGS_TYPES.FETCH_LOGS_SUCCESSFUL_ACTION,
    payload: ILogs[]
}

export type FETCH_LOGS_ERROR_ACTION = {
    type: LOGS_TYPES.FETCH_LOGS_ERROR_ACTION
}

export type UPDATE_LOGS_ACTION = {
    type: LOGS_TYPES.UPDATE_LOGS_ACTION,
    payload: ILogs[]
}

export type REMOVE_LOG_START_ACTION = {
    type: LOGS_TYPES.REMOVE_LOG_START_ACTION
}

export type REMOVE_LOG_SUCCESSFUL_ACTION = {
    type: LOGS_TYPES.REMOVE_LOG_SUCCESSFUL_ACTION,
    payload: ILogs
}

export type REMOVE_LOG_ERROR_ACTION = {
    type: LOGS_TYPES.REMOVE_LOG_ERROR_ACTION
}

export type UPDATE_LOG_START_ACTION = {
    type: LOGS_TYPES.UPDATE_LOG_START_ACTION
}

export type UPDATE_LOG_SUCCESSFUL_ACTION = {
    type: LOGS_TYPES.UPDATE_LOG_SUCCESSFUL_ACTION,
    payload: ILogs
}

export type UPDATE_LOG_ERROR_ACTION = {
    type: LOGS_TYPES.UPDATE_LOG_ERROR_ACTION
}

export type ADD_LOG_START_ACTION = {
    type: LOGS_TYPES.ADD_LOG_START_ACTION
}

export type ADD_LOG_SUCCESSFUL_ACTION = {
    type: LOGS_TYPES.ADD_LOG_SUCCESSFUL_ACTION,
    payload: ILogs
}

export type ADD_LOG_ERROR_ACTION = {
    type: LOGS_TYPES.ADD_LOG_ERROR_ACTION
}

export type LogsAction =
    FETCH_LOGS_START_ACTION |
    FETCH_LOGS_SUCCESSFUL_ACTION |
    FETCH_LOGS_ERROR_ACTION |
    UPDATE_LOGS_ACTION |
    REMOVE_LOG_START_ACTION |
    REMOVE_LOG_SUCCESSFUL_ACTION |
    REMOVE_LOG_ERROR_ACTION |
    UPDATE_LOG_START_ACTION |
    UPDATE_LOG_SUCCESSFUL_ACTION |
    UPDATE_LOG_ERROR_ACTION |
    ADD_LOG_START_ACTION |
    ADD_LOG_SUCCESSFUL_ACTION |
    ADD_LOG_ERROR_ACTION

const initialLogsState = {
    logs: [],
    isLoading: false,
    hasError: false
};

export const getInitialLogsState = () => initialLogsState;

const removeLog = (log: ILogs, logs: ILogs[]) => {
    return logs.filter(currentLog => currentLog.id !== log.id);
};

const updateLog = (updatedLog: ILogs, logs: ILogs[]) => {
    return logs.map(currentLog => (currentLog.id === updatedLog.id ? updatedLog : currentLog));
};

const addLog = (newLog: ILogs, logs: ILogs[]) => {
    return logs.concat(newLog);
};

export const logs = (state: LogsState = initialLogsState, action: Action): LogsState => {
    switch(action.type) {
        case LOGS_TYPES.FETCH_LOGS_START_ACTION || LOGS_TYPES.REMOVE_LOG_START_ACTION: {
            return { ...state, isLoading: true };
        }
        case LOGS_TYPES.FETCH_LOGS_SUCCESSFUL_ACTION: {
            return { ...state, isLoading: false, logs: action.payload };
        }
        case LOGS_TYPES.FETCH_LOGS_ERROR_ACTION: {
            return { ...state, isLoading: false, hasError: true };
        }
        case LOGS_TYPES.UPDATE_LOGS_ACTION: {
            return { ...state, logs: action.payload };
        }
        case LOGS_TYPES.REMOVE_LOG_SUCCESSFUL_ACTION: {
            return { ...state, logs: removeLog(action.payload, state.logs) };
        }
        case LOGS_TYPES.UPDATE_LOG_SUCCESSFUL_ACTION: {
            return { ...state, logs: updateLog(action.payload, state.logs) }
        }
        case LOGS_TYPES.ADD_LOG_SUCCESSFUL_ACTION: {
            return { ...state, logs: addLog(action.payload, state.logs) }
        }
        case USER_TYPES.LOGOUT_USER_ACTION: {
            return initialLogsState;
        }
        default:
            return state;
    }
};
