import {OverviewState} from "../reducer";
import {ILogs} from "../../utils/declarations";
import {LogsState} from "../reducers/logs";

export const selectLogsState = (state: OverviewState): LogsState => state.logsState;
export const selectLogs = (state: OverviewState): ILogs[] => (selectLogsState(state).logs);
export const selectLog = (id: number, state: OverviewState): ILogs | undefined => (selectLogs(state).find(log => log.id === id));