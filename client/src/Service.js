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