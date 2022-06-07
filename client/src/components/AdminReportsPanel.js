import React, { useState, useEffect } from 'react';
import { Grid, Typography, CircularProgress, Button, Accordion, AccordionSummary, AccordionActions, AccordionDetails, Divider } from '@mui/material';
import { useTranslation } from "react-i18next";
import { redirectToMainPage, redirectToViewThesisPage } from '../utils/Redirecter';
import { useNavigate } from 'react-router-dom';
import { formatFirebaseDateAndTime } from '../utils/HelperFunctions';

import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';
import DoneIllustration from "../assets/gifs/Done.gif";
import HomeIcon from '@mui/icons-material/Home';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const useStyles = makeStyles(theme => ({
    searchBox: {
        margin: "2vh 0",
        fontFamily: "Ubuntu",
        width: "70%",
        [theme.breakpoints.down('md')]: {
            width: "80%",
        },
        [theme.breakpoints.down('sm')]: {
            width: "96%",
        },
    },
    doneLeftSection: {
        display: "flex",
        justifyContent: "right",
        [theme.breakpoints.down('md')]: {
            justifyContent: "center",
        },
        [theme.breakpoints.down('sm')]: {
            justifyContent: "center",
        },
    },
    doneRightSection: {
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
    accordion: {
        backgroundColor: "#8996AB20",
        color: "#000000",
        borderRadius: "10px",
        border: "2px solid #000000",
        margin: "1vh auto"
    },
}));

const AccordionButton = styled(Button)(({ theme }) => ({
    color: theme.palette.secondary.dark,
    fontFamily: "Ubuntu-Light",
    fontWeight: "bold",
    border: `2px solid ${theme.palette.secondary.dark}`,
    textTransform: "none",
    '&:hover': {
        fontWeight: "200",
        border: `2px solid ${theme.palette.secondary.dark}`,
        backgroundColor: theme.palette.secondary.dark,
        color: "#ffffff",
    },
}));

const AdminReportsPanel = (props) => {
    const { t } = useTranslation();
    const navigator = useNavigate();
    const { reports, handleStrikeReporter, handleStrikeAuthor } = props;
    const [areReportsValid, setAreReportsValid] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const classes = useStyles();

    useEffect(() => {
        if(typeof(reports) !== "undefined" && reports !== null) {
            setAreReportsValid(true);
        } else {
            setAreReportsValid(false);
        }
    }, [reports])

    const handleChangeExpandedAccordion = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        areReportsValid === true ?
        <Grid container alignItems="center" justifyContent="center">
            <Grid item xs={12} sm={12} md={12} lg={12}>
                { reports !== null && reports.length > 0 ?
                    reports.map((report, index) => {
                        return (
                            <Accordion key={index} expanded={expanded === `panel${index}`} onChange={handleChangeExpandedAccordion(`panel${index}`)} className={classes.accordion}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography variant="subtitle1"  sx={{ width: '50%', flexShrink: 0 }} style={{ fontFamily: "Ubuntu-Light", fontWeight: "700", textAlign: "start" }}>{t('admin_panel.report_no')+(index+1)}</Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary', width: '50%', flexShrink: 0 }} style={{ fontFamily: "Ubuntu-Light", fontWeight: "700", textAlign: "end", paddingRight: "1vw" }}>{formatFirebaseDateAndTime(report.reportDate)}</Typography>
                                </AccordionSummary>
                                <Divider />
                                <AccordionDetails>
                                    <Typography variant="body1" style={{ fontFamily: "Ubuntu-Light", fontWeight: "700", textAlign: "start", padding: "1vh 0" }}>
                                        {t('admin_panel.label_thesis')} &nbsp;
                                        <Typography
                                            variant="body1"
                                            component="span"
                                            style={{cursor: "pointer", textAlign: "start", fontFamily: "Ubuntu", fontWeight: "700", paddingBottom: "1rem", textDecoration: "underline"}}
                                            onClick={() => redirectToViewThesisPage(navigator, report.reportThesisID)}>
                                            {report.reportedThesisTitle}
                                        </Typography>
                                    </Typography>
                                    <Typography variant="body2" style={{ fontFamily: "Ubuntu-Light", fontWeight: "700", textAlign: "start", padding: "1vh 0" }}>
                                        {t('admin_panel.label_reporter')} &nbsp;
                                        <Typography variant="body2" component="span" style={{ fontFamily: "Ubuntu", fontWeight: "700", textAlign: "start" }}>
                                            {report.reporterName} ({report.reporterStrikes} {t('admin_panel.label_strikes')})
                                        </Typography>
                                    </Typography>
                                    <Typography variant="body2" style={{ fontFamily: "Ubuntu-Light", fontWeight: "700", textAlign: "start", padding: "1vh 0" }}>
                                        {t('admin_panel.label_author')} &nbsp;
                                        <Typography variant="body2" component="span" style={{ fontFamily: "Ubuntu", fontWeight: "700", textAlign: "start" }}>
                                            {report.thesisAuthorName} ({report.authorStrikes} {t('admin_panel.label_strikes')})
                                        </Typography>
                                    </Typography>
                                    <Typography variant="body2" style={{ fontFamily: "Ubuntu-Light", fontWeight: "700", textAlign: "start" }}>
                                        {t('admin_panel.label_content')}
                                    </Typography>
                                    <Typography variant="body2" style={{ fontFamily: "Ubuntu", fontWeight: "700", textAlign: "start" }}>
                                        {report.reportContent}
                                    </Typography>
                                </AccordionDetails>
                                <Divider />
                                <AccordionActions>
                                    <AccordionButton
                                        style={{ fontFamily: "Ubuntu", marginLeft: "1vw" }}
                                        onClick={()=> handleStrikeReporter(report.reportReporterID)}>
                                            {t('admin_panel.ignore_strike_reporter')}
                                    </AccordionButton>
                                    <AccordionButton
                                        style={{ fontFamily: "Ubuntu", marginLeft: "1vw" }}
                                        onClick={()=> handleStrikeAuthor(report.thesisAuthorID, report.reportThesisID)}>
                                            {t('admin_panel.delete_thesis_strike_author')}
                                    </AccordionButton>
                                </AccordionActions>
                            </Accordion>
                        );
                    })
                    :
                    <Grid container alignItems="center" justifyContent="center">
                        <Grid item xs={12} sm={12} md={4} lg={4} className={classes.doneLeftSection}>
                            <img src={DoneIllustration} alt="Done" style={{width: "10rem"}}/>
                        </Grid>
                        <Grid item xs={12} sm={12} md={8} lg={8} className={classes.doneRightSection}>
                            <p className='textWithSecondaryGradient' >{t('admin_panel.done')}</p>
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
        :
        <Grid container alignItems="center" justifyContent="center" style={{margin: "auto", width: "100%"}}>
            <CircularProgress color="secondary" fullwidth="true" />
        </Grid>
    )
}

export default AdminReportsPanel;