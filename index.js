const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const api = require('./routes');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/api', api);

app.listen(8080, () => {
	console.log('listening on port 8080');
})