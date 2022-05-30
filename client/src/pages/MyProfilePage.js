import React, { useEffect, useState, useRef, useContext } from 'react';
import { makeStyles } from '@mui/styles';
import { CssBaseline, Grid, Paper, Avatar, Button, AccordionSummary, Accordion, AccordionDetails, Typography, AccordionActions, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { getUserInfo, updateUser, updateImage } from '../Service';
import { AuthContext } from '../utils/Context';
import { redirectToLoginPage, redirectToMyPapersPage } from '../utils/Redirecter';

import NavbarWithUser from '../components/NavbarWithUser';
import ProfileInfoViewer from '../components/ProfileInfoViewer';
import EditProfileForm from '../containers/EditProfileForm';
import ImageViewDialog from '../components/ImageViewDialog';
import ImageCropperDialog from '../components/ImageCropperDialog';
import Footer from '../components/Footer';
import AnimatedNumber from 'react-animated-number';
import { withTranslation } from 'react-i18next';


import CameraAltIcon from '@mui/icons-material/CameraAlt';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TelegramIcon from '@mui/icons-material/Telegram';
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
    avatarWrapper: {
        display: "flex",
        flexShrink: "0",
        alignItems: "center",
        justifyContent: "flex-start",
        width: "100%",
    },
    papersCounter: {
        fontFamily: "Ubuntu-Light",
        color: theme.palette.secondary.dark,
        fontSize: "5rem",
        [theme.breakpoints.down('md')]: {
            fontSize: "3rem",
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: "3rem",
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: "3rem",
        },
    },
    papersLabel: {
        fontSize: "xx-large",
        fontFamily: "Ubuntu",
        textAlign: "start",
        paddingLeft: "2rem",
        color: theme.palette.secondary.dark,
        [theme.breakpoints.down('md')]: {
            marginBlockStart: "0.5em",
            marginBlockEnd: "0.5em",
            textAlign: "center",
            paddingLeft: "0",
            fontSize: "x-large",
        },
        [theme.breakpoints.down('sm')]: {
            marginBlockStart: "0.5em",
            marginBlockEnd: "0.5em",
            textAlign: "center",
            paddingLeft: "0",
            fontSize: "x-large",
        },
    },
}));

const UpdateImageButton = styled(Button)(({ theme }) => ({
    color: theme.palette.primary.dark,
    fontFamily: "Ubuntu-Light",
    fontWeight: "bold",
    border: `2px solid ${theme.palette.primary.dark}`,
    textTransform: "none",
    '&:hover': {
        border: `2px solid ${theme.palette.primary.dark}`,
        backgroundColor: theme.palette.primary.dark,
        color: "#ffffff",
    },
}));

const ResetPasswordButton = styled(Button)(({ theme }) => ({
    color: theme.palette.secondary.dark,
    fontFamily: "Ubuntu-Light",
    fontWeight: "bold",
    border: `2px solid ${theme.palette.secondary.dark}`,
    textTransform: "none",
    '&:hover': {
        border: `2px solid ${theme.palette.secondary.dark}`,
        backgroundColor: theme.palette.secondary.dark,
        color: "#ffffff",
    },
}));

const MyPapersBox = styled(Paper)(({ theme }) => ({
    fontFamily: "Ubuntu-Light",
    fontWeight: "bold",
    background: "linear-gradient(75deg, #1BC54B80, #A5F3BC70)",
    padding: "10px",
    border: `2px solid ${theme.palette.primary.dark}`,
    '&:hover': {
        background: "linear-gradient(75deg, #1BC54B98, #A5F3BC90)",
        cursor: "pointer"
    },
}));

