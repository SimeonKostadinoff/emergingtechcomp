var mongoose = require('mongoose');

var subjectSchema = mongoose.Schema({
	name: String,
	topics: [{
		topicID: String,
		topicName: String
	}]
});

var Subject = mongoose.model('Subject', subjectSchema);

module.exports.initialSubjects = function ()
{
	Subject.find({}).exec(function (err, collection)
	{
		if(err)
		{
			console.log('Subject collection does not exist! ' + err);
			return;
		}
		if(collection.length < 2)
		{
			Subject.create({
				name: 'Maths',
				topics: []
			});
			Subject.create({
				name: 'Computer Science',
				topics: []
			});

			console.log('Subjects added')
		}
	})
};