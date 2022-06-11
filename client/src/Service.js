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
        })
        .then((result) => {
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

export const getThesis = async (thesisId) => {
    return await axios.get("/theses/getThesis", {
            params: {
                thesisId: thesisId
            }
        })
        .then((result) => {
            return result.data;
        }).catch(error => console.log(error))
}

export const deleteThesis = async (thesisId) => {
    return await axios.get("/theses/deleteThesis", {
            params: {
                thesisId: thesisId
            }
        })
        .then((result) => {
            return result.data;
        }).catch(error => console.log(error))
}

export const isThesisSaved = async (values) => {
    return await axios.get("/theses/isThesisSaved", {
            params: {
                uid: values.uid,
                thesisId: values.thesisId
            }
        })
        .then((result) => {
            return result.data;
        }).catch(error => console.log(error))
}

export const searchTheses = async (searchingValues) => {
    return await axios.get("/theses/search", {
            params: {
                query: searchingValues.query,
                dimensions: searchingValues.dimensions,
                tags: (searchingValues.tags.length === 0) ? "nothing" : searchingValues.tags,
            }
        })
        .then((result) => {
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
        })
        .then((result) => {
            return result;
        }).catch(error => console.log(error))
}

export const updateThesis = async (newThesisData) => {
    return await axios.post("/theses/updateThesis", {
            thesisId: newThesisData.thesisId,
            thesisAbstract: newThesisData.thesisAbstract,
            thesisType: newThesisData.thesisType,
            thesisDate: newThesisData.thesisDate,
            thesisFieldOfStudy: newThesisData.thesisFieldOfStudy,
            thesisLanguage: newThesisData.thesisLanguage,
            thesisTags: newThesisData.thesisTags,
            thesisTitle: newThesisData.thesisTitle,
            thesisUniID: newThesisData.thesisUniID,
            thesisUniName: newThesisData.thesisUniName,
        })
        .then((result) => {
            return result;
        }).catch(error => console.log(error))
}

export const saveThesis = async (values) => {
    return await axios.post("/theses/saveThesis", {
            uid: values.uid,
            thesisId: values.thesisId,
        })
        .then((result) => {
            return result;
        }).catch(error => console.log(error))
}

export const unsaveThesis = async (values) => {
    return await axios.post("/theses/removeSavedThesis", {
            uid: values.uid,
            thesisId: values.thesisId,
        })
        .then((result) => {
            return result;
        }).catch(error => console.log(error))
}

export const addViewer = async (values) => {
    return await axios.post("/theses/addViewer", {
            uid: values.uid,
            thesisId: values.thesisId,
        })
        .then((result) => {
            return result;
        }).catch(error => console.log(error))
}

export const getUserTheses = async (uid) => {
    return await axios.get("/theses/getUserTheses", {
            params: {
                uid: uid
            }
        })
        .then((result) => {
            return result.data;
        }).catch(error => console.log(error))
}

export const getSavedList = async (uid) => {
    return await axios.get("/theses/getSavedTheses", {
            params: {
                uid: uid,
            }
        })
        .then((result) => {
            return result;
        }).catch(error => console.log(error))
}

// =========================================================== Reports

export const addNewReport = async (values) => {
    return await axios.post("/reports/addNewReport", {
            uid: values.uid,
            reportdata: values.reportdata,
        })
        .then((result) => {
            return result;
        }).catch(error => console.log(error))
}

export const getIsReported = async (values) => {
    return await axios.get("/reports/getIsReported", {
            params: {
                uid: values.uid,
                thesisId: values.thesisId
            }
        })
        .then((result) => {
            return result.data;
        }).catch(error => console.log(error))
}

// =========================================================== Comments

export const addNewComment = async (values) => {
    return await axios.post("/comments/addNewComment", {
            uid: values.uid,
            commentdata: values.commentdata,
        })
        .then((result) => {
            return result;
        }).catch(error => console.log(error))
}

export const getComments = async (thesisId) => {
    return await axios.get("/comments/getComments", {
            params: {
                thesisId: thesisId,
            }
        })
        .then((result) => {
            return result.data;
        }).catch(error => console.log(error))
}

export const deleteComment = async (commentId) => {
    return await axios.get("/comments/deleteComment", {
            params: {
                commentId: commentId,
            }
        })
        .then((result) => {
            return result;
        }).catch(error => console.log(error))
}

// =========================================================== Rates

export const addNewRate = async (values) => {
    return await axios.post("/rates/addNewRate", {
            uid: values.uid,
            thesisId: values.thesisId,
            rateValue: values.rateValue,
        })
        .then((result) => {
            return result;
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
        })
        .then((result) => {
            return result.data;
        }).catch(error => console.log(error))
}

export const getUniversity = async (universityId) => {
    return await axios.get("/universities/getUniversity", {
            params: {
                id: universityId,
            }
        })
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
        })
        .then((result) => {
            const userInfo = {
                invalidReports: result.data.invalidReports,
                strikes: result.data.strikes,
                adminStatus: result.data.userAdmin,
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
            userUniversityID: values.university.uniID
        })
        .then((result) => {
            return result;
        }).catch(error => console.log(error))
}

export const updateImage = async (image, uid) => {
    return await axios.post("/users/updateUserImage", {
            imageBase64: image,
            uid: uid
        })
        .then((result) => {
            return result;
        }).catch(error => console.log(error))
}

// =========================================================== Admin Panel

export const strike = async (values) => {
    return await axios.post("/adminPanel/strike", {
            uid: values.authorId,
            thesisId: values.thesisId
        })
        .then((result) => {
            return result;
        }).catch(error => console.log(error))
}

export const increaseInvalidReport = async (reporterID) => {
    return await axios.post("/adminPanel/increaseInvalidReport", {
            uid: reporterID,
        })
        .then((result) => {
            return result;
        }).catch(error => console.log(error))
}

export const getAllReports = async () => {
    return await axios.get("/reports/getAllReports")
        .then((result) => {
            return result.data;
        }).catch(error => console.log(error))
}

export const deleteReport = async (reportId) => {
    return await axios.get("/reports/deleteReport", {
            params: {
                reportId: reportId
            }
        })
        .then((result) => {
            return result;
        }).catch(error => console.log(error))
}