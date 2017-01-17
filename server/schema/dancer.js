/**
 * Created by Vladimir on 1/16/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

exports.dancer = new Schema({
	id: Number,
	fullName: String,
	club: String,
	class: String,
	classJnJ: String,
	sex: String,
	source: String
});