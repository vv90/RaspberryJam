/**
 * Created by Vladimir on 9/10/2016.
 */

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var webpack = require('webpack');
var webpackConfig = require('../webpack.config.dev');
var dancersParser = require('./excelParser');
var dancerSchema = require('./schema/dancer').dancer;

var app = express();
var port = 8081;

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
	res.json(dancerSchema);
});

router.get('/parse', function(req, res) {
	var parser = new dancersParser.TableParser('dancers.xlsm');
	parser.init();
	var result = parser.readDancers();
	res.json(parser.isMetadataCorrect() ? result : parser.errors);
});

mongoose.connect('mongodb://localhost/RaspberryJam');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {});

app.use('/api', router);
app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname, '../app/index.html'));
});

app.listen(port);
console.log('server started on port ' + port);