import React, { useEffect, useState, useContext } from 'react';
import { CircularProgress, CssBaseline, Grid, Pagination, Paper, Typography, Button } from '@mui/material';
import { getUserTheses } from '../Service';
import { AuthContext } from '../utils/Context';
import { useNavigate } from 'react-router-dom';
import { redirectToLoginPage } from '../utils/Redirecter';
import NavbarWithUser from '../components/NavbarWithUser';
import Footer from '../components/Footer';

import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';
import '../assets/styles.css';
import { sortAlphabetically } from '../utils/HelperFunctions';
import UploadIcon from '@mui/icons-material/Upload';
import ThesisCard from '../components/ThesisCard';
import NoResultsIllustration from "../assets/gifs/NoResults.gif";

const UploadButton = styled(Button)(({ theme }) => ({
    color: theme.palette.secondary.main,
    fontFamily: "Ubuntu-Light",
    fontWeight: "bold",
    border: `2px solid ${theme.palette.secondary.main}`,
    textTransform: "none",
    '&:hover': {
        border: `2px solid ${theme.palette.secondary.main}`,
        backgroundColor: theme.palette.secondary.main,
        color: "#ffffff",
    },
}));

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
    noPapersGif: {
        display: "flex",
        justifyContent: "center",
    },
    noPapersLabel: {
        display: "flex",
        justifyContent: "center",
        paddingLeft: "30px",
        [theme.breakpoints.down('md')]: {
            paddingLeft: "0",
        },
        [theme.breakpoints.down('sm')]: {
            paddingLeft: "0",
        },
    },
    papersLabel: {
        fontSize: "xx-large",
        fontFamily: "Ubuntu",
        textAlign: "start",
        color: theme.palette.secondary.dark,
        [theme.breakpoints.down('md')]: {
            marginBlockStart: "0.5em",
            marginBlockEnd: "0.5em",
            textAlign: "center",
            fontSize: "x-large",
        },
        [theme.breakpoints.down('sm')]: {
            marginBlockStart: "0.5em",
            marginBlockEnd: "0.5em",
            textAlign: "center",
            fontSize: "x-large",
        },
    },
}));

const MyPapersPage = () => {
    const classes = useStyles();
    const { userAuth } = useContext(AuthContext);
    const navigator = useNavigate();
    const [papers, setPapers] = useState(null);
    const [numberOfPages, setNumberOfPages] = useState(1);
    const [currentPapers, setCurrentPapers] = useState(null);
    const papersPerPage = 5;           //Editable

    const handleShowCurrentPageOfPapers = (responsePapers, pageNumber) => {
        const indexOfLastResult = pageNumber * papersPerPage;
        const indexOfFirstResult = indexOfLastResult - papersPerPage;
        if (responsePapers !== null) {
            setCurrentPapers(responsePapers.sort(sortAlphabetically("thesisTitle", "tr")).slice(indexOfFirstResult, indexOfLastResult));
        } else {
            setCurrentPapers(papers.sort(sortAlphabetically("thesisTitle", "tr")).slice(indexOfFirstResult, indexOfLastResult));
        }
    }

    useEffect(() => {
        if (typeof (userAuth) !== "undefined") {
            if (userAuth) {
                const uid = userAuth.uid;
                getUserTheses(uid)
                    .then(response => {
                        if(typeof(response) !== "undefined") {
                            setPapers(response)
                            setNumberOfPages(Math.ceil( response.length / papersPerPage));
                            handleShowCurrentPageOfPapers(response, 1)
                        }
                    })
                    .catch(error => console.log(error));
            } else {
                redirectToLoginPage(navigator);
            }
        }
    }, [userAuth, navigator])

    return (
        <div className="whitePageContainer">
            <NavbarWithUser hideUpload={false} />
            <Paper elevation={8} className={classes.paper}>
                <Grid container alignItems="center" justifyContent="center">
                    <Grid item container xs={12} sm={12} md={12} lg={12} alignItems="center" justifyContent="center">
                        {papers === null &&
                            <>
                                <Grid item container xs={12} sm={12} md={12} lg={12} alignItems="center" justifyContent="center">
                                    <p className={classes.papersLabel}>My Papers</p>
                                </Grid>
                                <CircularProgress color="secondary" fullwidth="true" />
                            </>
                        }
                        {papers !== null && papers.length !== 0 && currentPapers === null &&
                            <CircularProgress color="secondary" fullwidth="true" />
                        }
                        {papers !== null && currentPapers !== null && typeof(papers) !== "undefined" && papers.length > 0 &&
                            <>
                                <Grid item container xs={12} sm={12} md={12} lg={12} alignItems="center" justifyContent="center">
                                    <p className={classes.papersLabel}>My Papers</p>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12} style={{margin: "1vh 0", marginLeft: "3rem", textAlign: "start"}}>
                                    <Typography variant="h6" component="div" style={{fontFamily: "Ubuntu", fontWeight: "700"}}>
                                        You have published {papers.length} Papers, keep going 😉
                                    </Typography>
                                </Grid>
                                {currentPapers.map((result) => {
                                    return (
                                        <Grid item key={result.thesisId} xs={12} sm={12} md={12} lg={12} style={{margin: "1vh 0"}}>
                                            <ThesisCard key={result.thesisId} thesis={result} savingMode={false} />
                                        </Grid>
                                    )})
                                }
                                { numberOfPages !== 0 && numberOfPages !== 1 &&
                                    <Grid item container xs={12} sm={12} md={12} lg={12} style={{margin: "3vh 0"}} direction="row" alignItems="center" justifyContent="center">
                                        <p>Pages:</p>
                                        <Pagination
                                            boundaryCount={2}
                                            hidePrevButton
                                            hideNextButton
                                            count={numberOfPages}
                                            shape="rounded"
                                            variant="outlined"
                                            style={{display: "flex", justifyContent: "center"}}
                                            onChange={(event) => {
                                                handleShowCurrentPageOfPapers(papers, event.target.textContent)
                                            }} />
                                    </Grid>
                                }
                            </>
                        }
                        {papers !== null && papers.length === 0 &&
                            <Grid container alignItems="center" justifyContent="center">
                                <Grid item container xs={12} sm={12} md={12} lg={12} alignItems="center" justifyContent="center">
                                    <p className={classes.papersLabel}>My Papers</p>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12} className={classes.noPapersGif}>
                                    <img src={NoResultsIllustration} alt="noResults" style={{width: "10rem"}}/>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12} className={classes.noPapersLabel}>
                                    <p style={{fontFamily: 'Ubuntu', fontSize: "1.5rem", backgroundColor: "default"}}>
                                        <span className='textWithSecondaryGradient'>
                                            You haven't published any Papers, so get started and upload a new one
                                        </span>
                                        &nbsp; 😉
                                    </p>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <UploadButton variant="outlined" size="large" color="secondary" startIcon={<UploadIcon />}>Upload a New Paper</UploadButton>
                                </Grid>
                            </Grid>
                        }
                    </Grid>
                </Grid>
            </Paper>
            <Footer />
            <CssBaseline />
        </div>
    )
}

export default MyPapersPage