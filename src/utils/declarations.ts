import { Dispatch } from "react";
import { Action } from "../store/actions";

export interface AppPage {
  url: string;
  icon: object;
  title: string;
}

export interface FetchInput {
  url: string;
  method: string;
  body?: object;
  onSuccess?: Function;
  onError?: Function;
  parse?: Function;
}

export interface IGroup {
  id: any;
  name: string;
}

export interface IUser {
  id?: any;
  name?: string;
}

export interface ISettings {
  serverAddress: string,
  database: string,
  key: string
}

export interface ILogs {
  id: number;
  description: string;
  timestamp: Date;
  spent_time: Date;
  groupId: number;
}

export interface INotificationOptions {
  onDidDismiss?: Function | undefined;
  isOpen?: boolean;
  message?: string;
  color?: string;
  duration?: number;
  showCloseButton?: boolean;
  closeButtonText?: string;
  header?: string;
  position?: "bottom" | "top" | "middle" | undefined;
  mode?: string;
}

export type OverviewState = {
  loggedHours: ILogs[];
  isLoading: boolean;
  hasError: boolean;
  isLogged: boolean;
  user: IUser;
  showNotification: boolean;
  notificationOptions: INotificationOptions;
  groups: IGroup[];
  settings: ISettings;
  isSettings: boolean;
};

export type IContext = {
  state: OverviewState;
  dispatch: Dispatch<Action>;
};

export interface IMatchParams {
  data: string;
}
