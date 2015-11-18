var express = require('express');
var loginFuncs = require('../public/javascripts/loginFuncs');
var router = express.Router();

module.exports = function (passport) {
	router.get('/signup', function (req, res, next) {
		res.render('signup');
	});

	router.post('/signup', passport.authenticate('local-signup', {
		successRedirect: 'protected',
		failureRedirect: 'fail'
	}));
	
	router.get('/login', function(req, res, next){
		res.render('login');
	});
	
	router.post('/login', passport.authenticate('local-login', {
		successRedirect: 'protected',
		failureRedirect:'fail'
	}));

	router.get('/protected', isLoggedIn ,function (req, res, next) {
		res.render('protected');
	});
	
	router.get('/fail', function(req,res,next){
		res.render('fail');
	});
	
	router.get('/logout', function(req, res, next){
		req.logOut();
		res.redirect('/')
	})

	return router;
};

function isLoggedIn(req, res, next){
	console.log('isAuthenticated? : ' + req.isAuthenticated());
	if(req.isAuthenticated())
		return next();
	res.redirect('signup');
}

