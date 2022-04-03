var express = require("express");
var router = express.Router();
const db = require('../database/db.js');

// =========================================================== 

router.get("/", function (req, res, next) {
    return res.send("hello world");
});

router.post("/AddNewUser", function (req, res, next) {
    db.addNewUser(req.body)
    .then((status) =>{
        console.log(status);
        if (status === false){
            return res.sendStatus(500)
        }else{
            return res.sendStatus(200)
        }
    }).catch((error) => {
        console.log(error);
        return res.sendStatus(500) 
    })
});

router.get("/DeleteAllUsers", function (req, res, next) {
    db.deleteAllUsers(); 
	res.sendStatus(200); 
});

module.exports = router;