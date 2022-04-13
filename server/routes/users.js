const express = require("express");
const router = express.Router();
const db = require('../database/db.js');

// =========================================================== Endpoints 

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

router.get("/getUser", async function (req, res, next) {
    await db.getUser(req.query.tokenID).then((result) => {
        res.send(result);
    }).catch((error) => {
        console.log(error)
        res.sendStatus(200);
    })
});

router.post("/updateUser", function (req, res, next) {
    db.updateUser(req.body)
        .then((status) => {
            console.log(status);
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

// =========================================================== Testing endpoints 

router.get("/", function (req, res, next) {
    return res.send("hello world");
});

router.get("/deleteAllUsers", function (req, res, next) {
    db.deleteAllUsers();
    res.sendStatus(200);
});

// ===========================================================

module.exports = router;