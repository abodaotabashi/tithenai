import React from 'react';
import { CssBaseline, Grid, Paper, Button } from '@mui/material';
import { Link } from 'react-scroll';
import { redirectToLoginPage, redirectToRegisterPage } from '../../utils/Redirecter';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

import { makeStyles } from '@mui/styles';
import LandingWelcomeGif from '../../assets/gifs/LandingWelcome.gif';
import { useTranslation, withTranslation } from 'react-i18next';

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
        fontFamily: "Ubuntu",
        fontSize: "large",
        textAlign: "center",
    },
    illustrationLabel: {
        fontSize: "xx-large",
        fontFamily: "Ubuntu",
        color: "black",
        [theme.breakpoints.down('md')]: {
            fontSize: "x-large",
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: "x-large",
        },
    },
    loginIllustration: {
        width: "16rem",
        [theme.breakpoints.down('md')]: {
            width: "12rem",
        },
        [theme.breakpoints.down('sm')]: {
            width: "10rem",
        },
    }
}));

const LandingPage = () => {
    const { t } = useTranslation();
    const classes = useStyles();
    const navigator = useNavigate();
    return (
        <div className="loginPageContainer">
            <Navbar />
            <div style={{padding: "20px", marginTop: "10px", display: "flex", justifyContent: "center"}}>
                <Paper style={{width: "80%", padding: "50px"}}>
                    <p className={classes.illustrationLabel}>{t('landing.welcome_to')}</p>
                    <Grid container alignItems="center">
                        <Grid item xs={12} sm={12} md={5} lg={4}>
                            <img src={LandingWelcomeGif} alt="Welcome" className={classes.loginIllustration}/>
                        </Grid>
                        <Grid item xs={12} sm={12} md={7} lg={8}>
                            <p className="textWithSecondaryGradient">{t('landing.get_inspired')}</p>
                        </Grid>
                        <Grid container alignItems="center" direction="column">
                            <Grid item xs={12} sm={12} md={7} lg={8}>
                                <p className={classes.headerSpan}>
                                    {t('landing.to_start')}
                                </p>
                                <Button
                                        className="forwardingSpan"
                                        onClick={() => redirectToRegisterPage(navigator)}
                                        color="secondary"
                                                variant="outlined"
                                                size="large"
                                                type="submit"
                                                style={{padding: "1vh 2vw", fontFamily: "Ubuntu", backgroundColor: "green", color: "white"}}>
                                        &nbsp;{t('landing.sign_up')}
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={12} md={7} lg={8}>
                                <p className={classes.headerSpan}>
                                    {t('landing.have_account')}
                                </p>
                                <Button
                                    className="forwardingSpan"
                                    onClick={() => redirectToLoginPage(navigator)}
                                    color="secondary"
                                            variant="outlined"
                                            size="large"
                                            type="submit"
                                            style={{padding: "1vh 2vw", fontFamily: "Ubuntu", backgroundColor: "green", color: "white"}}>
                                    &nbsp;{t('landing.sign_in')}
                                </Button>
                            </Grid>
                            <p className={classes.headerSpan}>
                                {t('landing.to_learn')}
                                <Link className="forwardingSpan" to="aboutTithenai" smooth="true">&nbsp;{t('landing.click')}</Link>
                            </p>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
            <div style={{padding: "10px", display: "flex", justifyContent: "center"}}>
                <Paper style={{width: "80%", padding: "40px"}} id="aboutTithenai">
                    <p className={classes.illustrationLabel}>{t('landing.about')}</p>
                    <p className={classes.header}>
                        {t('landing.about_tithenai')}
                    </p>
                </Paper>
            </div>
            <br />
            <br />
            <br />
            <Footer />
            <CssBaseline />
        </div>
    )
}

export default withTranslation()(LandingPage);