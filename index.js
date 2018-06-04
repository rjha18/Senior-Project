const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
var cookieSession = require('cookie-session');
var productList = ["m1s1sS", "m1s1sM", "m1s1sL", "m1s1lS", "m1s1lS", "m1s1lM", "m1s1lL", "m1s2sS", "m1s2sM", "m1s2sL" ];


var stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

app.use (cookieSession({
	name: 'session',
	secret: process.env.COOKIE_SECRET,
}))

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/', express.static(path.join(__dirname, 'public')));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('trust proxy', 1);

app.listen(8080, () => {
	console.log('listening on port 8080');
})

app.post('/apii/:data', function(req, res, next) {
	req.body = JSON.parse(req.params.data);
	
	var amount = req.body.number;
	const itemDescription = req.body.id;
	var cost = req.body.price * amount;
	

	var jsonObject = {};

	var previousCookie;
	if (req.cookies.cart)
	{
		console.log("Cookies: ", req.cookies.cart);
		previousCookie = JSON.parse(req.cookies.cart);
		console.log("cost=", previousCookie.cost);
		cost += previousCookie.cost;
		var previousAmount = previousCookie[itemDescription];
		if (previousAmount) {
			amount += previousAmount;
		} 
		for (var i = 0; i < productList.length; i++)
		{
			console.log(productList[i]+itemDescription);
			if (!(productList[i] === itemDescription) && previousCookie[productList[i]]) 
			{
				jsonObject[productList[i]] = previousCookie[productList[i]];
			}
		}
	}

	if (amount > 0)
	{
		jsonObject[itemDescription] = amount;
	}
	if (cost > 0)
	{
		jsonObject["cost"] = cost;
	}

	
	var jsonString = JSON.stringify(jsonObject);
	console.log(jsonString);
	res.cookie
	(
		'cart', 
		jsonString,
		{maxAge: 10 * 24 * 60 * 60 * 1000}
	)
	res.send();
})

app.post('/api/:data', function handleReq(req, res, next) {
	req.body = JSON.parse(req.params.data);
	console.log("Got Data!");
	// Token is created using Checkout or Elements!
	// Get the payment token ID submitted by the form:
	const token = req.body.stripeToken; // Using Express
	var cookie = JSON.parse(req.cookies.cart)
	var description = "";
	var amount = 0;

	for (var i = 0; i < productList.length; i++)
	{
		var id = productList[i];
		if (cookie[productList[i]]) 
		{
			var productName = "Migration " + id.charAt(1) + "|Species " + id.charAt(3);
			if (id.charAt(4) == 's')
			{
				productName += "|Shortsleeve ";
				price = 25;
			} 
			else 
			{
				productName += "|Longsleeve ";
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
			
			amount += price * cookie[productList[i]];
			description += cookie[productList[i]] + " " + size + " " + productName + "+";
		}
	}

	description = description.substring(0, description.length-2)

	amount += 10;
	amount *= 100;

	console.log("Info: " + req.body.email);
	stripe.charges.create({
		amount: amount,
		currency: 'usd',
		description: description,
		receipt_email: req.body.email,
		source: token,
		shipping: {
			name: req.body.name,
			address: req.body.address
		},
		statement_descriptor: "Mr. Bird Clothing"
	}, function(err, charge) {
		if (err)
		{
			var errorType;
			var errorMessage;
			switch (err.type) {
				case 'StripeCardError':
					// A declined card error
					console.log("Stripe Card Error: " + err.message);
					errorType = 400;
					errorMessage = err.message;
					// => e.g. "Your card's expiration year is invalid."
					break;
				case 'RateLimitError':
					// Too many requests made to the API too quickly
					console.log("Rate Limit Error");
					errorType = 500;
					errorMessage = "Error with Mr. Bird Servers. Please try again and if problems persist reach out to Webmaster";
					break;
				case 'StripeInvalidRequestError':
					// Invalid parameters were supplied to Stripe's API
					console.log("Invalid Request Error");
					errorType = 400;
					errorMessage = "Request Error. Please verify your information and try again. If problems persist reach out to Webmaster";
					console.log(charge);
					break;
				case 'StripeAPIError':
					console.log("Stripe API Error");
					errorType = 500;
					errorMessage = "Error with Stripe Servers. Please try again and if problems persist reach out to Webmaster";	
				// An error occurred internally with Stripe's API
					break;
				case 'StripeConnectionError':
					// Some kind of error occurred during the HTTPS communication
					console.log("Stripe Connection Error");
					errorType = 500;
					errorMessage = "Error with Stripe Servers. Please try again and if problems persist reach out to Webmaster";
					break;
				case 'StripeAuthenticationError':
					// You probably used an incorrect API key
					console.log("Stripe Auth Error");
					errorType = 500;
					errorMessage = "Error with Mr. Bird Servers. Please try again and if problems persist reach out to Webmaster";
					break;
				default:
					console.log("Unknown Error");	
					errorType = 500;
					errorMessage = "Error with Mr. Bird Servers. Please try again and if problems persist reach out to Webmaster";
					break;
			}
			res.status(errorType).send(errorMessage);
		} else {
			res.status(200).send();
		}
	});
})

function goToHome()
{
    window.location.href = '/';
}