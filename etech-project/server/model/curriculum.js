var mongoose = require('mongoose');

var curriculumSchema = mongoose.Schema({
	name: String,
	subjects: [{
		subjectID: String,
		subjectName: String
	}]
});

var Curriculum = mongoose.model('Curriculum', curriculumSchema);

module.exports.initialCurricula = function ()
{
	Curriculum.find({}).exec(function (err, collection)
	{
		if(err)
		{
			console.log('Curriculum collection does not exist! ' + err);
			return;
		}
		if(collection.length < 2)
		{
			Curriculum.create({
				name: 'Key Stage 3',
				subjects: []
			});
			Curriculum.create({
				name: 'GCSE',
				subjects: []
			});

			console.log('Curricula added')
		}
	})
};