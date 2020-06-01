import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
    footer: {
        textAlign: "center",
        padding: theme.spacing(1, 1),
        marginTop: 'auto',
        backgroundColor: theme.palette.secondary.main,
    },
}));

const Footer = () => {
    const classes = useStyles();

    return (
        <footer className={classes.footer}>
            <Container>
                <Typography variant="body1">Footer!</Typography>
                <Typography variant="body2" color="textSecondary">
                    <Link color="inherit" href="https://www.facebook.com/LaMaquinaCamisetasRetro/">
                        La Máquina Indumentaria
                    </Link>
                    {' ' + new Date().getFullYear()}
                </Typography>
            </Container>
        </footer>
    );
}

export default Footer;