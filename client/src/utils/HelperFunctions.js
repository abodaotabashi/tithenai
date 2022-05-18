import Languages from './Languages.js';

export const formatName = (name) => {
    const arr = name.split(" ");
    for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].toLowerCase().slice(1);
    }
    const newName = arr.join(" ");
    return newName;
}

export const sortAlphabetically = (property, languageCode) => {
    return function(a, b) {
        return a[property].localeCompare(b[property], languageCode)
    }
}

export const sortObjectsAscending = (property) => {
    return function(a, b) {
        if (a[property] > b[property]) {
            return 1;
        } else if (a[property] < b[property]) {
            return -1;
        }
        return 0;
    }
}

export const sortObjectsDescending = (property) => {
    return function(a, b) {
        if (a[property] < b[property]) {
            return 1;
        } else if (a[property] > b[property]) {
            return -1;
        }
        return 0;
    }
}

export const getAllLanguages = () => {
    return Languages.sort(sortObjectsAscending("nativeName"));
}

export const formatFirebaseDate = (date) => {
    return new Date(date._seconds * 1000).toLocaleDateString('nl-BE')
}

export const formatFirebaseDateAndTime = (firebaseDate) => {
    const dateObject = new Date(firebaseDate._seconds * 1000);
    const date = dateObject.toLocaleDateString('nl-BE');
    const time = (dateObject.getHours() < 10 ? "0"+dateObject.getHours().toString() : dateObject.getHours().toString())+":"+(dateObject.getMinutes() < 10 ? "0"+ dateObject.getMinutes().toString() : dateObject.getMinutes().toString());
    return date + " - " + time
}

export const stringifyByteSize = (bytes) => {
    const sizes = ['Bytes', 'KB', 'MB'];
    if (bytes === 0) return '0 Byte';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}