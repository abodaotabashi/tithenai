const express = require("express");
const router = express.Router();
const db = require('../database/db.js');
const { turkishtoEnglish } = require("../Utils/util.js");
const upload = require('multer')();

// ===========================================================

router.get("/search", function (req, res, next) {
    const query = turkishtoEnglish(req.query.query).toLowerCase()
    const dims = req.query.dimensions;
    const tags = req.query.tags;

    db.getAllTheses().then((theses) => {
        const searchedTheses = theses.filter(thesis => {

            // If there are tags, filter using them
            // If there are no tags, don't filter anything
            if (tags !== "nothing") {   //The server will get the string value "nothing" when there is no tag selected, otherwise it will get an array of tags
                if (tags.length > 0) {
                    let isContainTags = true;

                    tags.forEach(tag => {
                        isContainTags = thesis.thesisTags.includes(tag) && isContainTags;
                    });

                    // We filter out all the theses that don't contain the tags.
                    if (!isContainTags) {
                        return false;
                    }
                }
            }

            let isSearched = false;

            if (query !== "") {

                if (dims.includes('title')) {
                    const englishThesisTitle = turkishtoEnglish(thesis.thesisTitle).toLowerCase();
                    isSearched = englishThesisTitle.includes(query) || isSearched;
                }
                if (dims.includes('author')) {
                    const englishThesisAuthor = turkishtoEnglish(thesis.thesisAuthorName).toLowerCase();
                    isSearched = englishThesisAuthor.includes(query) || isSearched;
                }
                if (dims.includes('university')) {
                    const englishThesisUni = turkishtoEnglish(thesis.thesisUniName).toLowerCase();
                    isSearched = englishThesisUni.includes(query) || isSearched;
                }
                if (dims.includes('faculty')) {
                    const englishThesisFaculty = turkishtoEnglish(thesis.thesisFaculty).toLowerCase();
                    isSearched = englishThesisFaculty.includes(query) || isSearched;
                }
                if (dims.includes('language')) {
                    const englishThesisLanguage = turkishtoEnglish(thesis.thesisLanguage).toLowerCase();
                    isSearched = englishThesisLanguage.includes(query) || isSearched;
                }

                // TODO: When searching for a specific year, is it a range or a specific year?

            } else {
                isSearched = true;
            }

            return isSearched;
        })

        res.send(searchedTheses);
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500)
    })
    // return res.send("hello world");
});

router.post("/uploadThesis", function (req, res, next) {
    /* Example body 
    {
        thesisAutherID: "sK6ZvwH30gX1L0nQ4VQzCuF5sC02",
        thesisAbstract: "",
        thesisAuthorName: "Tithenai Tithenai1",
        thesisDate: "2020-10-21T13:28:06.419Z", 
        thesisFaculty: "CS", 
        thesisLanguage: "TR",
        thesisTags:["Model Selection", "Deep Nonparametric Clustering"], 
        thesisTitle: "How to use deep learning to train a deep learning model", 
        thesisUniID:"13DODS8bV4fDg7OvcEer",
        thesisUniName: "Türk Alman Üniversitesi",
        thesisUploadDate: "2020-10-21T13:28:06.419Z",
        thesisPdfBase64: "data:application/pdf;base64,JVBERi0xLjYNJ ..."
    }
    */
   
    db.uploadThesis(req.body)
        .then((status) => {
            return status ? res.sendStatus(200) : res.sendStatus(500);
        }).catch((error) => {
            console.log(error);
            return res.sendStatus(500)
        })
})

router.post("/saveThesis", function (req, res, next) {
    db.saveThesis(req.body)
        .then((status) => {
            return status ? res.sendStatus(200) : res.sendStatus(500);
        }).catch((error) => {
            console.log(error);
            return res.sendStatus(500)
        })
})

router.post("/removeSavedThesis", function (req, res, next) {
    db.removeSavedThesis(req.body)
        .then((status) => {
            return status ? res.sendStatus(200) : res.sendStatus(500);
        }).catch((error) => {
            console.log(error);
            return res.sendStatus(500)
        })
})

router.get("/getSavedTheses", function (req, res, next) {
    db.getSavedTheses(req.query)
        .then((theses) => {
            if (theses) {
                res.send(theses)
            } else {
                return res.sendStatus(500)
            }
        }).catch((error) => {
            console.log(error);
            return res.sendStatus(500)
        })
});

router.get("/getUserTheses", function (req, res, next) {
    db.getUserTheses(req.query)
        .then((theses) => {
            if (theses) {
                res.send(theses)
            } else {
                return res.sendStatus(500)
            }
        }).catch((error) => {
            console.log(error);
            return res.sendStatus(500)
        })
});

router.get("/getAllTags", function (req, res, next) {
    db.getAllTags(req.query)
    .then((tags) => {
        if (tags) {
            res.send(tags)
        } else {
            return res.sendStatus(500)
        }
    }).catch((error) => {
        console.log(error);
        return res.sendStatus(500)
    })
})

module.exports = router;