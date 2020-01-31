import { fetchAPI } from "../api";
import { ILoginSettings, ILogs } from "../declarations";
import { formatDate } from "../inputHandle";
import { TRYTON_LINE_DATE_FORMAT } from "../constants";

interface IExternalLog {
  id?: number;
  employee?: number;
  date?: string;
  description?: string;
  duration: number;
  work: number;
  "work.name"?: string;
}

const createExternalLogFromLog = (log: ILogs): IExternalLog => {
  return {
    id: Number(log.id),
    date: formatDate(log.timestamp, "YYYY-MM-DD"),
    duration: log.duration,
    employee: Number(log.userId),
    work: log.groupId,
    description: log.description || ""
  };
};

const createLogFromExternal = (externalLog: IExternalLog): ILogs => {
  return {
    id: externalLog.id,
    description: externalLog.description || "",
    duration: externalLog.duration,
    groupId: externalLog.work,
    timestamp: externalLog.date || ""
  };
};

const createLogsRequestHeaders = (key: string) => {
  return {
    Authorization: "bearer " + key,
    "Content-Type": "application/json"
  };
};

const getLogs = (
  date: string,
  userId: any,
  settings: ILoginSettings,
  key: string,
  onSuccess: Function,
  onError?: Function
) => {
  const current_day = formatDate(date, TRYTON_LINE_DATE_FORMAT);
  const trytonURL =
    process.env.REACT_APP_PROXY_URL +
    `${settings.serverAddress}${settings.database}`;
  const endpoint = `${trytonURL}/timesheet/employee/${userId}/lines/${current_day}`;
  const parseResponse = (logs: IExternalLog[]): ILogs[] => {
    return logs.map(log => {
      return { ...createLogFromExternal(log), timestamp: date };
    });
  };
  const headers = createLogsRequestHeaders(key);

  return fetchAPI<IExternalLog[], ILogs[]>({
    url: endpoint,
    method: "GET",
    headers,
    onSuccess,
    onError,
    parse: parseResponse
  });
};

interface BaseBodyLogRequestOnSuccessFunction extends Function {
  (response: ILogs): void;
}

const baseBodyLogRequest = (
  form: ILogs,
  settings: ILoginSettings,
  key: string,
  onSuccess: BaseBodyLogRequestOnSuccessFunction,
  onError: Function
) => {
  const body = createExternalLogFromLog(form);
  const trytonURL =
    process.env.REACT_APP_PROXY_URL +
    `${settings.serverAddress}${settings.database}`;
  const headers = createLogsRequestHeaders(key);
  const parse = ({ id }: IExternalLog): ILogs => {
    return {
      ...form,
      id
    };
  };
  return (endpoint: string, method: string) =>
    fetchAPI<IExternalLog, ILogs>({
      url: `${trytonURL}${endpoint}`,
      method,
      body,
      headers,
      onSuccess,
      onError,
      parse
    });
};

interface OnCreateSuccessfulFunction extends Function {
  (res: ILogs): void;
}

const createLog = (
  body: ILogs,
  settings: ILoginSettings,
  key: string,
  onSuccess: OnCreateSuccessfulFunction,
  onError: Function
) => {
  const endpoint = "/timesheet/line";
  const method = "POST";
  return baseBodyLogRequest(
    body,
    settings,
    key,
    onSuccess,
    onError
  )(endpoint, method);
};

interface OnEditSuccessfulFunction extends Function {
  (res: ILogs): void;
}

const editLog = (
  body: ILogs,
  settings: ILoginSettings,
  key: string,
  onSuccess: OnEditSuccessfulFunction,
  onError: Function
) => {
  const endpoint = `/timesheet/line/${body.id}`;
  const method = "PUT";
  return baseBodyLogRequest(
    body,
    settings,
    key,
    onSuccess,
    onError
  )(endpoint, method);
};

const removeLog = (
  key: string,
  log: ILogs,
  settings: ILoginSettings,
  onSuccess: Function,
  onError: Function
) => {
  const trytonURL =
    process.env.REACT_APP_PROXY_URL +
    `${settings.serverAddress}${settings.database}`;
  const endpoint = `${trytonURL}/timesheet/line/${log.id}`;
  const headers = createLogsRequestHeaders(key);

  return fetchAPI({
    url: endpoint,
    method: "DELETE",
    headers,
    onSuccess,
    onError
  });
};

export { getLogs, createLog, editLog, removeLog };
