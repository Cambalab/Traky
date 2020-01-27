import {
    LOGIN_USER_ERROR_ACTION,
    LOGIN_USER_START_ACTION,
    LOGIN_USER_SUCCESSFUL_ACTION, LOGOUT_USER_ACTION,
    USER_TYPES
} from "../reducers/user";
import {IUser} from "../../utils/declarations";

export const createLoginStartAction = (): LOGIN_USER_START_ACTION => ({
    type: USER_TYPES.LOGIN_USER_START_ACTION
});

export const createLoginSuccessfulAction = (user: IUser): LOGIN_USER_SUCCESSFUL_ACTION => ({
    type: USER_TYPES.LOGIN_USER_SUCCESSFUL_ACTION,
    payload: user
});

export const createLoginErrorAction = (): LOGIN_USER_ERROR_ACTION => ({
    type: USER_TYPES.LOGIN_USER_ERROR_ACTION
});

export const createLogoutAction = (): LOGOUT_USER_ACTION => ({
    type: USER_TYPES.LOGOUT_USER_ACTION
});
