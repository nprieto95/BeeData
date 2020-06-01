import { AnyAction } from "redux";

import * as ActionTypes from "../actions/ui.actionsTypes";
import UiState from "store/states/ui.state";

const initialState: UiState = {
    snackbar: {
        shown: false,
        type: undefined,
        message: ""
    }
};

export default function (state: UiState = initialState, action: AnyAction): UiState {
    switch (action.type) {
        case ActionTypes.SHOW_SNACKBAR:
            return {
                ...state,
                snackbar: {
                    shown: true,
                    type: action.payload.type,
                    message: action.payload.message,
                }
            };
        case ActionTypes.HIDE_SNACKBAR:
            return {
                ...state,
                snackbar: {
                    ...state.snackbar,
                    shown: false
                }
            };

        default:
            return state;
    }
}