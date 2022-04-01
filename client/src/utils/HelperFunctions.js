export const FormatName = (name) => {
    const arr = name.split(" ");
    for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].toLowerCase().slice(1);
    }
    const newName = arr.join(" ");
    return newName;
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