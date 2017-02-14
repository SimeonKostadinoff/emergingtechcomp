var mongoose = require('mongoose');

var topicSchema = mongoose.Schema({
	name: String,
	description: String,
	lessons: [{
		lessonID: String,
		lessonName: String,
		lessonDescription: String
	}]
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
		if(collection.length < 2)
		{
			Topic.create({
				name: 'Number',
				description: 'Numbers - they appear everywhere. How do they work? What kind of numbers are out there?',
				lessons: []
			});
			Topic.create({
				name: 'Algebra',
				description: 'Not all numbers are known. Some are hidden, unknown or can change.',
				lessons: []
			});
			Topic.create({
				name: 'Computers in Society',
				description: 'You\'re using a computer right now. How are they viewed by the society as a whole?',
				lessons: []
			});

			console.log('Topics added')
		}
	})
};