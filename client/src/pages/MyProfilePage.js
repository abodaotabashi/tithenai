import React, { useEffect, useState, useRef } from 'react';
import { makeStyles } from '@mui/styles';
import { CssBaseline, Grid, Paper, Avatar, Button, AccordionSummary, Accordion, AccordionDetails, Typography, AccordionActions, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

import NavbarWithUser from '../components/NavbarWithUser';
import ProfileInfoViewer from '../components/ProfileInfoViewer';
import EditProfileForm from '../containers/EditProfileForm';
import ImageViewDialog from '../components/ImageViewDialog';
import ImageCropperDialog from '../components/ImageCropperDialog';

import { getMyToken } from '../auth/auth';
import { getUser } from '../Service';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TelegramIcon from '@mui/icons-material/Telegram';
import '../assets/styles.css'
import Footer from '../components/Footer';

const useStyles = makeStyles(theme => ({
    paper: {
        padding: "20px",
        width: "90%",
        margin: "auto",
        marginTop: "4vh",
        borderRadius: "30px",
        border: "3px solid",
        borderImageSlice: "1",
        borderImageSource: "linear-gradient(45deg, #1BC54B, #00290F)"
    },
    avatarWrapper: {
        display: "flex",
        flexShrink: "0",
        alignItems: "center",
        justifyContent: "flex-start",
        width: "100%",
    }
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

const MyProfilePage = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [userInfo, setUserInfo] = useState();
    const [userPhoto, setUserPhoto] = useState("");
    const [uploadedPhoto, setUploadedPhoto] = useState("");
    const [openCropperDialog, setOpenCropperDialog] = useState(false);
    const [openViewImageDialog, setOpenViewImageDialog] = useState(false);
    const navigator = useNavigate();
    const classes = useStyles();
    const inputField = useRef(null);

    useEffect(async () => {
        //const myToken = await getMyToken();
        //console.log(myToken)
        await getUser("eyJhbGciOiJSUzI1NiIsImtpZCI6ImFhZmE4MTJiMTY5NzkxODBmYzc4MjA5ZWE3Y2NhYjkxZTY4NDM2NTkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vdGl0aGVuYWktMjM4NjciLCJhdWQiOiJ0aXRoZW5haS0yMzg2NyIsImF1dGhfdGltZSI6MTY0OTgyMDk3MywidXNlcl9pZCI6IlNJY215NkFOUG9TZ2hoWldPVXpZMFRQeEQwRTMiLCJzdWIiOiJTSWNteTZBTlBvU2doaFpXT1V6WTBUUHhEMEUzIiwiaWF0IjoxNjQ5ODI4Nzc0LCJleHAiOjE2NDk4MzIzNzQsImVtYWlsIjoiYWJkQGFiZC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiYWJkQGFiZC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.QEDX3eBNVwWK68xoIn08izGpRYnkMRRmVejTh8XcYHaADnfai4PVmSt7yeT94vW700i9j4UKAOtJ0IDy4pvj45sJ6IQkCCfRBkEsVk42kKNVDZJuMeYlpGM7ONaMCeSybZlqY4OBPwuu4hgN0UApaHx-j2Ilt6FZQT86x6JdYN6Xiy70tgs731tRLQqzeSCqO4EKnPmh8Lmol1txe1RFRBC2-KXPlbOekoxJMfPZiFXrwC-vXvduoA4iP4yN8rP0VaRY90dkp5ipSraa-5d37BQt6vfH3mOT2nBFPDY0cRCh1wNvQTmVW2FVb4aIcNfcNW_Nu0ItxDuGCJLRdORifg")
            .then(userInfo => {
                setUserInfo(userInfo)
                //TODO: Setting State of UserPhoto
            })
            .catch(error => console.log(error));
    }, []);

    const handleOpenCropper = (event) => {
        if (!event.target.files || Object.keys(event.target.files).length === 0) {
            console.log("Photo couldn't be uploaded. Please Try again!");
        } else {
            setUploadedPhoto(URL.createObjectURL(event.target.files[0]));
            setOpenCropperDialog(true);
        }
    };

    const handleUpdateImage = (croppedImageBase64) => {
        setUserPhoto(croppedImageBase64)
        //TODO: Update the photo in Database
    }

    const handleToggleToEditMode = () => {
        setIsEditing(true);
    }

    const handleUpdateProfile = (values, props) => {
        //TODO: Update Profile
        setIsEditing(false);
    }

    return(
        <div className="whitePageContainer">
            <NavbarWithUser />
            <Paper elevation={8} className={classes.paper}>
                <Grid container alignItems="center" justifyContent="center">
                    <Grid container item xs={12} sm={12} md={12} lg={12} alignItems="center" justifyContent="center">
                        <Grid item container xs={12} sm={12} md={4} lg={3} className={classes.avatarWrapper} style={{marginBottom: "40px"}}>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <Avatar
                                    variant="circular"
                                    alt="ProfilePhoto"
                                    style={userPhoto !== null && typeof(userPhoto) !== "undefined" && userPhoto !== null ? {width: "9rem", height: "9rem", margin: "auto", border: "2px solid #0A481C", cursor: "pointer"} : {width: "9rem", height: "9rem", margin: "auto", border: "2px solid #0A481C"}}
                                    src={userPhoto !== null && typeof(userPhoto) !== "undefined" ? userPhoto : ""}
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
                                        Update Profile Photo
                                </UpdateImageButton>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={12} md={8} lg={9}>
                        { isEditing === false ?
                            <ProfileInfoViewer userInfo={userInfo} handleEditInfos={handleToggleToEditMode}/>
                            :
                            <EditProfileForm userInfo={userInfo} handleUpdateProfile={handleUpdateProfile} />
                        }
                        </Grid>
                        <Grid item xs={12} sm={12} md={11} lg={11}>
                            <Accordion style={{backgroundColor: "#00000020", color: "#000000"}}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography variant="subtitle1" style={{fontFamily: "Ubuntu-Light", fontWeight: "700", textAlign: "start"}}>Update Password</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography variant="body2" style={{fontFamily: "Ubuntu-Light", fontWeight: "700", textAlign: "start"}}>
                                        We will send to your email a link that allows you to update your password.
                                    </Typography>
                                </AccordionDetails>
                                <Divider />
                                <AccordionActions>
                                    <ResetPasswordButton startIcon={<TelegramIcon />} style={{ fontFamily: "Ubuntu", marginLeft: "1vw"}} >Send Me A Link</ResetPasswordButton>
                                </AccordionActions>
                            </Accordion>
                            <br ></br>
                            {/* <Divider variant="middle" />
                            <br ></br>*/}
                        </Grid>
                        {/*<Grid item xs={12} sm={12} md={11} lg={11}>
                            <Paper elevation={8} className="profileMySubmissionPaper">
                                asdas
                            </Paper>
                        </Grid>*/}
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
            <Footer />
            <CssBaseline />
        </div>
    );
}

export default MyProfilePage