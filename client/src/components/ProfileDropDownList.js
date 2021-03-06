import React, { useState, useEffect, useContext } from 'react';
import { Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../utils/Context';
import { appSignOut } from '../auth/auth';
import { redirectToAdminPanelPage, redirectToLoginPage, redirectToMainPage, redirectToMyPapersPage, redirectToMyProfilePage, redirectToSavedListPage } from '../utils/Redirecter';
import { useTranslation } from "react-i18next";
import { getUserInfo } from '../Service';

import '../assets/styles.css';
import { withStyles } from '@mui/styles';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import PersonIcon from '@mui/icons-material/Person';
import ArticleIcon from '@mui/icons-material/Article';
import SecurityTwoToneIcon from '@mui/icons-material/SecurityTwoTone';

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles((theme) => ({
    root: {
        ' & .MuiListItemText-primary': {
            fontFamily: "Ubuntu",
        },
        '&:hover': {
            backgroundColor: "#A5F3BC !important",
            ' & .MuiListItemText-primary': {
                color: theme.palette.common.black,
            },
        },
    },
}))(MenuItem);

const ProfileDropDownList = (props) => {
    const { userAuth } = useContext(AuthContext);
    const [ userAdminStatus, setUserAdminStatus ] = useState(0);
    const { t } = useTranslation();
    const { openDropDownMenu, setOpenDropDownMenu } = props;
    const navigator = useNavigate();

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

    const handleCloseDropDownMenu = () => {
        setOpenDropDownMenu(null);
    };

    const handleRedirectToHomePage = () =>{
        redirectToMainPage(navigator);
        handleCloseDropDownMenu();
    }

    const handleRedirectToAdminPanelPage = () => {
        redirectToAdminPanelPage(navigator);
        handleCloseDropDownMenu();
    };

    const handleRedirectToProfilePage = () => {
        redirectToMyProfilePage(navigator);
        handleCloseDropDownMenu();
    };

    const handleRedirectToPapersPage = () => {
        redirectToMyPapersPage(navigator);
        handleCloseDropDownMenu();
    };

    const handleRedirectToSavedListPage = () => {
        redirectToSavedListPage(navigator);
        handleCloseDropDownMenu();
    };

    const handleSignOut = async () => {
        appSignOut().then(() => {
            redirectToLoginPage(navigator);
            handleCloseDropDownMenu();
        })
    };

    return (
        <StyledMenu anchorEl={openDropDownMenu} keepMounted open={Boolean(openDropDownMenu)} onClose={handleCloseDropDownMenu}>
            <StyledMenuItem onClick={handleRedirectToHomePage}>
                <ListItemIcon style={{height:"2rem", width: "2rem", display: "flex", alignItems: "center", justifyContent: "flex-start"}}>
                    <HomeIcon style={{fontSize: "1.75rem", color: "#0A481C"}}/>
                </ListItemIcon>
                <ListItemText primary={t('navbar.home')} />
            </StyledMenuItem>
            { userAdminStatus === 1 &&
                <StyledMenuItem onClick={handleRedirectToAdminPanelPage}>
                    <ListItemIcon style={{height:"2rem", width: "2rem", display: "flex", alignItems: "center", justifyContent: "flex-start"}}>
                        <SecurityTwoToneIcon style={{fontSize: "1.75rem", color: "#0A481C"}} />
                    </ListItemIcon>
                    <ListItemText primary={t('navbar.admin_panel')} />
                </StyledMenuItem>
            }
            <StyledMenuItem onClick={handleRedirectToProfilePage}>
                <ListItemIcon style={{height:"2rem", width: "2rem", display: "flex", alignItems: "center", justifyContent: "flex-start"}}>
                    <PersonIcon style={{fontSize: "1.75rem", color: "#0A481C"}} />
                </ListItemIcon>
                <ListItemText primary={t('navbar.profile')} />
            </StyledMenuItem>
            <StyledMenuItem onClick={handleRedirectToPapersPage}>
                <ListItemIcon style={{height:"2rem", width: "2rem", display: "flex", alignItems: "center", justifyContent: "flex-start"}}>
                    <ArticleIcon style={{fontSize: "1.75rem", color: "#0A481C"}} />
                </ListItemIcon>
                <ListItemText primary={t('navbar.my_papers')} />
            </StyledMenuItem>
            <StyledMenuItem onClick={handleRedirectToSavedListPage}>
                <ListItemIcon style={{height:"2rem", width: "2rem", display: "flex", alignItems: "center", justifyContent: "flex-start"}}>
                    <BookmarksIcon style={{fontSize: "1.75rem", color: "#0A481C"}} />
                </ListItemIcon>
                <ListItemText primary={t('navbar.saved_list')} />
            </StyledMenuItem>
            <StyledMenuItem onClick={handleSignOut}>
                <ListItemIcon style={{height:"2rem", width: "2rem", display: "flex", alignItems: "center", justifyContent: "flex-start"}}>
                    <LogoutIcon style={{fontSize: "1.75rem", color: "#0A481C"}} />
                </ListItemIcon>
                <ListItemText primary={t('navbar.signout')} />
            </StyledMenuItem>
        </StyledMenu>
    )
}
export default ProfileDropDownList;