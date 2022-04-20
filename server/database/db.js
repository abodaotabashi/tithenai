// =========================================================== Setup

const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

db = admin.firestore()

// collection names 

const USERS = 'users'; 
const UNIS = 'universities'; 
const THESES = 'theses'; 
const REPORTS = 'reports'; 
const REVIEWS = 'reviews';

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
                uni = uniSnapshot.data()
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


async function getUser(tokenID) {
    const uid = await getUniqueID(tokenID)
    return db
        .collection("users")
        .doc(uid)
        .get()
        .then((docRef) => {
            return docRef.data();
        }).catch((error) => {
            console.log(error);
            return false;
        })
}

function updateUser(user) {
    return db
        .collection('users')
        .doc("wu7kefnFETdjYt1OlWf4qzD38Tj1")
        .set({
            userAcademicStatus: user.academicStatus,
            userAdmin: user.admin,
            userFullname: user.fullname,
            userGender: user.gender,
            userTheses: user.userTheses,
            //TODO: Update University ID
        })
}

// =========================================================== Universities

async function getAllUnis() {
    return db
        .collection(UNIS)
        .orderBy("uniName", "asc")
        .get()
        .then((querySnapshot) => {
            unis = []
            querySnapshot.forEach((doc) => {
                uni = {
                    ...doc.data(),
                    uniId: doc.id
                }
                unis.push(uni)
            });
            return unis;
        }).catch((error) => {
            console.log(error);
            return false;
        })
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
// module.exports.addAllTheses = addAllTheses;
// module.exports.addUni = addUni;
