// =========================================================== Setup

const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

db = admin.firestore()

// =========================================================== Manage Users

async function addNewUser(data) {
    // console.log(data);
    uid = data.uid
    idToken = data.idToken
    dbUserData = {
        userUniversityID: data.userdata.universityID,
        userAcademicStatus: data.userdata.academicStatus,
        userAdmin: data.userdata.admin,
        userFullname: data.userdata.fullname,
        userGender: data.userdata.gender,
        userTheses: [], // first time adding a user, not theses yet.
        userAdmin: false // This value is false by default which means that this user is not an adminstrator.
    }

    // When user try to authenticate with google, they might exist in the database
    // Check if the user exist before adding any new data

    return db
        .collection('users')
        .doc(uid)
        .get()
        .then((doc) => {
            if (doc.exists) {
                console.log("The user already exist in the database");
                return true
            } else {
                return db
                    .collection('users')
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

    db.collection('users')
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                doc.ref.delete();
            });
        });
}


function getUser() {
    return db
        .collection("users")
        .doc("wu7kefnFETdjYt1OlWf4qzD38Tj1")
        .get()
        .then((doc) => {
            console.log(doc)
            return doc;
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
        .collection("universities")
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

function addUni(uni) {
    db
        .collection('universities')
        .doc()
        .set({
            uniCountry: "Turkey",
            uniName: uni.Name,
            uniState: uni.State,
            uniTheses: [],
            uniType: uni.Type,
            uniUrl: uni.URL
        })
}

// =========================================================== Exports

module.exports.deleteAllUsers = deleteAllUsers;
module.exports.addNewUser = addNewUser;
module.exports.getAllUnis = getAllUnis;
module.exports.addUni = addUni;
module.exports.getUser = getUser;
module.exports.updateUser = updateUser;

