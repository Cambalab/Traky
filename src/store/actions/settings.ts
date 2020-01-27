import {
    FETCH_SETTINGS_ERROR_ACTION,
    FETCH_SETTINGS_START_ACTION,
    FETCH_SETTINGS_SUCCESSFUL_ACTION, SAVE_SETTINGS_ERROR_ACTION,
    SAVE_SETTINGS_START_ACTION,
    SAVE_SETTINGS_SUCCESSFUL_ACTION,
    SETTINGS_TYPES
} from "../reducers/settings";
import {ILoginSettings} from "../../utils/declarations";

// export const createSaveLoginSettingsAction = (body: ILoginSettings, key: string): SAVE_LOGIN_SETTINGS_ACTION => ({
//     type: LOGIN_SETTINGS_TYPE.SAVE_LOGIN_SETTINGS_ACTION,
//     payload: {
//         loginSettings: body,
//         notificationOptions: {
//             header: NOTIFICATION_MESSAGES.SAVE_SETTINGS_SUCCESS_HEADER,
//             message: NOTIFICATION_MESSAGES.SAVE_SETTINGS_SUCCESS_BODY,
//             color: NOTIFICATION_TYPE.SUCCESS
//         },
//         key
//     }
// });

export const createFetchSettingsStartAction = (): FETCH_SETTINGS_START_ACTION => ({
    type: SETTINGS_TYPES.FETCH_SETTINGS_START_ACTION
});

export const createFetchSettingsSuccessfulAction = (settings: ILoginSettings): FETCH_SETTINGS_SUCCESSFUL_ACTION => ({
    type: SETTINGS_TYPES.FETCH_SETTINGS_SUCCESSFUL_ACTION,
    payload: settings
});

export const createFetchSettingsErrorAction = (): FETCH_SETTINGS_ERROR_ACTION => ({
    type: SETTINGS_TYPES.FETCH_SETTINGS_ERROR_ACTION
});

export const createSaveSettingsStartAction = (): SAVE_SETTINGS_START_ACTION => ({
    type: SETTINGS_TYPES.SAVE_SETTINGS_START_ACTION
});

export const createSaveSettingsSuccessfulAction = (settings: ILoginSettings): SAVE_SETTINGS_SUCCESSFUL_ACTION => ({
    type: SETTINGS_TYPES.SAVE_SETTINGS_SUCCESSFUL_ACTION,
    payload: settings
});

export const createSaveSettingsErrorAction = (): SAVE_SETTINGS_ERROR_ACTION => ({
    type: SETTINGS_TYPES.SAVE_SETTINGS_ERROR_ACTION
});
