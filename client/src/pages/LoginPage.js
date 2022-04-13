import React from 'react';
import { makeStyles } from '@mui/styles';
import { CssBaseline, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../containers/LoginForm';
import Navbar from '../components/Navbar';

import '../assets/styles.css';
import TithenaiLogo from '../assets/logos/Uncircled Navyblue.png';
import LoginGif from '../assets/gifs/Login_300_35.gif';


const useStyles = makeStyles(theme => ({
    header: {
        paddingTop: "0.5rem",
        marginBottom: "0",
        fontFamily: "Ubuntu-Light",
        fontSize: "x-large",
        textAlign: "center",
    },
    headerSpan: {
        paddingBottom: "0.5rem",
        fontFamily: "Ubuntu-Light",
        fontSize: "medium",
        textAlign: "center",
    },
    illustrationLabel: {
        fontSize: "xx-large",
        fontFamily: "Ubuntu",
        color: "white",
        paddingRight: "3rem",
        [theme.breakpoints.down('md')]: {
            fontSize: "x-large",
            paddingRight: "1rem",
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: "x-large",
            paddingRight: "1rem",
        },
    },
    loginIllustration: {
        width: "18rem",
        [theme.breakpoints.down('md')]: {
            width: "14rem",
        },
        [theme.breakpoints.down('sm')]: {
            width: "10rem",
        },
        [theme.breakpoints.down('xs')]: {
            width: "6rem",
        },
    }
}));

const LoginPage = () => {
    const classes = useStyles();
    const navigator = useNavigate();

    const redirectToLandingPage = () =>{
        navigator('/');
    }

    const redirectToRegisterPage = () =>{
        navigator('/register');
    }

    return(
        <div className="loginPageContainer">
            <Navbar />
            <Grid container alignItems="center" justifyContent="center" style={{paddingTop: "2%", paddingBottom: "2%"}}>
                <Grid item container xs={11} sm={11} md={11} lg={11} direction="row-reverse" alignItems="center" justifyContent="center" className="loginBanner">
                    <Grid item container xs={12} sm={12} md={7} lg={8} direction="row" alignItems="center" justifyContent="center">
                        <p className={classes.illustrationLabel}>Welcome to Tithenai</p>
                        <img src={LoginGif} alt="Welcome" className={classes.loginIllustration}/>
                    </Grid>
                    <Grid item container xs={12} sm={12} md={5} lg={4} className="glassmorphismEffect75" justifyContent="center">
                        <Grid item container xs={12} sm={12} md={12} lg={12} xl={12} direction="row">
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                                <div style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                    <img src={TithenaiLogo} alt="Tithenai" className='headerLabelLogo' onClick={redirectToLandingPage}/>
                                </div>
                                <p className={classes.header}>Sign In to Tithenai</p>
                                <p className={classes.headerSpan}>
                                    New Here?
                                    <span className="forwardingSpan" onClick={redirectToRegisterPage}>&nbsp;Create an Account</span>
                                </p>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                <LoginForm />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <CssBaseline />
        </div>
    );
}

export default LoginPage;