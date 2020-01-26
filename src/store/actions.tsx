import {UserAction} from "./reducers/user";
import {GroupsAction} from "./reducers/groups";
import {LogsAction} from "./reducers/logs";
import {KeyAction} from "./reducers/key";
import {SettingsAction} from "./reducers/settings";
import {NotificationAction} from "./reducers/notification"

export type Action = GroupsAction | UserAction | LogsAction | NotificationAction | KeyAction | SettingsAction
