require('../model/user');
let user = require('mongoose').model('User');

module.exports = {
	getUserData: function (req, res)
	{
		user.findOne({}).exec(function (err, collection)
		{
			if(err)
				console.log('getUserData failed: ' + err);
			res.send(collection);
		})
	}
};