import React from 'react';
import { CssBaseline, Paper } from '@mui/material';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { redirectToMainPage, redirectToLoginPage, redirectToRegisterPage } from '../../utils/Redirecter';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import LoginGif from '../../assets/gifs/Login_300_35.gif';

import '../../assets/styles.css';
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
        color: "black",
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
const LandingPage = () => {
    const classes = useStyles();
    const navigator = useNavigate();
    return (
        <div className="loginPageContainer">
            <Navbar />
            <div style={{padding: "20px", marginTop: "10px", display: "flex", justifyContent: "center"}}>
                <Paper style={{width: "80%", padding: "50px"}}>
                    <p className={classes.illustrationLabel}>Welcome to Tithenai</p>
                   { <img src={LoginGif} alt="Welcome" className={classes.loginIllustration}/>}
                    <p className={classes.header}>Get inspired by others' thesis, publish your own one and share your thoughts with your colleages.</p>
                    <p className={classes.headerSpan}>
                        To start, 
                        <span className="forwardingSpan" onClick={() => redirectToRegisterPage(navigator)}>&nbsp;Sign Up Now!</span>
                    </p>
                    <p className={classes.headerSpan}>
                        Or  
                        <span className="forwardingSpan" onClick={() => redirectToLoginPage(navigator)}>&nbsp;Sign In </span>
                        if you already have an account :)
                    </p>
                    <p className={classes.headerSpan}>
                        To learn more, 
                        <span className="forwardingSpan" to="aboutTithenai" onClick="aboutTithenai">&nbsp;click here.</span>
                    </p>
                </Paper>
            </div>
            <div style={{padding: "20px", marginTop: "10px", display: "flex", justifyContent: "center"}}>
                <Paper style={{width: "80%", padding: "50px"}} id="aboutTithenai">
                    <p className={classes.illustrationLabel}>About Tithenai</p>
                    <p className={classes.header}>
                        The application was developed to target two groups. The first group consists of undergraduate
                        students who are undertaking or plan to undertake research for their thesis. The second group
                        includes students who have completed their studies and have a ready-to-publish thesis and wish
                        to present their work in a professional setting where they can also inspire other students.
                    </p>
                </Paper>
            </div>
            <Footer />
            <CssBaseline />
        </div>
    )
}

export default LandingPage;