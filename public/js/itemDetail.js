var amount = 25;
var id = '2s';

function fillPage() {
    var URLid = getQueryVariable("id");
    console.log(URLid)
    if (URLid) {
        id = URLid;
        if (id == "m1s1s") {
            amount = 25;
            setName("Migration 1 | Shirt 1 | Shortsleeve");
            setPrice(amount);
            //setImage();
        } else if (id == "m1s1l"){
            amount = 30;
            setName("Migration 1 | Shirt 1 | Longsleeve");
            setPrice(amount);
            //setImage();
        } else {
            //throw error
        }
    }
}

function getQueryVariable(variable)
{
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
            var pair = vars[i].split("=");
            if(pair[0] == variable){return pair[1];}
    }
    return(false);
}

function setName(name) 
{
    var nameDiv = document.getElementById("name");
    nameDiv.innerHTML = name;
}

function setPrice(price) 
{
    var priceDiv = document.getElementById("price");
    priceDiv.innerHTML = "$" + price;
}

var form = document.getElementById("addToCart");
function submitForm() {
    var obj = JSON.stringify({"id": id, "price": amount, "number": 1});
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/apii/' + obj);
    xhr.send(obj);
    window.location.href = '/../cart.html';
}