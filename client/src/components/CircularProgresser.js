import React from "react";
import { makeStyles } from '@mui/styles';
import { Box, CircularProgress } from '@mui/material';
import Logo512 from "../assets/logos/Uncircled Green.png";

const useStyles = makeStyles((theme) => ({
    logo: {
        width: "3rem",
        [theme.breakpoints.down('md')]: {
            width: "2.5rem",
        },
        [theme.breakpoints.down('sm')]: {
            width: "2.25rem",
        },
        [theme.breakpoints.down('xs')]: {
            width: "2rem",
        },
    }
}));

const CircularProgresser = (props) => {
    const classes = useStyles();
    return (
        <Box sx={{ position: "relative", display: "inline-flex" }}>
            <CircularProgress thickness={2} size={70} fullwidth="true" style={{color: "#0A481C"}}  />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: "absolute",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                <img src={Logo512} className={classes.logo} alt="TithenaiLogo"/>
            </Box>
        </Box>
    );
};

export default CircularProgresser;