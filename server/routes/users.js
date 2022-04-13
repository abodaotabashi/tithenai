const express = require("express");
const router = express.Router();
const db = require('../database/db.js');

// ===========================================================

router.get("/", function (req, res, next) {
    return res.send("hello world");
});

router.post("/AddNewUser", function (req, res, next) {
    db.addNewUser(req.body)
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

router.get("/DeleteAllUsers", function (req, res, next) {
    db.deleteAllUsers();
    res.sendStatus(200);
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

module.exports = router;