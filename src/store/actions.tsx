import {
  ILogs,
  IUser,
  INotificationOptions,
  IGroup
} from "../utils/declarations";

export type Action =
  | {
      type: "UPDATE_LIST";
      payload: ILogs[];
    }
  | {
      type: "UPDATE_LOADING";
      payload: boolean;
    }
  | {
      type: "UPDATE_ERROR";
      payload: boolean;
    }
  | {
      type: "LOGIN";
      payload?: boolean;
    }
  | {
      type: "LOGOUT";
      payload?: boolean;
    }
  | {
      type: "SET_USER";
      payload: IUser;
    }
  | {
      type: "NOTIFICATION";
      payload: INotificationOptions;
    }
  | {
      type: "SHOW_NOTIFICATION";
      payload: boolean;
    }
  | {
      type: "UPDATE_GROUPS";
      payload: IGroup[];
    }
