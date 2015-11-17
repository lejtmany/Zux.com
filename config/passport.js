var LocalStrategy = require('passport-local').Strategy;
var monk = require('monk');
var db = monk('localhost:27017/zux-resumes');
var loginFuncs = require('../public/javascripts/loginFuncs');
module.exports = function (passport) {

	passport.serializeUser(function (user, done) {
		done(null, user);
	});

	passport.deserializeUser(function (id, done) {
		var users = db.get('users');
		users.findOne({ userName: id }, function (err, user) {
			done(err, user);
		});
	});

	passport.use('local-signup', new LocalStrategy({
		usernameField: 'username',
		passwordField: 'password',
		passReqToCallback: true
	},
		function (req, username, password, done) {
			process.nextTick(function () {
				var users = db.get('users');
				users.findOne({ userName: username }, function (err, user) {
					if (err)
						return done(err);
					if (user)
						return done(null, false);
					else {
						users.insert({ userName: username, password: loginFuncs.generateHash(password) }, function (err, newUser) {
							if (err)
								throw err;
							return done(null, newUser);
						});
					}
				});
			}

				);
		}
		));

	passport.use('local-login', new LocalStrategy(
		{
			usernameField: 'userName',
			passwordField: 'password',
			passReqToCallback: true
		},
		function (req, username, password, done) {
			var users = db.get('users');
			users.findOne({ userName: username }, function(err, user){
				if(err)
					done(err);
				if(!user)
					return done(null, false);
				if(loginFuncs.isValidPassword(password, user.password))
					return done(null, false);
				
				return done(null, user);
			});
		}

		));
};