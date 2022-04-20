const express = require("express");
const router = express.Router();

// ===========================================================

// to deal with the error message of not getting an icon when fetching data
router.get('/images/icons/gear.png', (req, res) => res.status(204));

router.get("/", function (req, res, next) {
    return res.send("hello world");
});

module.exports = router;