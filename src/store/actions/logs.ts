import {
    ADD_LOG_ERROR_ACTION,
    ADD_LOG_START_ACTION, ADD_LOG_SUCCESSFUL_ACTION,
    FETCH_LOGS_ERROR_ACTION,
    FETCH_LOGS_START_ACTION,
    FETCH_LOGS_SUCCESSFUL_ACTION,
    LOGS_TYPES,
    REMOVE_LOG_ERROR_ACTION,
    REMOVE_LOG_SUCCESSFUL_ACTION, UPDATE_LOG_ERROR_ACTION,
    UPDATE_LOG_START_ACTION,
    UPDATE_LOG_SUCCESSFUL_ACTION
} from "../reducers/logs";
import {ILogs} from "../../utils/declarations";

export const createFetchLogsStartAction = (): FETCH_LOGS_START_ACTION => ({
    type: LOGS_TYPES.FETCH_LOGS_START_ACTION
});

export const createFetchLogsSuccessfulAction = (logs: ILogs[]): FETCH_LOGS_SUCCESSFUL_ACTION => ({
    type: LOGS_TYPES.FETCH_LOGS_SUCCESSFUL_ACTION,
    payload: logs
});

export const createFetchLogsErrorAction = (): FETCH_LOGS_ERROR_ACTION => ({
    type: LOGS_TYPES.FETCH_LOGS_ERROR_ACTION
});

export const createRemoveLogSuccessfulAction = (log: ILogs): REMOVE_LOG_SUCCESSFUL_ACTION => ({
    type: LOGS_TYPES.REMOVE_LOG_SUCCESSFUL_ACTION,
    payload: log
});

export const createRemoveLogErrorAction = (): REMOVE_LOG_ERROR_ACTION => ({
    type: LOGS_TYPES.REMOVE_LOG_ERROR_ACTION
});

export const createUpdateLogStartAction = (): UPDATE_LOG_START_ACTION => ({
    type: LOGS_TYPES.UPDATE_LOG_START_ACTION
});

export const createUpdateLogSuccessfulAction = (log: ILogs): UPDATE_LOG_SUCCESSFUL_ACTION => ({
    type: LOGS_TYPES.UPDATE_LOG_SUCCESSFUL_ACTION,
    payload: log
});

export const createUpdateLogErrorAction = (): UPDATE_LOG_ERROR_ACTION => ({
    type: LOGS_TYPES.UPDATE_LOG_ERROR_ACTION
});

export const createAddLogStartAction = (): ADD_LOG_START_ACTION => ({
    type: LOGS_TYPES.ADD_LOG_START_ACTION
});

export const createAddLogSuccessfulAction = (log: ILogs): ADD_LOG_SUCCESSFUL_ACTION => ({
    type: LOGS_TYPES.ADD_LOG_SUCCESSFUL_ACTION,
    payload: log
});

export const createAddLogErrorAction = (): ADD_LOG_ERROR_ACTION => ({
    type: LOGS_TYPES.ADD_LOG_ERROR_ACTION
});
