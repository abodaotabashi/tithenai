const express = require("express");
const router = express.Router();
const db = require('../database/db.js');

// ===========================================================

router.post("/addNewReport", function (req, res, next) {
    db.addNewReport(req.body)
        .then((status) => {
            return status ? res.sendStatus(200) : res.sendStatus(500);
        }).catch((error) => {
            console.log(error);
            return res.sendStatus(500)
        })
});


router.get("/getAllReports", function (req, res, next) {
    db.getAllReports().then((result) => {
        res.send(result);
    }).catch((error) => {
        console.log(error)
        res.sendStatus(500);
    })
});

module.exports = router;

