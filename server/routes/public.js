const express = require("express");
const router = express.Router();
const db = require('../database/db.js');

// ===========================================================



router.get("/getAllUnis", function (req, res, next) {
    db.getAllUnis().then((result) => {
        res.send(result);
    }).catch((error) => {
        console.log(error)
        res.sendStatus(500);
    })
});

module.exports = router;

