import React, { Component } from 'react'
import {
    Grid,
    TextField,
    Button,
    Autocomplete,
    CircularProgress,
    Chip,
    Tooltip,
    IconButton
} from '@mui/material';
import { createFilterOptions } from '@mui/material/Autocomplete';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { getAllDepartments, getAllTags, getAllUnis } from '../Service';
import { getAllLanguages, sortAlphabetically } from '../utils/HelperFunctions';
import CustomDatePicker from '../components/CustomDatePicker';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import UploadIcon from '@mui/icons-material/Upload';
import { styled } from '@mui/material/styles';
import AddNewTagDialog from '../components/AddNewTagDialog';
import UploadFileContainer from '../components/UploadFileContainer';
import { withTranslation } from 'react-i18next';

const TagsIconButtonContainer = styled(Grid)(({ theme }) => ({
    fontFamily: "Ubuntu",
    display: "flex",
    [theme.breakpoints.down('lg')]: {
        display: "none",
        width: "100%"
    },
    [theme.breakpoints.down('md')]: {
        display: "none",
    },
    [theme.breakpoints.down('sm')]: {
        display: "none",
    },
}));

const TagsLargeButtonContainer = styled(Grid)(({ theme }) => ({
    fontFamily: "Ubuntu",
    display: "none",
    [theme.breakpoints.down('lg')]: {
        display: "flex",
    },
    [theme.breakpoints.down('md')]: {
        display: "flex",
        padding: "1vh 0",
    },
    [theme.breakpoints.down('sm')]: {
        display: "flex",
        padding: "1vh 0",
    },
}));

