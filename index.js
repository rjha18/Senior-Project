const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const api = require('./routes');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
var cookieSession = require('cookie-session');

var stripe = require("stripe")("sk_test_Pl4gjoJdItwiKt5pix5OvPTI");

app.use (cookieSession({
	name: 'session',
	secret: 'lmao',
}))

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/api', api);

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('trust proxy', 1);

app.listen(8080, () => {
	console.log('listening on port 8080');
})

app.post('/apii', function(req, res, next) {
	const amount = req.body.amount;
	const itemDescription = JSON.parse(req.body.ship);
	console.log(itemDescription);
	const cost = req.body.price;
	var jsonObject = {"amount": amount, "itemDescription": itemDescription, "cost": cost};
	var jsonString = JSON.stringify(jsonObject);
	console.log("bb" + jsonString);
	res.cookie(
		'cart', 
		jsonString,
		{maxAge: 30 * 60 * 1000}
	)
	res.send();
})

app.post('/api', function handleReq(req, res, next) {
	console.log("Got Data!");
	// Token is created using Checkout or Elements!
	// Get the payment token ID submitted by the form:
	const token = req.body.stripeToken; // Using Express
	console.log(token);
	const cartDescription = req.body.cartDescription;
	console.log(cartDescription);
	const cartCost = req.body.cartCost;
	console.log(cartCost);

	const charge = stripe.charges.create({
		amount: cartCost,
		currency: 'usd',
		description: cartDescription,
		source: token,
	});
})