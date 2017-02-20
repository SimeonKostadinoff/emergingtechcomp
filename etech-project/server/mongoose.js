var mongoose = require('mongoose'),
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

	subject.Subject.find({}).exec(function (err, collection)
	{
		if(err)
		{
			console.log(err);
			return;
		}
		if(collection.length < 1)
		{
			subject.Subject.create({
				name: "Mathematics",
				qualification: "GCSE",
				description: "Lessons that cover the contents of GCSE Mathematics."
			}, function (err, subject)
			{
				if(err)
				{
					console.log("Failed to create subject! " + err);
					return;
				}
				console.log("Subject " + subject.id + " created");
				topic.Topic.create({
					name: "Number",
					subject: subject.id,
					description: "A topic that is all about numbers."
				}, function (err, topic)
				{
					if(err)
					{
						console.log(err);
						return;
					}
					console.log("Topic " + topic.id + " created");
					subject.topics.push(topic);
					subject.save();
				})
			})
		}
	})
};