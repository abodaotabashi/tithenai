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

const BASEURL = "http://localhost:9000";
axios.defaults.baseURL = BASEURL

// ===========================================================

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
        axios.post("/users/AddNewUser", {
            idToken: idToken,
            uid: userCredential.user.uid,
            userdata: userData
        }).then((response) => {
            return response.status === "OK"; 
        }).catch((error) => {
            console.log(error);
            return false; 
        })
    })
}

export const forgetPassword = (values) => {
    const auth = getAuth();
    sendPasswordResetEmail(auth, values.email)
        .then(() => {
            return true;
        }).catch(console.log)
}

// =========================================================== Email

export const signUpWithEmail = (data) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
            const userData = {
                academicStatus: data.academicStatus,
                admin: false, // TODO: is false the default
                fullname: data.firstName + " " + data.lastname,
                gender: data.gender
            };
            addNewUser(userCredential, userData)
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
    signInWithEmailAndPassword(auth, userCredential.email, userCredential.password)
        .then((userCredential) => {
            return true;
        })
        .catch(console.log);
}

// =========================================================== Google

export const signUpWithGoogle = (userData) => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
        .then((result) => {
            const userCredential = result.user;
            addNewUser(userCredential, userData)
        })
        .catch(console.log);
};

export const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
        .then((result) => {
            return true;
        })
        .catch(console.log);
};