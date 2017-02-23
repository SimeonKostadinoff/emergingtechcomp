var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var topicSchema = mongoose.Schema({
	name: String,
	subject: {type: ObjectId, ref: 'Subject'},
	description: String,
	lessons: [{type: ObjectId, ref: 'Lesson'}]
});

module.exports.Topic = mongoose.model('Topic', topicSchema);