function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}

function printCookie() {
    var obj = decodeURI(getCookie('cart')).split("\"");
    console.log(obj);
    for (var i = 0; i < obj.length; i++) {
        obj.splice(i, 1);
    }
    console.log(obj);
}