const express = require("express");
const router = express.Router();
const db = require('../database/db.js');

// ===========================================================

// to deal with the error message of not getting an icon when fetching data
router.get('/images/icons/gear.png', (req, res) => res.status(204));

module.exports = router;