import React from 'react';
import { Chip, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { redirectToViewThesisPage } from '../utils/Redirecter';
import { formatFirebaseDate } from '../utils/HelperFunctions';

import VisibilityIcon from '@mui/icons-material/Visibility';
import StarRateIcon from '@mui/icons-material/StarRate';
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
    texts: {
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        padding: "5px",
        textAlign:"start",
        flexDirection: "column",
        [theme.breakpoints.down('md')]: {
            padding: "8px",
        },
        [theme.breakpoints.down('sm')]: {
            padding: "5px",
            alignItems: "center",
            justifyContent: "center",
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

const MiniThesisCard = (props) => {
    const { thesis } = props;
    const navigator = useNavigate();
    const classes = useStyles();

    return (
        <ContainerGrid container alignItems="center" justifyContent="center" direction="row">
            <Grid item container xs={12} sm={12} md={12} lg={12} alignItems="center" justifyContent="center">
                <Grid item container xs={11} sm={11} md={11} lg={11} alignItems="flex-start" direction="row">
                    <Grid container item xs={12} sm={12} md={12} lg={12} onClick={() => redirectToViewThesisPage(navigator, thesis.thesisId)}>
                        <Grid item xs={12} sm={12} md={12} lg={12} className={classes.texts}>
                            <Typography variant="subtitle1" component="div" style={{fontFamily: "Ubuntu", fontWeight: "700"}}>
                                {thesis.thesisTitle} ({thesis.thesisType})
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} className={classes.texts}>
                            <Typography variant="subtitle2" component="div" style={{fontFamily: "Ubuntu", fontWeight: "700"}}>
                                {thesis.thesisAuthorName} - {formatFirebaseDate(thesis.thesisDate)}
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
                        <Grid item xs={12} sm={12} md={12} lg={12} className={classes.texts}>
                            <Typography variant="body2" component="div" style={{fontFamily: "Ubuntu", fontWeight: "700", textAlign: "start", display: "flex", alignItems: "center"}}>
                                <VisibilityIcon color="info" style={{width: "1.25rem", marginRight: "0.5rem"}}/>
                                {thesis.viewersList.length}
                                &nbsp;&nbsp;
                                <StarRateIcon color="warning" style={{width: "1.25rem", marginRight: "0.5rem"}}/>
                                {thesis.ratesAverage !== 0 ? thesis.ratesAverage : "-"}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </ContainerGrid>
    )
}

export default MiniThesisCard;