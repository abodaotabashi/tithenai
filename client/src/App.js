import "./App.css";
import {
    getAuth,
    onAuthStateChanged,
} from "firebase/auth";
import { useEffect, useState } from "react";
import React from 'react';
import { useFormik } from 'formik';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Divider from '@mui/material/Divider';
import {
    signUpWithEmail,
    signInWithEmail,
    // signUpWithGoogle,
    // signInWithGoogle,
    appSignOut,
    forgetPassword,
} from "./auth/auth";


function App() {
    const [isAuth, setIsAuth] = useState();

    const userData = {
        academicStatus: "student",
        admin: false,
        firstName: "Leo Messi",
        lastName: "Messi",
        gender: "Male"
    }

    useEffect(() => {
        checkLoggedInUser();
    });

    const checkLoggedInUser = () => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuth(true);
            } else {
                setIsAuth(false);
            }
        });
    };

    const formikl = useFormik({
        initialValues: {
            email: 'asdfstuff@stuff.com',
            password: 'asdfasdf',
        },
        onSubmit: (values) => {
            signInWithEmail(values);
        },
    });

    const formiks = useFormik({
        initialValues: {
            email: 'asdfstuff@stuff.com',
            password: 'asdfasdf',
        },
        onSubmit: (values) => {
            signUpWithEmail({
                ...userData, 
                email: values.email, 
                password: values.password
            });
        },
    });

    const formikp = useFormik({
        initialValues: {
            email: 'tithenai1@gmail.com'
        },
        onSubmit: (values) => {
            forgetPassword(values);
        },
    });

    return (
        <div className="App">
            <div>
                <button onClick={appSignOut}>Sign Out</button>
                <form onSubmit={formikl.handleSubmit}>
                    <TextField
                        fullWidth
                        id="emaill"
                        name="email"
                        label="Email"
                        value={formikl.values.email}
                        onChange={formikl.handleChange}
                        error={formikl.touched.email && Boolean(formikl.errors.email)}
                        helperText={formikl.touched.email && formikl.errors.email}
                    />
                    <TextField
                        fullWidth
                        id="passwordd"
                        name="password"
                        label="Password"
                        type="password"
                        value={formikl.values.password}
                        onChange={formikl.handleChange}
                        error={formikl.touched.password && Boolean(formikl.errors.password)}
                        helperText={formikl.touched.password && formikl.errors.password}
                    />
                    <Button color="primary" variant="contained" fullWidth type="submit">
                        Login
                    </Button>
                </form>
                <Divider sx={{ mx: 'auto', p: 2, m: 2, }} variant="middle"></Divider>
                <form onSubmit={formikp.handleSubmit}>
                    <TextField
                        fullWidth
                        id="pmail"
                        name="pmail"
                        label="Email"
                        value={formikp.values.email}
                        onChange={formikp.handleChange}
                        error={formikp.touched.email && Boolean(formikp.errors.email)}
                        helperText={formikp.touched.email && formikp.errors.email}
                    />
                    <Button color="secendary" variant="contained" fullWidth type="submit">
                        forgetPassword
                    </Button>
                </form>
                <Divider sx={{ mx: 'auto', p: 2, m: 2, }} variant="middle"></Divider>
                <form onSubmit={formiks.handleSubmit}>
                    <TextField
                        fullWidth
                        id="emails"
                        name="email"
                        label="Email"
                        value={formiks.values.email}
                        onChange={formiks.handleChange}
                        error={formiks.touched.email && Boolean(formiks.errors.email)}
                        helperText={formiks.touched.email && formiks.errors.email}
                    />
                    <TextField
                        fullWidth
                        id="passwords"
                        name="password"
                        label="Password"
                        type="password"
                        value={formiks.values.password}
                        onChange={formiks.handleChange}
                        error={formiks.touched.password && Boolean(formiks.errors.password)}
                        helperText={formiks.touched.password && formiks.errors.password}
                    />
                    <Button color="primary" variant="contained" fullWidth type="submit">
                        sign up
                    </Button>
                </form>

            </div>
        </div>
    );
}

export default App;
