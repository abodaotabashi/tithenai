import axios from "axios";

const BASEURL = "http://localhost:9000";
axios.defaults.baseURL = BASEURL

// =========================================================== Universities

export const getAllUnis = async () => {
    return await axios.get("/universities/getAllUnis")
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
        const userInfo = {
            status: result.data.userAcademicStatus,
            firstname: result.data.userFirstname,
            lastname: result.data.userLastname,
            university: result.data.userUniversity,
            email: result.data.userEmail,
            theses: result.data.userTheses,
            photoURL: result.data.userPhotoURL // undefined if there is no photo
        }
        return userInfo;
    }).catch(error => console.log(error))
}

export const updateUser = async (values, uid) => {
    return await axios.post("/users/updateUser", {
        uid: uid,
        userFirstname: values.firstname,
        userLastname: values.lastname,
        userAcademicStatus: values.status,
        userEmail: values.email,
        userUniversityID: values.university.uniId
        // TODO: update photo here
    }).then((result) => {
        return result;
    }).catch(error => console.log(error))
}

//TODO: separated updateUserPhoto Function implementation