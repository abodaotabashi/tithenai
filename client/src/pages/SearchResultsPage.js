import React, { useEffect, useState, useContext } from 'react';
import { CircularProgress, CssBaseline, Divider, FormControl, Grid, InputLabel, MenuItem, Pagination, Paper, Select, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../utils/Context';
import { redirectToLoginPage, redirectToSearchResultsPage } from '../utils/Redirecter';
import { searchTheses, searchUniversities } from '../Service';
import { sortAlphabetically } from '../utils/HelperFunctions';
import Footer from '../components/Footer';
import NavbarWithUser from '../components/NavbarWithUser';
import SearchThesisPanel from '../components/SearchThesisPanel';
import SearchUniversityPanel from '../components/SearchUniversityPanel';
import UniversityCard from '../components/UniversityCard';

import NoResultsIllustration from "../assets/gifs/NoResults.gif";
import '../assets/styles.css';
import { makeStyles } from '@mui/styles';
import ThesisCard from '../components/ThesisCard';


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

const SearchResultsPage = (props) => {
    const location = useLocation();
    const navigator = useNavigate();
    const { userAuth } = useContext(AuthContext);
    const [resultType, setResultType] = useState("Theses");
    const [searchingValues, setSearchingValues] = useState();
    const [results, setResults] = useState(null);
    const [numberOfPages, setNumberOfPages] = useState(1);
    const [currentResults, setCurrentResults] = useState(null);
    const resultsPerPage = 4;           //Editable

    const classes = useStyles();


    useEffect(() => {
        setResults(location.state.results);
        setResultType(location.state.resultType);
        if(typeof(location.state.results) !== "undefined") {
            if(location.state.resultType === "Universities") {
                setResults(location.state.results.sort(sortAlphabetically("uniName", "tr")));
            } else if (location.state.resultType === "Theses") {
                setResults(location.state.results.sort(sortAlphabetically("thesisTitle", "tr")));
            }
            setSearchingValues(location.state.searchingValues);
            setNumberOfPages(Math.ceil( location.state.results.length / resultsPerPage));
            handleShowCurrentPageOfResults(1)
        }
    }, [location])

    const handleShowCurrentPageOfResults = (pageNumber) => {
        const indexOfLastResult = pageNumber * resultsPerPage;
        const indexOfFirstResult = indexOfLastResult - resultsPerPage;
        if(location.state.resultType === "Universities") {
            setCurrentResults(location.state.results.sort(sortAlphabetically("uniName", "tr")).slice(indexOfFirstResult, indexOfLastResult));
        } else if (location.state.resultType === "Theses") {
            setCurrentResults(location.state.results.sort(sortAlphabetically("thesisTitle", "tr")).slice(indexOfFirstResult, indexOfLastResult));
        }
    }

    const handleSearchTheses = async (searchingValues) => {
        if(typeof(userAuth) !== "undefined") {
            if(userAuth){
                searchTheses(searchingValues).then((result) => {
                    redirectToSearchResultsPage(navigator, "Theses", result, searchingValues);
                })
            } else {
                redirectToLoginPage(navigator);
            }
        }
    }

    const handleSearchUniversities = async (searchingValues) => {
        if(typeof(userAuth) !== "undefined") {
            if(userAuth){
                searchUniversities(searchingValues).then((result) => {
                    redirectToSearchResultsPage(navigator, "Universities", result, searchingValues);
                })
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
                    <Grid item xs={12} sm={12} md={2} lg={2}>
                        <FormControl fullWidth>
                            <InputLabel color='secondary' style={{fontFamily: 'Ubuntu'}}>Searching</InputLabel>
                            <Select
                                color='secondary'
                                value={resultType}
                                label="Searching"
                                onChange={(event) => setResultType(event.target.value)}>
                                <MenuItem style={{fontFamily: 'Ubuntu'}} value={"Theses"}>Theses</MenuItem>
                                <MenuItem style={{fontFamily: 'Ubuntu'}} value={"Universities"}>Universities</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} md={10} lg={10}>
                        {resultType === "Theses" && <SearchThesisPanel handleSearchTheses={handleSearchTheses} initialSearchingValues={searchingValues} />}
                        {resultType === "Universities" && <SearchUniversityPanel handleSearchUniversities={handleSearchUniversities} initialSearchingValues={searchingValues} />}
                    </Grid>
                    <Grid item xs={10} sm={10} md={10} lg={10}>
                        <br />
                        <Divider variant="middle" style={{backgroundColor:"#000000"}} />
                        <br />
                    </Grid>
                </Grid>
                <Grid container alignItems="center" justifyContent="center">
                    <Grid item container xs={12} sm={12} md={12} lg={12}>
                        {results === null &&
                            <CircularProgress color="secondary" fullwidth="true" />
                        }
                        {results !== null && typeof(results) !== "undefined" && results.length > 0 &&
                            <>
                                <Grid item xs={12} sm={12} md={12} lg={12} style={{margin: "1vh 0", marginLeft: "3rem", textAlign: "start"}}>
                                    <Typography variant="h6" component="div" style={{fontFamily: "Ubuntu", fontWeight: "700"}}>
                                        {results.length} Results found:
                                    </Typography>
                                </Grid>
                            {location.state.resultType === "Theses" &&
                                currentResults.map((result) => {
                                    return (
                                        <Grid item key={result.thesisId} xs={12} sm={12} md={6} lg={6} style={{margin: "1vh 0"}}>
                                            <ThesisCard key={result.thesisId} thesis={result} savingMode={false} />
                                        </Grid>
                                    );
                                })
                            }
                            { location.state.resultType === "Universities" &&
                                currentResults.map((result) => {
                                    return (
                                        <Grid item key={result.uniId} xs={12} sm={12} md={6} lg={6} style={{margin: "1vh 0"}}>
                                            <UniversityCard key={result.uniId} university={result} />
                                        </Grid>
                                    );
                                })
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
                                            handleShowCurrentPageOfResults(event.target.textContent)
                                        }} />
                                </Grid>
                            }
                            </>
                        }
                        {results !== null && results.length === 0 &&
                            <Grid container alignItems="center" justifyContent="center">
                                <Grid item xs={12} sm={12} md={5} lg={5} className={classes.noResultsLeftSection}>
                                    <img src={NoResultsIllustration} alt="noResults" style={{width: "10rem"}}/>
                                </Grid>
                                <Grid item xs={12} sm={12} md={7} lg={7} className={classes.noResultsRightSection}>
                                    <p className='textWithSecondaryGradient' >Oops! No results found.</p>
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

export default SearchResultsPage;