export const redirectToRegisterPage = (navigator) => {
    navigator("/register");
}

export const redirectToLoginPage = (navigator) => {
    navigator("/login");
}

export const redirectToMainPage = (navigator) => {
    navigator("/");
}

export const redirectToMyProfilePage = (navigator) => {
    navigator("/myProfile");
}

export const redirectToSearchResultsPage = (navigator, resultType, results, searchingValues) => {
    navigator("/searchResults", {
        state: {
            resultType: resultType,
            results: results,
            searchingValues: searchingValues,
        }
    });
}

export const redirectToSavedListPage = (navigator) => {
    navigator("/savedList")
}

export const redirectToMyPapersPage = (navigator) => {
    navigator("/myPapers");
}

export const redirectToUploadThesisPage = (navigator) => {
    navigator("/upload");
}

export const redirectToViewThesisPage = (navigator, thesisId) => {
    navigator("/view", {
        state: {
            thesisId: thesisId,
        }
    });
}

export const redirectToUniversityProfilePage = (navigator, UniversityID) => {
    navigator("/university", {
        state: {
            universityID: UniversityID,
        }
    });
}

export const redirectToAdminPanelPage = (navigator) => {
    navigator("/adminPanel");
}