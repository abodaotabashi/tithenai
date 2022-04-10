import React, { useState } from 'react';
import { withStyles } from '@mui/styles';
import { Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import '../assets/styles.css';

import SaudiFlag from "../assets/icons/saudi_arabia_flag.png";
import BritainFlag from "../assets/icons/great_britain_flag.png";
import GermanyFlag from "../assets/icons/germany_flag.png";
import TurkeyFlag from "../assets/icons/turkey_flag.png";

const LanguageDropDownList = (props) => {
    const { openDropDownMenu, setOpenDropDownMenu } = props;
    const [ currentLang, setCurrentLang ] = useState(localStorage.getItem("i18nextLng") || "en");

    const handleChangeLanguage = (lang) => {
        //TODO: Change the Language
        setOpenDropDownMenu(null);
        setCurrentLang(lang);
    }

    const StyledMenu = withStyles({
        paper: {
            border: '1px solid #d3d4d5',
        },
    })((props) => (
        <Menu
            elevation={0}
            getContentAnchorEl={null}
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

    return (
        <StyledMenu anchorEl={openDropDownMenu} keepMounted open={Boolean(openDropDownMenu)} onClose={handleCloseDropDownMenu}>
            <StyledMenuItem onClick={() => handleChangeLanguage("de")} disabled={currentLang === "de" ? true : false}>
                <ListItemIcon style={{height:"2rem", width: "2rem"}}>
                    <img src={GermanyFlag}  alt='navbarDropDownItemIcon'/>
                </ListItemIcon>
                <ListItemText primary="Deutsch" />
            </StyledMenuItem>
            <StyledMenuItem onClick={() => handleChangeLanguage("en")} disabled={currentLang === "en" ? true : false}>
                <ListItemIcon style={{height:"2rem", width: "2rem"}}>
                    <img src={BritainFlag} alt='navbarDropDownItemIcon'/>
                </ListItemIcon>
                <ListItemText primary="English" />
            </StyledMenuItem>
            <StyledMenuItem onClick={() => handleChangeLanguage("tr")} disabled={currentLang === "tr" ? true : false}>
                <ListItemIcon style={{height:"2rem", width: "2rem"}}>
                    <img src={TurkeyFlag} alt='navbarDropDownItemIcon'/>
                </ListItemIcon>
                <ListItemText primary="Türkçe" />
            </StyledMenuItem>
            <StyledMenuItem onClick={() => handleChangeLanguage("ar")} disabled={currentLang === "ar" ? true : false}>
                <ListItemIcon style={{height:"2rem", width: "2rem"}}>
                    <img src={SaudiFlag} alt='navbarDropDownItemIcon'/>
                </ListItemIcon>
                <ListItemText primary="العربية" />
            </StyledMenuItem>
        </StyledMenu>
    )
}
export default LanguageDropDownList;