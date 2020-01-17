import {FetchInput, ILoginSettings, ILogs} from "./declarations";
import LogHourForm from "../components/LogHourForm/LogHourForm";
import LoginForm from "../components/LoginForm/LoginForm";
import { CONFIG, APPLICATION_NAME } from "./constants";
import { formatDate } from "./inputHandle";

const createHeaders = () => {
  const headers: HeadersInit = new Headers();
  headers.set(
    "Authorization",
    "bearer " + process.env.REACT_APP_AUTHORIZATION_KEY
  );
  headers.set("Content-Type", "application/json");
  return headers;
};

const fetchAPI = async ({
  url,
  method,
  body,
    headers,
  onSuccess,
  onError,
  parse = (x: object) => x
}: FetchInput): Promise<object> => {
  try {
    const request: any = {
      method,
      headers: headers ? headers : createHeaders(),
      body: JSON.stringify(body)
    };
    const response = await fetch(url, request);
    const json = await response.json();
    const parsed = parse(json);

    if (onSuccess) {
      onSuccess(parsed);
    }
    return parsed;
  } catch (e) {
    if (onError) {
      onError(e);
    }
    return e;
  }
};

const getCurrentUser = () => {
  return { id: 1 };
};

const getHours = (userId: any, settings: ILoginSettings, key: string, onSuccess: Function, onError?: Function) => {
  const current_day = formatDate(new Date(), "YYYY-MM-DD");
  const trytonURL = process.env.REACT_APP_PROXY_URL + `${settings.serverAddress}${settings.database}`;
  const endpoint = `${trytonURL}/timesheet/employee/${userId}/lines/${current_day}`;
  const parseResponse = (groups: any) => {
    return groups.map((g: any) => {
      return {
        id: g.id,
        description: g.description,
        spent_time: g.duration,
        groupId: g.work,
        timestamp: current_day
      };
    });
  };
  const headers = {
    "Authorization": "bearer " + key
  };

  return fetchAPI({
    url: endpoint,
    method: "GET",
    headers,
    onSuccess,
    onError,
    parse: parseResponse
  });
};
const getGroups = (userId: any, settings: ILoginSettings, key: string, onSuccess: Function) => {
  const trytonURL = process.env.REACT_APP_PROXY_URL + `${settings.serverAddress}${settings.database}`;
  const endpoint = `${trytonURL}/timesheet/employee/${userId}/works`;
  const headers = {
    "Authorization": "bearer " + key
  };

  return fetchAPI({ url: endpoint, method: "GET", headers, onSuccess });
};
const logHours = (
  userId: any,
  body: LogHourForm,
  settings: ILoginSettings,
  key: string,
  onSuccess: Function,
  onError: Function
) => {
  const requestBody = {
    date: formatDate(body.timestamp, "YYYY-MM-DD"),
    duration: new Date(body.spent_time || "0").getTime(),
    employee: Number(userId),
    work: body.groupId,
    description: body.description
  };
  const trytonURL = process.env.REACT_APP_PROXY_URL + `${settings.serverAddress}${settings.database}`;
  const endpoint = `${trytonURL}/timesheet/line`;
  const headers = {
    "Authorization": "bearer " + key,
    "Content-Type": "application/json"
  };

  const newOnSuccess = ({ id }: any) => {
    return onSuccess({
      id,
      spent_time: body.spent_time,
      description: body.description,
      groupId: body.groupId,
      timestamp: body.timestamp
    });
  };

  return fetchAPI({
    url: endpoint,
    method: "POST",
    body: requestBody,
    headers,
    onSuccess: newOnSuccess,
    onError
  });
};
const editHours = (
  userId: any,
  hourId: any,
  body: LogHourForm,
  onSuccess: Function,
  onError: Function
) => {
  const requestBody = {
    date: formatDate(body.timestamp, "YYYY-MM-DD"),
    duration: body.spent_time,
    employee: Number(process.env.REACT_APP_TRYTON_USER_ID),
    work: body.groupId,
    description: body.description
  };
  const trytonURL = `${process.env.REACT_APP_TRYTON_URL}${process.env.REACT_APP_TRYTON_DATABASE}`;
  const endpoint = `${trytonURL}/timesheet/line/${hourId}`;

  const newOnSuccess = ({ id }: any) => {
    return onSuccess({
      id,
      spent_time: body.spent_time,
      description: body.description,
      groupId: body.groupId,
      timestamp: body.timestamp
    });
  };

  return fetchAPI({
    url: endpoint,
    method: "PUT",
    body: requestBody,
    onSuccess: newOnSuccess,
    onError
  });
};

const loginUser = (body: LoginForm, onSuccess: Function, onError: Function) => {
  return fetchAPI({
    url: CONFIG.API_ENDPOINT + `login/`,
    method: "POST",
    body,
    onSuccess,
    onError
  });
};

const removeHours = (
  user: object,
  logHour: ILogs,
  onSuccess: Function,
  onError: Function
) => {
  const trytonURL = `${process.env.REACT_APP_TRYTON_URL}${process.env.REACT_APP_TRYTON_DATABASE}`;
  const endpoint = `${trytonURL}/timesheet/line/${logHour.id}`;

  return fetchAPI({ url: endpoint, method: "DELETE", onSuccess, onError });
};

const getUserFromKey = (
  key: string,
  serverAddress: string,
  database: string,
  onSuccess: Function,
  onError: Function
) => {
  const trytonURL = process.env.REACT_APP_PROXY_URL + `${serverAddress}/${database}`;
  const endpoint = `${trytonURL}/timesheet/employees`;
  const headers = {
    "Authorization": "bearer " + key
  };

  return fetchAPI({ url: endpoint, method: "GET", onSuccess, onError, headers });
};

const getUserAppKey = (
  user: string,
  serverAddress: string,
  database: string,
  onSuccess: Function,
  onError: Function
) => {
  const trytonURL = process.env.REACT_APP_PROXY_URL +`${serverAddress}${database}`;
  const endpoint = `${trytonURL}/user/application/`;
  const body = {
    user,
    application: APPLICATION_NAME.TIMESHEET
  };

  return fetchAPI({ url: endpoint, body, method: "POST", onSuccess, onError });
};

export {
  fetchAPI,
  getCurrentUser,
  logHours,
  getGroups,
  getHours,
  editHours,
  removeHours,
  loginUser,
  getUserAppKey,
  getUserFromKey
};
