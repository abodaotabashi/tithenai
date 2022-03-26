var express = require("express");
var router = express.Router();


// =========================================================== 

const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json"); 

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = router;

// ===========================================================

/* GET home page. */
router.get("/", function (req, res, next) {
    console.log(req.user);
	return res.send("hello world boy");
});