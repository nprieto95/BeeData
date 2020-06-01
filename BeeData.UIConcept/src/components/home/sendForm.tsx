import React, { useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField, Card, CardContent, Typography, CardActions } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from 'store/reducers';
import AppActions from 'store/actions/app.actions';
import UiActions, { SnackbarMessageTypes } from 'store/actions/ui.actions';

const useStyles = makeStyles((theme) => ({
    main: {
        padding: '5px 10px 25px 10px',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 10
    },
    cardRoot: {
        flex: '1 0 27%',
        height: 200,
        backgroundPositionX: '85%',
        backgroundPositionY: '85%',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        marginLeft: 5,
        marginBottom: 5,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    cardActions: {
        marginTop: 28,
        display: 'flex',
        justifyContent: 'flex-end'
    },
    title: {
        fontSize: 14,
    }
}));

const RegionList = () => {
    const classes = useStyles();

    const providers = [
        {
            type: "Atmospheric",
            title: "Temperature",
            url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/NASA_logo.svg/1224px-NASA_logo.svg.png"
        },
        {
            type: "Social",
            title: "Mortality",
            url: "https://th.bing.com/th/id/OIP.r2vhugGp7tRm2y51AD_ghAHaCc?pid=Api&rs=1"
        },
        {
            type: "Atmospheric",
            title: "Air Pollution",
            url: "http://www.temis.nl/img/Temis-logo2.gif"
        },
        {
            type: "Social",
            title: "Population Distribution",
            url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/NASA_logo.svg/1224px-NASA_logo.svg.png"
        },
        {
            type: "Atmospheric",
            title: "NO2 Levels",
            url: "https://th.bing.com/th/id/OIP.M7XHKkPp77cg_poHzApL9AHaBq?pid=Api&rs=1"
        },
        {
            type: "Agricultural",
            title: "Global Land Cover",
            url: " https://earthengine.google.com/static/images/GoogleEarthEngine_Grey_108.png "
        },
        {
            type: "Social",
            title: "Global Poverty ",
            url: "https://th.bing.com/th/id/OIP.r2vhugGp7tRm2y51AD_ghAHaCc?pid=Api&rs=1"
        },
        {
            type: "Agricultural",
            title: "Soil Moisture",
            url: " https://cropmonitor.org/gcm_feb2019/assets/base/img/layout/logos/app_logo.png "
        },
        { 
            type: "Social",
            title: "Life xpectancy at age 60",
            url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/WHO_flag.png/1200px-WHO_flag.png"
         }
    ]

    return (
        <main className={classes.main}>
            {
                providers.map((p) => 
                <Card className={classes.cardRoot} elevation={2}
                style={{backgroundImage: "linear-gradient(to bottom , rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.9), rgba(18, 66, 148, 0.73)), url('" + p.url + "')",}}>
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            {p.type}
                        </Typography>
                        <Typography variant="h5" component="h2">
                            {p.title}
                        </Typography>
                    </CardContent>
                    <CardActions className={classes.cardActions}>
                        <Button variant="contained" size="small">Add</Button>
                    </CardActions>
                </Card>)
            }
            
        </main>
    );
}

export default RegionList;