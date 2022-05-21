import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Grid, Typography, IconButton, Button } from '@mui/material';

import '../assets/styles.css';
import CloseIcon from '@mui/icons-material/Close';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme => ({
    dialogWrapper: {
        position: 'absolute',
        top: theme.spacing(2),
        [theme.breakpoints.down('md')]: {
            top: theme.spacing(1)
        },
    }
}));


const WarningDialog = (props) => {
    const {title, content, contentSpan, openWarningDialog, setCloseWarningDialog, yes, no, yesFunction, noFunction} = props;
    const classes = useStyles();

    let spanDiv = null;
    if(typeof(contentSpan) !== 'undefined' && contentSpan !== null){
        spanDiv = (
            <Typography variant="subtitle1" component="div" style={{fontFamily: "Ubuntu", textAlign: "justify", textJustify: "inter-word", fontWeight: "lighter", paddingBottom: "1vh", paddingLeft: "1vw"}}>
                {contentSpan}
            </Typography>);
    }

    return (
        <Dialog open={openWarningDialog} maxWidth="md" fullWidth classes={{ paper: classes.dialogWrapper }}>
            <DialogTitle>
                <div className="dialogTitle">
                    <Typography variant="h6" component="div" style={{flexGrow:1, fontFamily: "Ubuntu", fontWeight: "700"}}>
                        {title}
                    </Typography>
                    <IconButton color="error" onClick={() => setCloseWarningDialog(false)}>
                        <CloseIcon color="error"/>
                    </IconButton>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                <Grid Grid container alignItems="center"  style={{fontFamily: "Ubuntu"}}>
                    <Grid item container xs={12} sm={12} md={1} lg={1} alignItems="center" justifyContent="center">
                        <HighlightOffIcon color="error" style={{ fontSize: 82 }} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={11} lg={11} >
                        <Typography variant="h6" component="div" style={{fontFamily: "Ubuntu", textAlign: "justify", textJustify: "inter-word", fontWeight: "lighter", paddingBottom: "1vh", paddingLeft: "1vw"}}>
                            {content}
                        </Typography>
                        {spanDiv}
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" color="error" style={{margin: "1vh 1rem", fontFamily: "Ubuntu"}} onClick={noFunction}>{no}</Button>
                <Button variant="contained" color="error" style={{margin: "1vh 1rem", fontFamily: "Ubuntu"}} onClick={yesFunction}>{yes}</Button>
            </DialogActions>
        </Dialog>
    )
}

export default WarningDialog;