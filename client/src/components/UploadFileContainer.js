import { Grid, Box, Typography, Button } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { styled } from '@mui/material/styles';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { stringifyByteSize } from '../utils/HelperFunctions';

const DragNDropPaper = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    borderWidth: "2px",
    borderRadius: "10px",
    borderColor: theme.palette.secondary.main,
    borderStyle: "dashed",
    outline: "none",
}));

const UploadFileContainer = (props) => {
    const [file, setFile] = useState([]);
    const [errors, setErrors] = useState(null);

    const deleteFile = () => {
        setFile([]);
        setErrors(null);
    }

    const readAsBase64 = (files) => {
        const fileToLoad = files[0];
        const fileReader = new FileReader();
        fileReader.onload = (event) => {
            props.handleSetFile("pdfBase64", event.target.result);
        };
        fileReader.readAsDataURL(fileToLoad);
    }

    const onDrop = useCallback((acceptedFiles, fileRejections) => {
        setFile(acceptedFiles);
        if (typeof(acceptedFiles[0]) !== "undefined") {
            readAsBase64(acceptedFiles);
        }
        if (typeof(fileRejections[0]) !== "undefined") {
            setErrors(fileRejections[0].errors);
        }
    }, [])

    const {getRootProps, getInputProps} = useDropzone({
        maxFiles: 1,
        maxSize: 64 * 1024 * 1024, //64MB
        accept: {
            'application/pdf': ['.pdf']
        },
        onDrop
    })

    return (
        <Grid item style={{width: "80%", padding: "2vh 0"}}>
            <DragNDropPaper {...getRootProps()}>
                { file.length === 0 &&
                <>
                    <input {...getInputProps()} />
                    <UploadFileIcon color="secondary" fontSize='large'/>
                    <Typography variant="body1" component="div" style={{padding: "1rem", fontFamily: "Ubuntu-Light", fontWeight: "bold"}}>
                        Drag and drop your thesis document, or click here to select it (Max. Size: 64 Megabyte)
                    </Typography>
                    { (errors !== null) ? errors.map((error) => (
                        <div key={error.code}>
                            <Typography color="error" style={{fontFamily: "Ubuntu-Light", fontWeight: "bold"}}>
                                {error.message}
                            </Typography>
                        </div>))
                        : null
                    }
                </>
                }
                { file.length > 0 &&
                    <Grid container alignItems="center">
                        <Grid item xs={12} sm={12} md={9} lg={9} style={{textAlign: "start"}}>
                            <Typography variant="body1" component="div" style={{padding: "1rem", fontFamily: "Ubuntu-Light", fontWeight: "bold"}}>
                                {file[0].name} {"(" + stringifyByteSize(file[0].size) + ")"}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} lg={3}>
                            <Button
                                color="error"
                                variant="contained"
                                size="large"
                                onClick={deleteFile}
                                style={{ padding: "1vh 3vw", fontFamily: "Ubuntu", marginTop: "0.5rem" }}
                                startIcon={<DeleteForeverIcon fontSize='large' />}>Delete</Button>
                        </Grid>
                    </Grid>
                }
            </DragNDropPaper>
        </Grid>
    )
}

export default UploadFileContainer