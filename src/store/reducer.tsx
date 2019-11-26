import { OverviewState } from "../utils/declarations";
import { Action } from "./actions";

export function reducer(state: OverviewState, action: Action): OverviewState {
  switch (action.type) {
    case "UPDATE_LIST": {
      return { ...state, loggedHours: action.payload };
    }
    default:
      return state;
  }
}
