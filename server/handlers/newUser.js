var mongoose = require('mongoose'),
	User = require('../schema/UserSchema');

module.exports.createUser = function(req, res, next) {
	var userNumber = req.body.number;
	User.findOne({ phoneNumber: userNumber }, function (err, user) {
		if (err) {
			res.status(500).send(err);
			return;
		} else if (!user) {
			new User({ phoneNumber: userNumber }).save();
			res.userData = { status: 'new', user: user };
		} else {
			res.userData = { status: 'update', user: user };
		}
		next();		
	});
};

module.exports.sendFollowup = function(req, res, next) {
	if ( res.user && res.userData.status === 'update' ) {
		res.userData.msg = "Would you like to update your information? If so please reply with 'UPDATE' followed by the information you wish to update.";
		res.status(200).send(res.userData);
	} else {
		res.userData.msg = "Thank you for registering. Please provide your name and location, seperated by a ',' for our records";
		res.status(200).send(res.userData);
	}
	next();
};