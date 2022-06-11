import React, { useContext, useState, useEffect } from 'react';
import { CircularProgress, CssBaseline, Grid, Paper } from '@mui/material';
import { AuthContext } from '../utils/Context';
import Footer from '../components/Footer';
import NavbarWithUser from '../components/NavbarWithUser';
import { useNavigate } from 'react-router-dom';
import UploadThesisForm from '../containers/UploadThesisForm';
import { redirectToLoginPage, redirectToMyPapersPage } from '../utils/Redirecter';
import LoadingDialog from '../components/LoadingDialog';
import { getUserInfo, uploadThesis } from '../Service';
import { useTranslation } from 'react-i18next';

import { makeStyles } from '@mui/styles';
import '../assets/styles.css';
import UploadPaperGif from "../assets/gifs/UploadPaper.gif";


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

const UploadThesisPage = () => {
    const { t } = useTranslation();
    const classes = useStyles();
    const { userAuth } = useContext(AuthContext);
    const [ showLoading, setShowLoading ] = useState(false);
    const [ userStrikes, setUserStrikes ] = useState(-1);
    const navigator = useNavigate();

    useEffect(() => {
        if (typeof (userAuth) !== "undefined") {
            if (userAuth) {
                getUserInfo(userAuth.uid)
                .then(userInfo => {
                    setUserStrikes(userInfo.strikes)
                })
            } else {
                redirectToLoginPage(navigator);
            }
        }
    }, [userAuth, navigator])

    const handleUploadThesis = async (values, props) => {
        if (typeof (userAuth) !== "undefined") {
            if (userAuth) {
                setShowLoading(true);
                console.log(userAuth)
                const uid = userAuth.uid;
                const thesisInfo = {
                    thesisAuthorID: uid,
                    thesisAbstract: values.abstract,
                    thesisType: values.thesisType,
                    thesisDate: values.date,
                    thesisFieldOfStudy: values.fieldOfStudy,
                    thesisLanguage: values.language,
                    thesisTags: values.tags,
                    thesisTitle: values.title,
                    thesisUniID: values.university.uniId,
                    thesisUniName: values.university.uniName,
                    thesisPdfBase64: values.pdfBase64,
                }
                uploadThesis(thesisInfo).then((result) => {
                    if (result.status === 200 && result.data === "OK") {
                        setShowLoading(false);
                        redirectToMyPapersPage(navigator);
                    }
                })
            } else {
                redirectToLoginPage(navigator);
            }
        }
    }

    return (
        <div className="whitePageContainer">
            <NavbarWithUser hideUpload={true} />
            <Paper elevation={8} className={classes.paper}>
                { userStrikes < 2 && userStrikes >= 0 &&
                    <Grid container alignItems="center" justifyContent="center">
                        <Grid item xs={12} sm={12} md={5} lg={5} className={classes.uploadGifLeftSection}>
                            <img src={UploadPaperGif} alt="upload" style={{width: "10rem"}}/>
                        </Grid>
                        <Grid item xs={12} sm={12} md={7} lg={7} className={classes.uploadGifRightSection}>
                            <p className='textWithSecondaryGradient'>{t('uploadpage.upload')}</p>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <UploadThesisForm handleUploadThesis={handleUploadThesis} />
                        </Grid>
                    </Grid>
                }
                { userStrikes >= 2 &&
                    <Grid container alignItems="center" justifyContent="center">
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <p className='textWithSecondaryGradient'>{t('uploadpage.sorry')}</p>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <p className='textWithSecondaryGradient'>{t('uploadpage.youhave')}</p>
                        </Grid>
                    </Grid>
                }
                { userStrikes < 0 &&
                    <Grid container alignItems="center" justifyContent="center">
                        <CircularProgress color="secondary" fullwidth="true" />
                    </Grid>
                }
                <LoadingDialog
                    openDialog={showLoading}
                    label={t('uploadpage.uploading')}
                    />
            </Paper>
            <br />
            <br />
            <Footer />
            <CssBaseline />
        </div>
    )
}

export default UploadThesisPage;