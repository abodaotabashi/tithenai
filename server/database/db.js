// =========================================================== Setup
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");
const firebaseStorage = require("firebase-admin/storage");
const fs = require('fs');
const { formatBase64, formatFirebaseDate, sendEmail } = require("../Utils/util");



const firebaseConfig = {
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "tithenai-23867.appspot.com"
}

const firebseApp = admin.initializeApp(firebaseConfig);
const db = admin.firestore();
const storage = firebaseStorage.getStorage(firebseApp);

//=========================================================== collection names

const USERS_COLLECTION = 'users';
const UNIS_COLLECTION = 'universities';
const THESES_COLLECTION = 'theses';
const REPORTS_COLLECTION = 'reports';
const COMMENTS_COLLECTION = 'comments';
const BUCKETNAME = 'tithenai-23867.appspot.com';
const UTILS_COLLECTION = "utils";

// =========================================================== Database Strings
// Reports
const REPORT_CONTENT = "reportContent"
const REPORT_REPORTER_ID = "reportReporterID"
const REPORT_THESIS_ID = "reportThesisID"
const REPORTER_NAME = "reporterName"
const REPORT_ID = "reportID"

// Comments
const COMMENT_AUTHOR_ID = "commentAuthorID"
const COMMENT_AUTHOR_NAME = "commentAuthorName"
const COMMENT_BODY = "commentBody"
const COMMENT_RATING = "commentRating"
const COMMENT_THESIS_ID = "commentThesisID"

// Theses
const THESIS_ABSTRACT = "thesisAbstract"
const THESIS_AUTHOR_ID = "thesisAuthorID"
const THESIS_AUTHOR_NAME = "thesisAuthorName"
const THESIS_DATE = "thesisDate"
const THESIS_FACULTY = "thesisFaculty"
const THESIS_LANGUAGE = "thesisLanguage"
const THESIS_PDF_URL = "thesisPdfUrl"
const THESIS_TAGS = "thesisTags"
const THESIS_TITLE = "thesisTitle"
const THESIS_UNI_ID = "thesisUniID"
const THESIS_UNI_NAME = "thesisUniName"
const THESIS_UPLOAD_DATE = "thesisUploadDate"
const THESIS_ID = "thesisID"
const VIEWERS_LIST = "viewersList"

// Universities
const UNI_COUNTRY = "uniCountry"
const UNI_NAME = "uniName"
const UNI_STATE = "uniState"
const UNI_THESES = "uniTheses"
const UNI_TYPE = "uniType"
const UNI_URL = "uniUrl"
const UNI_ID = "uniID"

// Users
const USER_LASTNAME = "userLastname"
const USER_FIRSTNAME = "userFirstname"
const USER_UNI_ID = "userUniID"
const USER_ACADEMIC_STATUS = "userAcademicStatus"
const USER_GENDER = "userGender"
const USER_ADMIN = "userAdmin"
const USER_ID = "uid"
const USER_SAVED_THESES = "userSavedTheses"

const DEFAULT_UNI = {
    uniCountry: "",
    uniName: "",
    uniState: "",
    uniTheses: "",
    uniType: "",
    uniUrl: "",
    uniID: ""
}
// =========================================================== Manage Users

async function addNewUser(data) {
    const uid = data.uid
    const dbUserData = {
        userUniID: data.userdata.userUniId,
        userAcademicStatus: data.userdata.userAcademicStatus,
        userFirstname: data.userdata.userFirstname,
        userLastname: data.userdata.userLastname,
        userGender: data.userdata.userGender,
        userAdmin: false,
        userSavedTheses: [],
        invalidReports: 0,
        strikes: 0
    }

    // When user try to authenticate with google, they might exist in the database
    // Check if the user exist before adding any new data

    return db
        .collection(USERS_COLLECTION)
        .doc(uid)
        .get()
        .then((doc) => {
            return db
                .collection(USERS_COLLECTION)
                .doc(uid)
                .set(dbUserData)
                .then(() => true)
                .catch((error) => {
                    console.log(error);
                    return false;
                })
        }).catch((error) => {
            console.log(error);
            return false;
        })
}

