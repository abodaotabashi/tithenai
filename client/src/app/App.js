import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import MyProfilePage from '../pages/MyProfilePage';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {}
    }

    render() {
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

        return (
            <ThemeProvider theme={theme}>
                <div className="appMain">
                    <Router>
                        <Routes>
                            <Route path='/login' exact element={<LoginPage/>} />
                            <Route path='/register' exact element={<RegisterPage/>}/>
                            <Route path='/myProfile' exact element={<MyProfilePage/>} />
                            {/*
                            <Route path='/' exact element={<LandingPage/>}/>
                            */}
                        </Routes>
                    </Router>
                    <CssBaseline />
                </div>
            </ThemeProvider>
        )
    }
}

export default App;