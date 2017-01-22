/**
 * Created by Vladimir on 9/10/2016.
 */
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';
import webpack from 'webpack';
import webpackConfig from '../webpack.config.dev';
import TableParser from './excelParser';

import Dancer from './models/dancers';

// var express = require('express');
// var mongoose = require('mongoose');
// var bodyParser = require('body-parser');
// var path = require('path');
// var webpack = require('webpack');
// var webpackConfig = require('../webpack.config.dev');
// var dancersParser = require('./excelParser');
// var fs = require('fs');

// var Dancer = require('./models/dancers').Dancers;

const app = express();
const port = 8081;

app.use(require('webpack-dev-middleware')(webpack(webpackConfig), {
	publicPath: webpackConfig.output.publicPath,
	stats: { colors: true }
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

function handleError(err) {
	if (err) { console.error(err); }
}

const router = express.Router();

router.use(function (req, res, next) {
	console.log(req.method + ': ' + req.url);
	next();
});

router.get('/', function(req, res) {
	res.json("ok");
});

router.get('/dancers', function (req, res){
	Dancer.find(req.query, (err, dancers) => {
		res.json(dancers);
	});
});

router.get('/dancers/:id', function (req, res) {
	Dancer.findOne({id: req.params.id}).exec()
		.then( dancer => {
			res.json(dancer);
		}, err => {
			res.json(err);
		});
});

router.get('/parse', function(req, res) {
	const parser = new TableParser('dancers.xlsm');
	parser.init();
	if (parser.isMetadataCorrect()) {
		const result = parser.readDancers();
		result.forEach(item => {
			Dancer.findOne({id: item.id}).exec()
				.then(dancer => {
					if (dancer) {
						Dancer.update({_id: dancer._id}, {$set: item}, handleError);
					} else {
						Dancer.create(item, handleError);
					}
				}, handleError);
		});
		res.json('success');
	} else {
		res.json(parser.errors);
	}
});

router.post('/clear', function (req, res) {
	Dancer.remove({}, result => {
		res.json(result);
	});
});

mongoose.connect('mongodb://localhost/RaspberryJam');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {});

app.use('/api', router);
app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname, '../app/index.html'));
});

app.listen(port);
console.log('server started on port ' + port);