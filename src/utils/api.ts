import { FetchInput, ILogs } from "./declarations";
import LogHourForm from "../components/LogHourForm/LogHourForm";
import LoginForm from "../components/LoginForm/LoginForm";
import { CONFIG } from "./constants";

const createHeaders = () => {
  const headers: HeadersInit = new Headers();
  headers.set("Authorization", "bearer " + process.env.REACT_APP_AUTHORIZATION_KEY);
  return headers;
};

const fetchAPI = async ({
  url,
  method,
  body,
  onSuccess,
  onError,
  parse = (x: object) => x
}: FetchInput): Promise<object> => {
  try {
    const request: any = {
      method,
      headers: createHeaders(),
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

const getHours = (userId: any, onSuccess: Function, onError?: Function) =>
  fetchAPI({ url: CONFIG.API_ENDPOINT + `users/${userId}/hours`, method: "GET", onSuccess, onError });
const getGroups = (userId: any, onSuccess: Function) => {
  const trytonURL = `https://tryton-camba.nube.coop/camba_prd/timesheet/employee/${process.env.REACT_APP_TRYTON_USER_ID}/works`;

  return fetchAPI({ url: trytonURL, method: "GET", onSuccess })
};
const logHours = (userId: any, body: LogHourForm, onSuccess: Function, onError: Function) =>
  fetchAPI({ url: CONFIG.API_ENDPOINT + `users/${userId}/hours`, method: "POST", body, onSuccess, onError });
const editHours = (
  userId: any,
  hourId: any,
  body: LogHourForm,
  onSuccess: Function,
  onError: Function
) =>
  fetchAPI({
    url: CONFIG.API_ENDPOINT + `hours/${hourId}`,
    method: "PUT",
    body,
    onSuccess,
    onError
  });

const loginUser = (body: LoginForm, onSuccess: Function, onError: Function) =>
  fetchAPI({ url: CONFIG.API_ENDPOINT + `login/`, method: "POST", body, onSuccess, onError })

const removeHours = (user: object, logHour: ILogs, onSuccess: Function, onError: Function) =>
    fetchAPI({ url: CONFIG.API_ENDPOINT + `hours/${logHour.id}`, method: "DELETE", onSuccess, onError});

export { fetchAPI, getCurrentUser, logHours, getGroups, getHours, editHours, removeHours, loginUser };
