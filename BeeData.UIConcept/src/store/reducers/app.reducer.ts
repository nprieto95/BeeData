import { AnyAction } from "redux";
import AppState from "../states/app.state";
import * as ActionTypes from "../actions/app.actionsTypes";
import * as Model from "models";
import EntityState, { EntityStateTransforms as Transform } from "models/entityState";

const initialState: AppState = {
    colors: new EntityState<Model.Color>(Model.ModelNames.Color),
    drawings: new EntityState<Model.Drawing>(Model.ModelNames.Drawing),
    design: null
};

export default function (state: AppState = initialState, action: AnyAction) : AppState {
    switch (action.type) {
        case ActionTypes.DRAWING_LOAD_START:
            return {
                ...state,
                drawings: Transform.setLoadInit(state.drawings)
            };
        case ActionTypes.DRAWING_LOAD_SUCCESS:
            return {
                ...state,
                drawings: Transform.setLoadSucceed(state.drawings, action.payload)
            };
        case ActionTypes.DRAWING_LOAD_FAILURE:
            return {
                ...state,
                drawings: Transform.setLoadFailed(state.drawings, action.payload)
            };
        case ActionTypes.COLOR_LOAD_START:
            return {
                ...state,
                colors: Transform.setLoadInit(state.colors)
            };
        case ActionTypes.COLOR_LOAD_SUCCESS:
            return {
                ...state,
                colors: Transform.setLoadSucceed(state.colors, action.payload)
            };
        case ActionTypes.COLOR_LOAD_FAILURE:
            return {
                ...state,
                colors: Transform.setLoadFailed(state.colors, action.payload)
            };
        case ActionTypes.DRAWING_SELECT:
            return {
                ...state,
                drawings: Transform.setSelected(state.drawings, action.payload),
                design: {
                    current: {
                        drawing: action.payload,
                        regionColors: []
                    },

                    isSaving: false,
                    saved: false,
                    failed: false
                }
            };
        case ActionTypes.DRAWING_ENUMERATE_REGIONS:
            const completeDrawing: Model.Drawing = {
                ...state.design?.current.drawing!,
                regions: action.payload.regions
            };

            return {
                ...state,
                drawings: Transform.setSelected(state.drawings, completeDrawing),
                design: {
                    ...state.design!,
                    current: {
                        drawing: completeDrawing,
                        regionColors: action.payload.regions.reduce((result: Record<string, Model.Color | null>, item: Model.Region) => {
                            result[item.code.toString()] = null;
                            return result;
                        }, {}) as Record<string, Model.Color | null>
                    }
                }
            };
        case ActionTypes.DESIGN_CHANGE_COLOR:
            return {
                ...state,
                design: {
                    ...state.design!,
                    current: {
                        ...state.design!.current,
                        regionColors: {
                            ...state.design!.current.regionColors,
                            ...action.payload
                        }
                    }
                }
            };
        default:
            return state;
    }
}