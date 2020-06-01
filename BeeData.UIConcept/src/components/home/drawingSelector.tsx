import React, { useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Paper, Button, LinearProgress, Grow } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import EntityState from 'models/entityState';
import { Drawing } from 'models';
import { RootState } from 'store/reducers';
import AppActions from 'store/actions/app.actions';

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'relative',
        backgroundColor: theme.palette.secondary.main,
        minHeight: 120,
        padding: 10
    },
    flex: {
        display: 'flex',
        flexDirection: 'row',
    },
    button: {
        marginRight: 10,
        height: 100,
        width: 100,

        backgroundColor: theme.palette.secondary.dark
    },
    buttonSelected: {
        backgroundColor: theme.palette.primary.main + " !important"
    },
    thumbnail: {
        pointerEvents: 'none',
        width: 84,
        height: 70
    },
    thumbnailLabel: {
        flexDirection: 'column'
    },
    loadingDiv: {
        //Floating and centered
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        margin: 'auto',
        marginTop: 25,

        color: theme.palette.primary.main,
        textAlign: 'center',
        width: '90%'
    }
}));

const DrawingSelector = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const entityState: EntityState<Drawing> = useSelector((r: RootState) => r.appReducer.drawings);
    const design = useSelector((r: RootState) => r.appReducer.design);
    const isDesignActive = design !== null;

    useEffect(() => {
        dispatch(AppActions.loadDrawings());
    }, [dispatch]);

    const onDrawingClick = (drawing: Drawing) => {
        dispatch(AppActions.selectDrawing(drawing));
    }

    return (
        <Paper elevation={3} className={classes.paper}>
            <Grow in={!entityState.isLoading}>
                <div className={classes.flex}>
                    {entityState.data.map((drawing, index) =>
                        <Button key={drawing.code} classes={{ label: classes.thumbnailLabel }} onClick={(() => onDrawingClick(drawing))}
                            className={classNames(
                                classes.button,
                                (isDesignActive && design?.current.drawing.code === drawing.code ? classes.buttonSelected : null)
                            )}>
                            <img alt={"Diseño Nº" + index} className={classes.thumbnail} src={drawing.sourceUrl} />
                            <div>
                                {drawing.code}
                            </div>
                        </Button>
                    )}
                </div>
            </Grow>

            <Grow in={entityState.isLoading}>
                <div className={classes.loadingDiv}>
                    <LinearProgress variant="query" />
                    <h2>Cargando diseños...</h2>
                </div>
            </Grow>
        </Paper>
    );
}

export default DrawingSelector;