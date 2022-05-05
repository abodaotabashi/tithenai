import React from 'react';
import { makeStyles } from '@mui/styles';
import { CssBaseline, Paper, Button } from '@mui/material';
import { redirectToMainPage } from '../utils/Redirecter';
import { useNavigate } from 'react-router-dom';
import NotFoundIllustration from "../assets/gifs/NotFound.gif";
import Navbar from '../components/Navbar';
import HomeIcon from '@mui/icons-material/Home';


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
    const classes = useStyles();
    const navigator = useNavigate();
    return (
        <div className='registerPageContainer'>
            <Navbar />
            <Paper elevation={10} className={classes.wrapper}>
                <img src={NotFoundIllustration} className={classes.notFoundLogo} alt="404"/>
                <p className={classes.notFoundText}>
                    You didn't break the internet. It's just a 404 Error!
                </p>
                <p className={classes.notFoundText}>
                    We couldn't find the page you were looking for.
                </p>
                <p className={classes.notFoundText}>
                    But don't worry, everything is still awesome 😉
                </p>
                <Button
                    variant="contained"
                    color='secondary'
                    style={{marginTop: "3vh", fontFamily: "Ubuntu"}}
                    startIcon={<HomeIcon />}
                    onClick={() => redirectToMainPage(navigator)}>
                    Home Sweet Home
                </Button>
            </Paper>
            <CssBaseline />
        </div>
    )
}

export default NotFoundPage