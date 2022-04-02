var express = require("express");
var router = express.Router();



// =========================================================== 

/* GET home page. */
router.get("/", function (req, res, next) {
    // console.log(req.user);
    // console.log(req);
	// return res.send("hello world boy");
    console.log("1")
});

router.get("/AddNewUser", function (req, res, next) {
    // console.log(req.user);
    console.log("2")
    // console.log(req);
	// return res.send("hello world boy");
});

module.exports = router;