import axios from "axios";

const BASEURL = "http://localhost:9000";
axios.defaults.baseURL = BASEURL

// =========================================================== Universities

export const getAllUnis = () => {
    return axios.get("/universities/getAllUnis")
        .then((result) => {
            return result.data;
        }).catch(error => console.log(error))
}

// =========================================================== Users

export const getUserInfo = async (uid) => {
    return await axios.get("/users/getUserInfo", {
        params: {
            uid: uid
        }
    }).then((result) => {
        console.log(result.data);
        const userInfo = {
            status: result.data.userAcademicStatus,
            firstname: result.data.userFirstname,
            lastname: result.data.userLastname,
            university: result.data.userUniversity, 
            email: result.data.userEmail, 
            photoURL: result.data.userPhotoURL // undefined if there is no photo
        }
        return userInfo;
    }).catch(error => console.log(error))
}

export function updateUser(values, uid) {

    return axios.post("/users/updateUser", {
        uid: uid,
        userFirstname: values.firstname, 
        userLastname: values.lastname, 
        userAcademicStatus: values.status,
        userEmail: values.email,
        userUniversityID: values.university.uniId
        // TODO: update photo here
    }).then((result) => {
        return result.data;
    }).catch(error => console.log(error))
}