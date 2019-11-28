import { ILogs } from "../utils/declarations";

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
    };
