import { SnackbarMessageTypes } from "store/actions/ui.actions";

interface UiState {
    snackbar: {
        shown: boolean,
        type: SnackbarMessageTypes | undefined,

        message: string
    }
}

export default UiState;