const MyProfilePage = () => {
    const { t } = this.props;
    const [isEditing, setIsEditing] = useState(false);
    const [userInfo, setUserInfo] = useState();
    const [userPhoto, setUserPhoto] = useState("");
    const [uploadedPhoto, setUploadedPhoto] = useState("");
    const [openCropperDialog, setOpenCropperDialog] = useState(false);
    const [openViewImageDialog, setOpenViewImageDialog] = useState(false);
    const navigator = useNavigate();
    const classes = useStyles();
    const inputField = useRef(null);

    const { userAuth } = useContext(AuthContext);

    useEffect(() => {
        if (typeof (userAuth) !== "undefined") {
            if (userAuth) {
                const uid = userAuth.uid;
                getUserInfo(uid).then(userInfo => {
                    setUserInfo(userInfo)
                    if (userInfo.photoURL) {
                        setUserPhoto(userInfo.photoURL)
                    }
                })
            } else {
                redirectToLoginPage(navigator);
            }
        }
    }, [userAuth, navigator]);


    const handleOpenCropper = (event) => {
        if (!event.target.files || Object.keys(event.target.files).length === 0) {
            console.log(t('my_profile.error'));
        } else {
            setUploadedPhoto(URL.createObjectURL(event.target.files[0]));
            setOpenCropperDialog(true);
        }
    };

    const handleUpdateImage = (croppedImageBase64) => {
        if (typeof (userAuth) !== "undefined") {
            if (userAuth) {
                const uid = userAuth.uid;
                updateImage(croppedImageBase64, uid)
                    .then(() => {
                        setUserPhoto(croppedImageBase64)
                    })
            }
        }
    }

    const handleToggleToEditMode = () => {
        setIsEditing(true);
    }

    const handleUpdateProfile = async (values, props) => {
        if (typeof (userAuth) !== "undefined") {
            if (userAuth) {
                const uid = userAuth.uid;
                updateUser(values, uid).then((result) => {
                    if (result.status === 200 && result.data === "OK") {
                        setUserInfo({
                            email: values.email,
                            firstname: values.firstname,
                            lastname: values.lastname,
                            status: values.status,
                            university: values.university
                        });
                        setIsEditing(false);
                    }
                })
            } else {
                redirectToLoginPage(navigator);
                setIsEditing(false);
            }
        }
    }

    return (
        <div className="whitePageContainer">
            <NavbarWithUser hideUpload={false} />
            <Paper elevation={8} className={classes.paper}>
                <Grid container alignItems="center" justifyContent="center">
                    <Grid container item xs={12} sm={12} md={12} lg={12} alignItems="center" justifyContent="center">
                        <Grid item container xs={12} sm={12} md={4} lg={3} className={classes.avatarWrapper} style={{ marginBottom: "40px" }}>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <Avatar
                                    variant="circular"
                                    alt="ProfilePhoto"
                                    style={userPhoto !== null && typeof (userPhoto) !== "undefined" && userPhoto !== null ? { width: "9rem", height: "9rem", margin: "auto", border: "2px solid #0A481C", cursor: "pointer" } : { width: "9rem", height: "9rem", margin: "auto", border: "2px solid #0A481C" }}
                                    src={userPhoto !== null && typeof (userPhoto) !== "undefined" ? userPhoto : ""}
                                    onClick={() => setOpenViewImageDialog(true)}
                                />
                                <br />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <input type="file" accept=".png, .jpg, .jpeg" hidden={true} ref={inputField} onChange={handleOpenCropper} />
                                <UpdateImageButton
                                    variant="outlined"
                                    size="medium"
                                    color="secondary"
                                    startIcon={<CameraAltIcon />}
                                    onClick={() => inputField.current.click()}>
                                    {t('my_profile.update_photo')}
                                </UpdateImageButton>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={12} md={8} lg={9}>
                            {isEditing === false ?
                                <ProfileInfoViewer userInfo={userInfo} handleEditInfos={handleToggleToEditMode} />
                                :
                                <EditProfileForm userInfo={userInfo} handleUpdateProfile={handleUpdateProfile} />
                            }
                        </Grid>
                        <Grid item xs={12} sm={12} md={11} lg={11}>
                            <Accordion style={{ backgroundColor: "#00000020", color: "#000000" }}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography variant="subtitle1" style={{ fontFamily: "Ubuntu-Light", fontWeight: "700", textAlign: "start" }}>{t('my_profile.update_pass')}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography variant="body2" style={{ fontFamily: "Ubuntu-Light", fontWeight: "700", textAlign: "start" }}>
                                    {t('my_profile.we_will')}
                                    </Typography>
                                </AccordionDetails>
                                <Divider />
                                <AccordionActions>
                                    <ResetPasswordButton startIcon={<TelegramIcon />} style={{ fontFamily: "Ubuntu", marginLeft: "1vw" }} >{t('my_profile.send_me')}</ResetPasswordButton>
                                </AccordionActions>
                            </Accordion>
                            <br />
                            <Divider variant="middle" />
                            <br />
                        </Grid>
                        <Grid item xs={12} sm={12} md={11} lg={11}>
                            <MyPapersBox elevation={12} onClick={() => redirectToMyPapersPage(navigator)}>
                                <Grid container alignItems="center" justifyContent="center">
                                    <Grid item xs={12} sm={12} md={9} lg={9}>
                                        <p className={classes.papersLabel}>{t('my_papers.title')}My Papers</p>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={3} lg={3}>
                                        {typeof (userInfo) !== "undefined" && typeof (userInfo.theses) !== "undefined" ?
                                            <AnimatedNumber
                                                className={classes.papersCounter}
                                                value={userInfo.theses.length}
                                                formatValue={n => n.toFixed(0)}
                                                frameStyle={percentage => percentage > 15 && percentage < 85 ? { opacity: 0.5 } : {}}
                                                duration={750}
                                            />
                                            :
                                            null
                                        }
                                    </Grid>
                                </Grid>
                            </MyPapersBox>
                        </Grid>
                    </Grid>
                </Grid>
                <ImageCropperDialog
                    openDialog={openCropperDialog}
                    setOpenDialog={setOpenCropperDialog}
                    updateFunction={handleUpdateImage}
                    image={uploadedPhoto} />
                <ImageViewDialog
                    openDialog={openViewImageDialog}
                    setOpenDialog={setOpenViewImageDialog}
                    image={userPhoto} />
            </Paper>
            <br />
            <Footer />
            <CssBaseline />
        </div>
    );
}

export default withTranslation()(MyProfilePage);