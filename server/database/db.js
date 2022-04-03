// =========================================================== Setup

const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

db = admin.firestore()

// =========================================================== Mange Users 

async function addNewUser(data){
    console.log(data);
    uid = data.uid
    idToken = data.idToken
    dbUserData = {
        academicStatus: data.userdata.academicStatus,
        admin: data.userdata.admin, 
        fullname: data.userdata.fullname, 
        gender: data.userdata.gender,
        userTheses: [] // first time adding a user, not theses yet.
    }

    return db
    .collection('users')
    .doc(uid)
    .set(dbUserData)
    .then(() => {return true})
    .catch((error) => {
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
        }).finally(() => {
            admin.auth().deleteUsers(uids);
        });
}

module.exports.deleteAllUsers = deleteAllUsers; 
module.exports.addNewUser = addNewUser; 