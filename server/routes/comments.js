const express = require("express");
const router = express.Router();
const db = require('../database/db.js');

// ===========================================================
router.post("/addNewComment", function (req, res, next) {
    db.addNewComment(req.body)
        .then((status) => {
            if(status === "users is striked"){
                return res.status(403).json({message: "users is striked"})
            }else{
                return res.sendStatus(200)
            }
        }).catch((error) => {
            console.log(error);
            return res.sendStatus(500); 
        })
});

router.get("/deleteComment", function (req, res, next) {
    // just send a uid as a query
    const commentId = req.query.commentId;
    db.deleteComment(commentId)
        .then((status) => {
            return status ? res.sendStatus(200) : res.sendStatus(500);
        }).catch((error) => {
            console.log(error);
            return res.sendStatus(500)
        })
});

router.get("/getComments", function (req, res, next) {
    // just send a thesisId as a query
    const thesisId = req.query.thesisId;
    db.getComments(thesisId)
        .then((comments) => {
            res.json(comments)
        }).catch((error) => {
            console.log(error);
            return res.sendStatus(500)
        })
});

module.exports = router;

