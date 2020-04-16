export const Utility = {
    getCookie: (name) => {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length == 2) return parts.pop().split(";").shift();
    },
    setCookie: (cname, cvalue, exdays) => {
        var d = new Date();

        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));

        var expires = "expires=" + d.toUTCString();

        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    },
    validateEmail: (email) => {
        const trimWhitespaceLowercase = email.replace(/\s+/g, '').toLowerCase();
        const regEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (regEx.test(trimWhitespaceLowercase)) {
            return trimWhitespaceLowercase;
        }

        return false;
    },
    isNumber: (n) => {
        return !isNaN(parseFloat(n)) && isFinite(n);
    },
    isString: (s) => {
        return typeof s === 'string';
    },
    loopThroughItems: (items, callback) => {
        for (let itemKey in items) {
            callback(items[itemKey], itemKey)
        }
    },
    clone: (obj) => {
        if (obj === null || typeof obj !== "object") {
            return obj;
        }
        if (obj instanceof Date) {
            return new Date(obj.getTime());
        }
        if (Array.isArray(obj)) {
            let clonedArr = [];
            obj.forEach(function (element) {
                clonedArr.push(Utility.clone(element))
            });
            return clonedArr;
        }
        let clonedObj = new obj.constructor();

        for (let prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                clonedObj[prop] = Utility.clone(obj[prop]);
            }
        }

        return clonedObj;
    },
};