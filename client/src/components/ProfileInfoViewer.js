import React from 'react';
import { Grid, Typography, CircularProgress, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import '../assets/styles.css';
import {useTranslation} from "react-i18next";
const ProfileInfoViewer = (props) => {
    const {t} = useTranslation();
    const { userInfo, handleEditInfos } = props;
    return (
        typeof(userInfo) !== "undefined" ?
        <Grid container className='profileInfoViewer'>
            <Grid container item xs={11} sm={11} md={11} lg={11}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Typography variant="h6" component="div" style={{textAlign: "start", fontFamily: "Ubuntu", fontWeight: "bold", paddingBottom: "1rem"}}>
                        {userInfo.firstname} {userInfo.lastname}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Typography variant="subtitle1" component="div" style={{textAlign: "start", fontFamily: "Ubuntu", fontWeight: "bold", paddingBottom: "1rem"}}>
                        {t('profile.e-mail')} &nbsp;
                        <Typography variant="subtitle1" component="span" style={{textAlign: "start", fontFamily: "Ubuntu-Light"}}>
                            {userInfo.email}
                        </Typography>
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Typography variant="subtitle1" component="div" style={{textAlign: "start", fontFamily: "Ubuntu", fontWeight: "bold", paddingBottom: "1rem"}}>
                        {userInfo.status} at {userInfo.university.uniName}
                    </Typography>
                </Grid>
            </Grid>
            <Grid item container xs={1} sm={1} md={1} lg={1} alignItems="center" justifyContent="flex-end">
                <Tooltip title={t('profile.update_profile')} placement="bottom" arrow leaveDelay={100}>
                    <IconButton  color="secondary" onClick={handleEditInfos}>
                        <EditIcon data-testid="profileInfoUpdate" color="secondary" />
                    </IconButton>
                </Tooltip>
            </Grid>
        </Grid>
        :
        <Grid container alignItems="center" justifyContent="center" style={{margin: "auto", width: "100%"}}>
            <CircularProgress color="secondary" fullwidth="true" />
        </Grid>
    )
}

export default ProfileInfoViewer;