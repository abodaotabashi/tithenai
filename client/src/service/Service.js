import axios from "axios";
import { 
    onAuthStateChanged, 
    getAuth
} from "firebase/auth";


async function getIdToken(){
    
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
        if (user) {
            user.getIdToken().then((idToken) => {
                return idToken
            });
        } else {

        }
    });
    
}

const BASEURL = "http://localhost:9000";

export async function addNewUser(userData) {

    getIdToken().then(idToken =>{
        if(idToken){
            axios.get(BASEURL + "/users/AddNewUser", {
                headers: {
                    Authorization: "Bearer " + idToken,
                    userData: userData
                }
            });
        }
    })
}