async function getUserInfo(uid) {
    return db.collection(USERS_COLLECTION).doc(uid)
        .get()
        .then(async (doc) => {
            const authUserData = await admin.auth().getUser(uid)
            const firebaseUserData = doc.data()
            const uniID = firebaseUserData.userUniID

            // getting the uni of the user
            let uni = DEFAULT_UNI
            if (uniID) {
                const uniSnapshot = await db.collection(UNIS_COLLECTION).doc(uniID).get();
                uni = {
                    uniID: uniID,
                    ...uniSnapshot.data()
                }
            }
            // getting the theses of the user

            const thesesSnapshot = await db.collection(THESES_COLLECTION).where("thesisAuthorID", '==', uid).get();
            const theses = []
            thesesSnapshot.forEach(thesisObj => {
                const thesis = {
                    ...thesisObj.data(),
                    thesisId: thesisObj.id
                }
                theses.push(thesis);
            });

            delete firebaseUserData.userUniID
            delete firebaseUserData.userTheses

            const userInfo = {
                ...firebaseUserData,
                userEmail: authUserData.email,
                userPhotoURL: authUserData.photoURL,
                userUniversity: uni,
                userTheses: theses,
                userId: uid
            }
            return userInfo;
        }).catch((error) => {
            console.log(error);
            return false;
        })
}

function deleteAllUsers(nextPageToken) {
    let uids = [];
    admin
        .auth()
        .listUsers(100, nextPageToken)
        .then((listUsersResult) => {
            uids = uids.concat(listUsersResult.users.map((userRecord) => userRecord.uid));
            console.log(uids);
            admin.auth().deleteUsers(uids);
        });

    db.collection(USERS_COLLECTION)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                doc.ref.delete();
            });
        });
}

async function updateUser(newUserData) {

    async function updateNameInCollection(collectionName, uid, userIDField, userNameField) {
        const docs = await db.collection(collectionName).where(userIDField, '==', uid).get();
        docs.forEach(async doc => {
            await db.collection(collectionName)
                .doc(doc.id)
                .update({
                    [userNameField]: `${newUserData.userFirstname} ${newUserData.userLastname}`,
                })
        });
    }

    try {
        // 1. update user data in the users collcection
        await db.collection(USERS_COLLECTION)
            .doc(newUserData.uid)
            .update({
                userFirstname: newUserData.userFirstname,
                userLastname: newUserData.userLastname,
                userAcademicStatus: newUserData.userAcademicStatus,
                userUniID: newUserData.userUniversityID
            })

        // 2. update user name in reports collection
        await updateNameInCollection(REPORTS_COLLECTION, newUserData.uid, 'reportReporterID', "reporterName");

        // 3. update user name in comments collection
        await updateNameInCollection(COMMENTS_COLLECTION, newUserData.uid, 'commentAuthorID', "commentAuthorName");

        // 4. update user name in theses collection
        await updateNameInCollection(THESES_COLLECTION, newUserData.uid, 'thesisAuthorID', "thesisAuthorName");

        // 5. update user data in auth
        admin.auth()
            .updateUser(newUserData.uid, {
                email: newUserData.userEmail,
                emailVerified: false,
            })

    } catch (error) {
        console.log(error);
        return false;
    }
    return true;
}

async function updateUserImage(data) {
    try {
        const uid = data.uid;
        const imageBase64 = formatBase64(data.imageBase64, 'image');
        const buf = new Buffer.from(imageBase64, 'base64');
        const file = storage.bucket(BUCKETNAME).file(`userImages/${uid}.png`);
        await file.save(buf);
        const publicUrl = await file.getSignedUrl({
            action: 'read',
            expires: Date.now() + (1000 * 60 * 60 * 24 * 365), // 1 year
        });
        admin.auth()
            .updateUser(uid, {
                photoURL: publicUrl[0]
            })
        return true
    } catch (error) {
        console.log(error);
        return false;
    }
}

