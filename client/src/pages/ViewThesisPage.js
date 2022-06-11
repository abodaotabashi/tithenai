import React, { useContext, useState, useEffect } from 'react';
import { CssBaseline, Grid, Paper } from '@mui/material';
import { AuthContext } from '../utils/Context';
import Footer from '../components/Footer';
import NavbarWithUser from '../components/NavbarWithUser';
import { useNavigate, useLocation } from 'react-router-dom';
import { redirectToLoginPage, redirectToMainPage } from '../utils/Redirecter';
import LoadingDialog from '../components/LoadingDialog';
import { useTranslation } from 'react-i18next';

import { makeStyles } from '@mui/styles';
import '../assets/styles.css';
import UpdateThesisForm from '../containers/UpdateThesisForm';
import ThesisInfoViewer from '../components/ThesisInfoViewer';
import { addNewComment, addNewRate, addNewReport, addViewer, deleteComment, deleteThesis, getComments, getIsReported, getThesis, getUserInfo, isThesisSaved, saveThesis, unsaveThesis, updateThesis } from '../Service';
import { sortObjectsAscending } from '../utils/HelperFunctions';

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
    uploadGifLeftSection: {
        display: "flex",
        justifyContent: "right",
        [theme.breakpoints.down('md')]: {
            justifyContent: "center",
        },
        [theme.breakpoints.down('sm')]: {
            justifyContent: "center",
        },
    },
    uploadGifRightSection: {
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

const ViewThesisPage = () => {
    const { t } = useTranslation();
    const classes = useStyles();
    const { userAuth } = useContext(AuthContext);
    const [ showLoading, setShowLoading ] = useState(false);
    const [ openWarningDialog, setOpenWarningDialog ] = useState(false);
    const [ loadingMessage, setLoadingMessage ] = useState("");
    const [ userID, setUserID ] = useState("");
    const [ isEditing, setIsEditing ] = useState(false);
    const [ isRated, setIsRated ] = useState(false);
    const [ isSaved, setIsSaved ] = useState(false);
    const [ isOwnThesis, setIsOwnThesis ] = useState(false);
    const [ ownRate, setOwnRate ] = useState(0);
    const [ thesis, setThesis ] = useState(null);
    const [ comments, setComments ] = useState(null);
    const navigator = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (typeof(location.state.thesisId) !== "undefined") {
            if (typeof (userAuth) !== "undefined") {
                if (userAuth) {
                    setUserID(userAuth.uid);
                    getThesis(location.state.thesisId).then((result) => {
                        setThesis(result);
                        if (typeof(result.rates[userAuth.uid]) === "undefined") {
                            setIsRated(false);
                        } else {
                            setIsRated(true);
                            setOwnRate(result.rates[userAuth.uid]);
                        }
                        getComments(location.state.thesisId).then((allComments) => {
                            setComments(allComments.sort(sortObjectsAscending("commentDate", true, "_seconds")));
                        })
                        if (userAuth.uid === result.thesisAuthorID) {
                            setIsOwnThesis(true);
                        } else {
                            setIsOwnThesis(false);
                        }
                        if (typeof(result.rates[userAuth.uid]) === "undefined") {
                            setIsRated(false);
                        } else {
                            setIsRated(true);
                            setOwnRate(result.rates[userAuth.uid]);
                        }
                        if ( !result.viewersList.includes(userAuth.uid) ) {
                            const viewerValues = {
                                uid: userAuth.uid,
                                thesisId: location.state.thesisId
                            }
                            addViewer(viewerValues).then(() => handleGetUpdatedThesis(location.state.thesisId));
                        }
                        isThesisSaved({ uid: userAuth.uid, thesisId: location.state.thesisId })
                            .then((result) => {
                                setIsSaved(result);
                            })
                    });
                } else {
                    redirectToLoginPage(navigator);
                    setIsEditing(false);
                }
            }
        }
    }, [location, userAuth, navigator])

    const handleToggleWarningDialog = (status) => {
        setOpenWarningDialog(status);
    }

    const handleToggleToEditMode = () => {
        setIsEditing(true);
    }

    const handleGetUpdatedThesis = (thesisId) => {
        if (typeof (userAuth) !== "undefined") {
            if (userAuth) {
                getThesis(thesisId).then((result) => {
                    setThesis(result);
                    if (typeof(result.rates[userAuth.uid]) === "undefined") {
                        setIsRated(false);
                    } else {
                        setIsRated(true);
                        setOwnRate(result.rates[userAuth.uid]);
                    }
                    getComments(thesisId).then((allComments) => {
                        setComments(allComments.sort(sortObjectsAscending("commentDate", true, "_seconds")));
                    })
                    if (typeof(result.rates[userAuth.uid]) === "undefined") {
                        setIsRated(false);
                    } else {
                        setIsRated(true);
                        setOwnRate(result.rates[userAuth.uid]);
                    }
                    isThesisSaved({ uid: userAuth.uid, thesisId: thesisId })
                        .then((result) => {
                            setIsSaved(result);
                        })
                });
            } else {
                redirectToLoginPage(navigator);
                setIsEditing(false);
            }
        }
    }


    const handleDeleteThesis = async () => {
        if (typeof (userAuth) !== "undefined") {
            if (userAuth) {
                setShowLoading(true);
                setLoadingMessage(t('viewthesis.deleting'));
                deleteThesis(thesis.thesisId).then(() => {
                    setShowLoading(false);
                    setLoadingMessage("");
                    redirectToMainPage(navigator);
                });
            } else {
                redirectToLoginPage(navigator);
            }
        }
    }

    const handleUpdateThesis = async (values, props) => {
        if (typeof (userAuth) !== "undefined") {
            if (userAuth) {
                setShowLoading(true);
                setLoadingMessage(t('viewthesis.updating'));
                const newThesisData = {
                    thesisId: thesis.thesisId,
                    thesisAbstract: values.abstract,
                    thesisType: values.thesisType,
                    thesisDate: values.date,
                    thesisFieldOfStudy: values.fieldOfStudy,
                    thesisLanguage: values.language,
                    thesisTags: values.tags,
                    thesisTitle: values.title,
                    thesisUniID: values.university.uniId,
                    thesisUniName: values.university.uniName,
                }
                updateThesis(newThesisData).then((result) => {
                    if (result.status === 201 && result.data.message === "OK") {
                        setShowLoading(false);
                        setLoadingMessage("");
                        setIsEditing(false);
                        handleGetUpdatedThesis(thesis.thesisId)
                    }
                })
            } else {
                redirectToLoginPage(navigator);
                setIsEditing(false);
            }
        }
    }

    const handleAddComment = async (commentBody) => {
        if (typeof (userAuth) !== "undefined") {
            if (userAuth) {
                setShowLoading(true);
                setLoadingMessage(t('viewthesis.adding'));
                const uid = userAuth.uid;
                const commentdata = {
                    commentThesisID: thesis.thesisId,
                    commentBody: commentBody,
                    commentDate: new Date(),
                }
                const values = {
                    uid: uid,
                    commentdata: commentdata
                }
                addNewComment(values).then((result) => {
                    if (result.status === 200 && result.data === "OK") {
                        getComments(thesis.thesisId).then((result) => {
                            setComments(result.sort(sortObjectsAscending("commentDate", true, "_seconds")));
                        });
                        setShowLoading(false);
                        setLoadingMessage("");
                    }
                });
            } else {
                redirectToLoginPage(navigator);
            }
        }
    }

    const handleDeleteComment = async (commentId) => {
        if (typeof (userAuth) !== "undefined") {
            if (userAuth) {
                setShowLoading(true);
                setLoadingMessage(t('viewthesis.deletingcomm'));
                deleteComment(commentId).then((result) => {
                    if (result.status === 200 && result.data === "OK") {
                        getComments(thesis.thesisId).then((result) => {
                            setComments(result.sort(sortObjectsAscending("commentDate", true, "_seconds")));
                        });
                        setShowLoading(false);
                        setLoadingMessage("");
                    }
                });
            } else {
                redirectToLoginPage(navigator);
            }
        }
    }

    const handleRateThesis = async (rateValue) => {
        if (typeof (userAuth) !== "undefined") {
            if (userAuth) {
                setShowLoading(true);
                setLoadingMessage(t('viewthesis.saving'));
                const uid = userAuth.uid;
                const values = {
                    uid: uid,
                    thesisId: thesis.thesisId,
                    rateValue: rateValue
                }
                addNewRate(values).then((result) => {
                    if (result.status === 200 && result.data === "OK") {
                        setShowLoading(false);
                        setLoadingMessage("");
                        setOwnRate(rateValue);
                        setIsRated(true);
                        handleGetUpdatedThesis(thesis.thesisId);
                    }
                })
            } else {
                redirectToLoginPage(navigator);
            }
        }
    }

    const handleSaveThesis = async () => {
        if (typeof (userAuth) !== "undefined") {
            if (userAuth) {
                setShowLoading(true);
                setLoadingMessage(t('viewthesis.addingto'));
                const values = {
                    uid: userAuth.uid,
                    thesisId: thesis.thesisId
                };
                saveThesis(values).then(() => {
                    setShowLoading(false);
                    setLoadingMessage("");
                    isThesisSaved({ uid: userAuth.uid, thesisId: thesis.thesisId })
                        .then((result) => {
                            setIsSaved(result);
                        })
                });
            } else {
                redirectToLoginPage(navigator);
            }
        }
    }

    const handleUnsaveThesis = async () => {
        if (typeof (userAuth) !== "undefined") {
            if (userAuth) {
                setShowLoading(true);
                setLoadingMessage(t('viewthesis.removing'));
                const values = {
                    uid: userAuth.uid,
                    thesisId: thesis.thesisId
                };
                unsaveThesis(values).then(() => {
                    setShowLoading(false);
                    setLoadingMessage("");
                    isThesisSaved({ uid: userAuth.uid, thesisId: thesis.thesisId })
                        .then((result) => {
                            setIsSaved(result);
                        })
                });
            } else {
                redirectToLoginPage(navigator);
            }
        }
    }

    const handleReportThesis = async (reportContent) => {
        if (typeof (userAuth) !== "undefined") {
            if (userAuth) {
                setShowLoading(true);
                setLoadingMessage(t('viewthesis.sending'));
                const uid = userAuth.uid;
                const reportdata = {
                    reportContent: reportContent,
                    reportThesisID: thesis.thesisId,
                }
                const values = {
                    uid: uid,
                    reportdata: reportdata
                }
                addNewReport(values).then((result) => {
                    if (result.status === 200 && result.data === "OK") {
                        setShowLoading(false);
                        setLoadingMessage("");
                    }
                })
            } else {
                redirectToLoginPage(navigator);
            }
        }
    }

    const handleGetIsReported = async (thesisId) => {
        const uid = userAuth.uid;
        let isReported = false;
        const values = {
            uid: uid,
            thesisId: thesisId
        }
        return await getIsReported(values).then((result) => {
            isReported = result;
            return isReported;
        })
    }

    return (
        <div className="whitePageContainer">
            <NavbarWithUser hideUpload={false} />
            <Paper elevation={8} className={classes.paper}>
                <Grid item xs={12} sm={12} md={8} lg={9}>
                    {isEditing === false ?
                        <ThesisInfoViewer
                            thesis={thesis}
                            comments={comments}
                            isOwn={isOwnThesis}
                            isRated={isRated}
                            isSaved={isSaved}
                            ownRate={ownRate}
                            userID={userID}
                            handleAddReport={handleReportThesis}
                            handleRateThesis={handleRateThesis}
                            handleAddComment={handleAddComment}
                            handleDeleteComment={handleDeleteComment}
                            handleToggleToEdit={handleToggleToEditMode}
                            handleUnsaveThesis={handleUnsaveThesis}
                            handleSaveThesis={handleSaveThesis}
                            handleGetIsReported={handleGetIsReported}
                            openWarningDialog={openWarningDialog}
                            handleToggleWarningDialog={handleToggleWarningDialog}
                            handleDeleteThesis={handleDeleteThesis} />
                        :
                        <UpdateThesisForm thesis={thesis} handleUpdateThesis={handleUpdateThesis} handleCancelUpdating={() => setIsEditing(false)} />
                    }
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

export default ViewThesisPage;