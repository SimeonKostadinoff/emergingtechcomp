var mongoose = require('mongoose'),
	subject = require('./model/subject'),
	topic = require('./model/topic'),
	lesson = require('./model/lesson'),
	user = require('./model/user'),
	achievement = require('./model/achievement');

module.exports.init = function ()
{
	mongoose.connect('mongodb://etech_team:etechteam2016@ds035059.mlab.com:35059/etechproject');
	var db = mongoose.connection;

	db.once('open', function (err)
	{
		if (err)
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
		if (err)
		{
			console.log(err);
			return;
		}
		if (collection.length < 1)
		{
			subject.Subject.create({
				name: "Mathematics",
				qualification: "GCSE",
				description: "Lessons that cover the contents of GCSE Mathematics."
			}, function (err, subject)
			{
				if (err)
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
					if (err)
					{
						console.log(err);
						return;
					}
					subject.topics.push(topic);
					subject.save();
					console.log("Topic " + topic.id + " created");

					lesson.Lesson.create({
						name: "Whole numbers",
						topic: topic.id,
						experience: 100,
						sections: [{
							header: "Writing whole numbers as words",
							body: "Each digit in a number has a place value. It shows the position of a digit in a number. Numbers can be written as words using a place value table."
						}],
						exercises: [{
							question: "How do you write 68,542 in words?",
							answer: "Sixty eight thousand, five hundred and forty two"
						}, {
							question: "How do you write the number five million, seven hundred and twenty two thousand, six hundred and eight in figures?",
							answer: "5,722,608"
						}]
					}, function (err, lesson)
					{
						if (err)
						{
							console.log(err);
							return;
						}
						topic.lessons.push(lesson);
						topic.save();
						console.log("Lesson " + lesson.id + " created");
					});

					lesson.Lesson.create({
						name: "Decimals",
						topic: topic.id,
						experience: 100,
						sections: [{
							header: "Place value and ordering decimals",
							body: "Decimal points are used in numbers to separate the whole number from parts of the whole. Like whole numbers, numbers written as decimals can be either positive or negative, for example, 2.6 or -2.6. Decimals are just one way of expressing numbers that are parts of wholes. These numbers can also be written as fractions or percentages. "
						}, {
							header: "Place value",
							body: "Place value gives the value of each digit in a number. For example, in the number 42, the 4 is worth 4 tens, or 40, and the 2 is worth 2 units, or 2. The same process is true for decimals. In the number 2.78, the 2 is worth two units, the 7 is worth 7 tenths and the 8 is worth 8 hundredths."
						}],
						exercises: [{
							question: "Put these decimals in order, starting with the smallest: 3.72, 3.07, 3.7, 4.3, 3.764",
							answer: "3.07, 3.7, 3.72, 3.764, 4.3"
						}]
					}, function (err, lesson)
					{
						if (err)
						{
							console.log(err);
							return;
						}
						topic.lessons.push(lesson);
						topic.save();
						console.log("Lesson " + lesson.id + " created");
					})
				})
			})
		}
	});

	user.initialUser();
	achievement.initialAchievements();
};