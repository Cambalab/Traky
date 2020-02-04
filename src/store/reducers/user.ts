import { IUser } from "../../utils/declarations";
import { Action } from "../actions";

export interface UserState {
  isLogged: boolean;
  user: IUser;
  isLoading: boolean;
}

export enum USER_TYPES {
  LOGIN_USER_START_ACTION = "LOGIN_USER_START_ACTION",
  LOGIN_USER_SUCCESSFUL_ACTION = "LOGIN_USER_SUCCESSFUL_ACTION",
  LOGIN_USER_ERROR_ACTION = "LOGIN_USER_ERROR_ACTION",
  LOGOUT_USER_ACTION = "LOGOUT_USER_ACTION"
}

export type LOGIN_USER_START_ACTION = {
  type: USER_TYPES.LOGIN_USER_START_ACTION;
};

export type LOGIN_USER_SUCCESSFUL_ACTION = {
  type: USER_TYPES.LOGIN_USER_SUCCESSFUL_ACTION;
  payload: IUser;
};

export type LOGIN_USER_ERROR_ACTION = {
  type: USER_TYPES.LOGIN_USER_ERROR_ACTION;
};

export type LOGOUT_USER_ACTION = {
  type: USER_TYPES.LOGOUT_USER_ACTION;
};

export type UserAction =
  | LOGIN_USER_START_ACTION
  | LOGIN_USER_SUCCESSFUL_ACTION
  | LOGIN_USER_ERROR_ACTION
  | LOGOUT_USER_ACTION;

const initialUserState: UserState = {
  isLoading: false,
  isLogged: false,
  user: {
    id: null,
    name: ""
  }
};

export const getInitialUserState = () => initialUserState;

export const user = (
  state: UserState = initialUserState,
  action: Action
): UserState => {
  switch (action.type) {
    case USER_TYPES.LOGIN_USER_START_ACTION: {
      return { ...state, isLoading: true };
    }
    case USER_TYPES.LOGIN_USER_SUCCESSFUL_ACTION: {
      return {
        isLoading: false,
        isLogged: true,
        user: action.payload
      };
    }
    case USER_TYPES.LOGOUT_USER_ACTION: {
      return {
        user: { id: null, name: "" },
        isLogged: false,
        isLoading: false
      };
    }

    default:
      return state;
  }
};
