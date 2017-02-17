var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var userSchema = mongoose.Schema({
	email: {type: String, require: '{PATH} is required', unique: true},
	firstName: {type: String, require: '{PATH} is required'},
	lastName: {type: String, require: '{PATH} is required'},
	avatar: String,
	salt: String,
	hash: String,
	level: Number,
	experience: Number,
	achievements: [{type: ObjectId, ref: 'Achievement'}],
	recentQueries: [String],
	lessonsCompleted: [{type: ObjectId, ref: 'Lesson'}]
});

var User = mongoose.model('User', userSchema);

module.exports.initialUser = function ()
{
	User.find({}).exec(function (err, collection)
	{
		if (err)
		{
			console.log('User collection does not exist! ' + err);
			return;
		}
		if (collection.length < 1)
		{
			User.create({
				email: 'etech_team@hotmail.com',
				firstName: 'John',
				lastName: 'Smith',
				salt: 'RY7+*U>-47FG{>y?9:&3p',
				hash: '24cacf5004bf68ae9daad19a5bba391d85ad1cb0b31366e89aec86fad0ab16cb',
				level: 0,
				experience: 0
			});

			console.log('User added')
		}
	})
};