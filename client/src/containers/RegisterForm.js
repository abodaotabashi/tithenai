import React, { Component } from 'react';
import {
    Grid,
    TextField,
    Button,
    InputAdornment,
    IconButton,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Checkbox,
    Typography,
    FormHelperText,
    Autocomplete,
    CircularProgress
} from '@mui/material';
import { createFilterOptions } from '@mui/material/Autocomplete';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import LoadingDialog from "../components/LoadingDialog";
import { withTranslation } from 'react-i18next';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import '../assets/styles.css';
import { sortAlphabetically } from '../utils/HelperFunctions';
import { signUpWithEmail } from '../auth/auth';
import { getAllUnis } from '../Service';

class RegisterForm extends Component {
    state = {
        showPassword: false,
        universities: [],
        showLoading: false,
    }

    componentDidMount = async () => {
        getAllUnis()
            .then(response => {
                const sortedData = response.sort(sortAlphabetically("uniName", "tr"))
                this.setState({ universities: sortedData })
            })
            .catch(error => console.log(error));
    }

    handleRegister = (values, props) => {
        this.setState({
            showLoading: true
        });
        signUpWithEmail(values)
            .then((result) => {
                console.log(result);
                this.setState({
                    showLoading: false
                });
                this.props.redirectToLoginPage();
            }).catch(error => {
                console.log(error)
                this.setState({
                    showLoading: false
                });
            })
    }

