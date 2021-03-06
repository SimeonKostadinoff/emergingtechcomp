var mongoose = require('mongoose');

var achievementSchema = mongoose.Schema({
	name: String,
	description: String,
	experience: Number
});

var Achievement = mongoose.model('Achievement', achievementSchema);

module.exports.initialAchievements = function ()
{
	Achievement.find({}).exec(function (err, collection)
	{
		if (err)
		{
			console.log(err);
			return;
		}
		if (collection.length < 1)
		{
			Achievement.create({
				name: "First lesson",
				description: "You've completed your first lesson! Now have a go at another one!",
				experience: 500
			}, {
				name: "Hey Ignis!",
				description: "You've had your first conversation with Ignis! Let's hope you can be good friends.",
				experience: 500
			}, {
				name: "Topic finished",
				description: "You've finished your first topic! The journey doesn't end there, do some more!",
				experience: 1000
			});
			console.log('Achievements created')
		}
	})
};