const express = require("express");
const router = express.Router();
const db = require('../database/db.js');

// ===========================================================

router.post("/addNewRate", function (req, res, next) {
    db.addNewRate(req.body)
        .then((status) => {
            return status ? res.sendStatus(200) : res.sendStatus(500);
        }).catch((error) => {
            console.log(error);
            return res.sendStatus(500)
        })
});



router.post("/deleteUserRate", function (req, res, next) {
    db.deleteUserRate(req.body.uid)
        .then((status) => {
            return status ? res.sendStatus(200) : res.sendStatus(500);
        }).catch((error) => {
            console.log(error);
            return res.sendStatus(500)
        })
});

module.exports = router;

