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
import { formatName } from "../utils/HelperFunctions";

// =========================================================== Setup

const firebaseConfig = {
    apiKey: "AIzaSyBw1CCPiDZuLKnWRMHhPg1ZCe9e5fqyQJM",
    authDomain: "tithenai-23867.firebaseapp.com",
    projectId: "tithenai-23867",
    storageBucket: "tithenai-23867.appspot.com",
    messagingSenderId: "765684955136",
    appId: "1:765684955136:web:12b021a0972cd2426c40e5",
    databaseURL: "https://tithenai-23867.appspot.com",
    measurementId: "G-EBZ5KF9QLT"
};
initializeApp(firebaseConfig);

const BASEURL = "/api";
axios.defaults.baseURL = BASEURL

// =========================================================== Functions

export const appSignOut = () => {
    const auth = getAuth();
    signOut(auth)
        .then(() => {
            return true;
        }).catch(error => console.log(error))
};

// returns true, if the user is added correctly to the database
// returns false, if an error occurred when adding the user to the database
async function addNewUser(userCredential, userData) {
    const auth = getAuth();
    return auth.currentUser.getIdToken().then((idToken) => {
        return axios.post("/users/addNewUser", {
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
                userUniId: values.university.uniId,
                userAcademicStatus: values.status,
                userFirstname: formatName(values.firstname),
                userLastname: formatName(values.lastname),
                userGender: values.gender
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

export const signUpWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(); 
    return signInWithPopup(auth, provider)
        .then((result) => {
            const userCredential = result;
            // some values are missing and the user has to enter those values from the layout of edit profile page.
            if(result._tokenResponse.isNewUser){
                const userData = {
                    userUniversityID: "",   
                    userAcademicStatus: "",
                    userFirstname: userCredential.user.displayName.split(" ")[0],
                    userLastname: userCredential.user.displayName.split(" ")[1],
                    userGender: ""
                };
                return addNewUser(userCredential, userData)
                .then((result) => {
                    return result;
                }).catch((error) => {
                    console.log(error)
                    return false;
                })
            }
        })
        .catch((error)=>{
            console.log(error);
            return false;
        });
};