var express = require('express');
var router = express.Router();
var path = require('path');

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

router.get('/opportunities', function(req, res, next) {
    res.render('opportunities');
});

// router.get('/applicants', function(req, res, next) {
//     var applicants = req.db.get('applicants');
//     applicants.find({},{}, function(e, docs){
//       res.render('applicants', {'applicants':docs});
//     });
// });


router.get('/manage', function(req,res, next){
  var appPath = path.resolve('public/zux-admin/app/index.html');
  res.sendfile(appPath);
});

module.exports = router;
