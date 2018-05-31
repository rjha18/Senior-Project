var amount = 25;
var id = '2s';

var form = document.getElementById("addToCart");
function submitForm() {
    price(amount);
    description(id);
    number(1);
    
    var formData = new FormData( form );
    
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/apii');
    xhr.send(JSON.stringify(formData));
    console.log('xd' + JSON.stringify(formData));
    window.location.href = '/../cart.html';
}

function price(price) {
    var price = document.createElement('input');
    price.setAttribute('type', 'hidden');
    price.setAttribute('name', 'price');
    price.setAttribute('value', amount);
    form.appendChild(price);
}

function description(itemDescription) {
    var description = document.createElement('input');
    description.setAttribute('type', 'hidden');
    description.setAttribute('name', 'itemDescription');
    description.setAttribute('value', itemDescription);
    form.appendChild(description);
}

function number(numberOfItems) {
    var number = document.createElement('input');
    number.setAttribute('type', 'hidden');
    number.setAttribute('name', 'amount');
    number.setAttribute('value', numberOfItems);
    form.appendChild(number);
}