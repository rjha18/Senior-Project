var stripe = Stripe('pk_live_8NWtBaZPTXhOlgFotbdEOOd3');
var elements = stripe.elements();
// Custom styling can be passed to options when creating an Element.
var style = {
    base: {
        // Add your base input styles here. For example:
        fontSize: '16px',
        color: "#32325d",
    }
};

// Create an instance of the card Element.
var card = elements.create('card', { style: style });

function checkEnter(e){
    e = e || event;
    var txtArea = /textarea/i.test((e.target || e.srcElement).tagName);
    return txtArea || (e.keyCode || e.which || e.charCode || 0) !== 13;
   }

// Add an instance of the card Element into the `card-element` <div>.
card.mount('#card-element');
card.addEventListener('change', function (event) {
    var displayError = document.getElementById('card-errors');
    if (event.error) {
        displayError.textContent = event.error.message;
    } else {
        displayError.textContent = '';
    }
});

var clientData = {};
function startSubmit() {
    var b = document.getElementById("submit");
    b.disabled = true;
    b.innerHTML = 'Submitting';
    event.preventDefault();
    clientData = {
        "name": document.getElementById("name").value,
        "address_line1": document.getElementById("address").value,
        "address_city": document.getElementById("city").value,
        "address_state": document.getElementById("state").value,
        "address_zip": document.getElementById("postal_code").value,
        "email": document.getElementById("email").value,
        "country": document.getElementById("country").value
    };
    console.log(clientData);
    stripe.createToken(card, clientData).then(function (result) {
        if (result.error) {
            // Inform the customer that there was an error.
            var errorElement = document.getElementById('card-errors');
            errorElement.textContent = result.error.message;
        } else {
            submitForm(result.token,
                clientData["address_line1"],
                clientData["address_city"],
                clientData["address_state"],
                clientData["address_zip"],
                clientData["email"],
                clientData["country"],
                clientData["name"]);
        }
    });
}

function submitForm(token, line1, city, state, postal_code, email, country, name) {
    var obj = JSON.stringify({
        
        "stripeToken": token.id,
        "address":
            {
                "line1": line1,
                "city": city,
                "state": state,
                "postal_code": postal_code,
                "country": country
            },
        "name": name,
        "email": email
    });
    var xhr = new XMLHttpRequest();

    xhr.open('POST', '/api/' + obj);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.responseText);
            document.cookie = 'cart' + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            window.location.href = '/../thankYou.html';
        } else if (xhr.status >= 400) {
            console.log(xhr.responseText);
            displayError(xhr.responseText);
        }
    };
    xhr.send(obj);
}

function displayError(errorMessage) {
    var errorBar = document.getElementById("errorInfo");
    errorBar.innerHTML = errorMessage;
    errorBar.parentElement.removeAttribute("hidden");
    window.scrollTo(0, document.body.scrollHeight);
    console.log(errorMessage);
}

function goToHome()
{
    window.location.href = '/home.html';
}

function goToCart()
{
    window.location.href = '/cart.html';
}
