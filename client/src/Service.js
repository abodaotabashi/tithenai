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

// export function getAllUnis(data) {
//     return axios.post("/universities/getAllUnis", {
//         header: {
//             username: data.username
//         }
//     })
//         .then((result) => {
//             return result.data;
//         }).catch(error => console.log(error))
// }
export const getUser = async (tokenID) => {
    return await axios.get("/users/getUser", {
        params: {
            tokenID: tokenID
        }
    }).then((result) => {
        //TODO: Get the email address of the user
        const userInfo = {
            "status": result.data.userAcademicStatus,
            "firstname": result.data.userFirstname,
            "lastname": result.data.userLastname,
            "university": result.data.userUniversityID, //TODO: Get the Ref of University (complete object of University instead of id)
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

