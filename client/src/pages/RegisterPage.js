import React from 'react';
import { makeStyles } from '@mui/styles';
import { CssBaseline, Divider, Grid, IconButton, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import RegisterForm from '../containers/RegisterForm';

import RegisterGif from '../assets/gifs/Register_480.gif';
import GoogleGif from '../assets/gifs/GoogleLogoOptimized.gif';
import '../assets/styles.css'
import { signUpWithGoogle } from '../auth/auth';
import { redirectToLoginPage } from '../utils/Redirecter';

const useStyles = makeStyles(theme => ({
    paper: {
        margin: "auto",
        marginTop: "3vh",
        width: "85%",
        padding: "20px",
        paddingTop: "0",
        paddingBottom: "0",
        fontFamily: "Ubuntu",
        fontSize: "large"
    },
    headerSpan: {
        fontFamily: "Ubuntu-Light",
        fontSize: "medium",
        textAlign: "center",
    },
    alignIllustration: {
        textAlign: "right",
        [theme.breakpoints.down('xl')]: {
            textAlign: "right",
        },
        [theme.breakpoints.down('lg')]: {
            textAlign: "right",
        },
        [theme.breakpoints.down('md')]: {
            textAlign: "center",
        },
        [theme.breakpoints.down('sm')]: {
            textAlign: "center",
        },
    },
    illustrationLabel: {
        fontSize: "x-large",
        fontFamily: "Ubuntu",
        textAlign: "left",
        [theme.breakpoints.down('xl')]: {
            fontSize: "x-large",
            textAlign: "left",
        },
        [theme.breakpoints.down('lg')]: {
            fontSize: "x-large",
            textAlign: "left",
        },
        [theme.breakpoints.down('md')]: {
            fontSize: "large",
            textAlign: "center",
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: "medium",
            textAlign: "center",
        },
    },
    registerIllustration: {
        width: "12rem",
        [theme.breakpoints.down('xl')]: {
            width: "12rem",
            textAlign: "right",
        },
        [theme.breakpoints.down('lg')]: {
            width: "10rem",
            textAlign: "right",
        },
        [theme.breakpoints.down('md')]: {
            width: "10rem",
            textAlign: "center",
        },
        [theme.breakpoints.down('sm')]: {
            width: "8rem",
            textAlign: "center",
        },
    }
}));
const RegisterPage = (props) => {
    const classes = useStyles();
    const navigator = useNavigate();

    const handleSignUpWithGoogle = () => {
        signUpWithGoogle()
            .then((result)=>{
                console.log(result)
            }).catch(console.log)
    }
    return(
        <div className="registerPageContainer">
            <Navbar />
            <Paper className={classes.paper}>
                <Grid container alignItems="center" justifyContent="center" style={{paddingTop: "2%", paddingBottom: "1%"}}>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={5} className={classes.alignIllustration} >
                        <img src={RegisterGif} alt="register" className={classes.registerIllustration} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={8} lg={8} xl={7} className={classes.illustrationLabel}>
                        Create a new account to access unlimited theses!
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
                        <RegisterForm />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} container alignItems="center" justifyContent="center">
                        <Divider variant="middle" style={{textAlign: "center", width: "80%", padding: "0.5vh 0", color: "#14325A"}}>Or</Divider>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} container alignItems="center" justifyContent="center" direction="row">
                            <p className="forwardingSpan" style={{cursor: "pointer"}} onClick={handleSignUpWithGoogle}>Continue with Google</p>
                            <IconButton aria-label="google" size="small" color="secondary" onClick={handleSignUpWithGoogle}>
                                <img src={GoogleGif} alt="SigninWithGoogle" style={{width: "32px", borderRadius: "50%", margin: "2px", border: "1px solid #00000050"}}/>
                            </IconButton>
                        </Grid>
                        <Divider variant="middle" style={{textAlign: "center", width: "80%", padding: "0.5vh 0", color: "#14325A"}}>Or</Divider>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <p className={classes.headerSpan}>
                                <span className="forwardingSpan" onClick={() => redirectToLoginPage(navigator)}>just login, </span>
                                if you already have an account
                            </p>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
            <br />
            <CssBaseline />
        </div>
    );
}

export default RegisterPage;