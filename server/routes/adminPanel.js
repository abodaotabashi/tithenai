const express = require("express");
const router = express.Router();
const db = require('../database/db.js');

// ===========================================================

router.post("/strike", function (req, res, next) {
    db.strike(req.body)
        .then((status) => {
            return status ? res.sendStatus(200) : res.sendStatus(500);
        }).catch((error) => {
            console.log(error);
            return res.sendStatus(500)
        })
});

router.post("/increaseInvalidReport", function (req, res, next) {
    db.increaseInvalidReport(req.body.uid)
        .then((status) => {
            return status ? res.sendStatus(200) : res.sendStatus(500);
        }).catch((error) => {
            console.log(error);
            return res.sendStatus(500)
        })
});

module.exports = router;

