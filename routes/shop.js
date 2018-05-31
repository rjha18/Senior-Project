const router = require('express').Router();
var stripe = require("stripe")("sk_test_Pl4gjoJdItwiKt5pix5OvPTI");

router.get('/data', function handleReq(req, res, next) {
	res.status(200).send({
		test: 'rishi has no legs',
	});
});

router.post('/data', function handleReq(req, res, next) {
	console.log(req);
	console.log("Got Data!");
	// Token is created using Checkout or Elements!
	// Get the payment token ID submitted by the form:
	const token = req.body.stripeToken; // Using Express

	const charge = stripe.charges.create({
		amount: 999,
		currency: 'usd',
		description: 'Example charge',
		source: token,
	});
})





module.exports = router;