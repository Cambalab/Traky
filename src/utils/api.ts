import { ILoginSettings } from "./declarations";
import LoginForm from "../components/LoginForm/LoginForm";
import { APPLICATION_NAME } from "./constants";

export const getBaseUrl = (url: string) => {
  return (process.env.REACT_APP_PROXY_URL ? process.env.REACT_APP_PROXY_URL : 'http://localhost:3000/api/') + url;
};

export  const addContentType = (headers: Headers): Headers => {
  headers.set("Content-Type", "application/json");
  return headers;
};

export  const addAuthorization = (headers: Headers, key: string): Headers => {
  headers.set("Authorization", `bearer ${key}`);
  return headers;
};

export const createHeaders = (headers?: Headers) => {
  return new Headers(headers);
};

interface parseFunction<T1, T2, Response> extends Function {
  (from: T1): T1 | T2;
}

export interface FetchInput<T1, T2, Response> {
  url: string;
  method: string;
  body?: object;
  headers?: object;
  onSuccess?: Function;
  onError?: Function;
  parse?: parseFunction<T1, T2, Response>;
}

const fetchAPI = async <T1, T2>({
  url,
  method,
  body,
  headers,
  onSuccess,
  onError,
  parse = (x: T1) => x
}: FetchInput<T1, T2, Response>): Promise<T1 | T2 | Response> => {
  try {
    const request: any = {
      method,
      headers: headers,
      body: JSON.stringify(body)
    };
    const response = await fetch(url, request);

    const data =
      response.status === 204 ? response : parse(await response.json());

    if (onSuccess) {
      onSuccess(data);
    }
    return data;
  } catch (e) {
    if (onError) {
      onError(e);
    }
    return e;
  }
};

const getGroups = (
  userId: any,
  settings: ILoginSettings,
  key: string,
  onSuccess: Function
) => {
  const endpoint = `${settings.serverAddress}${settings.database}/timesheet/employee/${userId}/works`;
  const url = getBaseUrl(endpoint);
  const headers = createHeaders();
  addContentType(headers);
  addAuthorization(headers, key);

  return fetchAPI({ url, method: "GET", headers, onSuccess });
};

// @todo: this endpoint is deprecated
const loginUser = (body: LoginForm, onSuccess: Function, onError: Function) => {
  const url = getBaseUrl(`login/`);
  return fetchAPI({
    url,
    method: "POST",
    body,
    onSuccess,
    onError
  });
};

const getUserFromKey = (
  key: string,
  serverAddress: string,
  database: string,
  onSuccess: Function,
  onError: Function
) => {
  const endpoint = `${serverAddress}${database}/timesheet/employees`;
  const url = getBaseUrl(endpoint);
  let headers = createHeaders();
  addContentType(headers);
  addAuthorization(headers, key);

  return fetchAPI({
    url,
    method: "GET",
    onSuccess,
    onError,
    headers
  });
};

const getUserAppKey = (
  user: string,
  serverAddress: string,
  database: string,
  onSuccess: Function,
  onError: Function
) => {
  const endpoint = `${serverAddress}${database}/user/application/`;
  const url = getBaseUrl(endpoint);
  const body = {
    user,
    application: APPLICATION_NAME.TIMESHEET
  };
  let headers = createHeaders();
  addContentType(headers);

  return fetchAPI({ url, body, headers, method: "POST", onSuccess, onError });
};

export { fetchAPI, getGroups, loginUser, getUserAppKey, getUserFromKey };
