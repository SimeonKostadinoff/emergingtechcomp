var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var topicSchema = mongoose.Schema({
	name: String,
	subject: ObjectId,
	description: String,
	lessons: [{type: ObjectId, ref: 'Lesson'}]
});

var Topic = mongoose.model('Topic', topicSchema);

module.exports.initialTopics = function ()
{
	Topic.find({}).exec(function (err, collection)
	{
		if(err)
		{
			console.log('Topic collection does not exist! ' + err);
			return;
		}
		if(collection.length < 1)
		{
			Topic.create({
				name: 'Number',
				description: 'Numbers - they appear everywhere. How do they work? What kind of numbers are out there?'
			});
			Topic.create({
				name: 'Algebra',
				description: 'Some numbers are unknown or can change. How do we handle such things in maths?'
			});
			Topic.create({
				name: 'Computers in Society',
				description: 'You\'re using a computer right now. How are they viewed by the society as a whole?'
			});

			console.log('Topics added')
		}
	})
};