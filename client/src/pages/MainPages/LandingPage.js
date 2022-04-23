import React from 'react';
import { CssBaseline, Paper } from '@mui/material';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

import '../../assets/styles.css';

const LandingPage = () => {
    return (
        <div className="loginPageContainer">
            <Navbar />
            <div style={{padding: "20px", marginTop: "10px", display: "flex", justifyContent: "center"}}>
                <Paper style={{width: "80%", padding: "50px"}}>
                    Landing Page
                </Paper>
            </div>
            <Footer />
            <CssBaseline />
        </div>
    )
}

export default LandingPage;