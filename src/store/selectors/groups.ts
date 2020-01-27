import {OverviewState} from "../reducer";
import {IGroup} from "../../utils/declarations";
import {GroupsState} from "../reducers/groups";

export const selectGroupsState = (state: OverviewState): GroupsState => state.groupsState;
export const selectGroups = (state: OverviewState): IGroup[] => selectGroupsState(state).groups;
