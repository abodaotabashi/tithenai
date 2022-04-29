// =========================================================== Setup
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");
const firebaseStorage = require("firebase-admin/storage");
const fs = require('fs');



const firebaseConfig = {
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "tithenai-23867.appspot.com"
}

const firebseApp = admin.initializeApp(firebaseConfig);
const db = admin.firestore();
const storage = firebaseStorage.getStorage(firebseApp);

//=========================================================== collection names 
const USERS = 'users';
const UNIS = 'universities';
const THESES = 'theses';
const REPORTS = 'reports';
const REVIEWS = 'reviews';
const BUCKETNAME = 'tithenai-23867.appspot.com'

const DEFAULT_UNI = {
    uniCountry: "",
    uniName: "",
    uniState: "",
    uniTheses: "",
    uniType: "",
    uniUrl: ""
}
// =========================================================== Manage Users

async function addNewUser(data) {
    uid = data.uid
    idToken = data.idToken
    dbUserData = {
        userUniversityID: data.userdata.userUniversityID,
        userAcademicStatus: data.userdata.userAcademicStatus,
        userFirstname: data.userdata.userFirstname,
        userLastname: data.userdata.userLastname,
        userGender: data.userdata.userGender,
        userTheses: [], // first time adding a user, no theses yet.
        userAdmin: false,
        userReports: [],
    }

    // When user try to authenticate with google, they might exist in the database
    // Check if the user exist before adding any new data

    return db
        .collection(USERS)
        .doc(uid)
        .get()
        .then((doc) => {
            return db
                .collection(USERS)
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
    return db.collection(USERS).doc(uid)
        .get()
        .then(async (doc) => {
            const authUserData = await admin.auth().getUser(uid)
            const firebaseUserData = doc.data()
            const uniID = firebaseUserData.userUniversityID
            const userThesesIds = firebaseUserData.userTheses

            // getting the uni of the user
            let uni = DEFAULT_UNI
            if (uniID) {
                const uniSnapshot = await db.collection(UNIS).doc(uniID).get();
                uni = {
                    uniId: uniID,
                    ...uniSnapshot.data()
                }
            }

            // getting the theses of the user
            let theses = [];
            for (const thesisId of userThesesIds) {
                const thesissnapshot = await db.collection(THESES).doc(thesisId).get();
                theses.push(thesissnapshot.data())
            }

            delete firebaseUserData.uniId
            delete firebaseUserData.userTheses

            const userInfo = {
                ...firebaseUserData,
                userEmail: authUserData.email,
                userPhotoURL: authUserData.photoURL, // undefined if there is no image
                userUniversity: uni,
                userTheses: theses
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

    db.collection(USERS)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                doc.ref.delete();
            });
        });
}

// TODO: update photo url, email, university
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
        await db.collection(USERS)
            .doc(newUserData.uid)
            .update({
                userFirstname: newUserData.userFirstname,
                userLastname: newUserData.userLastname,
                userAcademicStatus: newUserData.userAcademicStatus,
                userUniversityID: newUserData.userUniversityID
            })

        // TODO: change ids to newUserData.uid
        // 2. update user name in reports collection
        await updateNameInCollection(REPORTS, "H3oTJBNenKcZbvBZUSSpFMmACTw1", 'reportReporterID', "reporterName");

        // 3. update user name in reviews collection
        await updateNameInCollection(REVIEWS, "BJNZ5b1Lxw1hT3UmjTXw", 'reviewAuthorID', "reviewAuthorName");

        // 4. update user name in theses collection 
        await updateNameInCollection(THESES, "3tHhtdMqrnRfG6LULfHBC3VPlk03", 'thesisAutherID', "thesisAuthorName");

        // 5. update user data in auth
        // TODO: 1. photo url
        // 2. email

        admin.auth()
            .updateUser(newUserData.uid, {
                email: newUserData.userEmail,
                emailVerified: false,
                // userPhotoURL: ''
            })

    } catch (error) {
        console.log(error);
        return false;
    }
    return true;
}

// =========================================================== Universities

async function getAllUnis() {
    try {
        const querySnapshot = await db.collection(UNIS)
            .orderBy("uniName", "asc")
            .get();

        unis = []
        let counter = 0;
        querySnapshot.forEach((doc) => {
            const uniImgRef = storage.bucket(BUCKETNAME).file(`uniImages/${doc.id}.png`)
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
    // fileNames = fs.readdirSync('database/uniImages/');
    // fileNames.forEach(async(filename) => {
    //     await storage.bucket(BUCKETNAME).upload("database/uniImages/" + filename, {
    //         destination: "uniImages/" + filename,
    //     });
    // });
    const file = storage.bucket(BUCKETNAME).file("uniImages/0D8DEwNTPtM0bN5iCZPB.png")
    await file.makePublic()
    const publicUrl = file.publicUrl();
    console.log(publicUrl);
}

// =========================================================== Theses

async function getAllTheses() {
    return db
        .collection(THESES)
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

// =========================================================== Exports

module.exports.deleteAllUsers = deleteAllUsers;
module.exports.addNewUser = addNewUser;
module.exports.getAllUnis = getAllUnis;
module.exports.updateUser = updateUser;
module.exports.getAllTheses = getAllTheses;
module.exports.getUserInfo = getUserInfo;
module.exports.uploadUniImages = uploadUniImages;
// module.exports.addAllTheses = addAllTheses;
// module.exports.addUni = addUni;