/*
async function banUser(uid) {
    return db
        .collection(USERS_COLLECTION)
        .doc(uid)
        .update({ banStatus: true })
}
*/
/*
async function isUserBanned(uid) {
    const userData = await getUserDataById(uid);
    if (!userData.banStatus) {
        console.log("User is NOT Banned");
        return true
    } else {
        console.log("User is Banned");
        return false
    }
}
*/

// =========================================================== Universities

async function getAllUnis() {
    try {
        const querySnapshot = await db.collection(UNIS_COLLECTION)
            .orderBy("uniName", "asc")
            .get();

        let unis = []
        querySnapshot.forEach((doc) => {
            const uniImgRef = storage.bucket(BUCKETNAME).file(`uniImages/${doc.id}.png`)
            const uniImageUrl = uniImgRef.publicUrl();
            const uni = {
                ...doc.data(),
                uniId: doc.id,
                uniImageUrl: uniImageUrl
            }
            unis.push(uni)
        });
        return unis;
    } catch (error) {
        console.log(error);
        return false;
    }
}

async function uploadUniImages() {
    const fileNames = fs.readdirSync('database/uniImages/');
    fileNames.forEach(async (filename) => {
        // const file = await storage.bucket(BUCKETNAME).upload("database/uniImages/" + filename, {
        //     destination: "uniImages/" + filename
        // });
        const file = await storage.bucket(BUCKETNAME).file("uniImages/" + filename);
        await file.makePublic();
        const publicUrl = file.publicUrl();
        console.log(publicUrl);
    });
}

async function addAllDepartments() {
    const docId = (await db.collection(UTILS_COLLECTION).get()).docs[0].id;
    const depListFile = fs.readFileSync('database/listOfDepartments.txt');
    const depListOfObjects = JSON.parse(depListFile);
    const depList = depListOfObjects.reduce((acc, next) => {
        acc.push(next.departmentName);
        return acc;
    }, [])
    await db.collection(UTILS_COLLECTION).doc(docId).update({
        departments: depList
    });
}

async function getAllDepartments() {
    // docs[0] gets the first document, since all lists are inside this document
    return (await db.collection(UTILS_COLLECTION).get()).docs[0].data().departments
}

async function getUniversity(uniId) {
    const uniData = (await db.collection(UNIS_COLLECTION)
        .doc(uniId)
        .get()).data();

    const uniThesesSnapshot = await db.collection(THESES_COLLECTION)
        .where("thesisUniID", '==', uniId)
        .get();

    const theses = [];

    uniThesesSnapshot.forEach(thesis => {
        theses.push({
            thesisId: thesis.id,
            ...thesis.data()
        });
    })

    // Statistics
    let stats = {}

    // typ
    const typesStats = theses.reduce((acc, next) => {
        acc[next.thesisType] ? acc[next.thesisType]++ : acc[next.thesisType] = 1;
        return acc;
    }, {})

    // field of study
    const fieldOfStudyStats = theses.reduce((acc, next) => {
        acc[next.thesisFieldOfStudy] ? acc[next.thesisFieldOfStudy]++ : acc[next.thesisFieldOfStudy] = 1;
        return acc;
    }, {})

    // tags
    const tagsStats = {};
    theses.forEach(thesis => {
        const thesisTags = thesis.thesisTags;
        thesisTags.forEach(tag => {
            tagsStats[tag] ? tagsStats[tag]++ : tagsStats[tag] = 1
        })
    })

    const yearStats = theses.reduce((acc, next) => {
        const thesisYear = formatFirebaseDate(next.thesisDate, "year");
        const thesisMonth = formatFirebaseDate(next.thesisDate, "month");
        if (acc[thesisYear]) {
            acc[thesisYear][thesisMonth] ? acc[thesisYear][thesisMonth]++ : acc[thesisYear][thesisMonth] = 1
        } else {
            acc[thesisYear] = {
                [thesisMonth]: 1
            }
        }
        return acc
    }, {})

    const researchStats = theses.reduce((acc, next) => {
        if (acc[next.thesisAuthorID]) {
            acc[next.thesisAuthorID]["uniThesisCount"]++
        } else {
            acc[next.thesisAuthorID] = {
                researcherName: next.thesisAuthorName,
                uniThesisCount: 1
            }
        }
        return acc;
    }, {})


    const uniMembers = (await db.collection(USERS_COLLECTION)
        .where("userUniID", '==', uniId)
        .get()).size;

    stats = {
        typesStats,
        fieldOfStudyStats,
        tagsStats,
        yearStats,
        researchStats,
        uniMembers
    }

    const uniImgRef = storage.bucket(BUCKETNAME).file(`uniImages/${uniId}.png`)
    const uniImageUrl = uniImgRef.publicUrl();

    const uniToReturn = {
        uniId: uniId,
        ...uniData,
        uniImageUrl: uniImageUrl,
        uniTheses: theses,
        statistics: stats
    }

    return uniToReturn;
}

