import * as UiActionTypes from './ui.actionsTypes';

export enum SnackbarMessageTypes {
    Error = "error",
    Warning = "warning",
    Info = "info",
    Success = "success"
}

class UiActions {

    public static showSnackbar = (message: string, type: SnackbarMessageTypes ) => (dispatch: any) => {
        dispatch({
            type: UiActionTypes.SHOW_SNACKBAR,
            payload: {
                message,
                type
            }
        });
    };

    public static hideSnackbar = () => (dispatch: any) => {
        dispatch({
            type: UiActionTypes.HIDE_SNACKBAR,
            payload: { }
        });
    };

}

export default UiActions;