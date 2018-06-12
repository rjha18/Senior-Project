var amount = 25;
var id = '2s';

var URLid = getQueryVariable("id");
if (URLid) {
    id = URLid;
    document.getElementById("product").src = "Images/"+id+".jpg";
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
        amount = 25;
        setName("Migration 1 | Shirt 1 | Shortsleeve");
        setPrice(amount);
        //throw error
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

function submitForm() {
    var size = document.getElementById("size");
    var selectedValue = size.options[size.selectedIndex].text;
    var obj = JSON.stringify({"id": id+selectedValue, "price": amount, "number": 1});
    console.log("objj" + obj);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/apii/' + obj);
    xhr.send(obj);
    displayMessage();
}

function goToCart()
{
    window.location.href = '/cart.html';
}

function displayMessage() 
{
    var messageBar = document.getElementById("message");
    messageBar.removeAttribute("hidden");
    setTimeout(function () {
        messageBar.setAttribute("hidden", true);
    }, 3000);
    window.scrollTo(0,document.body.scrollHeight);    
}
function goToHome()
{
    window.location.href = '/';
}