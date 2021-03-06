import React, { useState, useContext } from 'react';
import { AppBar, CssBaseline, Tabs, Tab, Grid, Paper } from '@mui/material';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@mui/styles';
import { styled } from '@mui/material/styles';
import TabPanel, { a11yProps } from "../../components/TabPanel";
import NavbarWithUser from '../../components/NavbarWithUser';
import Footer from '../../components/Footer';
import SearchUniversityPanel from '../../components/SearchUniversityPanel';
import SearchThesisPanel from '../../components/SearchThesisPanel';
import { searchTheses, searchUniversities } from '../../Service';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../utils/Context';
import { redirectToLoginPage, redirectToSearchResultsPage } from '../../utils/Redirecter';
import { useTranslation } from 'react-i18next';

import WelcomeIllustration from "../../assets/gifs/Welcome.gif";
import '../../assets/styles.css';

const useStyles = makeStyles(theme => ({
    paper: {
        padding: "20px",
        width: "80%",
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
    content: {
        padding: theme.spacing(2),
        [theme.breakpoints.down('md')]: {
            padding: theme.spacing(1),
        },
        [theme.breakpoints.down('sm')]: {
            padding: 0,
        },
    },
    welcomeIllustration: {
        width: "14rem",
        [theme.breakpoints.down('md')]: {
            width: "12rem",
        },
        [theme.breakpoints.down('sm')]: {
            width: "10rem",
        },
        [theme.breakpoints.down('xs')]: {
            width: "6rem",
        },
    },
    welcomeLeftSection: {
        display: "flex",
        justifyContent: "right",
        [theme.breakpoints.down('md')]: {
            justifyContent: "center",
        },
        [theme.breakpoints.down('sm')]: {
            justifyContent: "center",
        },
    },
    welcomeRightSection: {
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
    panel: {
        width: "80%",
        margin: "auto",
        [theme.breakpoints.down('md')]: {
            width: "90%",
            margin: "auto",
        },
        [theme.breakpoints.down('sm')]: {
            width: "95%",
            margin: "auto",
        },
    }
}));

const StyledAppBar = styled(AppBar)(({ theme }) => ({
    width: "38%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "30px",
    margin: "0 auto",
    [theme.breakpoints.down('md')]: {
        width: "58%",
    },
    [theme.breakpoints.down('sm')]: {
        width: "98%",
    },
}));

const SearchPage = () => {
    const { t } = useTranslation();
    const classes = useStyles();
    const theme = useTheme();
    const [selectedTab, setSelectedTab] = useState(0);
    const navigator = useNavigate();
    const { userAuth } = useContext(AuthContext);

    const handleChangeMode = (event, newValue) => {
        setSelectedTab(newValue);
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
                    <Grid item xs={12} sm={12} md={4} lg={4} className={classes.welcomeLeftSection}>
                        <img src={WelcomeIllustration} alt="Welcome" className={classes.welcomeIllustration}/>
                    </Grid>
                    <Grid item xs={12} sm={12} md={8} lg={8} className={classes.welcomeRightSection}>
                        <p className='textWithSecondaryGradient' >{t('search_page.welcome_back')}</p>
                    </Grid>
                </Grid>
                <Grid item xs={12} className={classes.content}>
                    <StyledAppBar position="static" color="default">
                        <Tabs
                            value={selectedTab}
                            onChange={handleChangeMode}
                            indicatorColor="secondary"
                            textColor="secondary"
                            variant="scrollable"
                            aria-label="full width tabs example">
                            <Tab data-testid="theses-section" label={t('search_page.theses')} wrapped style={{fontFamily: "Ubuntu", fontSize: "medium"}} {... a11yProps(0)} />
                            <Tab label={t('search_page.universities')} wrapped style={{fontFamily: "Ubuntu", fontSize: "medium"}} {... a11yProps(1)} />
                        </Tabs>
                    </StyledAppBar>
                    <SwipeableViews
                        className={classes.panel}
                        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                        index={selectedTab}
                        onChangeIndex={(index) => setSelectedTab(index)}>
                        <TabPanel value={selectedTab} index={0} dir={theme.direction}>
                            <SearchThesisPanel handleSearchTheses={handleSearchTheses} />
                        </TabPanel>
                        <TabPanel value={selectedTab} index={1} dir={theme.direction}>
                            <SearchUniversityPanel handleSearchUniversities={handleSearchUniversities} />
                        </TabPanel>
                    </SwipeableViews>
                </Grid>
            </Paper>
            <Footer />
            <CssBaseline />
        </div>
    )
}

export default SearchPage;