const express = require("express");
const router = express.Router();
const db = require('../database/db.js');
const { turkishtoEnglish } = require("../Utils/util.js");
const { body, validationResult } = require('express-validator');

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
                if (dims.includes('fieldOfStudy')) {
                    const englishThesisFieldOfStudy = turkishtoEnglish(thesis.thesisFieldOfStudy).toLowerCase();
                    isSearched = englishThesisFieldOfStudy.includes(query) || isSearched;
                }
                if (dims.includes('language')) {
                    const englishThesisLanguage = turkishtoEnglish(thesis.thesisLanguage).toLowerCase();
                    isSearched = englishThesisLanguage.includes(query) || isSearched;
                }
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
        "thesisAuthorID": "sK6ZvwH30gX1L0nQ4VQzCuF5sC02",
        "thesisAbstract": "",
        "thesisDate": "2020-10-21T13:28:06.419Z",
        "thesisType": "Undergraduate Thesis",
        "thesisFieldOfStudy": "CS",
        "thesisLanguage": "TR", //Or as Object
        "thesisTags":["Model Selection", "Deep Nonparametric Clustering"],
        "thesisTitle": "How to use deep learning to train a deep learning model",
        "thesisUniID":"13DODS8bV4fDg7OvcEer",
        "thesisUniName": "Türk Alman Üniversitesi",
        "thesisUploadDate": "2020-10-21T13:28:06.419Z",
        "thesisPdfBase64": "data:application/pdf;base64,JVBERi0xLjYNJ ...",
        "viewersList": [],
        "rates": {},
        "ratesAverage": 0
    }
    */

    db.uploadThesis(req.body)
        .then(() => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log(error);
            return res.sendStatus(500)
        })
})

router.post("/saveThesis", function (req, res, next) {
    /** Example body
     * {
     *  uid: "asdfasfdasdfasd",
     *  thesisId: "asdfasfasdfasd"
     * }
     */
    db.saveThesis(req.body)
        .then((status) => {
            return status ? res.sendStatus(200) : res.sendStatus(500);
        }).catch((error) => {
            console.log(error);
            return res.sendStatus(500)
        })
})

router.post("/removeSavedThesis", function (req, res, next) {
    /** Example body
     * {
     *  uid: "asdfasfdasdfasd",
     *  thesisId: "asdfasfasdfasd"
     * }
     */
    db.removeSavedThesis(req.body)
        .then((status) => {
            return status ? res.sendStatus(200) : res.sendStatus(500);
        }).catch((error) => {
            console.log(error);
            return res.sendStatus(500)
        })
})

router.get("/getSavedTheses", function (req, res, next) {
    /** Example query
     * {
     *  uid: "asdfasfdasdfasd"
     * }
     */
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
    // just send a uid as a query
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
    // no parameters are required
    db.getAllTags()
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

router.post("/addViewer", function (req, res, next) {
    /** Example body
     * {
     *  uid: "asdfasfdasdfasd",
     *  thesisId: "asdfasfasdfasd"
     * }
     */
    db.addViewer(req.body)
        .then((status) => {
            return status ? res.sendStatus(200) : res.sendStatus(500);
        }).catch((error) => {
            console.log(error);
            return res.sendStatus(500)
        })
})

router.post("/addNewTag", body('tag').exists().isString(), (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    } else {
        const tag = req.body.tag
        db.addNewTag(req.body.tag).then(() => {
            return res.status(201).json({ tag })
        }).catch((error) => {
            console.log(error);
            return res.sendStatus(500);
        })
    }
});

router.get("/getAllDepartments", (req, res) => {
    db.getAllDepartments().then((departments) => {
        return res.status(200).send(departments)
    }).catch((error) => {
        console.log(error);
        return res.sendStatus(500);
    })
})

router.post("/addAllDepartments", (req, res) => {
    db.addAllDepartments().then(() => {
        return res.status(201).json({ message: "OK" })
    }).catch((error) => {
        console.log(error);
        return res.sendStatus(500);
    })
})

router.get("/isThesisSaved", function (req, res, next) {
    db.isThesisSaved(req.query)
        .then((status) => {
            res.json(status)
        }).catch((error) => {
            console.log(error);
            return res.sendStatus(500)
        })
});

router.get("/deleteThesis", function (req, res, next) {
    // just send a uid as a query
    const deleteThesis = req.query.thesisId;
    db.deleteThesis(deleteThesis)
        .then((status) => {
            return status ? res.sendStatus(200) : res.sendStatus(500);
        }).catch((error) => {
            console.log(error);
            return res.sendStatus(500)
        })
});


router.post("/updateThesis", body(['thesisId', "thesisAbstract", "thesisFieldOfStudy",
    "thesisTitle", "thesisUniID", "thesisDate", "thesisType"]).exists().isString(), body("thesisTags").isArray(), (req, res) => {
        /*Example body
        {
        "thesisId":"Y3x0RZbw6bVbuvOmIPQW",
        "thesisAbstract": "gsdagdsahgfsdah",
        "thesisFieldOfStudy": "CS",
        "thesisLanguage": "TR",
        "thesisTags":["Model Selfsafsection", "fsafsa Nonfsag"],
        "thesisTitle": "How to use deep learning to trfsafsain a deep learning model",
        "thesisUniID":"0D8DEwNTPtM0bN5iCZPB",
        "thesisDate": "2020-10-21T13:28:06.419Z",
        "thesisType": "Undergraduate Thesis"
        }
        */
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        } else {
            db.updateThesis(req.body).then(() => {
                return res.status(201).json({ message: "OK" })
            }).catch((error) => {
                console.log(error);
                return res.sendStatus(500);
            })
        }
    });



router.get("/getThesis", function (req, res, next) {
    // just send a thesisId as a query
    const thesisId = req.query.thesisId;
    db.getThesis(thesisId)
        .then((thesis) => {
            return res.status(200).json(thesis)
        }).catch((error) => {
            console.log(error);
            return res.sendStatus(500)
        })
});

module.exports = router;