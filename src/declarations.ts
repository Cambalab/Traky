export interface AppPage {
    url: string;
    icon: object;
    title: string;
}

export interface FetchInput {
    url: string,
    method: string,
    body?: object,
    onSuccess?: Function,
    onError?: Function,
    parse?: Function
}

export interface IGroup {
    id: any,
    name: string
}

export interface IUser {
    id?: any
}
