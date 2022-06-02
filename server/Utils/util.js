const nodemailer = require('nodemailer');
require("dotenv").config();

// test 
// console.log(turkishtoEnglish('ğğĞĞÜÜüüŞŞşşÖÖööÇÇçç'))
function turkishtoEnglish(str) {
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
function sortAlphabetically(property, languageCode) {
    return function (a, b) {
        return a[property].localeCompare(b[property], languageCode)
    }
}

function formatBase64(base64File) {
    return base64File.replace(/^data:image\/\w+;base64,/, "");
}

function formatFirebaseDate(date, format) {
    if (format === "year") {
        return new Date(date._seconds * 1000).getFullYear().toString()
    } else if (format === "month") {
        return String(new Date(date._seconds * 1000).getMonth() + 1).padStart(2, '0')
    }
}

/**
 * @param {*} receiver is the email of the receiver 
 * @param {*} content is the content of the email, which can be plain text or html
 * @returns "email was not sent" or "email was sent"
 * @example sendEmail("yourMail@gmail.com", "<b>hi this is a test</b>")
 * @description 
 */

async function sendEmail(receiver, content) {
    let transporter = nodemailer.createTransport({
        service: 'hotmail',
        port: 587,
        secure: false,
        auth: {
            user: "tithenai@outlook.com",
            pass: process.env.EMAIL_PASSWORD // TODO: add .env to the build environment
        },
    });
    const options = {
        from: 'tithenai@outlook.com',
        to: receiver,
        subject: "Tithenai",
        text: "",
        html: content,
    }
    const info = await transporter.sendMail(options);
    if(info.rejected.length !== 0){
        return "email was not sent"
    }else{
        return "email was sent"
    }
}



module.exports.turkishtoEnglish = turkishtoEnglish
module.exports.sortAlphabetically = sortAlphabetically
module.exports.formatBase64 = formatBase64
module.exports.formatFirebaseDate = formatFirebaseDate
