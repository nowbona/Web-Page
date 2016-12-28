var passport = require('passport');
var localStrategy = require('passport-local').Strategy;

module.exports = function (passport) {
	passport.serializeUser(function (user, done) {
		done(null, user);
	});

	passport.deserializeUser(function (user, done) {
		done(null, user);
	});

	passport.use('local-login', new localStrategy({
		usernameField: 'admin_id',
		passwordField: 'admin_pw',
		passReqToCallback: true
	}, function (req, admin_id, admin_pw, done) {
		if (admin_id == 'yahanran' && admin_pw == 'bona1234!') {
			var user = {
				'admin_id': 'yahanran',
				'admin_pw': 'bona1234!'
			};
			return done(null, user);
		}
		else {
			return done(null, false);
		}
	}));
}
