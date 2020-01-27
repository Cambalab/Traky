
export const createFetchStartAction = (stateName: string): string => `FETCH_${stateName}_START_ACTION`;
export const createFetchSuccessfulAction = (stateName: string): string => (`FETCH_${stateName}_SUCCESSFUL_ACTION`);
export const createFetchErrorAction = (stateName: string): string => (`FETCH_${stateName}_ERROR_ACTION`);
