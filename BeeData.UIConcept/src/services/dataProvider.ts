import { IDataProvider, ModelNames, ApiResponse, Color, Drawing } from "models";

import * as ActionTypes from "store/actions/app.actionsTypes";
import ActionUtils from "store/actions/actionUtils";
import ApiService from "./api";
import { AxiosError } from "axios";

export class DefaultDataProvider implements IDataProvider {
    getColors = (dispatch: any) => {
        dispatch({
            type: ActionTypes.COLOR_LOAD_START
        });

        return ApiService.get<ApiResponse>(ModelNames.Color)
            .then((result) => {

                if (ActionUtils.dispatchErrors(result, dispatch, ActionTypes.COLOR_LOAD_FAILURE) === false) {
                    dispatch({
                        type: ActionTypes.COLOR_LOAD_SUCCESS,
                        payload: result.data
                    });

                    return result.data as Array<Color>;
                }
                else
                {
                    return null;
                }

            }).catch((error) => {
                // TODO: REMOVE MOCKUP ONCE API IS ONLINE
                //
                const data = [
                    {
                        name: 'Rojo',
                        rgbHex: '#ED3237'
                    },
                    {
                        name: 'Blanco',
                        rgbHex: '#FEFEFE'
                    },
                    {
                        name: 'Azul',
                        rgbHex: '#0A4C8E'
                    },
                    {
                        name: 'Amarillo',
                        rgbHex: '#F5BD17'
                    },
                    {
                        name: 'Verde',
                        rgbHex: '#1B693D'
                    },
                ] as Array<Color>;

                dispatch({
                    type: ActionTypes.COLOR_LOAD_SUCCESS,
                    payload: data
                });

                return data as Array<Color>;
                //
                /*
                 ActionUtils.dispatchFailedAction(dispatch, ActionTypes.COLOR_LOAD_FAILURE, error);

                 return null;
                 */
            });
    };

    getDrawings = (dispatch: any) => {
        dispatch({
            type: ActionTypes.DRAWING_LOAD_START
        });

        return ApiService.get<Array<Drawing>>(ModelNames.Drawing)
            .then((result) => {

                dispatch({
                    type: ActionTypes.DRAWING_LOAD_SUCCESS,
                    payload: result
                });

                return result;

            }).catch((error: AxiosError) => {
                    ActionUtils.dispatchFailedAction(dispatch, ActionTypes.DRAWING_LOAD_FAILURE, error.message)

                    return null;
            });
    };
}