var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;


/* GET expenses. */
router.get('/:userId', function(req, res) {
	var db = req.db;
	var ranges = db.get('budgetRanges');
    ranges.find({"userId" : ObjectId(req.params.userId)},{},function(e,rangeArray){
    	res.json(rangeArray);
    });
});

/* POST to add range */
router.post('/', function(req, res) {
	var db = req.db;
    var ranges = db.get('budgetRanges');
	ranges.insert(req.body, function(err, newRange) {
		res.send(
			(err === null) ? { msg: newRange[0]._id } : { msg: err }
		);
	})
});

/* PUT to mod range */
router.put('/', function(req, res) {
    var db = req.db;
    var ranges = db.get('budgetRanges');
    ranges.update(req.body, function(err, moddedRange) {
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    })
});

/* DELETE to delete range */
router.delete('/:id', function(req, res) {
	var db = req.db;
    var ranges = db.get('budgetRanges');
    var rangeToDelete = ObjectId(req.params.id);
	ranges.remove({ '_id' : rangeToDelete }, function(err) {
		res.send((err === null) ? { msg: '' } : { msg: 'error: ' + err });
	});
});

module.exports = router;
