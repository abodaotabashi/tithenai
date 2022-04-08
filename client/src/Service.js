import axios from "axios";

const BASEURL = "http://localhost:9000";
axios.defaults.baseURL = BASEURL

// =========================================================== Universities 

export function getAllUnis() {
    return axios.get("/universities/getAllUnis")
        .then((result) => {
            return result.data;
        }).catch(console.log)
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
//         }).catch(console.log)
// }
export function getUser() {
    return axios.get("/users/getUser")
        .then((result) => {
            return result.data;
        }).catch(console.log)
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
    }).catch(console.log)
}

