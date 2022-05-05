import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import MyProfilePage from '../pages/MyProfilePage';
import MainPage from '../pages/MainPages/MainPage';

import { AuthContext } from '../utils/Context'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import SearchResultsPage from '../pages/SearchResultsPage';
import NotFoundPage from '../pages/NotFoundPage';
import MyPapersPage from '../pages/MyPapersPage';

const App = () => {
    const theme = createTheme({
        components: {
            MuiOutlinedInput: {
                styleOverrides: {
                    notchedOutline: {
                        fontFamily: 'Ubuntu'
                    },
                    '&::placeholder': {
                        fontFamily: 'Ubuntu'
                    }
                }
            },
            MuiInputLabel: {
                styleOverrides: {
                    outlined: {
                        '&.MuiInputLabel-shrink': {
                            fontFamily: 'Ubuntu'
                        },
                    }
                }
            },
            typography: {
                styleOverrides: {
                    root: {
                        fontFamily: 'Ubuntu'
                    },
                },
            }
        },
        palette: {
            primary: {
                lighter: "#A5F3BC",
                light: "#4BE77A",
                main: "#1BC54B",
                dark: "#0A481C",
                darker: "#00290F",
                contrastText: "#000000"
            },
            secondary: {
                lighter: "#8996AB",
                light: "#3E5374",
                main: "#14325A",
                dark: "#062144",
                darker: "#03122D",
                contrastText: "#ffffff"
            }
        },
        direction: 'ltr',
    });

    const [userAuth, setUserAuth] = useState()

    const checkLoggedInUser = () => {
        const auth = getAuth(); 
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserAuth(user);
            } else {
                setUserAuth(null);
            }
        });
    };

    useEffect(() => {
        checkLoggedInUser();
    });

    return (
        <AuthContext.Provider value={{ userAuth: userAuth, setUserAuth: setUserAuth }}>
            <ThemeProvider theme={theme}>
                <div className="appMain">
                    <Router>
                        <Routes>
                            <Route path='/login' element={<LoginPage />} />
                            <Route path='/register' element={<RegisterPage />} />
                            <Route path='/myProfile' element={<MyProfilePage />} />
                            <Route path='/' element={<MainPage />} />
                            <Route path='/searchResults' element={<SearchResultsPage />} />
                            <Route path='/myPapers' element={<MyPapersPage />} />
                            <Route path="*" element={<NotFoundPage />} />
                        </Routes>
                    </Router>
                    <CssBaseline />
                </div>
            </ThemeProvider>
        </AuthContext.Provider>
    )
}

export default App;