    render() {
        const { t } = this.props;
        const filterOptions = createFilterOptions({
            matchFrom: 'start',
            stringify: (option) => option.uniName,
        });
        const form_validation_schema = Yup.object().shape({
            firstname: Yup.string()
                .min(2, t('register.too_short'))
                .required(t('register.required_field')),
            lastname: Yup.string()
                .min(2, t('register.too_short'))
                .required(t('register.required_field')),
            status: Yup.string()
                .required(t('register.required_field')),
            university: Yup.object()
                .required(t('register.required_field')).nullable(),
            email: Yup.string()
                .email(t('register.invalid_email'))
                .required(t('register.required_field')),
            password: Yup.string()
                .min(8, t('register.your_pass'))
                .max(32, t('register.your_pass_t'))
                .required(t('register.required_field')),
            gender: Yup.string().oneOf([t('register.male'), t('register.female'), t('register.other')], t('register.required_field')),
            termsAndConditions: Yup.string().oneOf(["true"], t('register.accept')),
        });

        const initial_form_values = {
            firstname: "",
            lastname: "",
            university: null,
            status: "",
            email: "",
            password: "",
            gender: "",
            termsAndConditions: false,
        };

        return (
            <Formik
                initialValues={initial_form_values}
                validationSchema={form_validation_schema}
                onSubmit={this.handleRegister}>
                {({ values, touched, errors, setFieldValue }) =>
                    <Form>
                        <Grid container alignItems="center" justifyContent="center">
                            <Grid item xs={12} sm={12} md={6} lg={6} style={{ padding: "0 2vw" }} container direction="column">
                                <Field
                                    as={TextField}
                                    name="firstname"
                                    error={touched.firstname && Boolean(errors.firstname)}
                                    color="secondary"
                                    required
                                    label={t('register.your_firstname')}
                                    variant="outlined"
                                    InputLabelProps={{
                                        style: {
                                            fontFamily: 'Ubuntu'
                                        }
                                    }}
                                    style={{ margin: "0.5vh 0" }}
                                    helperText={<ErrorMessage name="firstname" />} />
                                <Field
                                    as={TextField}
                                    name="lastname"
                                    error={touched.lastname && Boolean(errors.lastname)}
                                    color="secondary"
                                    required
                                    label={t('register.your_lastname')}
                                    variant="outlined"
                                    InputLabelProps={{
                                        style: {
                                            fontFamily: 'Ubuntu'
                                        }
                                    }}
                                    style={{ margin: "0.5vh 0" }}
                                    helperText={<ErrorMessage name="lastname" />} />
                                <Field
                                    as={TextField}
                                    name="email"
                                    error={touched.email && Boolean(errors.email)}
                                    color="secondary"
                                    required
                                    label={t('register.your_email')}
                                    variant="outlined"
                                    InputLabelProps={{
                                        style: {
                                            fontFamily: 'Ubuntu'
                                        }
                                    }}
                                    style={{ margin: "0.5vh 0" }}
                                    helperText={<ErrorMessage name="email" />} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6} style={{ padding: "0 2vw" }} container direction="column" justifyContent="flex-start">
                                <Field
                                    as={TextField}
                                    name="password"
                                    error={touched.password && Boolean(errors.password)}
                                    color="secondary"
                                    required label={t('register.your_password')}
                                    type={this.state.showPassword ? "text" : "password"}
                                    variant="outlined"
                                    style={{ margin: "0.5vh 0", fontFamily: "Ubuntu" }}
                                    helperText={<ErrorMessage name="password" />}
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
                                                    onClick={() => this.setState((prevState) => ({ showPassword: !prevState.showPassword }))}>
                                                    {!this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }} />
                                <Field
                                    as={Autocomplete}
                                    data-testid="autocomplete-status"
                                    name="status"
                                    options={[t('register.undergraduate'), t('register.master'), t('register.doctoral')]}
                                    getOptionLabel={(option) => option}
                                    autoComplete
                                    includeInputInList
                                    onChange={(e, value) => setFieldValue("status", value !== null ? value : initial_form_values.status)}
                                    isOptionEqualToValue={(option, value) => option === value}
                                    renderInput={(params) => (
                                        <TextField {...params}
                                            name="status"
                                            error={touched.status && Boolean(errors.status)}
                                            label={t('register.academic_status')}
                                            variant="outlined"
                                            color="secondary"
                                            required
                                            style={{ margin: "0.5vh 0" }}
                                            InputLabelProps={{
                                                style: {
                                                    fontFamily: 'Ubuntu'
                                                }
                                            }}
                                            helperText={<ErrorMessage name="status" />} />
                                    )}
                                />
                                <Field
                                    as={Autocomplete}
                                    name="university"
                                    data-testid="autocomplete-uni"
                                    filterOptions={filterOptions}
                                    options={this.state.universities}
                                    getOptionLabel={(option) => option.uniName ? option.uniName : ""}
                                    autoComplete
                                    isOptionEqualToValue={(option, value) => option.uniName === value.uniName}
                                    onChange={(e, value) => setFieldValue("university", value)}
                                    renderInput={(params) => (
                                        <TextField {...params}
                                            name="university"
                                            error={touched.university && Boolean(errors.university)}
                                            label={t('register.university')}
                                            variant="outlined"
                                            color="secondary"
                                            required
                                            style={{ margin: "0.5vh 0" }}
                                            InputLabelProps={{
                                                style: {
                                                    fontFamily: 'Ubuntu'
                                                }
                                            }}
                                            helperText={<ErrorMessage name="university" />}
                                            InputProps={{
                                                ...params.InputProps,
                                                endAdornment: (
                                                    <React.Fragment>
                                                        {this.state.universities.length === 0 ? <CircularProgress color="inherit" size={20} /> : null}
                                                        {params.InputProps.endAdornment}
                                                    </React.Fragment>
                                                ),
                                            }} />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6} style={{ padding: "0 2vw" }} container direction="column" justifyContent="flex-start">
                                <FormControl style={{ margin: "1vh 0" }}>
                                    <FormLabel color="secondary" style={{ textAlign: "left" }}>{t('register.gender')}</FormLabel>
                                    <Field
                                        as={RadioGroup} row name="gender">
                                        <FormControlLabel value="female" control={<Radio color="secondary" required={true} />} label={t('register.female')} />
                                        <FormControlLabel value="male" control={<Radio color="secondary" required={true} />} label={t('register.male')} />
                                        <FormControlLabel value="other" control={<Radio color="secondary" required={true} />} label={t('Prefer not to say')} />
                                    </Field>
                                    <FormHelperText style={Boolean(errors.gender) === true ? { display: "flex", color: "red" } : { display: "none" }}><ErrorMessage name="gender" /></FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6} style={{ padding: "0 2vw" }} container direction="column" justifyContent="flex-start">
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} style={{ padding: "0 2vw", textAlign: "start" }}>
                                <FormControlLabel
                                    control={
                                        <Field
                                            as={Checkbox}
                                            name="termsAndConditions"
                                            color="secondary"
                                            style={{ fontFamily: "Ubuntu" }} />
                                    }
                                    label={
                                        <Typography variant="subtitle2" component="div" style={{ fontFamily: "Ubuntu" }}>
                                            {t('register.agreement')}
                                        </Typography>}
                                    labelPlacement="end"
                                />
                                <FormHelperText style={values.termsAndConditions !== true ? { display: "flex", color: "red" } : { display: "none" }}><ErrorMessage name="termsAndConditions" /></FormHelperText>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <Button disabled={Boolean(errors.email) || Boolean(errors.password) || Boolean(errors.university) || Boolean(errors.status) || Boolean(errors.firstname) || Boolean(errors.lastname) || Boolean(errors.gender) || Boolean(errors.termsAndConditions)}
                                    data-testid="register-button"
                                    color="secondary"
                                    variant="outlined"
                                    size="large"
                                    type="submit"
                                    style={{ padding: "1vh 6vw", fontFamily: "Ubuntu", marginTop: "0.5rem" }}>
                                    {t('register.register')}
                                </Button>
                            </Grid>
                        </Grid>
                        <LoadingDialog
                            openDialog={this.state.showLoading}
                            label={t('register.creating')}
                        />
                    </Form>
                }
            </Formik>
        )
    }
}

export default withTranslation()(RegisterForm);
