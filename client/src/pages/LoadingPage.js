import React from 'react';
import { CircularProgress } from '@mui/material';
import '../assets/styles.css';

const LoadingPage = () => {
    return (
        <div className="whitePageContainer">
            <div style={{ width: "100%", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center"}}>
                <CircularProgress style={{color: "#0A481C"}} fullwidth="true" />
            </div>
        </div>
    )
}

export default LoadingPage;