// =========================================================== Theses

async function getAllTheses() {
    return db
        .collection(THESES_COLLECTION)
        .orderBy("thesisTitle", "asc")
        .get()
        .then((querySnapshot) => {
            const theses = []
            querySnapshot.forEach((doc) => {
                thesis = {
                    ...doc.data(),
                    thesisId: doc.id
                }
                theses.push(thesis)
            });
            return theses;
        }).catch((error) => {
            console.log(error);
            return false;
        })
}

async function uploadThesis(data) {
    const thesisData = { ...data, thesisPdfUrl: "" }
    const uid = thesisData.thesisAuthorID;
    const strike = await getStrike(uid)
    if (strike < 2) {

        const thesisPdfBase64 = thesisData.thesisPdfBase64;

        delete thesisData.uid;
        delete thesisData.thesisPdfBase64;

        thesisData.thesisUploadDate = new Date(thesisData.thesisUploadDate)
        thesisData.thesisDate = new Date(thesisData.thesisDate)

        const userData = await getUserDataById(uid);
        thesisData.thesisAuthorName = `${userData.userFirstname} ${userData.userLastname}`

        // add new thesis to firebase
        const addedThesis = await db.collection(THESES_COLLECTION).add(thesisData)

        // upload pdf to storage
        const pdfBase64 = formatBase64(thesisPdfBase64, "pdf");
        const buf = new Buffer.from(pdfBase64, 'base64');
        const file = storage.bucket(BUCKETNAME).file(`theses/${addedThesis.id}.pdf`);
        await file.save(buf);

        const publicUrl = await file.getSignedUrl({
            action: 'read',
            expires: '03-09-2491',
        });

        // update document with the url
        await db.collection(THESES_COLLECTION).doc(addedThesis.id).update({
            thesisPdfUrl: publicUrl
        });
    }

}

async function getUserTheses(data) {
    const uid = data.uid
    try {
        // Note: don't use ctrl+right click to access the url from visual code, instead copy it
        const thesesSnapshot = await db.collection(THESES_COLLECTION).where("thesisAuthorID", '==', uid).get();
        const theses = []
        thesesSnapshot.forEach(thesisObj => {
            const thesis = {
                thesisId: thesisObj.id,
                ...thesisObj.data()
            }
            theses.push(thesis);
        });
        return (theses)
    } catch (error) {
        console.log(error);
        return false;
    }
}

async function saveThesis(data) {
    const uid = data.uid;
    const thesisId = data.thesisId
    try {
        // Get the list of saved thesis for this user
        const user = await db.collection(USERS_COLLECTION).doc(uid).get();
        const savedThesesList = user.data()[USER_SAVED_THESES]

        if (!savedThesesList.includes(thesisId)) {
            await db.collection(USERS_COLLECTION).doc(uid).update({
                [USER_SAVED_THESES]: [...savedThesesList, thesisId]
            })
        }
        return true
    } catch (error) {
        console.log(error);
        return false
    }
}

