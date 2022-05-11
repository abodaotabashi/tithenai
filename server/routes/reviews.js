const express = require("express");
const router = express.Router();
const db = require('../database/db.js');

// ===========================================================

router.get("/getReviews", function (req, res, next) {
    // just send a uid as a query 
    const thesesId = req.query.thesesId;
    db.getReviews(thesesId)
        .then((reviews) => {
            if (reviews) {
                res.send(reviews)
            } else {
                return res.sendStatus(500)
            }
        }).catch((error) => {
            console.log(error);
            return res.sendStatus(500)
        })
});

module.exports = router;

