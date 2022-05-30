import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Grid,
    Typography,
    IconButton,
    Button,
    DialogActions,
    TextField
} from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {useTranslation} from "react-i18next";
import { makeStyles } from '@mui/styles';
import '../assets/styles.css';
import CloseIcon from '@mui/icons-material/Close';

import ForgotPasswordIllustration from '../assets/gifs/ForgotPassword.gif';
import MailSentIllustration from '../assets/gifs/Sent.gif';

const useStyles = makeStyles(theme => ({
    dialogWrapper: {
        position: 'absolute',
        top: theme.spacing(2),
        [theme.breakpoints.down('md')]: {
            top: theme.spacing(1)
        },
    },
    illustration: {
        width: "15rem",
        [theme.breakpoints.down('lg')]: {
            width: "15rem",
        },
        [theme.breakpoints.down('md')]: {
            width: "10rem",
        },
        [theme.breakpoints.down('sm')]: {
            width: "8rem",
        },
    }
}));

const initial_form_values = {
    emailUser: '',
};

const form_validation_schema = Yup.object().shape({
    emailUser: Yup.string()
            .email("Invalid Email! Please enter a valid E-Mail address!")
            .required("This Field is required!")
});

const ForgotPasswordDialog = (props) => {
    const {t} = useTranslation();
    const { openDialog, toggleDialog, sendEmailFunction} = props;

    const [sent, setSent] = React.useState(false);

    const classes = useStyles();

    const handleCheckEmail = (values, props) => {
        sendEmailFunction(values.emailUser.toLowerCase().trim());
        setSent(true);
        props.resetForm();
    }

    const handleCloseDialog = () => {
        toggleDialog(false);
        setSent(false);
    }

    return (
        <Dialog open={openDialog} maxWidth="md" fullWidth classes={{ paper: classes.dialogWrapper }}>
            <Formik
                initialValues={initial_form_values}
                validationSchema={form_validation_schema}
                onSubmit={handleCheckEmail}>
                {({ values, touched, errors }) =>
                <Form>
                    <DialogTitle>
                        <div className="dialogTitle">
                            <Typography variant="h6" component="div" style={{flexGrow:1, fontFamily: "Ubuntu-Light", fontWeight: "700"}}>
                                {t('dialogs.forgot_password')}
                            </Typography>
                            <IconButton style={{color: "red"}} onClick={handleCloseDialog}>
                                <CloseIcon style={{color: "red"}} />
                            </IconButton>
                        </div>
                    </DialogTitle>
                    <DialogContent dividers>
                        {sent === false ?
                        <Grid container alignItems="center">
                            <Grid item xs={12} sm={12} md={12} lg={12} style={{textAlign: "center"}}>
                                <img src={ForgotPasswordIllustration} alt="Welcome" className={classes.illustration}/>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} style={{textAlign: "center"}}>
                                <Typography variant="subtitle1" component="div" style={{flexGrow:1, fontFamily: "Ubuntu-Light", fontWeight: "700", textAlign: "center"}}>
                                    {t('dialogs.dont_worry')}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} style={{textAlign: "center"}}>
                                <Typography variant="subtitle1" component="div" style={{flexGrow:1, fontFamily: "Ubuntu-Light", fontWeight: "700", textAlign: "center"}}>
                                    {t('dialogs.wewill_send')}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} style={{textAlign: "center"}}>
                                <Field
                                    as={TextField}
                                    name="emailUser"
                                    error={touched.emailUser && Boolean(errors.emailUser)}
                                    color="secondary"
                                    required
                                    label={t('dialogs.your_email')}
                                    variant="outlined"
                                    InputLabelProps={{
                                        style: {
                                            fontFamily: 'Ubuntu'
                                        }
                                    }}
                                    style={{margin: "2vh auto", width: "90%"}}
                                    helperText={<ErrorMessage name="emailUser"/>}/>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12}><br/></Grid>
                        </Grid> :
                        <Grid container alignItems="center" justifyContent="center">
                            <Grid item xs={12} sm={12} md={12} lg={12} style={{textAlign: "center"}}>
                                <img src={MailSentIllustration} alt="Welcome" className={classes.illustration} loop="0"/>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} style={{textAlign: "center"}}>
                                <Typography variant="subtitle1" component="div" style={{flexGrow:1, fontFamily: "Ubuntu-Light", fontWeight: "700", textAlign: "center"}}>
                                    {t('dialogs.please_check')}
                                </Typography>
                            </Grid>
                            <Grid item xl={12} sm={12} md={12} lg={12}><br/></Grid>
                        </Grid> }
                    </DialogContent>
                    <DialogActions>
                        {sent === false ?
                        <Button
                            variant="contained"
                            color="secondary"
                            style={{margin: "1vh 1rem", fontFamily: "Ubuntu"}}
                            disabled={Boolean(errors.emailUser)}
                            type="submit">
                            {t('dialogs.send_link')}
                        </Button> :
                        <Button
                            variant="contained"
                            color="secondary"
                            style={{margin: "1vh 1rem", fontFamily: "Ubuntu"}}
                            onClick={handleCloseDialog}>
                            {t('dialogs.ok')}
                        </Button>
                        }
                    </DialogActions>
                </Form>
                }
            </Formik>
        </Dialog>
    )
}

export default ForgotPasswordDialog;