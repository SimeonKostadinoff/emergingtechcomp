var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var subjectSchema = mongoose.Schema({
	name: String,
	qualification: String,
	description: String,
	topics: [{type: ObjectId, ref: 'Topic'}]
});

module.exports.Subject = mongoose.model('Subject', subjectSchema);