const express = require("express");
const router = express.Router();
const db = require('../database/db.js');

// ===========================================================
router.post("/addNewReview", function (req, res, next) {
    db.addNewReview(req.body)
        .then((status) => {
            return status ? res.sendStatus(200) : res.sendStatus(500);
        }).catch((error) => {
            console.log(error);
            return res.sendStatus(500)
        })
});

router.get("/deleteReview", function (req, res, next) {
    // just send a uid as a query 
    const commentId = req.query.commentId;
    console.log(commentId);
    db.deleteReview(commentId)
        .then((reviews) => {
            res.json(reviews)
        }).catch((error) => {
            console.log(error);
            return res.sendStatus(500)
        })
});

router.get("/getReviews", function (req, res, next) {
    // just send a uid as a query 
    const thesisId = req.query.thesisId;
    console.log(thesisId);
    db.getReviews(thesisId)
        .then((reviews) => {
            res.json(reviews)
        }).catch((error) => {
            console.log(error);
            return res.sendStatus(500)
        })
});

module.exports = router;

