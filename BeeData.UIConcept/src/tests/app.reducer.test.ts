import { AnyAction } from "redux";
import reducer from '../store/reducers/app.reducer';

import * as types from '../store/actions/app.actionsTypes';
import * as Model from 'models';
import EntityState from 'models/entityState';

describe('App Reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {} as AnyAction)).toEqual(
            {
                colors: new EntityState<Model.Color>(Model.ModelNames.Color),
                drawings: new EntityState<Model.Drawing>(Model.ModelNames.Drawing),
                design: null
            }
        );
    });

    it('should handle DESIGN_CHANGE_COLOR', () => {
        expect(
            reducer({
                colors: new EntityState<Model.Color>(Model.ModelNames.Color),
                drawings: new EntityState<Model.Drawing>(Model.ModelNames.Drawing),
                design: {
                    current: {
                        drawing: { code: 1, sourceUrl: '', regions: [{ code: 1 }] },
                        regionColors: { '1': null }
                    },

                    isSaving: false, saved: false, failed: false
                }
            }, {
                type: types.DESIGN_CHANGE_COLOR,
                payload: {
                    '1': {
                        name: 'Verde',
                        rgbHex: '#1B693D'
                    }
                }
            })
        ).toEqual({
            colors: new EntityState<Model.Color>(Model.ModelNames.Color),
            drawings: new EntityState<Model.Drawing>(Model.ModelNames.Drawing),
            design: {
                current: {
                    drawing: { code: 1, sourceUrl: '', regions: [{ code: 1 }] },
                    regionColors: {
                        '1': {
                            name: 'Verde',
                            rgbHex: '#1B693D'
                        }
                    }
                },

                isSaving: false, saved: false, failed: false
            }
        });

        expect(
            reducer({
                colors: new EntityState<Model.Color>(Model.ModelNames.Color),
                drawings: new EntityState<Model.Drawing>(Model.ModelNames.Drawing),
                design: {
                    current: {
                        drawing: { code: 1, sourceUrl: '', regions: [{ code: 1 }] },
                        regionColors: {
                            '1': {
                                name: 'Verde',
                                rgbHex: '#1B693D'
                            }
                        }
                    },

                    isSaving: false, saved: false, failed: false
                }
            }, {
                type: types.DESIGN_CHANGE_COLOR,
                payload: {
                    '2': {
                        name: 'Amarillo',
                        rgbHex: '#F5BD17'
                    }
                }
            })
        ).toEqual({
            colors: new EntityState<Model.Color>(Model.ModelNames.Color),
            drawings: new EntityState<Model.Drawing>(Model.ModelNames.Drawing),
            design: {
                current: {
                    drawing: { code: 1, sourceUrl: '', regions: [{ code: 1 }] },
                    regionColors: {
                        '1': {
                            name: 'Verde',
                            rgbHex: '#1B693D'
                        },
                        '2': {
                            name: 'Amarillo',
                            rgbHex: '#F5BD17'
                        }
                    }
                },

                isSaving: false, saved: false, failed: false
            }
        });
    })
});