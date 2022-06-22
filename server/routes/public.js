const express = require("express");
const router = express.Router();
const db = require('../database/db.js');

// ===========================================================

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

router.get("/getAllUnis", function (req, res, next) {
    db.getAllUnis().then((result) => {
        res.send(result);
    }).catch((error) => {
        console.log(error)
        res.sendStatus(500);
    })
});

module.exports = router;

