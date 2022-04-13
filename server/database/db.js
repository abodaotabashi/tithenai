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
const reviews = 'reviews'; 


// =========================================================== Mange Users 

async function addNewUser(data) {
    uid = data.uid
    idToken = data.idToken
    dbUserData = {
        userAcademicStatus: data.userdata.academicStatus,
        userAdmin: data.userdata.admin,
        userFullname: data.userdata.fullname,
        userGender: data.userdata.gender,
        userTheses: [], // first time adding a user, not theses yet.
        userAdmin: false, // TODO: should this be false by default?
        userReports: [], 
        // userUniId: data.userdata.uniId // TODO: uncomment this when uniId is ready to use
    }

    // When user try to authenticate with google, they might exist in the database 
    // Check if the user exist before adding any new data

    return db
        .collection(USERS)
        .doc(uid)
        .get()
        .then((doc) => {
            if (doc.exists) {
                console.log("The user already exist in the database");
                return true
            } else {
                return db
                    .collection(USERS)
                    .doc(uid)
                    .set(dbUserData)
                    .then(() => { return true })
                    .catch((error) => {
                        console.log(error);
                        return false;
                    })
            }
        }).catch((error) => {
            console.log(error);
            return false;
        })
}

async function getUserInfo(uid){
    
    // getting the user
    return db.collection(USERS).doc(uid)
    .get()
    .then(async (doc)=> {
        const userData = doc.data()
        const uniId = userData.userUniId
        const userThesesIds = userData.userTheses

        // getting the uni of the user
        const uniSnapshot = await db.collection(UNIS).doc(uniId).get()
        const uni = uniSnapshot.data()

        // getting the theses of the user
        let theses = []; 
        for (const thesisId of userThesesIds) {
            const thesissnapshot = await db.collection(THESES).doc(thesisId).get()
            theses.push(thesissnapshot.data())
        }

        delete userData.uniId
        delete userData.userTheses

        const userInfo = {
            ...userData, 
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
            if (listUsersResult.pageToken) {
                deleteAllUsers(listUsersResult.pageToken);
            }
        })
        .catch((error) => {
            console.log('Error listing users:', error);
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

// function addUni(uni) {
//     db
//         .collection(UNIS)
//         .doc()
//         .set({
//             uniCountry: "Turkey",
//             uniName: uni.Name,
//             uniState: uni.State,
//             uniTheses: [],
//             uniType: uni.Type,
//             uniUrl: uni.URL
//         })
// }


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

// function addAllTheses() {
//     const theses = require('./theses.json')
//     const newTheses = []
//     theses.forEach(thesis => {
//         thesis.thesisDate = new Date(thesis.thesisDate)
//         newThesis = {
//             ...thesis,
//             thesisAutherID: "",
//             thesisUniID: "",
//             thesisUploadDate: new Date()
//         }
//         newTheses.push(newThesis)
//     });
//     // console.log(newTheses)

//     newTheses.forEach(thesis => {
//         db.collection(THESES)
//             .doc()
//             .set(thesis)
//     });
// }

// =========================================================== Exports

module.exports.deleteAllUsers = deleteAllUsers;
module.exports.addNewUser = addNewUser;
module.exports.getAllUnis = getAllUnis;
module.exports.getAllTheses = getAllTheses;
module.exports.getUserInfo = getUserInfo; 
// module.exports.addAllTheses = addAllTheses;
// module.exports.addUni = addUni;