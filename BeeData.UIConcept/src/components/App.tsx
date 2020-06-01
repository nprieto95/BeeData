import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Alert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Footer from './footer';
import { Switch, Route } from 'react-router-dom';
import Home from './home';

import { RootState } from 'store/reducers';
import UiActions from 'store/actions/ui.actions';
import Header from './header';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.default,
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    }
}));

const App = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const snackbar = useSelector((r: RootState) => r.uiReducer.snackbar);

    const handleCloseSnackbar = () => {
        dispatch(UiActions.hideSnackbar());
    }

    return (
        <div className={classes.root}>
            <Header/>
            <Switch>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>

            <Snackbar open={snackbar.shown} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert elevation={6} variant="filled" onClose={handleCloseSnackbar} severity={snackbar.type}>
                    {snackbar.message}
                </Alert>
            </Snackbar>

            {/* <Footer /> */}
        </div>
    );
}

export default App;
