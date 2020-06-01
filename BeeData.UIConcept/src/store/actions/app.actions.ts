import { RootState } from "store/reducers";
import { DefaultDataProvider } from "services/dataProvider";
import { IDataProvider, Drawing, Color } from "models";
import * as AppActionTypes from './app.actionsTypes';

class AppActions {

    private static dataProvider: IDataProvider = new DefaultDataProvider();

    public static loadDrawings = () => (dispatch: any, getState: () => RootState) => {
        if (getState().appReducer.drawings.isLoading === false) {
            AppActions.dataProvider.getDrawings(dispatch);
        }
    };

    public static loadColors = () => (dispatch: any, getState: () => RootState) => {
        if (getState().appReducer.colors.isLoading === false) {
            AppActions.dataProvider.getColors(dispatch);
        }
    };

    public static selectDrawing = (drawing: Drawing) => (dispatch: any) => {
        dispatch({
            type: AppActionTypes.DRAWING_SELECT,
            payload: drawing
        });
    };

    public static changeColor = (regionCode: number, color: Color | null) => (dispatch: any) => {
        dispatch({
            type: AppActionTypes.DESIGN_CHANGE_COLOR,
            payload: {
                [regionCode]: color
            }
        });
    };

    public static enumerateRegions = (drawing: Drawing) => (dispatch: any, getState: () => RootState) => {
        const design = getState().appReducer.design;
        if (design) {
            if (design.current.drawing && (design.current.drawing.regions == null || design.current.drawing.regions!.length === 0)) {
                dispatch({
                    type: AppActionTypes.DRAWING_ENUMERATE_REGIONS,
                    payload: drawing
                });
            } else {
                //If there are regions already enumerated after SVG load, the state must have been restored
                //after a page reload. This triggers the paint method with the colors dictated by the state
                dispatch(AppActions.paintColorsOnPageRefresh());
            }
        }
    };

    private static paintColorsOnPageRefresh = () => (dispatch: any) => {
        dispatch({
            type: AppActionTypes.DESIGN_CHANGE_COLOR,
            payload: {}
        });
    };

}

export default AppActions;