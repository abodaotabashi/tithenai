import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../utils/Context';
import { Box, ListItem, List, ListItemText, ListItemIcon, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { redirectToAdminPanelPage, redirectToLoginPage, redirectToMainPage, redirectToMyPapersPage, redirectToMyProfilePage, redirectToSavedListPage, redirectToUploadThesisPage } from '../utils/Redirecter';
import { appSignOut } from '../auth/auth';
import { useTranslation } from "react-i18next";

import { makeStyles } from '@mui/styles';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import PersonIcon from '@mui/icons-material/Person';
import ArticleIcon from '@mui/icons-material/Article';
import UploadIcon from '@mui/icons-material/Upload';
import SecurityTwoToneIcon from '@mui/icons-material/SecurityTwoTone';
import { getUserInfo } from '../Service';

const useStyles = makeStyles((theme) => ({
    list: {
        width: "70vw",
        '& .MuiListItemButton-root': {
            fontFamily: "Ubuntu-Light",
        },
        '& .MuiTypography-root': {
            fontFamily: "Ubuntu-Light",
            fontWeight: "bold",
            color: "#0A481C"
        },
        '& .MuiListItem-root:hover': {
            backgroundColor: "#A5F3BC",
        },
    },
}));

const NavbarDrawer = (props) => {
    const { userAuth } = useContext(AuthContext);
    const [ userAdminStatus, setUserAdminStatus ] = useState(0);
    const { t } = useTranslation();
    const classes = useStyles();
    const navigator = useNavigate();
    const { toggleDrawer } = props;

    useEffect(() => {
        if (typeof (userAuth) !== "undefined") {
            if (userAuth) {
                const uid = userAuth.uid;
                getUserInfo(uid).then(userInfo => {
                    if ( userInfo.adminStatus === true ) {
                        setUserAdminStatus(1)
                    } else {
                        setUserAdminStatus(0)
                    }
                })
            } else {
                redirectToLoginPage(navigator);
            }
        }
    }, [userAuth, navigator])

    const handleRedirectToHomePage = () =>{
        redirectToMainPage(navigator);
        toggleDrawer(false);
    }

    const handleRedirectToAdminPanelPage = () => {
        redirectToAdminPanelPage(navigator);
        toggleDrawer(false);
    };

    const handleRedirectToUploadPage = () =>{
        redirectToUploadThesisPage(navigator);
        toggleDrawer(false);
    }

    const handleRedirectToProfilePage = () => {
        redirectToMyProfilePage(navigator);
        toggleDrawer(false);
    };

    const handleRedirectToPapersPage = () => {
        redirectToMyPapersPage(navigator);
        toggleDrawer(false);
    };

    const handleRedirectToSavedListPage = () => {
        redirectToSavedListPage(navigator);
        toggleDrawer(false);
    };

    const handleSignOut = async () => {
        appSignOut().then(() => {
            redirectToLoginPage(navigator);
            toggleDrawer(false);
        })
    };

    return (
        <Box
            className={classes.list} >
            <List>
                <ListItem button key={"Home"} onClick={handleRedirectToHomePage}>
                    <ListItemIcon style={{height:"2rem", width: "2rem", display: "flex", alignItems: "center", justifyContent: "flex-start"}}>
                        <HomeIcon style={{fontSize: "1.75rem", color: "#0A481C"}}/>
                    </ListItemIcon>
                    <ListItemText primary={t('navbar.home')} />
                </ListItem>
                <Divider variant="inset" />
                { userAdminStatus === 1 &&
                    <>
                        <ListItem button key={"Admin Panel"} onClick={handleRedirectToAdminPanelPage}>
                            <ListItemIcon style={{height:"2rem", width: "2rem", display: "flex", alignItems: "center", justifyContent: "flex-start"}}>
                                <SecurityTwoToneIcon style={{fontSize: "1.75rem", color: "#0A481C"}}/>
                            </ListItemIcon>
                            <ListItemText primary={t('navbar.admin_panel')} />
                        </ListItem>
                        <Divider variant="inset" />
                    </>
                }
                <ListItem button key={"Upload"} onClick={handleRedirectToUploadPage}>
                    <ListItemIcon style={{height:"2rem", width: "2rem", display: "flex", alignItems: "center", justifyContent: "flex-start"}}>
                        <UploadIcon style={{fontSize: "1.75rem", color: "#0A481C"}}/>
                    </ListItemIcon>
                    <ListItemText primary={t('navbar.upload')} />
                </ListItem>
                <Divider variant="fullWidth" />
                <ListItem button key={"Profile"} onClick={handleRedirectToProfilePage}>
                    <ListItemIcon style={{height:"2rem", width: "2rem", display: "flex", alignItems: "center", justifyContent: "flex-start"}}>
                        <PersonIcon style={{fontSize: "1.75rem", color: "#0A481C"}}/>
                    </ListItemIcon>
                    <ListItemText primary={t('navbar.profile')} style={{fontFamily: "Ubuntu"}} />
                </ListItem>
                <Divider variant="inset" />
                <ListItem button key={"My Papers"} onClick={handleRedirectToPapersPage}>
                    <ListItemIcon style={{height:"2rem", width: "2rem", display: "flex", alignItems: "center", justifyContent: "flex-start"}}>
                        <ArticleIcon style={{fontSize: "1.75rem", color: "#0A481C"}}/>
                    </ListItemIcon>
                    <ListItemText primary={t('navbar.my_papers')} style={{fontFamily: "Ubuntu"}} />
                </ListItem>
                <Divider variant="inset" />
                <ListItem button key={"Saved List"} onClick={handleRedirectToSavedListPage}>
                    <ListItemIcon style={{height:"2rem", width: "2rem", display: "flex", alignItems: "center", justifyContent: "flex-start"}}>
                        <BookmarksIcon style={{fontSize: "1.75rem", color: "#0A481C"}}/>
                    </ListItemIcon>
                    <ListItemText primary={t('navbar.saved_list')} />
                </ListItem>
                <Divider variant="inset" />
                <ListItem button key={"Sign Out"} onClick={handleSignOut}>
                    <ListItemIcon style={{height:"2rem", width: "2rem", display: "flex", alignItems: "center", justifyContent: "flex-start"}}>
                        <LogoutIcon style={{fontSize: "1.75rem", color: "#0A481C"}}/>
                    </ListItemIcon>
                    <ListItemText primary={t('navbar.signout')} />
                </ListItem>
                <Divider variant="fullWidth" />
            </List>
        </Box>
    )
}

export default NavbarDrawer;