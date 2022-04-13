import React from 'react'
import { Dialog, DialogContent, Grid, Typography } from '@mui/material';
import CircularProgresser from './CircularProgresser';

const LoadingDialog = (props) => {
    const { openDialog, label } = props;

    return (
        <Dialog open={openDialog} maxWidth="sm" fullWidth >
            <DialogContent dividers>
                <Grid container alignItems="center">
                    <Grid item xs={12} sm={12} md={12} lg={12} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <CircularProgresser />
                    </Grid>
                    {label !== null && typeof(label) !== "undefined" && label !== "" ?
                    <>
                        <Grid item xs={12} sm={12} md={12} lg={12}><br/></Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Typography variant="h6" component="div" style={{fontFamily: "Ubuntu-light", textAlign: "center", fontWeight: "bold"}}>
                                {label}
                            </Typography>
                        </Grid>
                    </>
                    :
                    null}
                </Grid>
            </DialogContent>
        </Dialog>
    )
}

export default LoadingDialog;