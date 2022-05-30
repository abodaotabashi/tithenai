import React, { useEffect, useState, useContext } from 'react';
import { makeStyles } from '@mui/styles';
import { CssBaseline, Grid, Paper, Avatar, Divider, CircularProgress, Typography, Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { getUniversity } from '../Service';
import { AuthContext } from '../utils/Context';
import { redirectToLoginPage } from '../utils/Redirecter';
import { getChartBackgroundColors, getChartBorderColors, getThisYearData, getTopKResearchers, getTopTags, getYearsData, sortObjectsDescending } from '../utils/HelperFunctions';
import { withTranslation } from 'react-i18next';

import NavbarWithUser from '../components/NavbarWithUser';
import Footer from '../components/Footer';
import MiniThesisCard from '../components/MiniThesisCard';
import UniversityInfoViewer from '../components/UniversityInfoViewer';
import BarChart from '../components/BarChart';
import PieChart from '../components/PieChart';
import LineChart from '../components/LineChart';

import SchoolIcon from '@mui/icons-material/School';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import '../assets/styles.css';


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
            marginBottom: "10vh",
        },
        [theme.breakpoints.down('sm')]: {
            marginTop: "2vh",
            marginBottom: "10vh",
        },
    },
    graphicContainer: {
        height: "300px",
        padding: '15px',
        border: "2px solid #00290F",
        borderRadius: "15px",
        [theme.breakpoints.down('sm')]: {
            padding: '10px',
        },
    },
}));


