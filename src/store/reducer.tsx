import {Action} from "./actions";
import {getInitialLogsState, logs, LogsState} from "./reducers/logs";
import {getInitialNotificationState, notification, NotificationState} from "./reducers/notification";
import {getInitialUserState, user, UserState} from "./reducers/user";
import {getInitialSettingsState, settings, SettingsState} from "./reducers/settings";
import {getInitialGroupsState, groups, GroupsState} from "./reducers/groups";
import {getInitialKeyState, key, KeyState} from "./reducers/key";
import {getInitialLoadingModalState, loadingModal, LoadingModalState} from "./reducers/loadingModal";

export type OverviewState = {
  readonly groupsState: GroupsState;
  readonly logsState: LogsState;
  readonly notificationState: NotificationState
  readonly settingsState: SettingsState;
  readonly userState: UserState;
  readonly keyState: KeyState;
  readonly loadingModalState: LoadingModalState;
};

export const getInitialState = (): OverviewState => ({
  groupsState: getInitialGroupsState(),
  keyState: getInitialKeyState(),
  logsState: getInitialLogsState(),
  notificationState: getInitialNotificationState(),
  settingsState: getInitialSettingsState(),
  userState: getInitialUserState(),
  loadingModalState: getInitialLoadingModalState()
});

export const mainReducer = (state: OverviewState, action: Action): OverviewState => {
  return {
    groupsState: groups(state.groupsState, action),
    keyState: key(state.keyState, action),
    logsState: logs(state.logsState, action),
    notificationState: notification(state.notificationState, action),
    settingsState: settings(state.settingsState, action),
    userState: user(state.userState, action),
    loadingModalState: loadingModal(state.loadingModalState, action),
  }
};
