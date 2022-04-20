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

export function updateUser(user) {
    return axios.post("/users/updateUser", {
        academicStatus: user.academicStatus,
        admin: user.admin,
        fullname: user.fullname,
        gender: user.gender,
        userTheses: user.userTheses,
    }).then((result) => {
        return result.data;
    }).catch(error => console.log(error))
}

