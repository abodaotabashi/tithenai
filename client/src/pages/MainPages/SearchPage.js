import React from 'react';
import { CssBaseline, Paper } from '@mui/material';
import NavbarWithUser from '../../components/NavbarWithUser';
import Footer from '../../components/Footer';

import '../../assets/styles.css';


const SearchPage = () => {
    return (
        <div className="whitePageContainer">
            <NavbarWithUser />
            <div style={{padding: "20px", marginTop: "10px", display: "flex", justifyContent: "center"}}>
                <Paper style={{width: "80%", padding: "50px"}}>
                    Search Page
                </Paper>
            </div>
            <Footer />
            <CssBaseline />
        </div>
    )
}

export default SearchPage;