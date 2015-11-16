var express = require('express');
var multer = require('multer');
var router = express.Router();
var upload = multer({dest:'./uploads/'});

/* GET users listing. */
router.get('/', function(req, res, next) {
  var db = req.db;
  var collection = db.get("resumes");
  collection.find({},{},function(e, docs){
    res.json(docs);
  });
});

router.post('/', upload.single('Resume'),function(req,res,next){
    var db = req.db;
    
    var firstName = req.body.FirstName;
    var lastName = req.body.LastName;
    var age = req.body.Age;
    var resume = req.file;
    var resumeBson = {'resumePath':resume.path};
    
    var resumes = db.get('resumes');
    resumes.insert({'FirstName':firstName,
                    'LastName':lastName, 
                    'Age':age,
                    'Resume': resumeBson}, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("/");
        }});
});

module.exports = router;
