import React, { useEffect, useState, useContext } from 'react';
import { Button, CssBaseline, Grid, Pagination, Paper, Typography } from '@mui/material';
import Footer from '../components/Footer';
import NavbarWithUser from '../components/NavbarWithUser';
import ThesisCard from '../components/ThesisCard';
import { withTranslation, useTranslation } from 'react-i18next';

import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../utils/Context';
import { redirectToLoginPage, redirectToMainPage } from '../utils/Redirecter';
import { sortAlphabetically } from '../utils/HelperFunctions';
import { getSavedList, saveThesis, unsaveThesis } from '../Service';

import NoResultsIllustration from "../assets/gifs/NoResults.gif";
import HomeIcon from '@mui/icons-material/Home';
import '../assets/styles.css';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme => ({
    paper: {
        padding: "20px",
        width: "90%",
        margin: "auto",
        marginTop: "4vh",
        border: "3px solid",
        borderImageSlice: "1",
        borderImageSource: "linear-gradient(45deg, #1BC54B, #00290F)",
        [theme.breakpoints.down('md')]: {
            marginTop: "2vh",
            width: "90%",
            padding: "15px",
        },
        [theme.breakpoints.down('sm')]: {
            marginTop: "2vh",
            width: "90%",
            marginBottom: "10vh",
            padding: "10px",
        },
    },
    noResultsLeftSection: {
        display: "flex",
        justifyContent: "right",
        [theme.breakpoints.down('md')]: {
            justifyContent: "center",
        },
        [theme.breakpoints.down('sm')]: {
            justifyContent: "center",
        },
    },
    noResultsRightSection: {
        display: "flex",
        justifyContent: "left",
        paddingLeft: "30px",
        [theme.breakpoints.down('md')]: {
            justifyContent: "center",
            paddingLeft: "0",
        },
        [theme.breakpoints.down('sm')]: {
            justifyContent: "center",
            paddingLeft: "0",
        },
    },
}));


const SavedListPage = (props) => {
    const { t } = useTranslation();
    const navigator = useNavigate();
    const { userAuth } = useContext(AuthContext);
    const [savedTheses, setSavedTheses] = useState(null);
    const [numberOfPages, setNumberOfPages] = useState(1);
    const [currentTheses, setCurrentTheses] = useState(null);
    const thesesPerPage = 4;           //Editable

    const classes = useStyles();

    useEffect(() => {
        if (typeof (userAuth) !== "undefined") {
            if (userAuth) {
                getSavedList(userAuth.uid)
                    .then(response => {
                        if(typeof(response) !== "undefined" && response !== null) {
                            console.log(response.data)
                            setSavedTheses(response.data.sort(sortAlphabetically("thesisTitle", "tr")));
                            setNumberOfPages(Math.ceil( response.data.length / thesesPerPage));
                            handleShowCurrentPageOfTheses(response.data, 1);
                        }
                    })
                    .catch(error => console.log(error));
            } else {
                redirectToLoginPage(navigator);
            }
        }
    }, [userAuth, navigator])


    const handleShowCurrentPageOfTheses = ( theses, pageNumber) => {
        const indexOfLastResult = pageNumber * thesesPerPage;
        const indexOfFirstResult = indexOfLastResult - thesesPerPage;
        setCurrentTheses(theses.sort(sortAlphabetically("thesisTitle", "tr")).slice(indexOfFirstResult, indexOfLastResult));
    }

    const handleUnsaveThesis = async (thesisId) => {
        if(typeof(userAuth) !== "undefined") {
            if(userAuth){
                const values = {
                    uid: userAuth.uid,
                    thesisId: thesisId
                };
                unsaveThesis(values);
            } else {
                redirectToLoginPage(navigator);
            }
        }
    }

    const handleSaveThesis = async (thesisId) => {
        if(typeof(userAuth) !== "undefined") {
            if(userAuth){
                const values = {
                    uid: userAuth.uid,
                    thesisId: thesisId
                };
                saveThesis(values);
            } else {
                redirectToLoginPage(navigator);
            }
        }
    }

    return (
        <div className="whitePageContainer">
            <NavbarWithUser hideUpload={false} />
            <Paper elevation={8} className={classes.paper}>
                <Grid container alignItems="center" justifyContent="center">
                    <Grid item container xs={12} sm={12} md={12} lg={12}>
                        {savedTheses !== null && typeof(savedTheses) !== "undefined" && savedTheses.length > 0 &&
                            <>
                                <Grid item xs={12} sm={12} md={12} lg={12} style={{margin: "1vh 0", marginLeft: "3rem", textAlign: "start"}}>
                                    <Typography variant="h6" component="div" style={{fontFamily: "Ubuntu", fontWeight: "700"}}>
                                        {savedTheses.length} {t('saved.found')}
                                    </Typography>
                                </Grid>
                            {   currentTheses !== null && currentTheses.map((thesis) => {
                                    return (
                                        <Grid item key={thesis.thesisId} xs={12} sm={12} md={12} lg={12} style={{margin: "1vh 0"}}>
                                            {<ThesisCard
                                                key={thesis.thesisId}
                                                thesis={thesis}
                                                savingMode={true}
                                                saveThesisFunction={handleSaveThesis}
                                                unsaveThesisFunction={handleUnsaveThesis} />}
                                        </Grid>
                                    );
                                })
                            }
                            { numberOfPages !== 0 && numberOfPages !== 1 &&
                                <Grid item container xs={12} sm={12} md={12} lg={12} style={{margin: "3vh 0"}} direction="row" alignItems="center" justifyContent="center">
                                    <p>{t('saved.pages')}</p>
                                    <Pagination
                                        boundaryCount={2}
                                        hidePrevButton
                                        hideNextButton
                                        count={numberOfPages}
                                        shape="rounded"
                                        variant="outlined"
                                        style={{display: "flex", justifyContent: "center"}}
                                        onChange={(event) => {
                                            handleShowCurrentPageOfTheses(savedTheses, event.target.textContent)
                                        }} />
                                </Grid>
                            }
                            </>
                        }
                        {savedTheses !== null && savedTheses.length === 0 &&
                            <Grid container alignItems="center" justifyContent="center">
                                <Grid item xs={12} sm={12} md={5} lg={5} className={classes.noResultsLeftSection}>
                                    <img src={NoResultsIllustration} alt="noResults" style={{width: "10rem"}}/>
                                </Grid>
                                <Grid item xs={12} sm={12} md={7} lg={7} className={classes.noResultsRightSection}>
                                    <p className='textWithSecondaryGradient' >{t('saved.you_didnt')}</p>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <Button
                                        variant="contained"
                                        color='secondary'
                                        style={{marginTop: "3vh", fontFamily: "Ubuntu"}}
                                        startIcon={<HomeIcon />}
                                        onClick={() => redirectToMainPage(navigator)}>
                                        {t('saved.back')}
                                    </Button>
                                </Grid>
                            </Grid>
                        }
                    </Grid>
                </Grid>
            </Paper>
            <br />
            <br />
            <Footer />
            <CssBaseline />
        </div>
    )
}

export default withTranslation()(SavedListPage);
