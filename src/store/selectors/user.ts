import { OverviewState } from "../reducer";
import { IUser } from "../../utils/declarations";
import { UserState } from "../reducers/user";

export const selectUserState = (state: OverviewState): UserState =>
  state.userState;
export const selectUser = (state: OverviewState): IUser =>
  selectUserState(state).user;
export const selectUserIsLogged = (state: OverviewState): boolean =>
  selectUserState(state).isLogged;
