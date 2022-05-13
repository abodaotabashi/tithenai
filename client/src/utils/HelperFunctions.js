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

export const stringifyByteSize = (bytes) => {
    const sizes = ['Bytes', 'KB', 'MB'];
    if (bytes === 0) return '0 Byte';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}