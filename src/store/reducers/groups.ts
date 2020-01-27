import {IGroup} from "../../utils/declarations";
import {Action} from "../actions";
import {USER_TYPES} from "./user";

// const REDUCER_NAME = "GROUPS";
// const FETCH_GROUPS_START_TYPE = createFetchStartAction(REDUCER_NAME);
// const FETCH_GROUPS_SUCCESSFUL_TYPE = createFetchSuccessfulAction(REDUCER_NAME);

export interface GroupsState {
    groups: IGroup[];
    isLoading: boolean;
}

export enum GROUPS_TYPES {
    FETCH_GROUPS_START_TYPE = "FETCH_GROUPS_START_TYPE",
    FETCH_GROUPS_SUCCESSFUL_TYPE = "FETCH_GROUPS_SUCCESSFUL_TYPE"
}

export type FETCH_GROUPS_START_ACTION = {
    type: GROUPS_TYPES.FETCH_GROUPS_START_TYPE
}

export type FETCH_GROUPS_SUCCESSFUL_ACTION = {
    type: GROUPS_TYPES.FETCH_GROUPS_SUCCESSFUL_TYPE
    payload: IGroup[]
}

export type GroupsAction = FETCH_GROUPS_START_ACTION | FETCH_GROUPS_SUCCESSFUL_ACTION

export const initialGroupsState = {
    groups: [],
    isLoading: false
};

export const getInitialGroupsState = () => initialGroupsState;

export const groups = (state: GroupsState = initialGroupsState, action: Action): GroupsState => {
    switch(action.type) {
        case GROUPS_TYPES.FETCH_GROUPS_START_TYPE: {
            return {
                ...state,
                isLoading: true
            }
        }
        case GROUPS_TYPES.FETCH_GROUPS_SUCCESSFUL_TYPE: {
            return {
                ...state,
                groups: action.payload,
                isLoading: false
            }
        }
        case USER_TYPES.LOGOUT_USER_ACTION: {
            return initialGroupsState;
        }
        default:
            return state;
    }
};
