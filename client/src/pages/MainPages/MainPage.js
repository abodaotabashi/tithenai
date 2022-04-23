import React, { useState, useEffect, useContext } from 'react';
import { CircularProgress } from '@mui/material';
import { AuthContext } from '../../utils/Context';

import LandingPage from './LandingPage';
import SearchPage from './SearchPage';

import '../../assets/styles.css';

const MainPage = () => {
    const { userAuth } = useContext(AuthContext);
    const [ userAuthStatus, setUserAuthStatus ] = useState(1);

    useEffect(() => {
        if(typeof(userAuth) !== "undefined") {
            if(userAuth) {
                setUserAuthStatus(2);
            } else {
                setUserAuthStatus(3);
            }
        }
    }, [userAuth])

    return(
        <>
            {userAuthStatus === 1 &&
                <div className="whitePageContainer">
                    <div style={{ width: "100%", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <CircularProgress style={{color: "#0A481C"}} fullwidth="true" />
                    </div>
                </div>
            }
            {userAuthStatus === 2 &&
                <SearchPage />
            }
            {userAuthStatus === 3 &&
                <LandingPage />
            }
        </>
    );
}

export default MainPage;
