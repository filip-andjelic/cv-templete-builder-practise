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
    }
};