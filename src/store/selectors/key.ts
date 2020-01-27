import {OverviewState} from "../reducer";
import {KeyState} from "../reducers/key";

export const selectKeyState = (state: OverviewState): KeyState => state.keyState;
export const selectKey = (state: OverviewState): string => (selectKeyState(state).key);
export const selectIsLoadingKey = (state: OverviewState): boolean => (selectKeyState(state).isLoading);
