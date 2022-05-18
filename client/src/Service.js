import axios from "axios";

const BASEURL = "http://localhost:9000";
axios.defaults.baseURL = BASEURL
// =========================================================== Utils

export const getAllTags = async () => {
    return await axios.get("/theses/getAllTags")
        .then((result) => {
            return result.data;
        }).catch(error => console.log(error))
}

export const addNewTag = async (newTag) => {
    return await axios.post("/theses/addNewTag", {
        tag : newTag
    }).then((result) => {
        return result.data;
    }).catch(error => console.log(error))
}

export const getAllDepartments = async () => {
    return await axios.get("/theses/getAllDepartments")
        .then((result) => {
            return result.data;
        }).catch(error => console.log(error))
}

// =========================================================== Theses

export const searchTheses = async (searchingValues) => {
    return await axios.get("/theses/search", {
        params: {
            query: searchingValues.query,
            dimensions: searchingValues.dimensions,
            tags: (searchingValues.tags.length === 0) ? "nothing" : searchingValues.tags,
        }
    }).then((result) => {
        return result.data;
    }).catch(error => console.log(error))
}

export const uploadThesis = async (thesisInfo) => {
    return await axios.post("/theses/uploadThesis", {
        thesisAuthorID: thesisInfo.thesisAuthorID,
        thesisAbstract: thesisInfo.thesisAbstract,
        thesisType: thesisInfo.thesisType,
        thesisDate: thesisInfo.thesisDate,
        thesisFieldOfStudy: thesisInfo.thesisFieldOfStudy,
        thesisLanguage: thesisInfo.thesisLanguage,
        thesisTags: thesisInfo.thesisTags,
        thesisTitle: thesisInfo.thesisTitle,
        thesisUniID: thesisInfo.thesisUniID,
        thesisUniName: thesisInfo.thesisUniName,
        thesisUploadDate: new Date(),
        thesisPdfBase64: thesisInfo.thesisPdfBase64,
        viewersList: [],
        rates: {},
        ratesAverage: 0
    }).then((result) => {
        return result;
    }).catch(error => console.log(error))
}

export const getUserTheses = async (uid) => {
    return await axios.get("/theses/getUserTheses", {
        params: {
            uid: uid
        }
    }).then((result) => {
        return result.data;
    }).catch(error => console.log(error))
}

// =========================================================== Universities

export const getAllUnis = async () => {
    return await axios.get("/universities/getAllUnis")
        .then((result) => {
            return result.data;
        }).catch(error => console.log(error))
}

export const searchUniversities = async (searchingValues) => {
    return await axios.get("/universities/search", {
        params: {
            query: searchingValues.query,
            dimensions: searchingValues.dimensions,
        }
    }).then((result) => {
        return result.data;
    }).catch(error => console.log(error))
}

//************************************************ */

// added by mahasin
export const getSavedList = async (uid) => {
    return await axios.get("/theses/getSavedTheses", {
        params: {
            uid: uid,
        }
    }).then((result) => {
        return result;
    }).catch(error => console.log(error))
}

// =========================================================== Users

export const getUserInfo = async (uid) => {
    return await axios.get("/users/getUserInfo", {
        params: {
            uid: uid
        }
    }).then((result) => {
        console.log(result.data.userPhotoURL)
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
    }).then((result) => {
        return result;
    }).catch(error => console.log(error))
}

export const updateImage = async (image, uid) => {
    return await axios.post("/users/updateUserImage", {
        imageBase64: image,
        uid: uid
    }).then((result) => {
        return result;
    }).catch(error => console.log(error))
}