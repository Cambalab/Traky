import {FetchInput} from "../declarations";

const BASE_URL = process.env.BASE_URL ? process.env.BASE_URL : 'http://localhost:3000/api/';

const fetchAPI = async ({ url, method, body, onSuccess, onError, parse = (x: object) => x}: FetchInput): Promise<object> => {
    try {
        const response = await fetch(BASE_URL + url, { method, body: JSON.stringify(body) });
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

export { fetchAPI }
