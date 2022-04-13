import React from 'react';
import { makeStyles } from '@mui/styles';
import { Dialog, DialogTitle, DialogContent, Typography, IconButton, Divider } from '@mui/material';

import '../assets/styles.css';
import CloseIcon from '@mui/icons-material/Close';

const useStyles = makeStyles(theme => ({
    dialogWrapper: {
        position: 'absolute',
        top: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    }
}));

const ImageViewDialog = (props) => {
    const { openDialog, setOpenDialog, image } = props;
    const classes = useStyles();

    return (
        <Dialog open={openDialog} maxWidth="md" fullWidth classes={{ paper: classes.dialogWrapper }}>
            <DialogTitle>
                <div className="dialogTitle">
                    <Typography variant="h6" component="div" style={{flexGrow:1, fontFamily: "Ubuntu-Light", fontWeight: "bold"}}>
                        View Profile Photo
                    </Typography>
                    <IconButton style={{color: "#b5201e", backgroundColor: "rgba(181, 32, 30, 0.05)"}} onClick={() => setOpenDialog(false)}>
                        <CloseIcon style={{color: "#b5201e"}} />
                    </IconButton>
                </div>
            </DialogTitle>
            <Divider />
            <DialogContent>
                <div className="dialogRowContainer">
                    <img src={image} style={{maxHeight: "70vh", borderRadius: "10px", border: "1px solid black"}} alt="Profile_Photo" />
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ImageViewDialog
