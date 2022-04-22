import React from 'react';
import { withStyles } from '@mui/styles';
import { Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../assets/styles.css';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import PersonIcon from '@mui/icons-material/Person';
import ArticleIcon from '@mui/icons-material/Article';

const ProfileDropDownList = (props) => {
    const { openDropDownMenu, setOpenDropDownMenu } = props;
    const navigator = useNavigate();

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

    const handleCloseDropDownMenu = () => {
        setOpenDropDownMenu(null);
    };

    const handleRedirectToHomePage = () =>{
        //TODO
        //navigator('/');
        handleCloseDropDownMenu();
    }

    const handleRedirectToProfilePage = () => {
        //TODO
        //navigator('/');
        handleCloseDropDownMenu();
    };

    const handleRedirectToPapersPage = () => {
        //TODO
        //navigator('/');
        handleCloseDropDownMenu();
    };

    const handleRedirectToSavedListPage = () => {
        //TODO
        //navigator('/');
        handleCloseDropDownMenu();
    };

    const handleSignOut = () => {
        //TODO
        navigator('/login');
        handleCloseDropDownMenu();
    };

    return (
        <StyledMenu anchorEl={openDropDownMenu} keepMounted open={Boolean(openDropDownMenu)} onClose={handleCloseDropDownMenu}>
            <StyledMenuItem onClick={handleRedirectToHomePage}>
                <ListItemIcon style={{height:"2rem", width: "2rem", display: "flex", alignItems: "center", justifyContent: "flex-start"}}>
                    <HomeIcon style={{fontSize: "1.75rem", color: "#0A481C"}}/>
                </ListItemIcon>
                <ListItemText primary="Home" />
            </StyledMenuItem>
            <StyledMenuItem onClick={handleRedirectToProfilePage}>
                <ListItemIcon style={{height:"2rem", width: "2rem", display: "flex", alignItems: "center", justifyContent: "flex-start"}}>
                    <PersonIcon style={{fontSize: "1.75rem", color: "#0A481C"}} />
                </ListItemIcon>
                <ListItemText primary="Profile" />
            </StyledMenuItem>
            <StyledMenuItem onClick={handleRedirectToPapersPage}>
                <ListItemIcon style={{height:"2rem", width: "2rem", display: "flex", alignItems: "center", justifyContent: "flex-start"}}>
                    <ArticleIcon style={{fontSize: "1.75rem", color: "#0A481C"}} />
                </ListItemIcon>
                <ListItemText primary="My Papers" />
            </StyledMenuItem>
            <StyledMenuItem onClick={handleRedirectToSavedListPage}>
                <ListItemIcon style={{height:"2rem", width: "2rem", display: "flex", alignItems: "center", justifyContent: "flex-start"}}>
                    <BookmarksIcon style={{fontSize: "1.75rem", color: "#0A481C"}} />
                </ListItemIcon>
                <ListItemText primary="Saved List" />
            </StyledMenuItem>
            <StyledMenuItem onClick={handleSignOut}>
                <ListItemIcon style={{height:"2rem", width: "2rem", display: "flex", alignItems: "center", justifyContent: "flex-start"}}>
                    <LogoutIcon style={{fontSize: "1.75rem", color: "#0A481C"}} />
                </ListItemIcon>
                <ListItemText primary="Sign Out" />
            </StyledMenuItem>
        </StyledMenu>
    )
}
export default ProfileDropDownList;