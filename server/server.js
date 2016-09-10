/**
 * Created by Vladimir on 9/10/2016.
 */

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var webpack = require('webpack');
var webpackConfig = require('../webpack.config.dev');


var app = express();
var port = 8080;

app.use(require('webpack-dev-middleware')(webpack(webpackConfig), {
	publicPath: webpackConfig.output.publicPath,
	stats: { colors: true }
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var router = express.Router();

router.use(function (req, res, next) {
	console.log(req.method + ': ' + req.url);
	next();
});

router.get('/', function(req, res) {
	res.json({message: 'api is working'});
});

mongoose.connect('mongodb://localhost/RaspberryJam');

app.use('/api', router);
app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname, '../app/index.html'));
});

app.listen(port);
console.log('server started on port ' + port);