import React, { useRef, useEffect } from 'react';
import { ReactSVG, WrapperType } from 'react-svg'

import { makeStyles } from '@material-ui/core/styles';
import { Paper, Button, Toolbar, Typography, AppBar, Grid } from '@material-ui/core';
import InputSlider from './slider';

const useStyles = makeStyles((theme) => ({
    paper: {
        backgroundColor: theme.palette.secondary.main,
    },
    toolbar: {
        backgroundColor: theme.palette.primary.main,
        minHeight: 48
    },
    content: {
        padding: 10,
        minHeight: '50%'
    }
}));

const DesignViewer = () => {
    const classes = useStyles();

    useEffect(() => {
        /*if (regions) {
            Object.keys(regions).forEach((key) => {
                const regionCode = Number.parseInt(key);

                if (regions![regionCode] !== null) {
                    svgDrawingManager.current?.paintRegion(regionCode, regions![regionCode]!);
                }
            })
        }*/
    }, []);

    return <Paper elevation={3} className={classes.paper}>
        <AppBar position="static" style={{ borderRadius: '4px 4px 0 0' }}>
            <Toolbar className={classes.toolbar}>
                <Typography variant="h6" >
                    Score evolution
                        </Typography>
            </Toolbar>
        </AppBar>
        <img style={{ objectFit: 'contain', width: '100%' }} src="graph.png" />



        <InputSlider text="Temperature"/>
        <InputSlider text="Mortality"/>
        <InputSlider text="NO2 Levels"/>

    </Paper>
}

export default DesignViewer;