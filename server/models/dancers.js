/**
 * Created by Vladimir on 1/16/2017.
 */
// var mongoose = require('mongoose');

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const dancersSchema = new Schema({
	id: Number,
	fullName: String,
	club: String,
	class: String,
	classJnJ: String,
	sex: String,
	source: String
});

export default mongoose.model('dancers', dancersSchema);