import {ILoadingModal} from "../../utils/declarations";
import {Action} from "../actions";

export interface LoadingModalState {
    showLoadingModal: boolean;
    loadingModalOptions: ILoadingModal;
}

export enum LOADING_MODAL_TYPE {
    LOADING_MODAL = "LOADING_MODAL",
    HIDE_LOADING_MODAL = "HIDE_LOADING_MODAL"
}

export type LOADING_MODAL_ACTION = {
    type: LOADING_MODAL_TYPE.LOADING_MODAL,
    payload: ILoadingModal
}

export type HIDE_LOADING_MODAL_ACTION = {
  type: LOADING_MODAL_TYPE.HIDE_LOADING_MODAL
}

export type LoadingModalAction = LOADING_MODAL_ACTION | HIDE_LOADING_MODAL_ACTION

const resetMessageOfLoadingModal: ILoadingModal = {
  message: ""
}

const initialLoadingModalState: LoadingModalState = {
    showLoadingModal: false,
    loadingModalOptions: {
      message: ""
    }
};

export const getInitialLoadingModalState = () => initialLoadingModalState;

export const loadingModal = (state: LoadingModalState = initialLoadingModalState, action: Action): LoadingModalState => {
    switch(action.type) {
        case LOADING_MODAL_TYPE.LOADING_MODAL: {
            return {
                ...state,
                loadingModalOptions: action.payload,
                showLoadingModal: true
            }
        }
        case LOADING_MODAL_TYPE.HIDE_LOADING_MODAL: {
            return {
              ...state,
              loadingModalOptions: resetMessageOfLoadingModal,
              showLoadingModal: false
            }
        }
        default:
            return state;
    }
};
