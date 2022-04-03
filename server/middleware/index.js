const admin = require("../routes/users.js");
const { getAuth } = require("firebase-admin/auth");

// class Middleware {
// 	async decodeToken(req, res, next) {
// 		const idToken = req.headers.authorization.split(' ')[1];
// 		getAuth()
// 			.verifyIdToken(idToken)
// 			.then((decodedToken) => {
// 				// const uid = decodedToken.uid;
// 				if (decodedToken) {
// 					console.log("user is authorized");
//                     req.user = decodedToken; 
// 					return next();
// 				}
// 				return res.json({ message: "Unauthorized" });
// 			})
// 			.catch((error) => {
// 				console.log(error);
// 				return res.json({ message: "Internal error" });
// 			});
// 	}
// }

// module.exports = new Middleware();