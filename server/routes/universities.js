const express = require("express");
const router = express.Router();
const db = require('../database/db.js');
const { turkishtoEnglish } = require("../Utils/util.js");

// ===========================================================

router.get("/getAllUnis", function (req, res, next) {
    db.getAllUnis().then((result) => {
        res.send(result);
    }).catch((error) => {
        console.log(error)
        res.sendStatus(200);
    })
});

router.get("/search", function (req, res, next) {

    /*
        Example body: 
        {"qurey": "Turk", "dimensions": ["state", "country", "name"]}
    */

    const query = turkishtoEnglish(req.body.query).toLowerCase()
    const dims = req.body.dimensions

    db.getAllUnis().then((unis) => {
        const searchedUnis = unis.filter(uni => {

            let isSearched = false; 
            if(dims.includes('state')){
                const englishStateName = turkishtoEnglish(uni.uniState).toLowerCase(); 
                isSearched = englishStateName.includes(query) || isSearched; 
            }
            if(dims.includes('country')){
                const englishCountryName = turkishtoEnglish(uni.uniCountry).toLowerCase(); 
                isSearched = englishCountryName.includes(query) || isSearched;
            }
            if(dims.includes('name')){
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

module.exports = router;


// =========================================================== Not used 

// router.get("/addUnis", function (req, res, next) {
//     const unis = require('../database/TR_Unis.json')
//     unis.forEach(uni => {
//         db.addUni(uni); 
//     });
// 	res.sendStatus(200);
// });

// router.get("/thesis", function (req, res, next) {
//     db.addAllTheses(); 
//     res.sendStatus(200)
// }); 
