// =========================================================== Setup
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");
const firebaseStorage = require("firebase-admin/storage");
const fs = require('fs');
const { formatBase64 } = require("../Utils/util");



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
const REVIEWS_COLLECTION = 'reviews';
const BUCKETNAME_COLLECTION = 'tithenai-23867.appspot.com'

// =========================================================== Database Strings 
// Reporsts 
const REPORT_CONTENT = "reportContent"
const REPORT_REPORTER_ID = "reportReporterId"
const REPORT_THESIS_ID = "reportThesisId"
const REPORTER_NAME = "reporterName"
const REPORT_ID = "reportId"

// Reviews 
const REVIEW_AUTHOR_ID = "reviewAuthorId"
const REVIEW_AUTHOR_NAME = "reviewAuthorName"
const REVIEW_BODY = "reviewBody"
const REVIEW_RATING = "reviewRating"
const REVIEW_THESIS_ID = "reviewThesisId"

// Theses 
const THESIS_ABSTRACT = "thesisAbstract"
const THESIS_AUTHER_ID = "thesisAutherId"
const THESIS_AUTHOR_NAME = "thesisAuthorName"
const THESIS_DATE = "thesisDate"
const THESIS_FACULTY = "thesisFaculty"
const THESIS_LANGUAGE = "thesisLanguage"
const THESIS_PDF_URL = "thesisPdfUrl"
const THESIS_TAGS = "thesisTags"
const THESIS_TITLE = "thesisTitle"
const THESIS_UNI_ID = "thesisUniId"
const THESIS_UNI_NAME = "thesisUniName"
const THESIS_UPLOAD_DATE = "thesisUploadDate"
const THESIS_ID = "thesisId"

// Universities
const UNI_COUNTRY = "uniCountry"
const UNI_NAME = "uniName"
const UNI_STATE = "uniState"
const UNI_THESES = "uniTheses"
const UNI_TYPE = "uniType"
const UNI_URL = "uniUrl"
const UNI_ID = "uniId"

// Users 
const USER_LASTNAME = "userLastname"
const USER_FIRSTNAME = "userFirstname"
const USER_UNI_ID = "userUniId"
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
    uid = data.uid
    idToken = data.idToken
    dbUserData = {
        userUniID: data.userdata.userUniversityID,
        userAcademicStatus: data.userdata.userAcademicStatus,
        userFirstname: data.userdata.userFirstname,
        userLastname: data.userdata.userLastname,
        userGender: data.userdata.userGender,
        userTheses: [], // first time adding a user, no theses yet.
        userAdmin: false,
        userReports: [],
        userSavedTheses: []
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
                    uniId: uniID,
                    ...uniSnapshot.data()
                }
            }
            // TODO: change this 
            // getting the theses of the user

            const thesesSnapshot = await db.collection(THESES_COLLECTION).where("thesisAutherID", '==', uid).get();
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

        // 3. update user name in reviews collection
        await updateNameInCollection(REVIEWS_COLLECTION, newUserData.uid, 'reviewAuthorID', "reviewAuthorName");

        // 4. update user name in theses collection 
        await updateNameInCollection(THESES_COLLECTION, newUserData.uid, 'thesisAutherID', "thesisAuthorName");

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
        const imageBase64 = formatBase64(data.imageBase64)
        const buf = new Buffer.from(imageBase64, 'base64');
        const file = storage.bucket(BUCKETNAME_COLLECTION).file(`userImages/${uid}.png`);
        await file.save(buf);
        const publicUrl = await file.getSignedUrl({
            action: 'read',
            expires: '03-17-2025', // TODO: make this dynamic 
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

// =========================================================== Universities

async function getAllUnis() {
    try {
        const querySnapshot = await db.collection(UNIS_COLLECTION)
            .orderBy("uniName", "asc")
            .get();

        unis = []
        let counter = 0;
        querySnapshot.forEach((doc) => {
            const uniImgRef = storage.bucket(BUCKETNAME_COLLECTION).file(`uniImages/${doc.id}.png`)
            const uniImageUrl = uniImgRef.publicUrl();
            uni = {
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
    fileNames = fs.readdirSync('database/uniImages/');
    fileNames.forEach(async (filename) => {
        await storage.bucket(BUCKETNAME_COLLECTION).upload("database/uniImages/" + filename, {
            destination: "uniImages/" + filename,
        });
    });
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
    const uid = thesisData.thesisAutherID;
    const thesisPdfBase64 = thesisData.thesisPdfBase64;
    delete thesisData.uid;
    delete thesisData.thesisPdfBase64;
    thesisData.thesisUploadDate = new Date(thesisData.thesisUploadDate)
    thesisData.thesisDate = new Date(thesisData.thesisDate)

    try {
        // add new thesis 
        const addedThesis = await db.collection(THESES_COLLECTION).add(thesis)

        // TODO: get a real pdf file as Base64
        const pdfFile = await fs.readFileSync('database/myThesis.pdf', 'base64');
        const buf = new Buffer.from(pdfFile, 'base64');
        const file = storage.bucket(BUCKETNAME_COLLECTION).file(`theses/${addedThesis.id}.pdf`);
        await file.save(buf);
        const publicUrl = await file.getSignedUrl({
            action: 'read',
            expires: '03-09-2491',
        });

        // update document with the url
        await db.collection(THESES_COLLECTION).doc(addedThesis.id).update({
            thesisPdfUrl: publicUrl
        })

    } catch (error) {
        console.log(error);
        return false;
    }
    return true
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