async function removeSavedThesis(data) {
    const uid = data.uid;
    const thesisId = data.thesisId
    try {
        const user = await db.collection(USERS_COLLECTION).doc(uid).get();
        const savedThesesList = user.data()[USER_SAVED_THESES]

        const newList = savedThesesList.filter((id) => id !== thesisId)

        await db.collection(USERS_COLLECTION).doc(uid).update({
            [USER_SAVED_THESES]: newList
        })
        return true
    } catch (error) {
        console.log(error);
        return false
    }
}

async function getSavedTheses(data) {
    const uid = data.uid;
    try {
        const user = await db.collection(USERS_COLLECTION).doc(uid).get();
        const savedThesesList = user.data()[USER_SAVED_THESES]
        const theses = [];
        for (let i = 0; i < savedThesesList.length; i++) {
            const thesisId = savedThesesList[i];
            const thesisData = await getThesis(thesisId);
            const thesis = {
                thesisId: thesisId,
                ...thesisData
            }
            theses.push(thesis);
        }
        return theses;
    } catch (error) {
        console.log(error);
        return false;
    }
}

async function getAllTags() {
    try {
        // docs[0] gets the first document, since all lists are inside this document
        return (await db.collection(UTILS_COLLECTION).get()).docs[0].data().tags
    } catch (error) {
        console.log(error);
        return false;
    }
}

async function addNewTag(tag) {
    const oldTagsObj = (await db.collection(UTILS_COLLECTION).get()).docs[0];
    const docId = oldTagsObj.id;
    const oldTagsList = oldTagsObj.data().tags;
    const newTagsList = [...new Set([...oldTagsList, tag])]
    await db.collection(UTILS_COLLECTION).doc(docId).update({
        tags: newTagsList
    });
}

async function addViewer(data) {
    try {
        const uid = data.uid;
        const thesisId = data.thesisId;
        const thesis = await getThesis(thesisId);
        const oldViewersList = thesis[VIEWERS_LIST]
        const newViewersList = [...new Set([...oldViewersList, uid])]
        await db.collection(THESES_COLLECTION).doc(thesisId).update({
            [VIEWERS_LIST]: newViewersList
        })
        return true
    } catch (error) {
        console.log(error);
        return false
    }
}

async function isThesisSaved(data) {
    const uid = data.uid;
    const thesisId = data.thesisId;
    const userData = await getUserDataById(uid);
    const userSavedTheses = userData.userSavedTheses;
    console.log(userSavedTheses);
    return (userSavedTheses.includes(thesisId))
}


async function deleteThesis(thesisId) {
    //delete comments and reports and user saved Thesis
    async function deleteThesisfromCollection(collectionName, thesisId, userIDField) {
        const docs = await db.collection(collectionName).where(userIDField, '==', thesisId).get();
        docs.forEach(async doc => {
            await db.collection(collectionName)
                .doc(doc.id)
                .delete()
        });
    }
    try {

        // 1. delete thesis data from the thesis collcection
        await db.collection(THESES_COLLECTION).doc(thesisId).delete()

        // 2. delete thesis data from the reports collcection
        await deleteThesisfromCollection(REPORTS_COLLECTION, thesisId, 'reportThesisID');

        // 3. delete thesis data from the comments collcection
        await deleteThesisfromCollection(COMMENTS_COLLECTION, thesisId, 'commentThesisID');

        // 4. delete thesis data from the user saved list collcection
        const usersSnapshot = await db.collection(USERS_COLLECTION).select().get();
        for (const user of usersSnapshot.docs) {

            const userData = await getUserDataById(user.id);
            if (userData.userSavedTheses.includes(thesisId)) {
                userData.userSavedTheses = userData.userSavedTheses.filter(v => v !== thesisId);
            };
            await db.collection(USERS_COLLECTION).doc(user.id).update({ userSavedTheses: userData.userSavedTheses })

        }

    } catch (error) {
        console.log(error);
        return false;
    }
    return true
}

