import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../utils/Context';

import LandingPage from './LandingPage';
import SearchPage from './SearchPage';
import LoadingPage from '../LoadingPage';

import '../../assets/styles.css';

const MainPage = () => {
    const { userAuth } = useContext(AuthContext);
    const [userAuthStatus, setUserAuthStatus] = useState(1);

    useEffect(() => {
        if (typeof (userAuth) !== "undefined") {
            if (userAuth) {
                setUserAuthStatus(2);
            } else {
                setUserAuthStatus(3);
            }
        }
    }, [userAuth])

    return (
        <>
            {userAuthStatus === 1 &&
                <LoadingPage />
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
