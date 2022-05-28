import React from 'react';
import { Avatar, Grid, Typography } from '@mui/material';

import SchoolIcon from '@mui/icons-material/School';
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';

const ContainerGrid = styled(Grid)(({ theme }) => ({
    minHeight: "15vh",
    height: "100%",
    width: "90%",
    cursor: "pointer",
    background: "linear-gradient(315deg, #06214430 0%, transparent 45% )",
    borderTopRightRadius: "10px",
    borderBottomLeftRadius: "10px",
    border: "2px solid #002677",
    margin: "0 auto",
    transition: "300ms",
    "&:hover" : {
        backgroundColor: "#00000010"
    }
}));

const useStyles = makeStyles(theme => ({
    avatar: {
        width: theme.spacing(12),
        height: theme.spacing(12),
        margin: "auto",
        border: `2px solid ${theme.palette.secondary.main}`,
        borderRadius: "10px",
        backgroundColor: "transparent",
        [theme.breakpoints.down('lg')]: {
            width: theme.spacing(10),
            height: theme.spacing(10),
            marginTop: "5px",
        },
        [theme.breakpoints.down('md')]: {
            width: theme.spacing(8),
            height: theme.spacing(8),
            marginTop: "5px",
        },
        [theme.breakpoints.down('sm')]: {
            width: theme.spacing(6),
            height: theme.spacing(6),
            marginTop: "5px",
        },
    },
    texts: {
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "10px",
        textAlign:"start",
        flexDirection: "column",
        [theme.breakpoints.down('md')]: {
            padding: "5px 0",
        },
        [theme.breakpoints.down('sm')]: {
            padding: "5px 0",
            alignItems: "center",
            textAlign:"center",
        }
    }
}));

const UniversityCard = (props) => {
    const { university } = props;
    const classes = useStyles();

    return (
        <ContainerGrid container alignItems="center" justifyContent="center" direction="row">
            <Grid item container xs={12} sm={12} md={12} lg={12} alignItems="center" justifyContent="center">
                <Grid item container xs={12} sm={3} md={3} lg={3}>
                    {university.uniImageUrl === "" || university.uniImageUrl === null || typeof(university.uniImageUrl) === "undefined" ?
                        <SchoolIcon className={classes.avatar} />
                        :
                        <Avatar
                            variant="rounded"
                            alt="universityLogo"
                            className={classes.avatar}
                            src={university.uniImageUrl}
                        />
                    }
                </Grid>
                <Grid item container xs={12} sm={9} md={9} lg={9} className={classes.texts}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Typography variant="subtitle1" component="div" style={{fontFamily: "Ubuntu", fontWeight: "700"}}>
                            {university.uniName}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Typography variant="subtitle2" component="div" style={{fontFamily: "Ubuntu", fontWeight: "700"}}>
                            {university.uniState}, {university.uniCountry}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Typography variant="subtitle2" component="div" style={{fontFamily: "Ubuntu", fontWeight: "700"}}>
                            Type: {university.uniType}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </ContainerGrid>
    )
}

export default UniversityCard;