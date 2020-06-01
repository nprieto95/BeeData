import React, { useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from 'store/reducers';
import AppActions from 'store/actions/app.actions';
import ColorSelect from './colorSelect';

const useStyles = makeStyles((theme) => ({
    main: {
        display: 'flex',
        flexDirection: 'column',
        padding: '10px 10px 25px 10px'
    },
    flex: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 10
    },
    regionLabel: {
        color: theme.palette.primary.main
    },
    finishButton: {
        marginLeft: 'auto'
    }
}));

const RegionList = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const regions = useSelector((r: RootState) => r.appReducer.design?.current.regionColors);

    useEffect(() => {
        dispatch(AppActions.loadColors());
    }, [dispatch]);

    return (regions ?
        <div className={classes.main}>
            <div className={classes.flex}>
                {
                    regions ? Object.keys(regions!).map((key) => {
                        const regionCode = Number.parseInt(key);

                        return <div key={key}>
                            <h3 className={classes.regionLabel}>Región Nº{regionCode + 1}</h3>
                            <ColorSelect regionCode={regionCode} />
                        </div>
                    }) : null
                }
            </div>
        </div>
        : null
    );
}

export default RegionList;