export default withTranslation()(class UploadThesisForm extends Component {
    state = {
        languages: [],
        tagsList: [],
        universities: [],
        departmentsList: [],
        openAddNewTag: false,
    }

    componentDidMount = async () => {
        getAllUnis()
            .then(response => {
                const sortedData = response.sort(sortAlphabetically("uniName", "tr"))
                this.setState({ universities: sortedData })
            })
            .catch(error => console.log(error));
        getAllTags()
            .then(response => {
                this.setState({ tagsList: response.sort() })
            })
            .catch(error => console.log(error));
        getAllDepartments()
            .then(response => {
                this.setState({ departmentsList: response.sort() })
            })
            .catch(error => console.log(error));
        this.setState({ languages: getAllLanguages() })
    }

    toggleOpenAddNewTag = (status) => {
        this.setState({ openAddNewTag: status })
    }

    handleAddNewTag = async () => {
        getAllTags()
            .then(response => {
                this.setState({ tagsList: response.sort() })
            })
            .catch(error => console.log(error));
    }

    handleSetFile = (fileAsBase64) => {
        console.log(fileAsBase64)
    }

    render() {
        const { t } = this.props;
        const filterOptionsUniversities = createFilterOptions({
            matchFrom: 'start',
            stringify: (option) => option.uniName,
        });

        const filterOptionsLanguages = createFilterOptions({
            matchFrom: 'start',
            stringify: (option) => option.nativeName,
        });

        const filterOptionsDepartments = createFilterOptions({
            matchFrom: 'start',
            stringify: (option) => option,
        });

        const form_validation_schema = Yup.object().shape({
            title: Yup.string()
                .min(4, t('update_thesis.too_short'))
                .required(t('update_thesis.required_field')),
            abstract: Yup.string(),
            language: Yup.object()
                .required(t('update_thesis.required_field')).nullable(),
            thesisType: Yup.string()
                .required(t('update_thesis.required_field')).nullable(),
            university: Yup.object()
                .required(t('update_thesis.required_field')).nullable(),
            fieldOfStudy: Yup.string()
                .required(t('update_thesis.required_field')).nullable(),
            pdfBase64: Yup.string()
                .required(t('update_thesis.required_field')),
            tags: Yup.array(),
            date: Yup.date()
                .required(t('update_thesis.required_field')),
        });

        const initial_form_values = {
            title: "",
            abstract: "",
            university: null,
            fieldOfStudy: "",
            language: null,
            thesisType: "",
            date: new Date(),
            tags: [],
            pdfBase64: "",
        };

        return (
            <Formik
                initialValues={initial_form_values}
                validationSchema={form_validation_schema}
                onSubmit={this.props.handleUploadThesis}>
                {({ values, touched, errors, setFieldValue }) =>
                    <Form>
                        <Grid container alignItems="center" justifyContent="center">
                            <Grid item xs={12} sm={12} md={12} lg={12} style={{ padding: "0 2vw" }} container direction="column">
                                <Field
                                    as={TextField}
                                    name="title"
                                    error={touched.title && Boolean(errors.title)}
                                    color="secondary"
                                    required
                                    label={t('update_thesis.title')}
                                    variant="outlined"
                                    InputLabelProps={{
                                        style: {
                                            fontFamily: 'Ubuntu'
                                        }
                                    }}
                                    style={{ margin: "0.5vh 0" }}
                                    helperText={<ErrorMessage name="title" />} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={4} style={{ padding: "0 2vw" }} container direction="column">
                                <Field
                                    as={Autocomplete}
                                    name="university"
                                    filterOptions={filterOptionsUniversities}
                                    options={this.state.universities}
                                    isOptionEqualToValue={(option, value) => option.uniName === value.uniName}
                                    getOptionLabel={(option) => option.uniName ? option.uniName : ""}
                                    autoComplete
                                    onChange={(e, value) => setFieldValue("university", value)}
                                    renderInput={(params) => (
                                        <TextField {...params}
                                            name="university"
                                            error={touched.university && Boolean(errors.university)}
                                            label={t('update_thesis.university')}
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
                            <Grid item xs={12} sm={12} md={6} lg={4} style={{ padding: "0 2vw" }} container direction="column">
                                <Field
                                    as={Autocomplete}
                                    name="thesisType"
                                    options={[t('update_thesis.undergraduate'), t('update_thesis.master'), t('update_thesis.doctoral'), t('update_thesis.research')]}
                                    isOptionEqualToValue={(option, value) => option === value}
                                    getOptionLabel={(option) => option ? option : ""}
                                    onChange={(e, value) => setFieldValue("thesisType", value)}
                                    renderInput={(params) => (
                                        <TextField {...params}
                                            name="thesisType"
                                            error={touched.thesisType && Boolean(errors.thesisType)}
                                            label={t('update_thesis.type')}
                                            variant="outlined"
                                            color="secondary"
                                            required
                                            style={{ margin: "0.5vh 0" }}
                                            InputLabelProps={{
                                                style: {
                                                    fontFamily: 'Ubuntu'
                                                }
                                            }}
                                            helperText={<ErrorMessage name="thesisType" />}
                                            InputProps={{
                                                ...params.InputProps,
                                                endAdornment: (
                                                    <React.Fragment>
                                                        {this.state.languages.length === 0 ? <CircularProgress color="inherit" size={20} /> : null}
                                                        {params.InputProps.endAdornment}
                                                    </React.Fragment>
                                                ),
                                            }} />
                                    )}
                                    />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={4} style={{ padding: "0 2vw" }} container direction="column">
                                <Field
                                    as={Autocomplete}
                                    name="language"
                                    filterOptions={filterOptionsLanguages}
                                    options={this.state.languages}
                                    isOptionEqualToValue={(option, value) => option.code === value.code}
                                    getOptionLabel={(option) => option.nativeName ? option.nativeName : ""}
                                    autoComplete
                                    onChange={(e, value) => setFieldValue("language", value)}
                                    renderInput={(params) => (
                                        <TextField {...params}
                                            name="language"
                                            error={touched.language && Boolean(errors.language)}
                                            label={t('update_thesis.language')}
                                            variant="outlined"
                                            color="secondary"
                                            required
                                            style={{ margin: "0.5vh 0" }}
                                            InputLabelProps={{
                                                style: {
                                                    fontFamily: 'Ubuntu'
                                                }
                                            }}
                                            helperText={<ErrorMessage name="language" />}
                                            InputProps={{
                                                ...params.InputProps,
                                                endAdornment: (
                                                    <React.Fragment>
                                                        {this.state.languages.length === 0 ? <CircularProgress color="inherit" size={20} /> : null}
                                                        {params.InputProps.endAdornment}
                                                    </React.Fragment>
                                                ),
                                            }} />
                                    )}
                                    />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6} style={{ padding: "0 2vw" }} container direction="column">
                            <Field
                                    as={Autocomplete}
                                    name="fieldOfStudy"
                                    filterOptions={filterOptionsDepartments}
                                    options={this.state.departmentsList}
                                    isOptionEqualToValue={(option, value) => option === value}
                                    getOptionLabel={(option) => option ? option : ""}
                                    autoComplete
                                    onChange={(e, value) => setFieldValue("fieldOfStudy", value)}
                                    renderInput={(params) => (
                                        <TextField {...params}
                                            name="fieldOfStudy"
                                            error={touched.fieldOfStudy && Boolean(errors.fieldOfStudy)}
                                            label={t('update_thesis.field')}
                                            variant="outlined"
                                            color="secondary"
                                            required
                                            style={{ margin: "0.5vh 0" }}
                                            InputLabelProps={{
                                                style: {
                                                    fontFamily: 'Ubuntu'
                                                }
                                            }}
                                            helperText={<ErrorMessage name="fieldOfStudy" />}
                                            InputProps={{
                                                ...params.InputProps,
                                                endAdornment: (
                                                    <React.Fragment>
                                                        {this.state.departmentsList.length === 0 ? <CircularProgress color="inherit" size={20} /> : null}
                                                        {params.InputProps.endAdornment}
                                                    </React.Fragment>
                                                ),
                                            }} />
                                    )}
                                    />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6} style={{ padding: "0 2vw" }} container direction="column" justifyContent="flex-start">
                                <Field
                                    as={CustomDatePicker}
                                    name="date"
                                    error={touched.date && Boolean(errors.date)}
                                    color="secondary"
                                    onChange={(value) => {
                                        setFieldValue("date", value)
                                    }}
                                    format={"dd/MM/yyyy"}
                                    max={new Date()}
                                    isRequired={true}
                                    label={t('update_thesis.date')}
                                    variant="outlined"
                                    InputLabelProps={{
                                        style: {
                                            fontFamily: 'Ubuntu'
                                        }
                                    }}
                                    style={{ margin: "0.5vh 0" }}
                                    helperText={<ErrorMessage name="date" />}
                                    />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} style={{ padding: "0 2vw" }} container direction="column" justifyContent="flex-start">
                                <Field
                                    as={TextField}
                                    name="abstract"
                                    error={touched.abstract && Boolean(errors.abstract)}
                                    color="secondary"
                                    multiline
                                    maxRows={3}
                                    label={t('update_thesis.abstract')}
                                    variant="outlined"
                                    InputLabelProps={{
                                        style: {
                                            fontFamily: 'Ubuntu'
                                        }
                                    }}
                                    style={{ margin: "0.5vh 0" }}
                                    helperText={<ErrorMessage name="abstract" />} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={9} lg={11} style={{ padding: "0 2vw" }} container direction="column" justifyContent="flex-start">
                                <Field
                                    as={Autocomplete}
                                    name="tags"
                                    multiple
                                    filterSelectedOptions
                                    isOptionEqualToValue={(option, value) => option === value}
                                    options={this.state.tagsList.map((option) => option)}
                                    disableCloseOnSelect
                                    color="primary"
                                    getOptionLabel={(option) => {
                                        if (typeof option === 'string') {
                                            return option;
                                        }
                                        if (option.inputValue) {
                                            return option.inputValue;
                                        }
                                        return option;
                                    }}
                                    onChange={(event, value) => setFieldValue("tags", value )}
                                    renderTags={(value, getTagProps) =>
                                        value.map((option, index) => (
                                            <Chip
                                                label={option}
                                                {...getTagProps({ index })} />
                                        ))
                                    }
                                    renderInput={(params) => (
                                        <TextField {...params} variant="outlined" color="secondary" label="Tags" style={{margin: "0.5vh 0", fontFamily: "Ubuntu"}}/>
                                    )}/>
                            </Grid>
                            <Grid item xs={12} sm={12} md={3} lg={1} container alignItems="center" justifyContent="center">
                                <TagsIconButtonContainer item>
                                    <Tooltip title={t('update_thesis.add_tag')} placement="bottom" arrow leaveDelay={100}>
                                        <IconButton color="secondary" onClick={() => this.toggleOpenAddNewTag(true)}>
                                            <AddCircleOutlineIcon fontSize='large'/>
                                        </IconButton>
                                    </Tooltip>
                                </TagsIconButtonContainer>
                                <TagsLargeButtonContainer item>
                                    <Button
                                        color="secondary"
                                        variant="outlined"
                                        size="large"
                                        startIcon={<AddCircleOutlineIcon fontSize='large' />}
                                        style={{ fontFamily: "Ubuntu" }}
                                        onClick={() => this.toggleOpenAddNewTag(true)}>
                                        {t('update_thesis.add_tag')}
                                    </Button>
                                </TagsLargeButtonContainer>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} container alignItems="center" justifyContent="center">
                                <UploadFileContainer handleSetFile={setFieldValue}/>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} style={{paddingBottom: "3vh"}}>
                                <Button
                                    disabled={Boolean(errors.date) || Boolean(errors.pdfBase64) || Boolean(errors.fieldOfStudy) || Boolean(errors.university) || Boolean(errors.title) || Boolean(errors.abstract)}
                                    color="secondary"
                                    variant="contained"
                                    size="large"
                                    type="submit"
                                    style={{ padding: "1vh 6vw", fontFamily: "Ubuntu", marginTop: "0.5rem" }}
                                    startIcon={<UploadIcon fontSize='large' />}>
                                    {t('update_thesis.upload')}
                                </Button>
                            </Grid>
                        </Grid>
                        <AddNewTagDialog
                            openDialog={this.state.openAddNewTag}
                            setOpenDialog={this.toggleOpenAddNewTag}
                            addNewTagFunction={this.handleAddNewTag}
                            tags={this.state.tagsList}
                            />
                    </Form>
                }
            </Formik>
        )
    }
})