const UniversityProfilePage = () => {
    const { t } = this.props;
    const [universityInfo, setUniversityInfo] = useState();
    const [universityID, setUniversityID] = useState("");

    const [isShowMoreThesesButtonVisible, setIsShowMoreThesesButtonVisible] = useState("none");
    const [numberOfThesesDisplayed, setNumberOfThesesDisplayed] = useState(null);
    const [thesesDisplayed, setThesesDisplayed] = useState(null);

    const [fieldOfStudyStats, setFieldOfStudyStats] = useState(null);
    const [typesStats, setTypesStats] = useState(null);
    const [researchStats, setResearchStats] = useState(null);
    const [tagsStats, setTagsStats] = useState(null);
    const [thisYearStats, setThisYearStats] = useState(null);
    const [yearsStats, setYearsStats] = useState(null);

    const navigator = useNavigate();
    const location = useLocation();
    const classes = useStyles();

    const { userAuth } = useContext(AuthContext);

    useEffect(() => {
        if (typeof(location.state.universityID) !== "undefined") {
            if (typeof (userAuth) !== "undefined") {
                if (userAuth) {
                    setUniversityID(location.state.universityID);
                    getUniversity(location.state.universityID).then(universityInfo => {
                        setUniversityInfo(universityInfo);
                        setFieldOfStudyStats({
                            labels: Object.keys(universityInfo.statistics.fieldOfStudyStats).map((fieldOfStudy) => fieldOfStudy),
                            datasets: [{
                                label: t('uniprofile.notheses'),
                                data: Object.values(universityInfo.statistics.fieldOfStudyStats).map((number) => number),
                                backgroundColor: getChartBackgroundColors(),
                                borderColor: getChartBorderColors(),
                                borderWidth: 2
                            }]
                        })
                        setTypesStats({
                            labels: Object.keys(universityInfo.statistics.typesStats).map((type) => type),
                            datasets: [{
                                label: t('uniprofile.notheses'),
                                data: Object.values(universityInfo.statistics.typesStats).map((number) => number),
                                backgroundColor: getChartBackgroundColors(),
                                borderColor: getChartBorderColors(),
                                borderWidth: 2
                            }]
                        })
                        setResearchStats({
                            labels: getTopKResearchers(universityInfo.statistics.researchStats, 5).map((researcher) => researcher.researcherName),
                            datasets: [{
                                label: t('uniprofile.notheses'),
                                data: getTopKResearchers(universityInfo.statistics.researchStats, 5).map((researcher) => researcher.uniThesisCount),
                                backgroundColor: getChartBackgroundColors(),
                                borderColor: getChartBorderColors(),
                                borderWidth: 2
                            }]
                        })
                        setTagsStats({
                            labels: getTopTags(universityInfo.statistics.tagsStats, 7).map((tag) => tag.tagName),
                            datasets: [{
                                label: t('uniprofile.notheses'),
                                data: getTopTags(universityInfo.statistics.tagsStats, 7).map((tag) => tag.counter),
                                backgroundColor: getChartBackgroundColors(),
                                borderColor: getChartBorderColors(),
                                borderWidth: 2
                            }]
                        })
                        setThisYearStats({
                            labels: getThisYearData(universityInfo.statistics.yearStats).map((month) => month.monthName),
                            datasets: [{
                                label: t('uniprofile.notheses'),
                                data: getThisYearData(universityInfo.statistics.yearStats).map((month) => month.counter),
                                backgroundColor: getChartBackgroundColors(),
                                borderColor: getChartBorderColors(),
                                borderWidth: 2
                            }]
                        })
                        setYearsStats({
                            labels: getYearsData(universityInfo.statistics.yearStats).map((year) => year.year),
                            datasets: [{
                                label: t('uniprofile.notheses'),
                                data: getYearsData(universityInfo.statistics.yearStats).map((year) => year.counter),
                                backgroundColor: getChartBackgroundColors(),
                                borderColor: getChartBorderColors(),
                                borderWidth: 2
                            }]
                        })
                        if(universityInfo.uniTheses.length !== 0) {
                            if(numberOfThesesDisplayed === null) {
                                let numberOfTheses = null;
                                if(universityInfo.uniTheses.length > 3) {
                                    numberOfTheses = 3;
                                    setNumberOfThesesDisplayed(numberOfTheses);
                                    setIsShowMoreThesesButtonVisible("flex");
                                    setThesesDisplayed(universityInfo.uniTheses.sort(sortObjectsDescending("thesisDate", true, "_seconds")).slice(0, numberOfTheses));
                                } else {
                                    setNumberOfThesesDisplayed(universityInfo.uniTheses.length);
                                    setThesesDisplayed(universityInfo.uniTheses.sort(sortObjectsDescending("thesisDate", true, "_seconds")));
                                }
                            }
                        }
                    })
                } else {
                    redirectToLoginPage(navigator);
                }
            }
        }
    }, [location, userAuth, navigator, numberOfThesesDisplayed]);

    const handleShowMoreTheses = () => {
        if (universityInfo.uniTheses.length <= numberOfThesesDisplayed + 3) {
            setNumberOfThesesDisplayed(universityInfo.uniTheses.length);
            setIsShowMoreThesesButtonVisible("none");
            setThesesDisplayed(universityInfo.uniTheses.sort(sortObjectsDescending("thesisDate", true, "_seconds")));
        } else {
            let numberOfNewerTheses = numberOfThesesDisplayed + 3;
            setNumberOfThesesDisplayed(numberOfNewerTheses);
            setThesesDisplayed(universityInfo.uniTheses.sort(sortObjectsDescending("thesisDate", true, "_seconds")).slice(0, numberOfNewerTheses));
        }
    }

    return (
        <div className="whitePageContainer">
            <NavbarWithUser hideUpload={false} />
            <Paper elevation={8} className={classes.paper}>
                { universityID !== "" ?
                    <Grid container alignItems="center" justifyContent="center">
                        <Grid container item xs={12} sm={12} md={12} lg={12} alignItems="center" justifyContent="center">
                            <Grid item container xs={12} sm={12} md={3} lg={2} alignItems="center" justifyContent="center">
                            {universityInfo !== null && typeof (universityInfo) !== "undefined" && universityInfo.uniImageUrl !== null && typeof (universityInfo.uniImageUrl) !== "undefined" && universityInfo.uniImageUrl !== "" ?
                                <Avatar
                                    variant="rounded"
                                    alt="ProfilePhoto"
                                    style={{width: "9rem", height: "9rem", margin: "auto", border: "2px solid #14325A"}}
                                    src={universityInfo.uniImageUrl}
                                />
                                : <SchoolIcon color="secondary" style={{fontSize: "8rem", margin: "auto", borderRadius:"10px" ,border: "2px solid #14325A"}} />}
                            </Grid>
                            <Grid item xs={12} sm={12} md={9} lg={10}>
                                <UniversityInfoViewer universityInfo={universityInfo} />
                            </Grid>
                            {universityInfo !== null && typeof (universityInfo) !== "undefined" &&
                                (
                                    Object.keys(universityInfo.statistics.fieldOfStudyStats).length !== 0  ||
                                    Object.keys(universityInfo.statistics.researchStats).length !== 0  ||
                                    Object.keys(universityInfo.statistics.tagsStats).length !== 0  ||
                                    Object.keys(universityInfo.statistics.typesStats).length !== 0  ||
                                    Object.keys(universityInfo.statistics.yearStats).length !== 0
                                )
                                ?
                                <Grid item container xs={12} sm={12} md={12} lg={12}>
                                    <Grid item xs={12} sm={12} md={12} lg={12}>
                                        <Divider variant='fullWidth' />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12} lg={12}>
                                        <Typography variant="h6" component="div" style={{flexGrow:1, fontFamily: "Ubuntu-Light", fontWeight: "bold", margin: "2vh 0"}}>
                                            {t('uniprofile.statistics')}
                                        </Typography>
                                    </Grid>
                                    {universityInfo !== null && typeof (universityInfo) !== "undefined" && Object.keys(universityInfo.statistics.fieldOfStudyStats).length !== 0 ?
                                        <Grid item container xs={12} sm={12} md={6} lg={6} alignItems="center" justifyContent="center" style={{margin: "1vh 0"}}>
                                            <Grid item xs={11} sm={11} md={11} lg={11} className={classes.graphicContainer}>
                                                <BarChart data={fieldOfStudyStats} title={t('uniprofile.topfield')} />
                                            </Grid>
                                        </Grid>
                                        :
                                        null
                                    }
                                    {universityInfo !== null && typeof (universityInfo) !== "undefined" && Object.keys(universityInfo.statistics.tagsStats).length !== 0 ?
                                        <Grid item container xs={12} sm={12} md={6} lg={6} alignItems="center" justifyContent="center" style={{margin: "1vh 0"}}>
                                            <Grid item xs={11} sm={11} md={11} lg={11} className={classes.graphicContainer}>
                                                <BarChart data={tagsStats} title={t('uniprofile.toptags')} />
                                            </Grid>
                                        </Grid>
                                        :
                                        null
                                    }
                                    {universityInfo !== null && typeof (universityInfo) !== "undefined" && Object.keys(universityInfo.statistics.typesStats).length !== 0 ?
                                        <Grid item container xs={12} sm={12} md={6} lg={6} alignItems="center" justifyContent="center" style={{margin: "1vh 0"}}>
                                            <Grid item xs={11} sm={11} md={11} lg={11} className={classes.graphicContainer}>
                                                <PieChart data={typesStats} title={t('uniprofile.distribution')}  />
                                            </Grid>
                                        </Grid>
                                        :
                                        null
                                    }
                                    {universityInfo !== null && typeof (universityInfo) !== "undefined" && Object.keys(universityInfo.statistics.typesStats).length !== 0 ?
                                        <Grid item container xs={12} sm={12} md={6} lg={6} alignItems="center" justifyContent="center" style={{margin: "1vh 0"}}>
                                            <Grid item xs={11} sm={11} md={11} lg={11} className={classes.graphicContainer}>
                                                <BarChart data={researchStats} title={t('uniprofile.topresearchers')} />
                                            </Grid>
                                        </Grid>
                                        :
                                        null
                                    }
                                    {universityInfo !== null && typeof (universityInfo) !== "undefined" && Object.keys(universityInfo.statistics.typesStats).length !== 0 ?
                                        <Grid item container xs={12} sm={12} md={12} lg={12} alignItems="center" justifyContent="center" style={{margin: "1vh 0"}}>
                                            <Grid item xs={11} sm={11} md={11} lg={11} className={classes.graphicContainer}>
                                                <BarChart data={yearsStats} title={t('uniprofile.totaltheses')} />
                                            </Grid>
                                        </Grid>
                                        :
                                        null
                                    }
                                    {universityInfo !== null && typeof (universityInfo) !== "undefined" && Object.keys(universityInfo.statistics.yearStats).length !== 0 ?
                                        <Grid item container xs={12} sm={12} md={12} lg={12} alignItems="center" justifyContent="center" style={{margin: "1vh 0"}}>
                                            <Grid item xs={11} sm={11} md={11} lg={11} className={classes.graphicContainer}>
                                                <LineChart data={thisYearStats} title={t('uniprofile.thisyear')} />
                                            </Grid>
                                        </Grid>
                                        :
                                        null
                                    }
                                </Grid>
                                :
                                null
                            }
                            {universityInfo !== null && typeof (universityInfo) !== "undefined" && universityInfo.uniTheses.length !== 0 && thesesDisplayed !== null ?
                                <Grid item container xs={12} sm={12} md={12} lg={12}>
                                    <Grid item xs={12} sm={12} md={12} lg={12}>
                                        <Divider variant='fullWidth' />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12} lg={12}>
                                        <Typography variant="h6" component="div" style={{flexGrow:1, fontFamily: "Ubuntu-Light", fontWeight: "bold", margin: "2vh 0"}}>
                                            {t('uniprofile.lasttheses')}
                                        </Typography>
                                    </Grid>
                                    {thesesDisplayed.map((thesis) => {
                                        return (
                                            <Grid item key={thesis.thesisId} xs={12} sm={12} md={12} lg={12} style={{margin: "1vh 0"}}>
                                                <MiniThesisCard key={thesis.thesisId} thesis={thesis} />
                                            </Grid>
                                        )})
                                    }
                                    <Grid item xs={12} sm={12} md={12} lg={12} style={{margin: "auto", display: "flex", alignItems: "center", justifyContent: "center", padding: "0.5rem 0"}}>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            style={{fontFamily: "Ubuntu", padding: "1vh 2vw", display: `${isShowMoreThesesButtonVisible}`}}
                                            startIcon={<ExpandMoreIcon />}
                                            onClick={handleShowMoreTheses}>
                                            {t('uniprofile.showmore')}
                                        </Button>
                                    </Grid>
                                </Grid>
                                :
                                null
                            }
                        </Grid>
                    </Grid>
                    :
                    <Grid container alignItems="center" justifyContent="center" style={{margin: "auto", width: "100%"}}>
                        <CircularProgress color="secondary" fullwidth="true" />
                    </Grid>
                }
            </Paper>
            <br />
            <br />
            <Footer />
            <CssBaseline />
        </div>
    );
}

export default withTranslation()(UniversityProfilePage);