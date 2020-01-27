import {OverviewState} from "../reducer";
import {ILoginSettings} from "../../utils/declarations";
import {SettingsState} from "../reducers/settings";

export const selectSettingsState = (state: OverviewState): SettingsState => state.settingsState;
export const selectSettings = (state: OverviewState): ILoginSettings => (selectSettingsState(state).settings);
export const selectIsLoadingSettings = (state: OverviewState): boolean => (selectSettingsState(state).isLoading);
