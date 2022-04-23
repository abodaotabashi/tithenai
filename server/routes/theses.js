const express = require("express");
const router = express.Router();
const db = require('../database/db.js');
const { turkishtoEnglish } = require("../Utils/util.js");

// ===========================================================

router.get("/search", function (req, res, next) {
    const query = turkishtoEnglish(req.query.query).toLowerCase()
    const dims = req.query.dimensions;
    const tags = req.query.tags;


    db.getAllTheses().then((theses) => {
        const searchedTheses = theses.filter(thesis => {

            // If there are tags, filter using them
            // If there are no tags, don't filter anything

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

module.exports = router;