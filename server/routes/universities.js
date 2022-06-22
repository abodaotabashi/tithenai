const { json } = require("express");
const express = require("express");
const router = express.Router();
const db = require('../database/db.js');
const { turkishtoEnglish, sortAlphabetically } = require("../Utils/util.js");
const { validationResult, query } = require('express-validator');

// ===========================================================

router.get("/search", function (req, res, next) {
    const query = turkishtoEnglish(req.query.query).toLowerCase()
    const dims = req.query.dimensions

    db.getAllUnis().then((unis) => {
        const searchedUnis = unis.filter(uni => {
            let isSearched = false;
            if (dims.includes('state')) {
                const englishStateName = turkishtoEnglish(uni.uniState).toLowerCase();
                isSearched = englishStateName.includes(query) || isSearched;
            }
            if (dims.includes('country')) {
                const englishCountryName = turkishtoEnglish(uni.uniCountry).toLowerCase();
                isSearched = englishCountryName.includes(query) || isSearched;
            }
            if (dims.includes('name')) {
                const englishUniName = turkishtoEnglish(uni.uniName).toLowerCase();
                isSearched = englishUniName.includes(query) || isSearched;
            }
            return isSearched;
        })

        res.send(searchedUnis);
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
});

router.get("/getUniNames", function (req, res, next) {
    db.getAllUnis().then((unis) => {
        const uniNames = unis.map(uni => {
            return {
                uniId: uni.uniId,
                uniName: uni.uniName
            }
        })
        res.send(uniNames.sort(sortAlphabetically("uniName", "tr")));
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
})

router.get("/uploadUniImages", function (req, res, next) {
    db.uploadUniImages();
    res.sendStatus(200);
})

router.get("/getUniversity", query("id").exists(), (req, res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.sendStatus(400).json(errors);
    }else{
        const uniId = req.query.id;
        db.getUniversity(uniId).then((uni) => {
            return res.status(200).json(uni);
        }).catch((error) => {
            console.log(error);
            return res.sendStatus(500);
        })
    }
}); 

module.exports = router;