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
//     var applicants = req.db.get('resumes');
//     applicants.find({},{}, function(e, docs){
//       res.render('applicants', {'applicants':docs});
//     });
// });

router.post('/applicant' ,function(req,res,next){
    var db = req.db;
    
    var firstName = req.body.FirstName;
    var lastName = req.body.LastName;
    var age = req.body.Age;
    var resumes = db.get('resumes');
    resumes.insert({'FirstName':firstName,
                    'LastName':lastName, 
                    'Age':age,
                    'Resume':{'fileType':req.file.mimetype,'filePath':req.file.path }}, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("applicants");
        }});
});

router.get('/manage', function(req,res, next){
  var appPath = path.resolve('public/angular-app/app/index.html');
  res.sendfile(appPath);
});

module.exports = router;
