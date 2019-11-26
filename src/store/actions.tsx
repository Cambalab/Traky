import { ILogs } from "../utils/declarations";

export type Action = {
  type: "UPDATE_LIST";
  payload: ILogs[];
};
