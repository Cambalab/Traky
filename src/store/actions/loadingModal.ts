import {
  LOADING_MODAL_TYPE,
  LOADING_MODAL_ACTION,
  HIDE_LOADING_MODAL_ACTION
} from "../reducers/loadingModal";
import { ILoadingModal } from "../../utils/declarations";

export const createLoadingModalAction = (
  data: ILoadingModal
): LOADING_MODAL_ACTION => ({
  type: LOADING_MODAL_TYPE.LOADING_MODAL,
  payload: {
    message: data.message
  }
});

export const createHideLoadingModalAction = (): HIDE_LOADING_MODAL_ACTION => ({
  type: LOADING_MODAL_TYPE.HIDE_LOADING_MODAL
});