async function updateThesis(newThesisData) {

    const Uni = await getUniDataById(newThesisData.thesisUniID)
    const uniName = Uni["uniName"];
    try {
        await db.collection(THESES_COLLECTION)
            .doc(newThesisData.thesisId)
            .update({
                thesisAbstract: newThesisData.thesisAbstract,
                thesisFieldOfStudy: newThesisData.thesisFieldOfStudy,
                thesisLanguage: newThesisData.thesisLanguage,
                thesisTags: newThesisData.thesisTags,
                thesisType: newThesisData.thesisType,
                thesisTitle: newThesisData.thesisTitle,
                thesisUniID: newThesisData.thesisUniID,
                thesisDate: new Date(newThesisData.thesisDate),
                thesisType: newThesisData.thesisType,
                thesisUniName: uniName
            })
    } catch (error) {
        console.log(error);
        return false;
    }
    return true;
}

async function getThesis(thesisId) {
    const thesis = await db.collection(THESES_COLLECTION).doc(thesisId).get()
    return {
        thesisId: thesis.id,
        ...thesis.data()
    }
}

// =========================================================== Reports

async function addNewReport(data) {
    const uid = data.uid;
    const userData = await getUserDataById(uid);
    if (userData.strikes < 2) {
        const reporterName = userData.userFirstname + " " + userData.userLastname;
        console.log(reporterName);
        const dbReportData = {
            reportContent: data.reportdata.reportContent,
            reportReporterID: data.uid,
            reportThesisID: data.reportdata.reportThesisID,
            reporterName: reporterName,
            reportDate: new Date()
        }
        return db
            .collection(REPORTS_COLLECTION)
            .doc()
            .set(dbReportData)
    }
}



async function getAllReports() {
    //: Get The Name of reported Thesis
    //: Get The Name of ThesisAuthor
    //: Get The Strikes of Both Author and Reporter
    //Done
    const reports = []
    const reportsSnapshot = await db.collection(REPORTS_COLLECTION).get()
    for (const reportObj of reportsSnapshot.docs) {
        const reportedThesisInfo = await getThesis(reportObj.data().reportThesisID)
        const reportedThesisTitle = reportedThesisInfo.thesisTitle
        const thesisAuthorName = reportedThesisInfo.thesisAuthorName
        const thesisAuthorID = reportedThesisInfo.thesisAuthorID
        const authorStrikes = await getStrike(reportedThesisInfo.thesisAuthorID)
        const reporterStrikes = await getStrike(reportObj.data().reportReporterID)
        const report = {
            ...reportObj.data(),
            reportedThesisTitle: reportedThesisTitle,
            thesisAuthorName: thesisAuthorName,
            thesisAuthorID: thesisAuthorID,
            authorStrikes: authorStrikes,
            reporterStrikes: reporterStrikes,
            reportId: reportObj.id
        }
        reports.push(report)
    }
    return reports;
}


async function deleteReport(reportId) {
    return db
        .collection(REPORTS_COLLECTION)
        .doc(reportId)
        .delete()
}

async function getIsReported(data) {
    const userId = data.uid;
    const thesisId = data.thesisId;
    const allReports = await getAllReports()
    for (const report of allReports) {
        if (userId == report["reportReporterID"] && thesisId == report["reportThesisID"]) {
            return true
        }
    }
    return false
}
// =========================================================== Ratings

async function addNewRate(data) {
    const thesisId = data.thesisId;
    const uid = data.uid;
    const strike = await getStrike(uid);
    if (strike < 2) {
        const rateValue = data.rateValue;
        const thesisData = await getThesis(thesisId);
        const rates = thesisData["rates"];
        rates[uid] = Number(rateValue)

        let avgrate = 0
        let count = 0
        for (const [key, value] of Object.entries(rates)) {
            avgrate += value
            count += 1
        }
        avgrate = avgrate / count
        return db
            .collection(THESES_COLLECTION)
            .doc(thesisId)
            .update({ rates: rates, ratesAverage: avgrate })
    }
}

