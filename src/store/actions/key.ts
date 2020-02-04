import {
  FETCH_KEY_ERROR_ACTION,
  FETCH_KEY_START_ACTION,
  FETCH_KEY_SUCCESSFUL_ACTION,
  KEY_TYPES,
  SAVE_KEY_SUCCESSFUL_ACTION,
  NOT_FIRST_TIME_ACTION
} from "../reducers/key";

export const createFetchKeyStartAction = (): FETCH_KEY_START_ACTION => ({
  type: KEY_TYPES.FETCH_KEY_START_ACTION
});

export const createFetchKeySuccessfulAction = (
  key: string
): FETCH_KEY_SUCCESSFUL_ACTION => ({
  type: KEY_TYPES.FETCH_KEY_SUCCESSFUL_ACTION,
  payload: key
});

export const createFetchKeyErrorAction = (): FETCH_KEY_ERROR_ACTION => ({
  type: KEY_TYPES.FETCH_KEY_ERROR_ACTION
});

export const createSaveKeySuccessfulAction = (
  key: string
): SAVE_KEY_SUCCESSFUL_ACTION => ({
  type: KEY_TYPES.SAVE_KEY_SUCCESSFUL_ACTION,
  payload: key
});

export const createIsNotFirstTimeStateAction = (): NOT_FIRST_TIME_ACTION => ({
  type: KEY_TYPES.NOT_FIRST_TIME_ACTION
});
