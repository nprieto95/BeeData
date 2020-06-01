import React from 'react';

import { Grid, Container, AppBar, Tabs, Tab, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import DrawingSelector from './drawingSelector';
import RegionList from './regionList';
import SendForm from './sendForm';
import DesignViewer from './designViewer';

const useStyles = makeStyles((theme) => ({
    main: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        color: theme.palette.primary.main
    },
    paper: {
        backgroundColor: theme.palette.secondary.main
    }
}));

const Home = () => {
    const classes = useStyles();

    return (
        <Container maxWidth={false} component="main" className={classes.main}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={5}>
                    <Paper elevation={3} className={classes.paper}>
                        <AppBar position="static" style={{ borderRadius: '4px 4px 0 0'}}>
                            <Tabs value={0} variant="scrollable" scrollButtons="on">
                                <Tab label="All providers" />
                                <Tab label="Atmospheric" />
                                <Tab label="Agricultural" />
                                <Tab label="Oceanic" />
                                <Tab label="Social" />
                                <Tab label="Disasters" />
                            </Tabs>
                        </AppBar>
                        <SendForm />
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={7}>
                    <DesignViewer />
                </Grid>
            </Grid>
        </Container>
    );
}

export default Home;