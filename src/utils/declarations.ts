import { Dispatch } from "react";
import { Action } from "../store/actions";
import { OverviewState } from "../store/reducer";

export interface AppPage {
  url: string;
  icon: object;
  title: string;
}

export interface IGroup {
  end: any;
  id: any;
  name: string;
  start: any;
}

export interface IUser {
  id?: any;
  name?: string;
}

export interface ILoginSettings {
  serverAddress: string;
  database: string;
  username: string;
}

export interface ILogs {
  id?: number;
  description: string;
  timestamp: string;
  duration: number;
  groupId: number;
  userId?: number;
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

export type IContext = {
  state: OverviewState;
  dispatch: Dispatch<Action>;
};

export interface IMatchParams {
  data: string;
}

export type InstructionsProps = {
  onLastStepAction: Function;
  settings: ILoginSettings | null;
};

export type ValidationProps = {
  actionButton: Function;
  settings: ILoginSettings;
};

export interface OnHandleClickEventFunction extends Function {
  (): void;
}

export interface ILoadingModal {
  message: string;
}
