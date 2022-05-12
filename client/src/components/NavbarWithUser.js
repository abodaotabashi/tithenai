import React, { useState } from 'react';
import { Toolbar, AppBar, Grid, IconButton, Tooltip, Button, SwipeableDrawer } from '@mui/material';
import { makeStyles } from '@mui/styles';
import LanguageDropDownList from './LanguageDropDownList';
import ProfileDropDownList from './ProfileDropDownList';
import NavbarDrawer from './NavbarDrawer';
import { styled } from '@mui/material/styles';
import { redirectToMainPage, redirectToUploadThesisPage } from '../utils/Redirecter';
import { useNavigate } from 'react-router-dom';

import '../assets/styles.css';
import PublicIcon from '@mui/icons-material/Public';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import UploadIcon from '@mui/icons-material/Upload';
import MenuIcon from '@mui/icons-material/Menu';
import TithenaiLogo from '../assets/logos/Uncircled Navyblue.png';

const useStyles = makeStyles((theme) => ({
    logo: {
        width: "3.5rem",
        cursor: "pointer",
        [theme.breakpoints.down('md')]: {
            width: "2rem",
        },
        [theme.breakpoints.down('sm')]: {
            width: "1.75rem",
        },
        [theme.breakpoints.down('xs')]: {
            width: "1.5rem",
        },
    },
    logoLabel: {
        paddingLeft: "0.75rem",
        lineHeight: "1",
        cursor: "pointer",
        fontSize: "1.35rem",
        fontWeight: "bold",
        fontFamily: "Ubuntu-Light",
        [theme.breakpoints.down('md')]: {
            fontSize: "1.25rem",
            paddingLeft: "0.6rem",
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: "1.15rem",
            paddingLeft: "0.55rem",
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: "1.05rem",
            paddingLeft: "0.35rem",
        },
    },
}));

const DrawerButton = styled(IconButton)(({ theme }) => ({
    display: "none",
    color: theme.palette.secondary.main,
    [theme.breakpoints.down('sm')]: {
        display: "flex",
    },
}));

const UploadButton = styled(Button)(({ theme }) => ({
    color: theme.palette.secondary.main,
    fontFamily: "Ubuntu-Light",
    fontWeight: "bold",
    border: `2px solid ${theme.palette.secondary.main}`,
    textTransform: "none",
    '&:hover': {
        border: `2px solid ${theme.palette.secondary.main}`,
        backgroundColor: theme.palette.secondary.main,
        color: "#ffffff",
    },
    [theme.breakpoints.down('sm')]: {
        display: "none",
    },
}));

const DropDownButton = styled(IconButton)(({ theme }) => ({
    display: "flex",
    [theme.breakpoints.down('sm')]: {
        display: "none",
    },
}));

const NavbarWithUser = (props) => {
    const [openLangDropDownMenu, setOpenLangDropDownMenu] = useState(null);
    const [openProfileDropDownMenu, setOpenProfileDropDownMenu] = useState(null);
    const [openSideDrawer, setOpenSideDrawer] = useState(false);
    const navigator = useNavigate();
    const classes = useStyles();


    return(
        <AppBar position="sticky" style={{backgroundColor: "#4BE77A"}}>
            <Toolbar>
                <Grid container>
                    <Grid item container xs={9} sm={4} md={6} lg={6} direction="row" className="navbarLogoWrapper" alignItems="center" justifyContent="flex-start">
                        <Grid item>
                            <DrawerButton onClick={() => setOpenSideDrawer(true)}>
                                <MenuIcon style={{fontSize: "x-large"}} color="secondary" />
                            </DrawerButton>
                        </Grid>
                        <Grid item>
                            <img src={TithenaiLogo} className={classes.logo} alt="Tithenai" onClick={() => redirectToMainPage(navigator)}/>
                        </Grid>
                        <Grid item>
                            <p className={classes.logoLabel} onClick={() => redirectToMainPage(navigator)}>Tithenai</p>
                        </Grid>
                    </Grid>
                    <Grid item container xs={3} sm={8} md={6} lg={6} alignItems="center" justifyContent="flex-end">
                        { props.hideUpload === false &&
                            <Grid item style={{margin: "0 1rem"}}>
                                <UploadButton variant="outlined" size="large" color="secondary" onClick={() => redirectToUploadThesisPage(navigator)} startIcon={<UploadIcon />}>Upload</UploadButton>
                            </Grid>
                        }
                        <Grid item style={{margin: "0 0.1rem"}}>
                            <Tooltip title="Languages" placement="bottom" arrow leaveDelay={100}>
                                <IconButton size="medium" color="secondary" aria-haspopup="true" onClick={(event) => setOpenLangDropDownMenu(event.currentTarget)}>
                                    <PublicIcon style={{fontSize: "2rem"}} color="secondary"/>
                                </IconButton>
                            </Tooltip>
                            <LanguageDropDownList openDropDownMenu={openLangDropDownMenu} setOpenDropDownMenu={setOpenLangDropDownMenu} />
                        </Grid>
                        <Grid item style={{margin: "0 0.1rem"}}>
                            <DropDownButton size="medium" color="secondary" aria-haspopup="true" onClick={(event) => setOpenProfileDropDownMenu(event.currentTarget)}>
                                <AccountCircleIcon style={{fontSize: "2rem"}} color="secondary"/>
                            </DropDownButton>
                            <ProfileDropDownList openDropDownMenu={openProfileDropDownMenu} setOpenDropDownMenu={setOpenProfileDropDownMenu} />
                        </Grid>
                    </Grid>
                </Grid>
                <SwipeableDrawer
                    anchor="left"
                    open={openSideDrawer}
                    onClose={() => setOpenSideDrawer(false)}
                    onOpen={() => setOpenSideDrawer(true)}>
                        <NavbarDrawer toggleDrawer={setOpenSideDrawer} />
                </SwipeableDrawer>
            </Toolbar>
        </AppBar>
    );
}

export default NavbarWithUser;