import { initializeApp } from "firebase/app";
import axios from "axios";
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail
} from "firebase/auth";

// =========================================================== Setup 

const firebaseConfig = {
    apiKey: "AIzaSyBw1CCPiDZuLKnWRMHhPg1ZCe9e5fqyQJM",
    authDomain: "tithenai-23867.firebaseapp.com",
    projectId: "tithenai-23867",
    storageBucket: "tithenai-23867.appspot.com",
    messagingSenderId: "765684955136",
    appId: "1:765684955136:web:12b021a0972cd2426c40e5",
    measurementId: "G-EBZ5KF9QLT"
};
initializeApp(firebaseConfig);

const BASEURL = "http://localhost:9000";
axios.defaults.baseURL = BASEURL

// =========================================================== Functions

export const appSignOut = () => {
    const auth = getAuth();
    signOut(auth)
        .then(() => {
            return true;
        }).catch(console.log)
};

async function addNewUser(userCredential, userData) {
    const auth = getAuth();
    return auth.currentUser.getIdToken().then((idToken) => {
        return axios.post("/users/AddNewUser", {
            idToken: idToken,
            uid: userCredential.user.uid,
            userdata: userData
        }).then(() => {
            return true; 
        }).catch((error) => {
            console.log(error);
            return false; 
        })
    })
}

export const forgetPassword = (email) => {
    const auth = getAuth();
    return sendPasswordResetEmail(auth, email)
        .then(() => {
            return true;
        }).catch((error)=>{
            console.log(error);
            return false; 
        });
}

// =========================================================== Email

export const signUpWithEmail = (values) => {
    const auth = getAuth();
    return createUserWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
            const userData = {
                academicStatus: values.status,
                fullname: values.firstname + " " + values.lastname,
                gender: 'Female' // TODO change this to values.gender
            };
            return addNewUser(userCredential, userData)
            .then((result) => {
                return result;
            }).catch((error) => {
                console.log(error)
                return false;
            })
        })
        .catch((error) => {
            console.log(error);
            return false
        })
}

export const signInWithEmail = (userCredential) => {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, userCredential.email, userCredential.password)
        .then((userCredential) => {
            return true;
        })
        .catch((error)=>{
            console.log(error);
            return false; 
        });
}

// =========================================================== Google

export const signUpWithGoogle = (values) => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    return signInWithPopup(auth, provider)
        .then((result) => {
            const userCredential = result.user;
            const userData = {
                academicStatus: values.status,
                fullname: values.firstname + " " + values.lastname,
                gender: 'Female' // TODO change this to values.gender
            };
            return addNewUser(userCredential, userData)
            .then((result) => {
                return result;
            }).catch((error) => {
                console.log(error)
                return false;
            })
        })
        .catch((error)=>{
            console.log(error);
            return false; 
        });
};

export const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    return signInWithPopup(auth, provider)
        .then((result) => {
            return true;
        })
        .catch((error)=>{
            console.log(error);
            return false; 
        });
};