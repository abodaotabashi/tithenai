import React, { Component } from "react";
import { Grid, TextField,  Button, InputAdornment, IconButton, Divider } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import '../assets/styles.css';
import GoogleGif from '../assets/gifs/GoogleLogoOptimized.gif';

class LoginForm extends Component {
    state = {
        showPassword: false,
    }

    handleLogin = (values, props) => {
        //console.log("email : ", values.email)
        //console.log("password : ", values.password)
        //TODO Authenticate the Information of the user
    }

    handleSignInWithGoogle = () => {
        //TODO Authenticate the Information of the user with its google account
    }

    handleGoToForgotPassword = () => {
        this.props.history.push({ pathname: '/forgotPassword' });
    }

    render() {
        const form_validation_schema = Yup.object().shape({
            email: Yup.string()
                    .email("Invalid Email! Please enter a valid E-Mail address!")
                    .required("This Field is required!"),
            password: Yup.string()
                .min(8, 'Your Password must have at least 8 characters!')
                .max(32, 'Your Password must have at most 32 characters!')
                .required("This Field is required!"),
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
                                    label="Your E-Mail Address"
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
                                    required label="Your Password"
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
                                <p className="forwardingSpan" onClick={this.handleOpenForgotPasswordDialog}>Forgot Password?</p>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <Button disabled={Boolean(errors.email) || Boolean(errors.password)} color="secondary" variant="outlined" size="large" type="submit" style={{padding: "1vh 6vw", fontFamily: "Ubuntu"}}>Login</Button>
                            </Grid>
                            <Divider variant="middle" style={{textAlign: "center", width: "60%", padding: "1vh 0", color: "#14325A"}} >Or</Divider>
                            <Grid item container xs={12} sm={12} md={12} lg={12} direction="row" alignItems="center" justifyContent="center">
                                <p style={{fontFamily: "Ubuntu", paddingRight: "3px", color: "#14325A"}}>Sign in with Google</p>
                                <IconButton aria-label="google" size="small" color="secondary" onClick={this.handleSignInWithGoogle}>
                                    <img src={GoogleGif} alt="SigninWithGoogle" style={{width: "42px", borderRadius: "50%", margin: "3px"}}/>
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Form>
                }
            </Formik>
        );
    }
}

export default LoginForm;