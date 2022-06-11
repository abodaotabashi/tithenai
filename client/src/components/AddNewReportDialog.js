import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Dialog, DialogTitle, DialogContent, Typography, IconButton, Divider, Button, Grid, TextField } from '@mui/material';
import {useTranslation} from "react-i18next";
import '../assets/styles.css';
import CloseIcon from '@mui/icons-material/Close';
import FlagIcon from '@mui/icons-material/Flag';

const useStyles = makeStyles(theme => ({
    dialogWrapper: {
        position: 'absolute',
        top: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    }
}));

const AddNewReportDialog = (props) => {
    const {t} = useTranslation();
    const { openDialog, setOpenDialog, addNewReportFunction, isReported } = props;
    const classes = useStyles();
    const [reportContent, setReportContent] = useState("");
    const [contentError, setContentError] = useState(false);
    const [contentErrorMessage, setContentErrorMessage] = useState("");

    const handleAddNewReport = () => {
        if (reportContent.trim() !== "") {
            setContentError(false);
            setContentErrorMessage("");
            addNewReportFunction(reportContent.trim()).then(() => {
                setOpenDialog(false);
                setReportContent("");
            })
        } else {
            setContentError(true);
            setContentErrorMessage(t('dialogs.required_field'));
        }
    }

    return (
        <Dialog open={openDialog} maxWidth="md" fullWidth classes={{ paper: classes.dialogWrapper }}>
            <DialogTitle>
                <div className="dialogTitle">
                    <Typography variant="h6" component="div" style={{flexGrow:1, fontFamily: "Ubuntu-Light", fontWeight: "bold"}}>
                        {t('dialogs.report_thesis')}
                    </Typography>
                    <IconButton style={{color: "#b5201e", backgroundColor: "rgba(181, 32, 30, 0.05)"}} onClick={() => setOpenDialog(false)}>
                        <CloseIcon style={{color: "#b5201e"}} />
                    </IconButton>
                </div>
            </DialogTitle>
            <Divider />
            <DialogContent>
                {isReported === false ?
                    <Grid container alignItems="center" justifyContent="center">
                        <Grid item xs={12} sm={12} md={12} lg={12} container alignItems="center" justifyContent="center">
                            <TextField
                                error={contentError}
                                color="secondary"
                                label={t('dialogs.explanation')}
                                value={reportContent}
                                required
                                type="text"
                                onChange={(event) => setReportContent(event.target.value)}
                                variant="outlined"
                                InputLabelProps={{
                                    style: {
                                        fontFamily: 'Ubuntu',
                                    }
                                }}
                                style={{ width: "90%", margin: "0.5vh 0" }}
                                helperText={contentErrorMessage} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} container alignItems="center" justifyContent="center">
                            <Button
                                color="error"
                                variant="outlined"
                                size="large"
                                startIcon={<FlagIcon fontSize='large' />}
                                style={{ padding: "1vh 4vw", fontFamily: "Ubuntu", marginTop: "1rem" }}
                                onClick={handleAddNewReport}>
                                {t('dialogs.report')}
                            </Button>
                        </Grid>
                    </Grid>
                    :
                    <Grid container alignItems="center" justifyContent="center">
                        <Grid item xs={12} sm={12} md={12} lg={12} container alignItems="center" justifyContent="center">
                            <Typography variant="h6" component="div" style={{textAlign: "start", fontFamily: "Ubuntu-Light", fontWeight: "bold", paddingBottom: "1rem"}}>
                                We want to remind you that you have already reported this thesis. Thank you again!
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} container alignItems="center" justifyContent="center">
                            <Button
                                color="secondary"
                                variant="outlined"
                                size="large"
                                style={{ padding: "1vh 2vw", fontFamily: "Ubuntu", marginTop: "1rem" }}
                                onClick={() => setOpenDialog(false)}>
                                OK
                            </Button>
                        </Grid>
                    </Grid>
                }
            </DialogContent>
        </Dialog>
    )
}

export default AddNewReportDialog;