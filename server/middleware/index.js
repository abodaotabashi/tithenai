const admin = require("../routes/users.js");
const { getAuth } = require("firebase-admin/auth");

class Middleware {
    async isAuthenticated(req, res, next) {
        const idToken = req.headers['authorization'];
        if(!idToken){
            return res.json({ message: "Unauthorized" });
        }else{
            getAuth()
                .verifyIdToken(idToken)
                .then((decodedToken) => {
                    // const uid = decodedToken.uid;
                    if (decodedToken) {
                        console.log("user is authorized");
                        req.user = decodedToken;
                        return next();
                    }
                    return res.json({ message: "Unauthorized" });
                })
                .catch((error) => {
                    console.log(error.message);
                    return res.json({ message: "Unauthorized" });
                });
        }
    }
}

module.exports = new Middleware();