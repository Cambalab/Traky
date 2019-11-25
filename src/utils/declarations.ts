import { Dispatch } from "react";

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
}

export interface ILogs {
  id: number;
  description: string;
  timestamp: Date;
  spent_time: number;
  groupId: number;
}

export type OverviewState = {
  loggedHours: ILogs[] | [];
};

export type Action = {
  type: "UPDATE_LIST";
  payload: ILogs[];
};

export type IContext = {
  state: OverviewState;
  dispatch: Dispatch<Action>;
};

export interface IMatchParams {
  data: string;
}
