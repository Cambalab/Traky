import {FetchInput} from "../declarations";
import LogHourForm from "../components/LogHourForm/LogHourForm";

const BASE_URL = process.env.BASE_URL ? process.env.BASE_URL : 'http://localhost:3000/api/';

const createHeaders = () => {
    const headers: Headers = new Headers();
    headers.set("Content-Type", "application/json");
    return headers
};

const fetchAPI = async ({ url, method, body, onSuccess, onError, parse = (x: object) => x}: FetchInput): Promise<object> => {
    try {
        const response = await fetch(BASE_URL + url, {
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
    } catch(e) {
        if (onError) {
            onError(e);
        }
        return e
    }
};

const getCurrentUser = () => {
    return { id: 1 }
};

const logHours = (userId: any, body: LogHourForm, onSuccess: Function) => fetchAPI({ url: `users/${userId}/hours`, method: 'POST', body, onSuccess});

export { fetchAPI, getCurrentUser, logHours}
