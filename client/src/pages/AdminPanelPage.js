import React, { useEffect, useState, useContext } from 'react';
import { AppBar, CssBaseline, Tabs, Tab, Grid, Paper } from '@mui/material';
import SwipeableViews from 'react-swipeable-views';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../utils/Context';
import { redirectToLoginPage } from '../utils/Redirecter';
import { sortObjectsAscending } from '../utils/HelperFunctions';
import { getAllReports, strikeAuthor } from '../Service';

import TabPanel, { a11yProps } from "../components/TabPanel";
import Footer from '../components/Footer';
import NavbarWithUser from '../components/NavbarWithUser';
import AdminReportsPanel from '../components/AdminReportsPanel';
import LoadingDialog from '../components/LoadingDialog';

import AdminPanelIllustration from "../assets/gifs/AdminPanel.gif";
import '../assets/styles.css';
import { makeStyles, useTheme } from '@mui/styles';

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
        width: "100%",
        margin: "auto",
    }
}));

const AdminPanelPage = (props) => {
    const { t } = useTranslation();
    const navigator = useNavigate();
    const { userAuth } = useContext(AuthContext);
    const [selectedTab, setSelectedTab] = useState(0);
    const [showLoading, setShowLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState("");
    const [reports, setReports] = useState(null);

    const classes = useStyles();
    const theme = useTheme();

    useEffect(() => {
        if (typeof (userAuth) !== "undefined") {
            if (userAuth) {
                getAllReports().then(result => {
                    setReports(result.sort(sortObjectsAscending("reportDate", true, "_seconds")));
                })
            } else {
                redirectToLoginPage(navigator);
            }
        }
    }, [userAuth, navigator])

    const handleChangeMode = (event, newValue) => {
        setSelectedTab(newValue);
    }

    const handleUpdateReports = async () => {
        if (typeof (userAuth) !== "undefined") {
            if (userAuth) {
                getAllReports().then(result => {
                    setReports(result.sort(sortObjectsAscending("reportDate", true, "_seconds")));
                })
            } else {
                redirectToLoginPage(navigator);
            }
        }
    }

    const handleStrikeReporter = async (reporterID) => {
        //TODO: STRIKE Reporter
        // if (typeof (userAuth) !== "undefined") {
        //     if (userAuth) {
        //         setShowLoading(true);
        //         setLoadingMessage(t('admin_panel.loading_strike_reporter'));
        //         strikeAuthor(reporterID).then((result) => {
        //             if (result.status === 200 && result.data === "OK") {
        //                 setReports(null);
        //                 setShowLoading(false);
        //                 setLoadingMessage("");
        //                 handleUpdateReports();
        //             }
        //         })
        //     } else {
        //         redirectToLoginPage(navigator);
        //     }
        // }
        console.log("STRIKE REPORTER")
    }

    const handleStrikeAuthor = async (thesisAuthorID, thesisID) => {
        if (typeof (userAuth) !== "undefined") {
            if (userAuth) {
                const values = {
                    authorId: thesisAuthorID,
                    thesisId: thesisID
                }
                setShowLoading(true);
                setLoadingMessage(t('admin_panel.loading_strike_author'));
                strikeAuthor(values).then((result) => {
                    if (result.status === 200 && result.data === "OK") {
                        setReports(null);
                        setShowLoading(false);
                        setLoadingMessage("");
                        handleUpdateReports();
                    }
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
                        <img src={AdminPanelIllustration} alt="Welcome" className={classes.welcomeIllustration}/>
                    </Grid>
                    <Grid item xs={12} sm={12} md={8} lg={8} className={classes.welcomeRightSection}>
                        <p className='textWithSecondaryGradient' >{t('admin_panel.welcome')}</p>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={11} lg={11} className={classes.content}>
                    <AppBar position="static" color="default">
                        <Tabs
                            value={selectedTab}
                            onChange={handleChangeMode}
                            indicatorColor="secondary"
                            textColor="secondary"
                            variant="scrollable"
                            aria-label="full width tabs example">
                            <Tab data-testid="theses-section" label={t('admin_panel.evaluation')} wrapped style={{fontFamily: "Ubuntu", fontSize: "medium"}} {... a11yProps(0)} />
                        </Tabs>
                    </AppBar>
                    <SwipeableViews
                        className={classes.panel}
                        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                        index={selectedTab}
                        onChangeIndex={(index) => setSelectedTab(index)}>
                        <TabPanel value={selectedTab} index={0} dir={theme.direction}>
                            <AdminReportsPanel
                                reports={reports}
                                handleStrikeReporter={handleStrikeReporter}
                                handleStrikeAuthor={handleStrikeAuthor} />
                        </TabPanel>
                    </SwipeableViews>
                </Grid>
                <LoadingDialog
                    openDialog={showLoading}
                    label={loadingMessage}
                    />
            </Paper>
            <br />
            <br />
            <Footer />
            <CssBaseline />
        </div>
    )
}

export default AdminPanelPage