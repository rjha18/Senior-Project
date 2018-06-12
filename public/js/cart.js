var cookie = getCookie('cart');
console.log(cookie);
if (!cookie || decodeURIComponent(cookie) === "{}")
{
    emptyCart();
} else {
    var obj = JSON.parse(decodeURIComponent(cookie));
    var products = document.getElementById("products");
    for (var key in obj) {
        if (obj.hasOwnProperty(key) && key != "cost") {
            var currentPanel = document.getElementById("product");
                
            console.log(currentPanel);
            loadThenCloneFirst(key, obj[key], currentPanel, products);  
        }
    }
    document.getElementById("product").remove();
    updateCartCost();

}

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
    datapoints[0].src = "Images/"+id.substring(0,id.length-1)+".jpg";
    datapoints[1].innerHTML = productName;
    datapoints[2].innerHTML = size;
    datapoints[3].innerHTML = value;
    datapoints[4].innerHTML = "$" + (value * price);
    datapoints[5].innerHTML = "$" + price;

    var cln = object.cloneNode(true);
    var adjusts = object.getElementsByClassName("qty");
    console.log("adjusts", adjusts);
    adjusts[0].onclick = function () {decrement(adjusts[1], price, datapoints[4], id)};
    adjusts[2].onclick = function () {increment(adjusts[1], price, datapoints[4], id)};

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

function increment(count, price, totalCost, id)
{
    count.innerHTML = parseInt(count.innerHTML, 10) + 1;
    totalCost.innerHTML = "$" + (parseInt(totalCost.innerHTML.substring(1), 10) + price);
    updateCartCost();
    updateCookie(1, id, price);
}

function decrement(count, price, totalCost, id) 
{
    count.innerHTML = parseInt(count.innerHTML, 10) - 1;
    totalCost.innerHTML = "$" + (parseInt(totalCost.innerHTML.substring(1), 10) - price);
    updateCartCost();
    updateCookie(-1, id, price);
    if (count.innerHTML <= 0)
    {
        removePanel(id);
    }
}

function updateCookie(change, id, price) 
{
    var obj = JSON.stringify({"id": id, "price": price, "number": change});
    console.log("update id=" + id + price);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/apii/' + obj);
    xhr.send(obj);
}

function removePanel(id) 
{
    var list = document.getElementById("products");
    document.getElementById(id).remove();
}

function emptyCart() 
{
    document.getElementById("product").setAttribute("hidden", true);
    document.getElementById("site-footer").setAttribute("hidden", true);
}

function goToHome()
{
    window.location.href = '/home.html';
}