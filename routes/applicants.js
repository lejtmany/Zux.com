var express = require('express');
var multer = require('multer');
var router = express.Router();
var upload = multer({dest:'./uploads/'});

router.route('/')
    .get(function(req, res, next) {
        var db = req.db;
        var collection = db.get("applicants");
        collection.find({},{},function(e, docs){
        res.json(docs);
        });
    })
    .post(upload.single('Resume'), function(req,res,next){
        var db = req.db;
        
        var firstName = req.body.FirstName;
        var lastName = req.body.LastName;
        var age = req.body.Age;
        var applicants = db.get('applicants');
        applicants.insert({'FirstName':firstName,
                        'LastName':lastName, 
                        'Age':age,
                        'Resume':{'fileType':req.file.mimetype,'filePath':req.file.path }}, function (err, doc) {
            if (err) {
                // If it failed, return error
                res.send("There was a problem adding the information to the database.");
            }
            else {
                // And forward to success page
                res.json(doc);
            }});
        });


router.route('/:applicantId')
   
   .get(function(req,res,next){
    var db = req.db;
    var applicantId = req.params.applicantId;
    var applicants = db.get('applicants');
    applicants.findById(applicantId, function(err, doc){
        res.json(doc);
    });
    })
    
   .delete(function(req,res,next){
        var db = req.db;
        var applicantId = req.params.applicantId;
        var applicants = db.get('applicants');
        applicants.remove({_id:applicantId}, function(err){
            if(err)
                throw err;
        });
        
   })

module.exports = router;

    
// router.post('/', upload.single('Resume'),function(req,res,next){
//     var db = req.db;
    
//     var firstName = req.body.FirstName;
//     var lastName = req.body.LastName;
//     var age = req.body.Age;
//     var resume = req.file;
//     var resumeBson = {'resumePath':resume.path};
    
//     var applicants = db.get('applicants');
//     applicants.insert({'FirstName':firstName,
//                     'LastName':lastName, 
//                     'Age':age,
//                     'Resume': resumeBson}, function (err, doc) {
//         if (err) {
//             // If it failed, return error
//             res.send("There was a problem adding the information to the database.");
//         }
//         else {
//             // And forward to success page
//             res.redirect("/");
//         }});
// });