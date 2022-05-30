import React, { useState } from 'react';
import { Chip, Divider, Grid, Typography, Avatar, IconButton, Tooltip, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { redirectToViewThesisPage } from '../utils/Redirecter';
import { formatFirebaseDate } from '../utils/HelperFunctions';
import {useTranslation} from "react-i18next";
import VisibilityIcon from '@mui/icons-material/Visibility';
import StarRateIcon from '@mui/icons-material/StarRate';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';
import DocumentIllustration from "../assets/gifs/Document.gif";

const ContainerGrid = styled(Grid)(({ theme }) => ({
    minHeight: "15vh",
    height: "100%",
    width: "90%",
    cursor: "pointer",
    background: "linear-gradient(315deg, #06214430 0%, transparent 45% )",
    borderTopRightRadius: "10px",
    borderBottomLeftRadius: "10px",
    border: "2px solid #002677",
    margin: "0 auto",
    transition: "300ms",
    "&:hover" : {
        backgroundColor: "#00000010"
    }
}));

const TagsIconButtonContainer = styled(Grid)(({ theme }) => ({
    fontFamily: "Ubuntu",
    display: "flex",
    [theme.breakpoints.down('md')]: {
        display: "none",
        width: "100%"
    },
    [theme.breakpoints.down('sm')]: {
        display: "none",
    },
}));

const TagsLargeButtonContainer = styled(Grid)(({ theme }) => ({
    fontFamily: "Ubuntu",
    display: "none",
    [theme.breakpoints.down('md')]: {
        display: "flex",
        padding: "1vh 0",
    },
    [theme.breakpoints.down('sm')]: {
        display: "flex",
        padding: "1vh 0",
    },
}));

const CustomIcon = styled(Avatar)(({ theme }) => ({
    width: theme.spacing(8),
    height: theme.spacing(9),
    margin: "auto",
    border: `2px solid ${theme.palette.secondary.main}`,
    borderRadius: "10px",
    backgroundColor: "transparent",
    [theme.breakpoints.down('md')]: {
        width: theme.spacing(6),
        height: theme.spacing(7),
        marginTop: "5px",
    },
    [theme.breakpoints.down('sm')]: {
        width: theme.spacing(5),
        height: theme.spacing(6),
        marginTop: "5px",
    },
}));

const useStyles = makeStyles(theme => ({
    texts: {
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        padding: "10px",
        textAlign:"start",
        flexDirection: "column",
        [theme.breakpoints.down('md')]: {
            padding: "8px",
        },
        [theme.breakpoints.down('sm')]: {
            padding: "5px",
            alignItems: "center",
            textAlign:"center",
        }
    },
    listOfChips: {
        display: 'flex',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: 0,
        margin: 0,
        [theme.breakpoints.down('sm')]: {
            justifyContent: 'center',
        }
    },
    chip: {
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        "& .MuiChip-label": {
            fontFamily: "Ubuntu",
            whiteSpace: "normal",
            textOverflow: "clip",
            textAlign: "center",
            wordWrap: "break-word",
            width: "100%",
            height: "100%",
            [theme.breakpoints.down('md')]: {
                whiteSpace: "normal",
                textOverflow: "clip",
                textAlign: "center",
                wordWrap: "break-word",
                width: "100%",
            },
            [theme.breakpoints.down('sm')]: {
                whiteSpace: "normal",
                textOverflow: "clip",
                textAlign: "center",
                wordWrap: "break-word",
                width: "100%",
            },
        },
    },
}));

const ThesisCard = (props) => {
    const {t} = useTranslation();
    const { thesis, savingMode, saveThesisFunction, unsaveThesisFunction } = props;
    const [tooltipMessage, setTooltipMessage] = useState("Unsave");
    const [isSaved, setIsSaved] = useState(true);
    const navigator = useNavigate();
    const classes = useStyles();

    const handleToggleSavingThesis = () => {
        if (isSaved === true) {
            unsaveThesisFunction(thesis.thesisId).then(() => {
                setTooltipMessage(t('thesis.save'));
                setIsSaved(false);
            });
        } else {
            saveThesisFunction(thesis.thesisId).then(() => {
                setTooltipMessage(t('thesis.unsave'));
                setIsSaved(true);
            });
        }
    }

    return (
        <ContainerGrid container alignItems="center" justifyContent="center" direction="row">
            <Grid item container xs={12} sm={12} md={12} lg={12} alignItems="center" justifyContent="center">
                <Grid item container xs={12} sm={2} md={3} lg={2} onClick={() => redirectToViewThesisPage(navigator, thesis.thesisId)}>
                    <CustomIcon src={DocumentIllustration} alt="thesis" />
                </Grid>
                <Grid item container xs={12} sm={10} md={9} lg={10} alignItems="flex-start" className={classes.texts}  direction="row">
                    { savingMode === true ?
                        <>
                            <Grid item container xs={12} sm={12} md={11} lg={11} onClick={() => redirectToViewThesisPage(navigator, thesis.thesisId)}>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <Typography variant="subtitle1" component="div" style={{fontFamily: "Ubuntu", fontWeight: "700"}}>
                                        {thesis.thesisTitle}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12} style={{width:"80%", margin: "1vh 0"}}>
                                    <Divider variant='fullWidth' />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <Typography variant="subtitle2" component="div" style={{fontFamily: "Ubuntu", fontWeight: "700"}}>
                                        {thesis.thesisAuthorName} - {formatFirebaseDate(thesis.thesisDate)}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12} style={{width:"65%", margin: "1vh 0"}}>
                                    <Divider variant='fullWidth' />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <Typography variant="body2" component="div" style={{fontFamily: "Ubuntu", fontWeight: "700"}}>
                                        {thesis.thesisUniName} - {thesis.thesisFieldOfStudy}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <Typography variant="body2" component="div" style={{fontFamily: "Ubuntu", fontWeight: "700"}}>
                                        {t('thesis.language')} {thesis.thesisLanguage.nativeName}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <Typography variant="body2" component="div" style={{fontFamily: "Ubuntu", fontWeight: "700"}}>
                                        {t('thesis.type')} {thesis.thesisType}
                                    </Typography>
                                </Grid>
                                {thesis.thesisTags.length > 0 ?
                                    <Grid item xs={12} sm={12} md={12} lg={12}>
                                        <ul className={classes.listOfChips}>
                                        {thesis.thesisTags.map((tag, index) => {
                                            return (
                                                <li key={index} style={{margin: "0.2rem"}}>
                                                    <Chip
                                                        label={tag}
                                                        size="small"
                                                        variant="outlined"
                                                        className={classes.chip}
                                                        />
                                                </li>
                                            );
                                        })}
                                        </ul>
                                    </Grid>
                                    : null
                                }
                                <Grid item xs={12} sm={12} md={12} lg={12} style={{width:"65%", margin: "1vh 0"}}>
                                    <Divider variant='fullWidth' />
                                </Grid>
                                <Grid container item xs={12} sm={12} md={12} lg={12} className={classes.texts}>
                                    <Typography variant="body2" component="div" style={{fontFamily: "Ubuntu", fontWeight: "700", textAlign: "start", display: "flex", alignItems: "center"}}>
                                        <VisibilityIcon color="info" style={{width: "1.25rem", marginRight: "0.5rem"}}/>
                                        {thesis.viewersList.length}
                                        &nbsp;&nbsp;
                                        <StarRateIcon color="warning" style={{width: "1.25rem", marginRight: "0.5rem"}}/>
                                        {thesis.ratesAverage !== 0 ? thesis.ratesAverage : "-"}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item container xs={12} sm={12} md={1} lg={1} alignItems="center" justifyContent="center">
                                <TagsIconButtonContainer item>
                                    <Tooltip title={tooltipMessage} placement="bottom" arrow leaveDelay={100}>
                                        <IconButton color="secondary" onClick={() => handleToggleSavingThesis(true)}>
                                            { isSaved === true ?
                                            <BookmarkRemoveIcon fontSize='large'/>
                                            :
                                            <BookmarkAddIcon fontSize='large'/>
                                            }
                                        </IconButton>
                                    </Tooltip>
                                </TagsIconButtonContainer>
                                <TagsLargeButtonContainer item>
                                    <Button
                                        color="secondary"
                                        variant="outlined"
                                        size="large"
                                        startIcon={ isSaved === true ?
                                            <BookmarkRemoveIcon fontSize='large'/>
                                            :
                                            <BookmarkAddIcon fontSize='large'/>
                                        }
                                        style={{ fontFamily: "Ubuntu" }}
                                        onClick={() => handleToggleSavingThesis(true)}>
                                        {tooltipMessage}
                                    </Button>
                                </TagsLargeButtonContainer>
                            </Grid>
                        </>
                    :
                        <>
                            <Grid container item xs={12} sm={12} md={12} lg={12} onClick={() => redirectToViewThesisPage(navigator, thesis.thesisId)}>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <Typography variant="subtitle1" component="div" style={{fontFamily: "Ubuntu", fontWeight: "700"}}>
                                        {thesis.thesisTitle}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12} style={{width:"80%", margin: "1vh 0"}}>
                                    <Divider variant='fullWidth' />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <Typography variant="subtitle2" component="div" style={{fontFamily: "Ubuntu", fontWeight: "700"}}>
                                        {thesis.thesisAuthorName} - {formatFirebaseDate(thesis.thesisDate)}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12} style={{width:"65%", margin: "1vh 0"}}>
                                    <Divider variant='fullWidth' />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <Typography variant="body2" component="div" style={{fontFamily: "Ubuntu", fontWeight: "700"}}>
                                        {thesis.thesisUniName} - {thesis.thesisFieldOfStudy}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <Typography variant="body2" component="div" style={{fontFamily: "Ubuntu", fontWeight: "700"}}>
                                        {t('thesis.language')} {thesis.thesisLanguage.nativeName}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <Typography variant="body2" component="div" style={{fontFamily: "Ubuntu", fontWeight: "700"}}>
                                    {t('thesis.type')} {thesis.thesisType}
                                    </Typography>
                                </Grid>
                                {thesis.thesisTags.length > 0 ?
                                    <Grid item xs={12} sm={12} md={12} lg={12}>
                                        <ul className={classes.listOfChips}>
                                        {thesis.thesisTags.map((tag, index) => {
                                            return (
                                                <li key={index} style={{margin: "0.2rem"}}>
                                                    <Chip
                                                        label={tag}
                                                        size="small"
                                                        variant="outlined"
                                                        className={classes.chip}
                                                        />
                                                </li>
                                            );
                                        })}
                                        </ul>
                                    </Grid>
                                    : null
                                }
                                <Grid item xs={12} sm={12} md={12} lg={12} style={{width:"65%", margin: "0.5vh 0"}}>
                                    <Divider variant='fullWidth' />
                                </Grid>
                                <Grid container item xs={12} sm={12} md={12} lg={12} className={classes.texts}>
                                    <Typography variant="body2" component="div" style={{fontFamily: "Ubuntu", fontWeight: "700", textAlign: "start", display: "flex", alignItems: "center"}}>
                                        <VisibilityIcon color="info" style={{width: "1.25rem", marginRight: "0.5rem"}}/>
                                        {thesis.viewersList.length}
                                        &nbsp;&nbsp;
                                        <StarRateIcon color="warning" style={{width: "1.25rem", marginRight: "0.5rem"}}/>
                                        {thesis.ratesAverage !== 0 ? thesis.ratesAverage : "-"}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </>
                    }
                </Grid>
            </Grid>
        </ContainerGrid>
    )
}

export default ThesisCard;