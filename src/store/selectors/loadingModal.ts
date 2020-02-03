import {OverviewState} from "../reducer";
import {LoadingModalState} from "../reducers/loadingModal";

export const selectLoadingModalState = (state: OverviewState): LoadingModalState => state.loadingModalState;
export const selectLoadingModalMessage = (state: OverviewState): string => (selectLoadingModalState(state).loadingModalOptions.message);
export const selectIsLoadingModal = (state: OverviewState): boolean => (selectLoadingModalState(state).showLoadingModal);
