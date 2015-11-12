var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Zux' });
});

router.get('/donate', function(req,res,next){
  res.render('donate');
});
router.get('/community', function(req,res,next){
  res.render('community');
});
router.get('/about', function(req,res,next){
  res.render('about');
});
router.get('/donate', function(req,res,next){
  res.render('donate');
});
router.get('/contact', function(req,res,next){
  res.render('contact');
});

module.exports = router;
