var express = require("express");
var router = express.Router();
const db = require('../database/db.js');

// =========================================================== 

router.get("/", function (req, res, next) {
    return res.send("hello world");
});

router.post("/addNewUser", function (req, res, next) {
    db.addNewUser(req.body)
        .then((status) => {
            if (status === false) {
                return res.sendStatus(500)
            } else {
                return res.sendStatus(200)
            }
        }).catch((error) => {
            console.log(error);
            return res.sendStatus(500)
        })
});

router.get("/deleteAllUsers", function (req, res, next) {
    db.deleteAllUsers();
    res.sendStatus(200);
});

router.get("/getUserInfo", function (req, res, next) {
    db.getUserInfo(req.body.uid)
        .then((userInfo) => {
            if(userInfo){
                res.send(userInfo)
            }else{
                return res.sendStatus(500)
            }
        }).catch((error) => {
            console.log(error);
            return res.sendStatus(500)
        })
});

module.exports = router;