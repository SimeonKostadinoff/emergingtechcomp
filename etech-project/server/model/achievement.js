var mongoose = require('mongoose');

var achievementSchema = mongoose.Schema({
	name: String,
	description: String,
	thumbnail: String,
	experience: Number
});

var Achievement = mongoose.model('Achievement', achievementSchema);