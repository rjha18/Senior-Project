var obj = JSON.parse(decodeURIComponent(getCookie('cart')));
var products = document.getElementById("products");
for (var key in obj) {
    if (obj.hasOwnProperty(key) && key != "cost") {
        var currentPanel = document.getElementById("product");
            
        console.log(currentPanel);
        loadThenCloneFirst(key, obj[key], currentPanel);  
    }
}
document.getElementById("product").remove();
updateCartCost();

function getCookie(name) 
{
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}

function checkout() 
{
    window.location.href = '/checkout.html';
}

function loadThenCloneFirst(id, value, object, products) {
    console.log("hello");
    var price = 0;
    var datapoints = object.getElementsByClassName("datapoint");
    var productName = "Migration " + id.charAt(1) + " | Species " + id.charAt(3);
    if (id.charAt(4) == 's')
    {
        productName += " | Shortsleeve";
        price = 25;
    } 
    else 
    {
        productName += " | Longsleeve";
        price = 30;
    }
    
    var size = "";
    var sizeChar = id.charAt(5);
    if (sizeChar == 'S')
    {
        size = "Small";
    }
    else if (sizeChar == "M") 
    {
        size = "Medium";
    }
    else 
    {
        size = "Large";
    }

    datapoints[0].innerHTML = productName;
    datapoints[1].innerHTML = size;
    datapoints[2].innerHTML = value;
    datapoints[3].innerHTML = "$" + (value * price);
    datapoints[4].innerHTML = "$" + price;

    var cln = object.cloneNode(true);
    document.getElementById("products").appendChild(cln);
    object.setAttribute("id", id);
}

function updateCartCost() 
{
    var totalCost = 0;
    var individualCosts = document.getElementsByClassName("full-price");
    for (var i = 0; i < individualCosts.length; i++) 
    {
        totalCost += parseInt(individualCosts[i].innerHTML.substring(1), 10);
    }
    
    document.getElementById("totalCost").innerHTML = "$" + totalCost;
}