async function deleteUserRate(uid) {
    const userId = uid;
    const allThesis = await getAllTheses()
    //console.log(thesisSnapshot);
    for (const thesis of allThesis) {
        let rates = thesis["rates"]
        let avgrate = thesis["ratesAverage"]
        let count = Object.keys(thesis["rates"]).length
        const thesisId = thesis["thesisId"]
        console.log(thesisId);
        //console.log(rates);
        if (rates.hasOwnProperty(userId)) {
            delete rates[userId]
            console.log(rates);
            avgrate = 0
            count = 0
            for (const [key, value] of Object.entries(rates)) {
                avgrate += value
                count += 1
            }
            avgrate = avgrate / count
        }
        await db
            .collection(THESES_COLLECTION)
            .doc(thesisId)
            .update({ rates: rates, ratesAverage: avgrate })
    }
    return 1
}


// =========================================================== Comments

async function addNewComment(data) {
    const uid = data.uid;
    const userData = await getUserDataById(uid);

    const strike = await getStrike(uid)

    if (strike < 2) {
        console.log("I am here");
        const commentAuthorName = userData.userFirstname + " " + userData.userLastname;
        const dbCommentData = {
            commentAuthorID: uid,
            commentThesisID: data.commentdata.commentThesisID,
            commentBody: data.commentdata.commentBody,
            commentDate: new Date(data.commentdata.commentDate),
            commentAuthorName: commentAuthorName
        }
        return await db
            .collection(COMMENTS_COLLECTION)
            .doc()
            .set(dbCommentData)
    } else {
        return "users is striked"
    }
}

async function deleteComment(commentId) {
    return db
        .collection(COMMENTS_COLLECTION)
        .doc(commentId)
        .delete()
}


async function getComments(thesisId) {
    const commentsSnapshot = await db
        .collection(COMMENTS_COLLECTION)
        .where("commentThesisID", '==', thesisId)
        .get();
    const comments = []
    for (let commentObj of commentsSnapshot.docs) {
        const authUserData = await admin.auth().getUser(commentObj.data().commentAuthorID)
        const commenterImageURL = authUserData.photoURL
        const comment = {
            ...commentObj.data(),
            commentId: commentObj.id,
            commenterImageURL: commenterImageURL
        }
        comments.push(comment)
    }
    return comments;
}

// =========================================================== Admin Panel

async function strike(data) {

    async function deleteUserfromCollection(collectionName, uid, userIDField) {
        const docs = await db.collection(collectionName).where(userIDField, '==', uid).get();
        docs.forEach(async doc => {
            await db.collection(collectionName)
                .doc(doc.id)
                .delete()
        });
    }

    async function deleteThesisWithSavedThesis(collectionName, uid, userIDField) {
        const docs = await db.collection(collectionName).where(userIDField, '==', uid).get();
        docs.forEach(async doc => {
            await deleteThesis(doc.id)
        });
    }

    const thesisId = data.thesisId
    if (thesisId != undefined) {
        await deleteThesis(thesisId)
    }
    const uid = data.uid;
    const userData = await getUserInfo(uid)
    let strikes = userData.strikes

    //cheking the Strike of the User
    //Strike 1 or 2
    //Delete the Thesis and increase the Strike
    if (strikes == 0 || strikes == 1) {
        strikes += 1
        sendEmail(userData.userEmail, "HOLAAA WHATSS UP YOU SPAMMER DONT DO IT AGAIN OR ....")
        return db
            .collection(USERS_COLLECTION)
            .doc(uid)
            .update({ strikes: strikes })
    }

    //Strike 3 Ban User Delete account Delete its info from Users collection and send email
    else if (strikes == 2) {
        //Delete the profile photo of User which saved in Firebase Storage
        const storageFile = storage.bucket(BUCKETNAME).file(`userImages/${uid}.png`);

        storageFile
            .exists()
            .then((exists) => {
                if (exists[0]) {
                    storageFile.delete()
                }
            })
        //await admin.auth().deleteUser(uid)
        //user email disabled instead of deleting 
        await admin.auth().updateUser(uid, {
            disabled: true
        });
        //: Send Email
        sendEmail(userData.userEmail, "GOOD BYEE YOU LITTLE ANNOYING PANDA")
        await deleteUserfromCollection(COMMENTS_COLLECTION, uid, 'commentAuthorID');
        await deleteUserfromCollection(REPORTS_COLLECTION, uid, 'reportReporterID');
        await deleteThesisWithSavedThesis(THESES_COLLECTION, uid, 'thesisAuthorID');
        await deleteUserRate(uid)
        await db.collection(USERS_COLLECTION).doc(uid).delete()
        //Saving Banned Emails in an array in single document instead of saving each email as single document
        const oldBannedEmailsObj = (await db.collection(UTILS_COLLECTION).get()).docs[0];
        const docId = oldBannedEmailsObj.id;
        const bannedEmails = oldBannedEmailsObj.data().bannedUsers;
        bannedEmails.push(userData.userEmail);
        return db
            .collection(UTILS_COLLECTION)
            .doc(docId)
            .update({ bannedUsers: bannedEmails })
    }
}

