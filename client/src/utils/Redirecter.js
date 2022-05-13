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

export const redirectToMyPapersPage = (navigator) => {
    navigator("/myPapers");
}

export const redirectToUploadThesisPage = (navigator) => {
    navigator("/upload");
}