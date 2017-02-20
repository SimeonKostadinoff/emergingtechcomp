var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var lessonSchema = mongoose.Schema({
	name: String,
	topic: {type: ObjectId, ref: 'Topic'},
	experience: Number,
	sections: [{
		header: String,
		body: String
	}],
	exercises: [{
		question: String,
		answer: String
	}]
});

module.exports.Lesson = mongoose.model('Lesson', lessonSchema);