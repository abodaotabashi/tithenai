const express = require("express");
const router = express.Router();
const db = require('../database/db.js');

// ===========================================================


router.get("/getAllUnis", function (req, res, next) {
    db.getAllUnis().then((result) => {
        res.send(result);
    }).catch((error) => {
        console.log(error)
        res.sendStatus(200);
    })
});

// router.get("/addUnis", function (req, res, next) {
//     const unis = require('../database/TR_Unis.json')
//     unis.forEach(uni => {
//         db.addUni(uni); 
//     });
// 	res.sendStatus(200);
// });

module.exports = router;