async function getStrike(uid) {
    const userData = await getUserDataById(uid)
    const userStrike = userData.strikes;
    return userStrike
}

async function increaseInvalidReport(uid) {
    const userData = await getUserDataById(uid)
    let invalidReports = userData.invalidReports;
    invalidReports += 1
    if (invalidReports % 3 == 0) {
        await strike({ uid: uid })
    }
    return db
        .collection(USERS_COLLECTION)
        .doc(uid)
        .update({ invalidReports: invalidReports })
}


// =========================================================== Exports

module.exports.deleteAllUsers = deleteAllUsers;
module.exports.addNewUser = addNewUser;
module.exports.getAllUnis = getAllUnis;
module.exports.updateUser = updateUser;
module.exports.getAllTheses = getAllTheses;
module.exports.getUserInfo = getUserInfo;
module.exports.uploadUniImages = uploadUniImages;
module.exports.updateUserImage = updateUserImage;
module.exports.uploadThesis = uploadThesis;
module.exports.saveThesis = saveThesis;
module.exports.removeSavedThesis = removeSavedThesis;
module.exports.getSavedTheses = getSavedTheses;
module.exports.getUserTheses = getUserTheses;
module.exports.getAllTags = getAllTags;
module.exports.addViewer = addViewer;
module.exports.addNewReport = addNewReport;
module.exports.getComments = getComments;
module.exports.addNewTag = addNewTag;
module.exports.getAllReports = getAllReports;
module.exports.addNewComment = addNewComment;
module.exports.deleteComment = deleteComment;
module.exports.addNewRate = addNewRate;
module.exports.addAllDepartments = addAllDepartments;
module.exports.getAllDepartments = getAllDepartments;
module.exports.getUniversity = getUniversity;
module.exports.isThesisSaved = isThesisSaved;
module.exports.deleteThesis = deleteThesis;
module.exports.updateThesis = updateThesis;
module.exports.getThesis = getThesis;
//module.exports.banUser = banUser;
module.exports.deleteReport = deleteReport;
module.exports.strike = strike;
module.exports.deleteUserRate = deleteUserRate;
module.exports.increaseInvalidReport = increaseInvalidReport;
module.exports.getIsReported = getIsReported;
//module.exports.isUserBanned = isUserBanned;

// =========================================================== Private funcitons


async function getUserDataById(uid) {
    return (await db.collection(USERS_COLLECTION).doc(uid).get()).data()
}
async function getUniDataById(uniID) {
    const uni = await db.collection(UNIS_COLLECTION).doc(uniID).get()
    return uni.data()
}
