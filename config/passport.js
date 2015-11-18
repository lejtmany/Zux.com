var LocalStrategy = require('passport-local').Strategy;
var monk = require('monk');
var local_vars = require('../local_vars');
var db = monk(local_vars.dbConnection);
var loginFuncs = require('../public/javascripts/loginFuncs');
module.exports = function (passport) {

	passport.serializeUser(function (user, done) {
		console.log('user ID: ' + JSON.stringify(user));
		done(null, user.userName);
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
							console.log('success insert new user');
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
			usernameField: 'username',
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
				if(loginFuncs.isValidPassword(password, user.password)){
					console.log('success: good password!');
					return done(null, user);
				}
					
			});
		}

		));
};