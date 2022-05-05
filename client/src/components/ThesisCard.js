import React from 'react';
import { Chip, Divider, Grid, Typography, Avatar } from '@mui/material';

import VisibilityIcon from '@mui/icons-material/Visibility';
import StarRateIcon from '@mui/icons-material/StarRate';
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';
import DocumentIllustration from "../assets/gifs/Document.gif";


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

const CustomIcon = styled(Avatar)(({ theme }) => ({
    width: theme.spacing(8),
    height: theme.spacing(9),
    margin: "auto",
    border: `2px solid ${theme.palette.secondary.main}`,
    borderRadius: "10px",
    backgroundColor: "transparent",
    [theme.breakpoints.down('md')]: {
        width: theme.spacing(6),
        height: theme.spacing(7),
        marginTop: "5px",
    },
    [theme.breakpoints.down('sm')]: {
        width: theme.spacing(5),
        height: theme.spacing(6),
        marginTop: "5px",
    },
}));

const useStyles = makeStyles(theme => ({
    texts: {
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        padding: "10px",
        textAlign:"start",
        flexDirection: "column",
        [theme.breakpoints.down('md')]: {
            padding: "10px",
        },
        [theme.breakpoints.down('sm')]: {
            padding: "5px",
            alignItems: "center",
            textAlign:"center",
        }
    },
    listOfChips: {
        display: 'flex',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: 0,
        margin: 0,
        [theme.breakpoints.down('sm')]: {
            justifyContent: 'center',
        }
    },
    chip: {
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        "& .MuiChip-label": {
            fontFamily: "Ubuntu",
            whiteSpace: "normal",
            textOverflow: "clip",
            textAlign: "center",
            wordWrap: "break-word",
            width: "100%",
            height: "100%",
            [theme.breakpoints.down('md')]: {
                whiteSpace: "normal",
                textOverflow: "clip",
                textAlign: "center",
                wordWrap: "break-word",
                width: "100%",
            },
            [theme.breakpoints.down('sm')]: {
                whiteSpace: "normal",
                textOverflow: "clip",
                textAlign: "center",
                wordWrap: "break-word",
                width: "100%",
            },
        },
    },
}));

const ThesisCard = (props) => {
    const { thesis } = props;
    const classes = useStyles();

    return (
        <ContainerGrid container alignItems="center" justifyContent="center" direction="row">
            <Grid item container xs={12} sm={12} md={12} lg={12} alignItems="center" justifyContent="center">
                <Grid item container xs={12} sm={2} md={3} lg={2}>
                    <CustomIcon src={DocumentIllustration} alt="thesis" />
                </Grid>
                <Grid item container xs={12} sm={10} md={9} lg={10} alignItems="flex-start" className={classes.texts}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Typography variant="subtitle1" component="div" style={{fontFamily: "Ubuntu", fontWeight: "700"}}>
                            {thesis.thesisTitle}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} style={{width:"80%", margin: "1vh 0"}}>
                        <Divider variant='fullWidth' />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Typography variant="subtitle2" component="div" style={{fontFamily: "Ubuntu", fontWeight: "700"}}>
                            {thesis.thesisAuthorName} - {new Date(thesis.thesisDate._seconds * 1000).toLocaleDateString('nl-BE')}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} style={{width:"65%", margin: "1vh 0"}}>
                        <Divider variant='fullWidth' />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Typography variant="body2" component="div" style={{fontFamily: "Ubuntu", fontWeight: "700"}}>
                            {thesis.thesisUniName} - {thesis.thesisFaculty}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Typography variant="body2" component="div" style={{fontFamily: "Ubuntu", fontWeight: "700"}}>
                            Language: {thesis.thesisLanguage}
                        </Typography>
                    </Grid>
                    {thesis.thesisTags.length > 0 ?
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <ul className={classes.listOfChips}>
                            {thesis.thesisTags.map((tag, index) => {
                                return (
                                    <li key={index} style={{margin: "0.2rem"}}>
                                        <Chip
                                            label={tag}
                                            size="small"
                                            variant="outlined"
                                            className={classes.chip}
                                            />
                                    </li>
                                );
                            })}
                            </ul>
                        </Grid>
                        : null
                    }
                    <Grid item xs={12} sm={12} md={12} lg={12} style={{width:"65%", margin: "1vh 0"}}>
                        <Divider variant='fullWidth' />
                    </Grid>
                    <Grid container item xs={12} sm={12} md={12} lg={12} className={classes.texts}>
                        <Typography variant="body2" component="div" style={{fontFamily: "Ubuntu", fontWeight: "700", textAlign: "start", display: "flex", alignItems: "center"}}>
                            <VisibilityIcon color="info" style={{width: "1.25rem", marginRight: "0.5rem"}}/>
                            {thesis.viewersList.length}
                            &nbsp;&nbsp;
                            <StarRateIcon color="warning" style={{width: "1.25rem", marginRight: "0.5rem"}}/>
                            {/*thesis.rating*/} 4.1
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </ContainerGrid>
    )
}

export default ThesisCard;