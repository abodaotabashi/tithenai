import "./App.css";
import { 
    getAuth, 
    signInWithPopup, 
    GoogleAuthProvider, 
    onAuthStateChanged, 
    signOut, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword 
} from "firebase/auth";
import { useEffect, useState } from "react";
import axios from "axios";
import React from 'react';
import { useFormik } from 'formik';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Divider from '@mui/material/Divider';
import { addNewUser } from "./service/Service";


const BASEURL = "http://localhost:9000/";

function App() {
    const [isAuth, setIsAuth] = useState(
        false || window.localStorage.getItem("auth") === "true"
    );
    const [idToken, setIdToken] = useState("");

    useEffect(() => {
        checkLoggedInUser();
        // if (idToken) {
        //     getData(idToken);
        // }
    }, [idToken]);

    // only authenticated users can get data
    const getData = async (idToekn) => {
        const res = await axios.get(BASEURL, {
            headers: {
                Authorization: "Bearer " + idToken,
            },
        });
        console.log(res);
    };

    const checkLoggedInUser = () => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // const uid = user.uid;
                setIsAuth(true);

                // this is a way to show the "user logged in" immediately
                window.localStorage.setItem("auth", "true");

                user.getIdToken().then((idToken) => {
                    setIdToken(idToken);
                });
            } else {
                // User is signed out
                // ...
                setIsAuth(false);
                setIdToken("")
            }
        });
    };

    const signInWithEmail = (values) => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, values.email, values.password)
            .then((userCredential) => {
                // Signed in 
                // const user = userCredential.user;
                // ...
            })
            .catch((error) => {
                // const errorCode = error.code;
                // const errorMessage = error.message;
            });
    }

    const signUpWithEmail = (values) => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, values.email, values.password)
            .then((userCredential) => {
                // Signed in 
                // const user = userCredential.user;
                // ...
                
                addNewUser(userCredential)
            })
            .catch((error) => {
                // const errorCode = error.code;
                // const errorMessage = error.message;
                console.log(error);
            });
    }

    const signUpWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                setIsAuth(true);
                window.localStorage.setItem("auth", "true");
                //TODO: pass additional attribute to the user
                //TODO: if user already here, don't add any additional attributes
                
            })
            .catch(console.log);
    };

    const appSignOut = () => {
        const auth = getAuth();
        signOut(auth)
            .then(() => {
                // Sign-out successful.
            })
            .catch((error) => {
                // An error happened.
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
            signUpWithEmail(values);
        },
    });


    return (
        <div className="App">
            {isAuth ? (
                <div>
                    <h1>User is signed in.</h1>
                    <button onClick={appSignOut}>Sign out</button>
                </div>
            ) : (
                <div>
                    <button onClick={signUpWithGoogle}>Sign up / Sign in with Google</button>
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
                    <Divider sx={{
                        mx: 'auto',
                        p: 1,
                        m: 1,
                    }} variant="middle"></Divider>
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
            )}
        </div>
    );
}

export default App;
