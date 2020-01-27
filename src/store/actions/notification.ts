import {HIDE_NOTIFICATION_ACTION, NOTIFICATION_TYPES, SHOW_NOTIFICATION_ACTION} from "../reducers/notification";
import {KEY_VALIDATION_PAGE_TEXTS} from "../../pages/KeyInstructions/constants";
import {NOTIFICATION_TYPE} from "../../utils/constants";

export const createCopyClipboardNotificationAction = (): SHOW_NOTIFICATION_ACTION => ({
    type: NOTIFICATION_TYPES.SHOW_NOTIFICATION_ACTION,
    payload: {
        header: KEY_VALIDATION_PAGE_TEXTS.COPY_CLIPBOARD_HEADER,
        message: KEY_VALIDATION_PAGE_TEXTS.COPY_CLIPBOARD_MESSAGE,
        color: NOTIFICATION_TYPE.SUCCESS
    }
});

export const createHideNotificationAction = (): HIDE_NOTIFICATION_ACTION => ({
    type: NOTIFICATION_TYPES.HIDE_NOTIFICATION_ACTION
});
