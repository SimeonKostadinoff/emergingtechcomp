var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var subjectSchema = mongoose.Schema({
	name: String,
	qualification: String,
	description: String,
	topics: [{type: ObjectId, ref: 'Topic'}]
});

var Subject = mongoose.model('Subject', subjectSchema);

module.exports.initialSubjects = function ()
{
	Subject.find({}).exec(function (err, collection)
	{
		if (err)
		{
			console.log('Subject collection does not exist! ' + err);
			return;
		}
		if (collection.length < 1)
		{
			Subject.create({
				name: 'Maths',
				qualification: 'GCSE',
				description: 'GCSE Maths'
			});
			Subject.create({
				name: 'Computer Science',
				qualification: 'GCSE',
				description: 'GCSE Computer Science'
			});

			console.log('Subjects added')
		}
	})
};