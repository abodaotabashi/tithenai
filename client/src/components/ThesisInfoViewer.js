import React, { useState, useEffect } from 'react';
import { Grid, Typography, CircularProgress, IconButton, Chip, Button, Rating, Paper, Divider, TextField, InputAdornment } from '@mui/material';
import { formatFirebaseDate } from '../utils/HelperFunctions';
import CommentCard from './CommentCard';
import AddNewReportDialog from './AddNewReportDialog';
import WarningDialog from './WarningDialog';

import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import FlagIcon from '@mui/icons-material/Flag';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import StarRateIcon from '@mui/icons-material/StarRate';
import DownloadIcon from '@mui/icons-material/Download';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SendIcon from '@mui/icons-material/Send';
import { makeStyles } from '@mui/styles';
import '../assets/styles.css';

const useStyles = makeStyles(theme => ({
    listOfChips: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: "center",
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: 0,
        textAlign: "start",
        fontFamily: "Ubuntu",
        margin: 0,
        paddingBottom: "1rem",
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

const ThesisInfoViewer = (props) => {
    const {
        userID,
        isOwn,
        isSaved,
        isRated,
        ownRate,
        thesis,
        comments,
        handleToggleToEdit,
        handleRateThesis,
        handleAddComment,
        handleDeleteComment,
        handleAddReport,
        handleSaveThesis,
        handleUnsaveThesis,
        openWarningDialog,
        handleToggleWarningDialog,
        handleDeleteThesis
    } = props;
    const classes = useStyles();
    const [commentValue, setCommentValue] = useState("");
    const [isShowMoreCommentsButtonVisible, setIsShowMoreCommentsButtonVisible] = useState("none");
    const [numberOfCommentsDisplayed, setNumberOfCommentsDisplayed] = useState(null);
    const [commentsDisplayed, setCommentsDisplayed] = useState(null);
    const [openReportDialog, setOpenReportDialog] = useState(false);

    const toggleOpenReportDialog = (status) => {
        setOpenReportDialog(status);
    }

    useEffect(() => {
        if(comments !== null) {
            if(numberOfCommentsDisplayed === null) {
                let numberOfComments = null;
                if(comments.length > 5) {
                    numberOfComments = 3;
                    setNumberOfCommentsDisplayed(numberOfComments);
                    setIsShowMoreCommentsButtonVisible("flex");
                    setCommentsDisplayed(comments.slice(0, numberOfComments));
                } else {
                    setNumberOfCommentsDisplayed(comments.length);
                    setCommentsDisplayed(comments);
                }
            }
        }
    }, [comments])

    const handleShowMoreComments = () => {
        if (comments.length <= numberOfCommentsDisplayed + 3) {
            setNumberOfCommentsDisplayed(comments.length);
            setIsShowMoreCommentsButtonVisible("none");
            setCommentsDisplayed(comments);
        } else {
            let numberOfNewerComments = numberOfCommentsDisplayed + 3;
            setNumberOfCommentsDisplayed(numberOfNewerComments);
            setCommentsDisplayed(comments.slice(0, numberOfNewerComments));
        }
    }

    return (
        typeof(thesis) !== "undefined" && thesis !== null ?
        <Grid container>
            <Grid container item xs={12} sm={12} md={9} lg={10}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Typography variant="h5" component="div" style={{textAlign: "start", fontFamily: "Ubuntu", fontWeight: "bold", paddingBottom: "1rem"}}>
                        {thesis.thesisTitle}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Typography variant="subtitle1" component="div" style={{textAlign: "start", fontFamily: "Ubuntu", paddingBottom: "1rem"}}>
                        Author: {thesis.thesisAuthorName} &nbsp; - &nbsp; Published on {formatFirebaseDate(thesis.thesisDate)}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Typography variant="subtitle1" component="div" style={{textAlign: "start", fontFamily: "Ubuntu", paddingBottom: "1rem"}}>
                        {thesis.thesisUniName} &nbsp; - &nbsp; {thesis.thesisFieldOfStudy}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Typography variant="subtitle1" component="div" style={{textAlign: "start", fontFamily: "Ubuntu", paddingBottom: "1rem"}}>
                        Type: {thesis.thesisType} &nbsp; - &nbsp; Language: {thesis.thesisLanguage.nativeName}
                    </Typography>
                </Grid>
                {thesis.thesisTags.length > 0 ?
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <ul className={classes.listOfChips}>
                        Tags: &nbsp;
                        {thesis.thesisTags.map((tag, index) => {
                            return (
                                <li key={index} style={{margin: "0.2rem"}}>
                                    <Chip
                                        label={tag}
                                        size="small"
                                        color="secondary"
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
                <Grid container item xs={12} sm={12} md={12} lg={12} style={{textAlign: "start", fontFamily: "Ubuntu", paddingBottom: "1rem"}}>
                    <Typography variant="body2" component="div" style={{fontFamily: "Ubuntu", fontWeight: "700", textAlign: "start", display: "flex", alignItems: "center"}}>
                        <VisibilityIcon color="info" style={{width: "1.25rem", marginRight: "0.5rem"}}/>
                        {thesis.viewersList.length}
                        &nbsp;&nbsp;
                        <StarRateIcon color="warning" style={{width: "1.25rem", marginRight: "0.5rem"}}/>
                        {thesis.ratesAverage}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Typography variant="body1" component="div" style={{textAlign: "start", fontWeight: "bold", fontFamily: "Ubuntu"}}>
                        Abstract:
                        <br />
                        <Typography variant="subtitle1" component="div" style={{textAlign: "start", fontFamily: "Ubuntu"}}>
                            {thesis.thesisAbstract}
                        </Typography>
                    </Typography>
                </Grid>
            </Grid>
            <Grid item container xs={12} sm={12} md={3} lg={2} alignItems="center" justifyContent="center">
                { isRated === true ?
                <Paper elevation={8} style={{width: "80%", margin: "1vh 1rem", fontFamily: "Ubuntu"}}>
                    <Typography variant="subtitle1" component="legend" style={{fontFamily: "Ubuntu"}}>Your Rate</Typography>
                    <Rating
                        size="medium"
                        value={ownRate}
                        precision={0.5}
                        onChange={(event, newValue) => {
                            handleRateThesis(newValue);
                        }} />
                </Paper>
                :
                <Paper elevation={8} style={{width: "80%", margin: "1vh 1rem", fontFamily: "Ubuntu"}}>
                    <Typography variant="subtitle1" component="legend" style={{fontFamily: "Ubuntu"}}>No rating given</Typography>
                    <Rating
                        size="medium"
                        value={ownRate}
                        precision={0.5}
                        onChange={(event, newValue) => {
                            handleRateThesis(newValue);
                        }} />
                </Paper>
                }
                { isOwn === true ?
                    <Button
                        variant="contained"
                        color="warning"
                        startIcon={<EditIcon />}
                        onClick={handleToggleToEdit}
                        style={{width: "80%", margin: "1vh 1rem", fontFamily: "Ubuntu"}}>
                        Edit
                    </Button>
                    : null
                }
                <Button
                    variant="contained"
                    color="success"
                    startIcon={<DownloadIcon />}
                    onClick={() => window.location.href = thesis.thesisPdfUrl[0]}
                    style={{width: "80%", margin: "1vh 1rem", fontFamily: "Ubuntu"}}>
                    Download
                </Button>
                { isSaved === true ?
                    <Button
                    variant="contained"
                    color="info"
                    startIcon={<BookmarkRemoveIcon />}
                    onClick={handleUnsaveThesis}
                    style={{width: "80%", margin: "1vh 1rem", fontFamily: "Ubuntu"}}>
                        Unsave
                    </Button>
                    :
                    <Button
                    variant="contained"
                    color="info"
                    onClick={handleSaveThesis}
                    startIcon={<BookmarkAddIcon />}
                    style={{width: "80%", margin: "1vh 1rem", fontFamily: "Ubuntu"}}>
                        Save
                    </Button>
                }
                { isOwn === true ?
                    <Button
                        variant="contained"
                        color="error"
                        startIcon={<DeleteForeverIcon />}
                        onClick={() => handleToggleWarningDialog(true)}
                        style={{width: "80%", margin: "1vh 1rem", fontFamily: "Ubuntu"}}>
                        Delete
                    </Button> : null
                }
                <Button
                    variant="contained"
                    color="error"
                    startIcon={<FlagIcon />}
                    onClick={() => toggleOpenReportDialog(true)}
                    style={{width: "80%", margin: "1vh 1rem", fontFamily: "Ubuntu"}}>
                    Report
                </Button>
            </Grid>
            <Grid item container xs={12} sm={12} md={12} lg={12} style={{padding: "1vh 0"}}>
                <Divider variant="fullWidth" style={{width: "100%"}}/>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
                <Typography variant="h6" component="div" style={{textAlign: "start", fontWeight: "bold", fontFamily: "Ubuntu"}}>
                    { comments !== null && comments.length > 0 ? comments.length + " Comments" : "There is no comments yet!" }
                    <br />
                    {   commentsDisplayed !== null && commentsDisplayed.length > 0 && commentsDisplayed.map((comment) => {
                            if ( comment.commentAuthorID === userID ) {
                                return (
                                    <CommentCard
                                        key={comment.commentId}
                                        isOwn={true}
                                        comment={comment}
                                        handleDeleteComment={() => {
                                            setNumberOfCommentsDisplayed(null);
                                            handleDeleteComment(comment.commentId);
                                        }}/>
                                );
                            } else {
                                return (
                                    <CommentCard
                                        key={comment.commentId}
                                        isOwn={false}
                                        comment={comment}
                                        handleDeleteComment={() => {
                                            setNumberOfCommentsDisplayed(null);
                                            handleDeleteComment(comment.commentId);
                                        }}/>
                                );
                            }
                        })
                    }
                </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} style={{margin: "auto", display: "flex", alignItems: "center", justifyContent: "center", padding: "0.5rem 0"}}>
                <Button
                    variant="contained"
                    color="secondary"
                    style={{fontFamily: "Ubuntu", padding: "1vh 2vw", display: `${isShowMoreCommentsButtonVisible}`}}
                    startIcon={<ExpandMoreIcon />}
                    onClick={handleShowMoreComments}>
                    Show More
                </Button>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} style={{margin: "2vh 1rem"}}>
                <TextField
                    variant="standard"
                    color="secondary"
                    placeholder="Write a comment!"
                    value={commentValue}
                    onChange={(event) => setCommentValue(event.target.value)}
                    style={{ width: "100%", borderRadius: "8px", border: '1px solid #14325A', padding: "10px", fontFamily: "Ubuntu"}}
                    maxRows={3}
                    multiline
                    InputLabelProps={{
                        style: {
                            fontFamily: 'Ubuntu'
                        }
                    }}
                    InputProps={{
                        endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                onClick={() => {
                                    setNumberOfCommentsDisplayed(null);
                                    handleAddComment(commentValue);
                                    setCommentValue("");
                                    }}>
                                <SendIcon color="secondary" />
                            </IconButton>
                        </InputAdornment>
                        )
                    }}/>
            </Grid>
            <AddNewReportDialog
                openDialog={openReportDialog}
                setOpenDialog={toggleOpenReportDialog}
                addNewReportFunction={handleAddReport}
                />
            <WarningDialog
                    openWarningDialog={openWarningDialog}
                    setCloseWarningDialog={handleToggleWarningDialog}
                    title="Delete this Thesis?"
                    content="Are you sure that you want to delete this thesis?"
                    contentSpan= "All comments and rates for this thesis will be deleted."
                    yes="Delete"
                    no="Cancel"
                    yesFunction={handleDeleteThesis}
                    noFunction={() => handleToggleWarningDialog(false)} />
        </Grid>
        :
        <Grid container alignItems="center" justifyContent="center" style={{margin: "auto", width: "100%"}}>
            <CircularProgress color="secondary" fullwidth="true" />
        </Grid>
    )
}

export default ThesisInfoViewer;