var mongoose = require('mongoose'),
	curriculum = require('./model/curriculum'),
	subject = require('./model/subject'),
	topic = require('./model/topic');

module.exports = function ()
{
	mongoose.connect('mongodb://etech_team:etechteam2016@ds035059.mlab.com:35059/etechproject');
	var db = mongoose.connection;

	db.once('open', function (err)
	{
		if(err)
		{
			console.log('Could not connect to the database! ' + err);
			return;
		}
		console.log('Connected to the database');
	});

	db.on('error', function (err)
	{
		console.log('Database error: ' + err);
	});

	curriculum.initialCurricula();
	subject.initialSubjects();
	topic.initialTopics();
};