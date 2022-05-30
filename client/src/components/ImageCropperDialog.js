import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, IconButton, Divider } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ImageCropper from './ImageCropper';
import {useTranslation} from "react-i18next";
import '../assets/styles.css';
import CloseIcon from '@mui/icons-material/Close';

const useStyles = makeStyles(theme => ({
    dialogWrapper: {
        position: 'absolute',
        top: theme.spacing(0),
        paddingBottom: theme.spacing(4),
    }
}));

const ImageCropDialog = (props) => {
    const {t} = useTranslation();
    const { openDialog, setOpenDialog, image, updateFunction } = props;
    const classes = useStyles();

    return (
        <Dialog open={openDialog} maxWidth="lg" fullWidth classes={{ paper: classes.dialogWrapper }}>
            <DialogTitle>
                <div className="dialogTitle">
                    <Typography variant="h6" component="div" style={{flexGrow:1, fontFamily: "Ubuntu-Light", fontWeight: "bold"}}>
                        {t('dialogs.upload_photo')}
                    </Typography>
                    <IconButton style={{color: "#b5201e", backgroundColor: "rgba(181, 32, 30, 0.05)"}} onClick={() => setOpenDialog(false)}>
                        <CloseIcon style={{color: "#b5201e"}} />
                    </IconButton>
                </div>
            </DialogTitle>
            <Divider />
            <DialogContent>
                <ImageCropper image={image} updateFunction={updateFunction} setOpenDialog={setOpenDialog} className="dialogRowContainer"/>
            </DialogContent>
        </Dialog>
    )
}

export default ImageCropDialog
