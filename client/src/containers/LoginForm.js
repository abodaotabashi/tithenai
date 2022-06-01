import React, { Component } from "react";
import { Grid, TextField,  Button, InputAdornment, IconButton, Divider } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import LoadingDialog from "../components/LoadingDialog";
import ForgotPasswordDialog from "../components/ForgotPasswordDialog";
import { signInWithEmail, forgetPassword, signUpWithGoogle } from "../auth/auth";

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import GoogleGif from '../assets/gifs/GoogleLogoOptimized.gif';
import '../assets/styles.css';
import { withTranslation } from 'react-i18next';

class LoginForm extends Component {
    state = {
        showPassword: false,
        openForgotPasswordDialog: false,
        showLoading: false,
        loadingMessage: ""
    }

    handleToggleForgotPasswordDialog = (status) => {
        this.setState({ openForgotPasswordDialog: status});
    }

    handleLogin = (values, props) => {
        this.setState({
            showLoading: true,
            loadingMessage: "Logging in ..."
        });
        signInWithEmail(values)
            .then((result)=>{
                console.log(result);
                this.setState({
                    showLoading: false,
                    loadingMessage: ""
                });
                this.props.redirectToSearchPage();
            })
    }

    handleSignInWithGoogle = () => {
        // Authenticate the Information of the user with its google account
        signUpWithGoogle()
            .then((result)=>{
                console.log(result);
                this.props.redirectToSearchPage();
            }).catch(error => console.log(error))
    }

    handleSendResetPasswordEmail = (email) => {
        // Send Email to reset the password to the entered email address if exists in the database
        this.setState({
            showLoading: true,
            loadingMessage: "Sending the email ..."
        });
        forgetPassword(email)
            .then((result)=>{
                console.log(result);
                this.setState({
                    showLoading: false,
                    loadingMessage: ""
                });
            })
    }

    render() {
        const { t } = this.props;
        const form_validation_schema = Yup.object().shape({
            email: Yup.string()
                    .email(t('login.invalid_email'))
                    .required(t('login.required_field')),
            password: Yup.string()
                .min(8, t('login.your_pass'))
                .max(32, t('login.your_pass_t'))
                .required(t('login.required_field')),
        });

        const initial_form_values = {
            email: '',
            password: '',
        };

        return (
            <Formik
                initialValues={initial_form_values}
                validationSchema={form_validation_schema}
                onSubmit={this.handleLogin}>
                {({ values, touched, errors }) =>
                <Form>
                    <Grid container alignItems="center" justifyContent="center">
                        <Grid item xs={11} sm={11} md={11} lg={11} style={{display: "flex", flexDirection:"column", width: "80%"}}>
                            <Field
                                as={TextField}
                                name="email"
                                error={touched.email && Boolean(errors.email)}
                                color="secondary"
                                required
                                label={t('login.your_email')}
                                variant="outlined"
                                InputLabelProps={{
                                    style: {
                                        fontFamily: 'Ubuntu'
                                    }
                                }}
                                style={{margin: "2vh 0"}}
                                helperText={<ErrorMessage name="email"/>}/>
                            <Field
                                as={TextField}
                                name="password"
                                error={touched.password && Boolean(errors.password)}
                                color="secondary"
                                required label={t('login.your_password')}
                                type={this.state.showPassword ? "text" : "password" }
                                variant="outlined"
                                style={{margin: "2vh 0", fontFamily: "Ubuntu"}}
                                helperText={<ErrorMessage name="password"/>}
                                InputLabelProps={{
                                    style: {
                                        fontFamily: 'Ubuntu'
                                    }
                                }}
                                InputProps={{
                                    endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => this.setState((prevState) => ({showPassword: !prevState.showPassword}))}>
                                            {!this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                    )
                                }}/>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <p className="forwardingSpan" onClick={() => this.handleToggleForgotPasswordDialog(true)}>{t('login.forgot')}</p>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Button disabled={Boolean(errors.email) || Boolean(errors.password)} color="secondary" variant="outlined" size="large" type="submit" style={{padding: "1vh 6vw", fontFamily: "Ubuntu"}}>{t('login.login_button')}</Button>
                        </Grid>
                        <Divider variant="middle" style={{textAlign: "center", width: "60%", padding: "1vh 0", color: "#14325A"}} >{t('login.or')}</Divider>
                        <Grid item container xs={12} sm={12} md={12} lg={12} direction="row" alignItems="center" justifyContent="center">
                            <p style={{fontFamily: "Ubuntu", paddingRight: "3px", color: "#14325A"}}>{t('login.google')}</p>
                            <IconButton aria-label="google" size="small" color="secondary" onClick={this.handleSignInWithGoogle}>
                                <img src={GoogleGif} alt="SigninWithGoogle" style={{width: "42px", borderRadius: "50%", margin: "3px", border: "1px solid #00000050"}}/>
                            </IconButton>
                        </Grid>
                    </Grid>
                    <ForgotPasswordDialog
                        sendEmailFunction={this.handleSendResetPasswordEmail}
                        openDialog={this.state.openForgotPasswordDialog}
                        toggleDialog={this.handleToggleForgotPasswordDialog} />
                    <LoadingDialog
                        openDialog={this.state.showLoading}
                        label={this.state.loadingMessage}
                        />
                </Form>
                }
            </Formik>
        );
    }
}

export default withTranslation()(LoginForm);