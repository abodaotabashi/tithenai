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
export function getUser() {
    return axios.get("/users/getUser")
        .then((result) => {
            return result.data;
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

