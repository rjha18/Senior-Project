const router = require('express').Router();



router.get('/api', function handleReq(req, res, next) {
	res.render("index1.html");
})


module.exports = router;