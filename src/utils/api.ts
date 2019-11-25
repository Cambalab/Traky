import { FetchInput } from "./declarations";
import LogHourForm from "../components/LogHourForm/LogHourForm";
import { CONFIG } from "./constants";

const createHeaders = () => {
  const headers: Headers = new Headers();
  headers.set("Content-Type", "application/json");
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
    const response = await fetch(CONFIG.API_ENDPOINT + url, {
      method,
      headers: createHeaders(),
      body: JSON.stringify(body)
    });
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

const getHours = (userId: any, onSuccess: Function, onError: Function) =>
  fetchAPI({ url: `users/${userId}/hours`, method: "GET", onSuccess, onError });
const getGroups = (userId: any, onSuccess: Function) =>
  fetchAPI({ url: `groups/${userId}`, method: "GET", onSuccess });
const logHours = (userId: any, body: LogHourForm, onSuccess: Function) =>
  fetchAPI({ url: `users/${userId}/hours`, method: "POST", body, onSuccess });
const editHours = (
  userId: any,
  hourId: any,
  body: LogHourForm,
  onSuccess: Function
) =>
  fetchAPI({
    url: `hours/${hourId}`,
    method: "PUT",
    body,
    onSuccess
  });

export { fetchAPI, getCurrentUser, logHours, getGroups, getHours, editHours };
