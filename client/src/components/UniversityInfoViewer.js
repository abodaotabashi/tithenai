import React from 'react';
import { Grid, Typography, CircularProgress, Button } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import '../assets/styles.css';

const UniversityInfoViewer = (props) => {
    const { universityInfo } = props;
    return (
        typeof(universityInfo) !== "undefined" ?
        <Grid container className='universityInfoViewer'>
            <Grid container item xs={12} sm={12} md={9} lg={9}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Typography variant="h6" component="div" style={{textAlign: "start", fontFamily: "Ubuntu", fontWeight: "bold", paddingBottom: "1rem"}}>
                        {universityInfo.uniName}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Typography variant="subtitle1" component="div" style={{textAlign: "start", fontFamily: "Ubuntu", fontWeight: "bold", paddingBottom: "1rem"}}>
                        Location: &nbsp; {universityInfo.uniState}, {universityInfo.uniCountry}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Typography variant="subtitle1" component="div" style={{textAlign: "start", fontFamily: "Ubuntu", fontWeight: "bold", paddingBottom: "1rem"}}>
                        Type: &nbsp; {universityInfo.uniType}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Typography variant="subtitle1" component="div" style={{textAlign: "start", fontFamily: "Ubuntu", fontWeight: "bold", paddingBottom: "1rem"}}>
                        Number of Members: &nbsp; {universityInfo.statistics.uniMembers}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Typography variant="subtitle1" component="div" style={{textAlign: "start", fontFamily: "Ubuntu", fontWeight: "bold", paddingBottom: "1rem"}}>
                        Number of Total Theses: &nbsp; {universityInfo.uniTheses.length}
                    </Typography>
                </Grid>
            </Grid>
            <Grid container item xs={12} sm={12} md={3} lg={3}>
                { universityInfo.uniUrl !== null && typeof(universityInfo.uniUrl) !== "undefined" && universityInfo.uniUrl !== "" ?
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => window.location.href = `${universityInfo.uniUrl}`}
                            startIcon={<LanguageIcon />}
                            style={{margin: "1vh 0",fontFamily: "Ubuntu"}}>
                            Visit University Website
                        </Button>
                    </Grid>
                    : null
                }
            </Grid>
        </Grid>
        :
        <Grid container alignItems="center" justifyContent="center" style={{margin: "auto", width: "100%"}}>
            <CircularProgress color="secondary" fullwidth="true" />
        </Grid>
    )
}

export default UniversityInfoViewer;