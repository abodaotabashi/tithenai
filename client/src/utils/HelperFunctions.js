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

export const sortObjectsAscending = (property, isDoubleProperty, secondProperty) => {
    if(isDoubleProperty === true) {
        return function(a, b) {
            if (a[property][secondProperty] > b[property][secondProperty]) {
                return 1;
            } else if (a[property][secondProperty] < b[property][secondProperty]) {
                return -1;
            }
            return 0;
        }
    } else {
        return function(a, b) {
            if (a[property] > b[property]) {
                return 1;
            } else if (a[property] < b[property]) {
                return -1;
            }
            return 0;
        }
    }
}

export const sortObjectsDescending = (property, isDoubleProperty, secondProperty) => {
    if(isDoubleProperty === true) {
        return function(a, b) {
            if (a[property][secondProperty] < b[property][secondProperty]) {
                return 1;
            } else if (a[property][secondProperty] > b[property][secondProperty]) {
                return -1;
            }
            return 0;
        }
    } else {
        return function(a, b) {
            if (a[property] < b[property]) {
                return 1;
            } else if (a[property] > b[property]) {
                return -1;
            }
            return 0;
        }
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

export const getChartBackgroundColors = () => {
    return [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(0, 139, 0, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(236, 100, 24, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(92, 0, 210, 0.2)',
    ];
}

export const getChartBorderColors = () => {
    return [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(0, 139, 0, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(236, 100, 24, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(92, 0, 210, 1)',
    ];
}

export const getTopKResearchers = (data, k) => {
    let stats = Object.values(data);
    stats = stats.sort(sortObjectsDescending("uniThesisCount", false));
    stats = stats.slice(0, k);
    return stats;
}

export const getTopTags = (data, k) => {
    let stats = [];
    for(const key in data){
        stats.push({"tagName":key, "counter":data[key]});
    }
    stats = stats.sort(sortObjectsDescending("counter", false));
    stats = stats.slice(0, k);
    return stats;
}

export const getMonthName = (date, languageCode) => {
    const formatter = new Intl.DateTimeFormat(languageCode, { month: 'long' });
    const month = formatter.format(date);
    return month;
}

export const getThisYearData = (data) => {
    let stats = [];
    for(const key in data){
        if(parseInt(key) === new Date().getFullYear()) {
            for(let i=1; i<13; i++){
                if(i < 10) {
                    const monthString = "0"+i;
                    if (typeof(data[key][monthString]) === "undefined") {
                        stats.push({"monthName":getMonthName(new Date(2000, i-1, 1), 'en'), "counter":0});
                    } else {
                        stats.push({"monthName":getMonthName(new Date(2000, i-1, 1), 'en'), "counter":data[key][monthString]});
                    }
                } else {
                    if (typeof(data[key][i]) === "undefined") {
                        stats.push({"monthName":getMonthName(new Date(2000, i-1, 1), 'en'), "counter":0});
                    } else {
                        stats.push({"monthName":getMonthName(new Date(2000, i-1, 1), 'en'), "counter":data[key][i]});
                    }
                }
            }
        }
    }
    if (stats.length === 0) {
        for(let i=0; i<12; i++){
            stats.push({"monthName":getMonthName(new Date(2000, i, 1), 'en'), "counter":0});
        }
    }
    return stats;
}
export const getYearsData = (data) => {
    let stats = [];
    for(const key in data){
        let sum = 0;
        Object.keys(data[key]).forEach(secondKey => {
            sum += data[key][secondKey];
        });
        stats.push({"year":key, "counter":sum});
    }
    return stats;
}