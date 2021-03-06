import React, { useEffect, useContext, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { CssBaseline, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../containers/LoginForm';
import Navbar from '../components/Navbar';
import LoadingPage from './LoadingPage';
import { AuthContext } from '../utils/Context';
import { redirectToMainPage, redirectToRegisterPage } from '../utils/Redirecter';
import { useTranslation } from 'react-i18next';

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
    const { t } = useTranslation();
    const classes = useStyles();
    const navigator = useNavigate();
    const { userAuth } = useContext(AuthContext);
    const [userAuthStatus, setUserAuthStatus] = useState(1);

    useEffect(() => {
        if (typeof (userAuth) !== "undefined") {
            if (userAuth) {
                redirectToMainPage(navigator);
            } else {
                setUserAuthStatus(2);
            }
        }
    }, [userAuth, navigator]);

    const redirectToSearchPage = () => {
        redirectToMainPage(navigator);
    }

    return (
        <>
            {userAuthStatus === 1 &&
                <LoadingPage />
            }
            {userAuthStatus === 2 &&
                <div className="loginPageContainer">
                    <Navbar />
                    <Grid container alignItems="center" justifyContent="center" style={{ paddingTop: "2%", paddingBottom: "2%" }}>
                        <Grid item container xs={11} sm={11} md={11} lg={11} direction="row-reverse" alignItems="center" justifyContent="center" className="loginBanner">
                            <Grid item container xs={12} sm={12} md={7} lg={8} direction="row" alignItems="center" justifyContent="center">
                                <p className={classes.illustrationLabel}>{t('login_page.welcome')}</p>
                                <img src={LoginGif} alt="Welcome" className={classes.loginIllustration} />
                            </Grid>
                            <Grid item container xs={12} sm={12} md={5} lg={4} className="glassmorphismEffect75" justifyContent="center">
                                <Grid item container xs={12} sm={12} md={12} lg={12} xl={12} direction="row">
                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                                        <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                            <img src={TithenaiLogo} alt="Tithenai" className='headerLabelLogo' onClick={() => redirectToMainPage(navigator)} />
                                        </div>
                                        <p className={classes.header}>{t('login_page.signin_to')}</p>
                                        <p className={classes.headerSpan}>
                                            {t('login_page.new')}
                                            <span className="forwardingSpan" onClick={() => redirectToRegisterPage(navigator)}>&nbsp;{t('login_page.create')}</span>
                                        </p>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <LoginForm redirectToSearchPage={redirectToSearchPage} />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <CssBaseline />
                </div>
            }
        </>
    );
}

export default LoginPage;