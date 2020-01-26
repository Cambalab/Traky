import {OverviewState} from "../reducer";
import {NotificationState} from "../reducers/notification";
import {INotificationOptions} from "../../utils/declarations";

export const selectNotificationState = (state: OverviewState): NotificationState => state.notificationState;
export const selectNotificationOptions = (state: OverviewState): INotificationOptions => selectNotificationState(state).notificationOptions;
export const selectShowNotification = (state: OverviewState): boolean => selectNotificationState(state).showNotification;
