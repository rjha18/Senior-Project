var amount = 25;
var id = '';

var URLid = getQueryVariable("id");
if (URLid) {
    id = URLid;
    var image = document.getElementById("product");
    image.src = "Images/"+id+".jpg";
    image.addEventListener("mouseover", function () {image.src = "Images/"+id+"b.jpg"}, false);
    image.addEventListener("mouseout", function () {image.src = "Images/"+id+".jpg"}, false);

    if (id == "ebwpt") {
        amount = 35;
        setName ("Exotic Birds Wanted Pink SS");
        setPrice(amount);
    } else if (id == "ebwwt") {
        amount = 35;
        setName ("Exotic Birds Wanted White SS");
        setPrice(amount);
    } else if (id == "ebwws") {
        amount = 50;
        setName ("Exotic Birds Wanted White Sweatshirt");
        setPrice(amount);
    } else {
        amount = null;
        setName ("Item Not Found")
        setPrice(amount);
        document.getElementById("button").style.display = 'none';
        image.style.display = 'none';
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
    // window.scrollTo(0,document.body.scrollHeight);    
}
function goToHome()
{
    window.location.href = '/';
}
