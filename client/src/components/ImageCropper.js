import React, { createRef, useState, useEffect } from 'react';
import Cropper from 'cropperjs';
import { Grid, Button } from '@mui/material';

import "cropperjs/dist/cropper.min.css";
import '../assets/styles.css';
import CropIcon from '@mui/icons-material/Crop';

const ImageCropper = (props) => {
    const [imageDestination, setImageDestination] = useState("");
    const imageElement = createRef();

    useEffect(() => {
        const cropper = new Cropper(imageElement.current, {
            aspectRatio: 1,
            background: false,
            crop: () => {
                const canvas = cropper.getCroppedCanvas();
                setImageDestination(canvas.toDataURL("image/jpeg"));
            }
        });
    }, [imageElement])

    const crop = () => {
        props.updateFunction(imageDestination);
        props.setOpenDialog(false)
    }

    return (
        <Grid container alignItems="center" justifyContent="center" direction="row">
            <Grid item xs={9} sm={9} md={9} lg={9}>
                <div style={{display: "inline-block", margin: "auto"}}>
                    <img ref={imageElement} className="cropperContainer" src={props.image} alt="SourceImage"/>
                </div>
            </Grid>
            <Grid container item xs={3} sm={3} md={3} lg={3} className="previewerContainer" direction="column">
                <img className="previewerImage" src={imageDestination} alt="DestinationImage"/>
                <Button
                    variant="contained"
                    style={{margin: "2vh 0", paddingLeft: "2vw", paddingRight: "2vw", fontFamily: "Ubuntu"}}
                    color="secondary"
                    startIcon={<CropIcon />}
                    onClick={crop}>
                    Crop
                </Button>
            </Grid>
        </Grid>
    )
}

export default ImageCropper
