import React from 'react';
import { makeStyles } from '@mui/styles';
import { CssBaseline, Paper, Button } from '@mui/material';
import { redirectToMainPage } from '../utils/Redirecter';
import { useNavigate } from 'react-router-dom';
import NotFoundIllustration from "../assets/gifs/NotFound.gif";
import Navbar from '../components/Navbar';
import HomeIcon from '@mui/icons-material/Home';
import { withTranslation, useTranslation } from 'react-i18next';


const useStyles = makeStyles((theme) => ({
    wrapper: {
        width: "60%",
        margin: "auto",
        marginTop: "5%",
        padding: "2rem",
        [theme.breakpoints.down('md')]: {
            width: "80%",
            marginTop: "10%",
            padding: "1.5rem",
        },
        [theme.breakpoints.down('sm')]: {
            width: "85%",
            marginTop: "25%",
            padding: "1rem",
        },
    },
    notFoundLogo: {
        width: "18rem",
        marginBottom: theme.spacing(2),
        [theme.breakpoints.down('md')]: {
            width: "15rem",
        },
        [theme.breakpoints.down('sm')]: {
            width: "80%",
        },
    },
    notFoundText: {
        fontFamily: "Ubuntu",
        fontSize: "large",
        textAlign: "center",
        [theme.breakpoints.down('sm')]: {
            fontSize: "large",
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: "medium",
            textAlign: "justify",
            textJustify: "inter-word", 
        },
    }
}));

const NotFoundPage = () => {
    const { t } = useTranslation();
    const classes = useStyles();
    const navigator = useNavigate();
    return (
        <div className='registerPageContainer'>
            <Navbar />
            <Paper elevation={10} className={classes.wrapper}>
                <img src={NotFoundIllustration} className={classes.notFoundLogo} alt="404"/>
                <p className={classes.notFoundText}>
                    {t('not_found.you_didnt')}
                </p>
                <p className={classes.notFoundText}>
                {t('not_found.we')}
                </p>
                <p className={classes.notFoundText}>
                {t('not_found.but')} 😉
                </p>
                <Button
                    variant="contained"
                    color='secondary'
                    style={{marginTop: "3vh", fontFamily: "Ubuntu"}}
                    startIcon={<HomeIcon />}
                    onClick={() => redirectToMainPage(navigator)}>
                    {t('not_found.home')}
                </Button>
            </Paper>
            <CssBaseline />
        </div>
    )
}

export default withTranslation()(NotFoundPage);