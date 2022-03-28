import React from 'react';
import { Toolbar, AppBar, Grid, IconButton, Tooltip } from '@mui/material';
import { makeStyles } from '@mui/styles';

import '../assets/styles.css';
import PublicIcon from '@mui/icons-material/Public';
import TithenaiLogo from '../assets/logos/Uncircled Green.png';

const useStyles = makeStyles((theme) => ({
    logo: {
        width: "3.5rem",
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
        fontSize: "1.35rem",
        fontWeight: "bold",
        fontFamily: "Ubuntu=",
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
const Navbar = (props) => {
    const classes = useStyles();

    return(
        <AppBar position="sticky" color="default">
            <Toolbar>
                <Grid container>
                    <Grid item container xs={11} sm={11} md={11} lg={11} direction="row" className="navbarLogoWrapper" alignItems="center" justifyContent="flex-start">
                        <Grid item>
                            <img src={TithenaiLogo} className={classes.logo} alt="Tithenai"/>
                        </Grid>
                        <Grid item>
                            <p className={classes.logoLabel}>Tithenai</p>
                        </Grid>
                    </Grid>
                    <Grid item container xs={1} sm={1} md={1} lg={1} alignItems="center" justifyContent="flex-end">
                        <Grid item>
                            <Tooltip title="Languages" placement="bottom" arrow leaveDelay={100}>
                                <IconButton size="medium" color="primary">
                                    <PublicIcon style={{fontSize: "2rem"}} color="secondary"/>
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;