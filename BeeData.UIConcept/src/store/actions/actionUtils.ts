import { ApiResponse } from "models";

import UiActions, { SnackbarMessageTypes } from "./ui.actions";

class ActionUtils {

    public static dispatchFailedAction(dispatch: any, failedActionType: string, message: string) {
        dispatch({
            type: failedActionType
        });
        
        dispatch(UiActions.showSnackbar(message, SnackbarMessageTypes.Error));
    }

    public static dispatchErrors(result: ApiResponse, dispatch: any, failedActionType: string) {

        if (result.error === undefined) {
            ActionUtils.dispatchFailedAction(dispatch, failedActionType, "Malformed response");
        }

        if (result.error) {
            ActionUtils.dispatchFailedAction(dispatch, failedActionType, result.message);
        }

        return result.error;
    }

}

export default ActionUtils;
