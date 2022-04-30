// test 
// console.log(turkishtoEnglish('ğğĞĞÜÜüüŞŞşşÖÖööÇÇçç'))
function turkishtoEnglish (str) {
    return str
        .replace(/Ğ/g, "G")
        .replace(/ğ/g, "g") 
        .replace(/Ü/g, "U") 
        .replace(/ü/g, "u") 
        .replace(/Ş/g, "S") 
        .replace(/ş/g, "s") 
        .replace(/İ/g, "I") 
        .replace(/ı/g, "i") 
        .replace(/Ö/g, "O")
        .replace(/ö/g, "o") 
        .replace(/Ç/g, "C") 
        .replace(/ç/g, "c");
};


// sortAlphabetically("uniName", "tr"); 
function sortAlphabetically (property, languageCode){
    return function(a, b) {
        return a[property].localeCompare(b[property], languageCode)
    }
}

function formatBase64(base64File){
    return base64File.replace(/^data:image\/\w+;base64,/, "");
}

module.exports.turkishtoEnglish = turkishtoEnglish
module.exports.sortAlphabetically = sortAlphabetically
module.exports.formatBase64 = formatBase64