import {FETCH_GROUPS_START_ACTION, FETCH_GROUPS_SUCCESSFUL_ACTION, GROUPS_TYPES} from "../reducers/groups";
import {IGroup} from "../../utils/declarations";

export const createFetchGroupsStartAction = (): FETCH_GROUPS_START_ACTION => ({
    type: GROUPS_TYPES.FETCH_GROUPS_START_TYPE
});

export const createFetchGroupsSuccessfulAction = (groups: IGroup[]): FETCH_GROUPS_SUCCESSFUL_ACTION => ({
    type: GROUPS_TYPES.FETCH_GROUPS_SUCCESSFUL_TYPE,
    payload: groups
});
