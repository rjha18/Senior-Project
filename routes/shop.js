const router = require('express').Router();

router.get('/data', function handleReq(req, res, next) {
	res.status(200).send({
		test: 'rishi has no legs',
	});
});

module.exports = router;