import { ILoginSettings } from "./declarations";
import LoginForm from "../components/LoginForm/LoginForm";
import { CONFIG, APPLICATION_NAME } from "./constants";

const createHeaders = () => {
  const headers: HeadersInit = new Headers();
  headers.set(
    "Authorization",
    "bearer " + process.env.REACT_APP_AUTHORIZATION_KEY
  );
  headers.set("Content-Type", "application/json");
  return headers;
};

interface parseFunction<T1, T2> extends Function {
  (from: T1): T1 | T2;
}

export interface FetchInput<T1, T2> {
  url: string;
  method: string;
  body?: object;
  headers?: object;
  onSuccess?: Function;
  onError?: Function;
  parse?: parseFunction<T1, T2>;
}

const fetchAPI = async <T1, T2>({
  url,
  method,
  body,
  headers,
  onSuccess,
  onError,
  parse = (x: T1) => x
}: FetchInput<T1, T2>): Promise<T1 | T2> => {
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

const getGroups = (userId: any, settings: ILoginSettings, key: string, onSuccess: Function) => {
  const trytonURL = process.env.REACT_APP_PROXY_URL + `${settings.serverAddress}${settings.database}`;
  const endpoint = `${trytonURL}/timesheet/employee/${userId}/works`;
  const headers = {
    "Authorization": "bearer " + key
  };

  return fetchAPI({ url: endpoint, method: "GET", headers, onSuccess });
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

const getUserFromKey = (
  key: string,
  serverAddress: string,
  database: string,
  onSuccess: Function,
  onError: Function
) => {
  const trytonURL = process.env.REACT_APP_PROXY_URL + `${serverAddress}${database}`;
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
  getGroups,
  loginUser,
  getUserAppKey,
  getUserFromKey
};
