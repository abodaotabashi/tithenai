import { Grid, IconButton, TextField, InputAdornment, FormControlLabel, Checkbox, Typography, Autocomplete, Chip } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

const useStyles = makeStyles(theme => ({
    searchBox: {
        margin: "2vh 0",
        fontFamily: "Ubuntu",
        width: "70%",
        [theme.breakpoints.down('md')]: {
            width: "80%",
        },
        [theme.breakpoints.down('sm')]: {
            width: "96%",
        },
    }
}));

const SearchThesisPanel = (props) => {
    const { handleSearchTheses } = props;
    const classes = useStyles();
    const [searchedValue, setSearchedValue] = useState("");
    const [searchByTitle, setSearchByTitle] = useState(true);
    const [searchByAuthor, setSearchByAuthor] = useState(false);
    const [searchByUniversity, setSearchByUniversity] = useState(false);
    const [searchByFaculty, setSearchByFaculty] = useState(false);
    const [searchByLanguage, setSearchByLanguage] = useState(false);
    const [errorIndicator, setErrorIndicator] = useState(false);
    const [searchedTags, setSearchedTags] = useState([]);
    const [tagsList, setTagsList] = useState([]);

    useEffect(() => {
        //TODO: getAllTags from the database
        setTagsList(["Natural Language Processing", "Computer Vision", "Image Inpainting"])
    }, [])

    const handleSearch = () => {
        if( searchByTitle       === false &&
            searchByAuthor      === false &&
            searchByUniversity  === false &&
            searchByFaculty     === false &&
            searchByLanguage    === false &&
            searchedTags.length === 0 ) {
                setErrorIndicator(true);
        } else {
            setErrorIndicator(false);

            let dimensions = [];
            if( searchByTitle === true ) {
                dimensions.push("title");
            }
            if( searchByAuthor === true ) {
                dimensions.push("author");
            }
            if( searchByUniversity === true ) {
                dimensions.push("university");
            }
            if( searchByFaculty === true ) {
                dimensions.push("faculty");
            }
            if( searchByLanguage === true ) {
                dimensions.push("language");
            }

            const requestBody = {
                "query": searchedValue,
                "dimensions": dimensions,
                "tags": searchedTags,
            }

            handleSearchTheses(requestBody);
        }
    }

    return (
        <Grid container alignItems="center" justifyContent="center">
            <Grid item xs={12} sm={12} md={12} lg={12}>
                <TextField
                    color="secondary"
                    label="Search"
                    placeholder='e.g. Artificial Intelligence'
                    type="text"
                    variant="outlined"
                    value={searchedValue}
                    onChange={(event) => setSearchedValue(event.target.value)}
                    className={classes.searchBox}
                    InputLabelProps={{
                        style: {
                            fontFamily: 'Ubuntu'
                        }
                    }}
                    InputProps={{
                        endAdornment: (
                        <InputAdornment position="end">
                            {searchedValue !== "" &&
                                <IconButton
                                    aria-label="search"
                                    onClick={() => setSearchedValue("")}>
                                    <ClearIcon style={{color: "#b5201e"}} />
                                </IconButton>
                            }
                            <IconButton
                                aria-label="search"
                                onClick={() => handleSearch()}
                                >
                                <SearchIcon color="secondary" />
                            </IconButton>
                        </InputAdornment>
                        )
                    }}/>
            </Grid>
            <Grid item container xs={12} sm={12} md={12} lg={12} alignItems="center" justifyContent="center">
                <p style={{fontFamily: "Ubuntu", color: "#b5201e", display: (errorIndicator === true) ? "flex" : "none"}}>You should select at least one option or one tag to search by!</p>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={3}>
                <p style={{fontFamily: "Ubuntu"}}>Search By:</p>
            </Grid>
            <Grid item container xs={12} sm={12} md={8} lg={9} alignItems="center" justifyContent="flex-start" style={{textAlign: "start"}}>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                    <FormControlLabel
                        control={
                        <Checkbox
                            checked={searchByTitle}
                            onChange={(event) => setSearchByTitle(event.target.checked)}
                            name="title"
                            color="secondary"
                        />}
                        label={
                            <Typography variant="subtitle2" component="div" style={{fontFamily: "Ubuntu"}}>
                                Title
                            </Typography>}
                        labelPlacement="end"
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                    <FormControlLabel
                        control={
                        <Checkbox
                            checked={searchByAuthor}
                            onChange={(event) => setSearchByAuthor(event.target.checked)}
                            name="author"
                            color="secondary"
                        />}
                        label={
                            <Typography variant="subtitle2" component="div" style={{fontFamily: "Ubuntu"}}>
                                Author(s)
                            </Typography>}
                        labelPlacement="end"
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                    <FormControlLabel
                        control={
                        <Checkbox
                            checked={searchByUniversity}
                            onChange={(event) => setSearchByUniversity(event.target.checked)}
                            name="university"
                            color="secondary"
                        />}
                        label={
                            <Typography variant="subtitle2" component="div" style={{fontFamily: "Ubuntu"}}>
                                University
                            </Typography>}
                        labelPlacement="end"
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                    <FormControlLabel
                        control={
                        <Checkbox
                            checked={searchByFaculty}
                            onChange={(event) => setSearchByFaculty(event.target.checked)}
                            name="faculty"
                            color="secondary"
                        />}
                        label={
                            <Typography variant="subtitle2" component="div" style={{fontFamily: "Ubuntu"}}>
                                Faculty
                            </Typography>}
                        labelPlacement="end"
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                    <FormControlLabel
                        control={
                        <Checkbox
                            checked={searchByLanguage}
                            onChange={(event) => setSearchByLanguage(event.target.checked)}
                            name="language"
                            color="secondary"
                        />}
                        label={
                            <Typography variant="subtitle2" component="div" style={{fontFamily: "Ubuntu"}}>
                                Language
                            </Typography>}
                        labelPlacement="end"
                    />
                </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={3}>
                <p style={{fontFamily: "Ubuntu"}}>Search By Tags:</p>
            </Grid>
            <Grid item xs={12} sm={12} md={8} lg={9}>
                <Autocomplete
                    multiple
                    filterSelectedOptions
                    defaultValue={searchedTags}
                    isOptionEqualToValue={(option, value) => option === value}
                    options={tagsList.map((option) => option)}
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
                    onChange={(event, value) => {
                        setSearchedTags(value);
                    }}
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
        </Grid>
    )
}

export default SearchThesisPanel