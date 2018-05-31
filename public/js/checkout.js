var stripe = Stripe('pk_test_9m5v0UUpseHLibMcZL0IX3f3');
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
var card = elements.create('card', {style: style});

// Add an instance of the card Element into the `card-element` <div>.
card.mount('#card-element');
    card.addEventListener('change', function(event) {
    var displayError = document.getElementById('card-errors');
    if (event.error) {
        displayError.textContent = event.error.message;
    } else {
        displayError.textContent = '';
    }
});

var form = document.getElementById('payment-form');
form.addEventListener('submit', function(event) {
    event.preventDefault();

    stripe.createToken(card).then(function(result) {
    if (result.error) {
        // Inform the customer that there was an error.
        var errorElement = document.getElementById('card-errors');
        errorElement.textContent = result.error.message;
    } else {
        // Send the token to your server.
        submitForm(result.token, 250, "1 short sleeve shirt");
    }
    });
});

function stripeTokenHandler(token) {
    // Insert the token ID into the form so it gets submitted to the server
    var tokenInput = document.createElement('input');
    tokenInput.setAttribute('type', 'hidden');
    tokenInput.setAttribute('name', 'stripeToken');
    tokenInput.setAttribute('value', token.id);
    form.appendChild(tokenInput);
}

function cartCostHandler(amount) {
    var costInput = document.createElement('input');
    costInput.setAttribute('type', 'hidden');
    costInput.setAttribute('name', 'cartCost');
    costInput.setAttribute('value', amount);
    form.appendChild(costInput);
}

function descriptionStringHandler(cartDescription) {
    var descriptionInput = document.createElement('input');
    descriptionInput.setAttribute('type', 'hidden');
    descriptionInput.setAttribute('name', 'cartDescription');
    descriptionInput.setAttribute('value', cartDescription);
    form.appendChild(descriptionInput);
}

function submitForm(token, amount, cartDescription) {
    stripeTokenHandler(token);
    cartCostHandler(amount);
    descriptionStringHandler(cartDescription);
    var formData = new FormData( form );
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/api');
    xhr.send(formData);
    window.location.href = '/../shop.html';
}
