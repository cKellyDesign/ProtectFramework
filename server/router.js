var path = require('path'),
	_ = require('underscore'),
	mongoose = require('mongoose'),
	newUser = require('./handlers/newUser'),
	User = require('./schema/UserSchema');

exports.handleRoutes = function(app) {

	app.get('/', function (req, res, next) {
		res.sendFile(path.join(__dirname + '/../www/index.html'));
	});

	app.get('/users', function (req, res, next) {
		User.find({}, function (err, users) {
			if (err) { 
				res.send(err);
				return;
			}
			res.send(users);
			next();
		});
	});

	app.post('/newUser', newUser.createUser, newUser.sendFollowup);
};