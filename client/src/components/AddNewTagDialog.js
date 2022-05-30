import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Dialog, DialogTitle, DialogContent, Typography, IconButton, Divider, Button, Grid, TextField } from '@mui/material';
import {useTranslation} from "react-i18next";
import '../assets/styles.css';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { formatName } from '../utils/HelperFunctions';
import { addNewTag } from '../Service';

const useStyles = makeStyles(theme => ({
    dialogWrapper: {
        position: 'absolute',
        top: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    }
}));

const AddNewTagDialog = (props) => {
    const {t} = useTranslation();
    const { openDialog, setOpenDialog, addNewTagFunction, tags } = props;
    const classes = useStyles();
    const [tag, setTag] = useState("");
    const [tagError, setTagError] = useState(false);
    const [tagErrorMessage, setTagErrorMessage] = useState("");

    const handleAddNewTag = () => {
        setTag(formatName(tag.trim()))
        if (formatName(tag.trim()) !== "") {
            if (tags.includes(formatName(tag.trim()))) {
                setTagError(true);
                setTagErrorMessage(t('dialogs.tag_exists'));
            } else {
                setTagError(false);
                setTagErrorMessage("");
                addNewTag(formatName(tag.trim()))
                    .then(() => {
                        setOpenDialog(false);
                        addNewTagFunction();
                        setTag("");
                    })
                    .catch((error) => console.log(error));
            }
        } else {
            setTagError(true);
            setTagErrorMessage(t('dialogs.required_field'));
        }
    }

    return (
        <Dialog open={openDialog} maxWidth="md" fullWidth classes={{ paper: classes.dialogWrapper }}>
            <DialogTitle>
                <div className="dialogTitle">
                    <Typography variant="h6" component="div" style={{flexGrow:1, fontFamily: "Ubuntu-Light", fontWeight: "bold"}}>
                        {t('dialogs.add_tag')}
                    </Typography>
                    <IconButton style={{color: "#b5201e", backgroundColor: "rgba(181, 32, 30, 0.05)"}} onClick={() => setOpenDialog(false)}>
                        <CloseIcon style={{color: "#b5201e"}} />
                    </IconButton>
                </div>
            </DialogTitle>
            <Divider />
            <DialogContent>
                <Grid container alignItems="center" justifyContent="center">
                    <Grid item xs={12} sm={12} md={12} lg={12} container alignItems="center" justifyContent="center">
                        <TextField
                            error={tagError}
                            color="secondary"
                            label={t('dialogs.new_tag')}
                            value={tag}
                            required
                            type="text"
                            onChange={(event) => setTag(event.target.value)}
                            variant="outlined"
                            InputLabelProps={{
                                style: {
                                    fontFamily: 'Ubuntu',
                                }
                            }}
                            style={{ width: "90%", margin: "0.5vh 0" }}
                            helperText={tagErrorMessage} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} container alignItems="center" justifyContent="center">
                        <Button
                            color="secondary"
                            variant="outlined"
                            size="large"
                            startIcon={<AddCircleOutlineIcon fontSize='large' />}
                            style={{ padding: "1vh 4vw", fontFamily: "Ubuntu", marginTop: "1rem" }}
                            onClick={handleAddNewTag}>
                            {t('dialogs.add_tag')}
                        </Button>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    )
}

export default AddNewTagDialog