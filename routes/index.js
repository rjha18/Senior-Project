const router = require('express').Router();

router.use('/shop', require('./shop'));

module.exports = router;