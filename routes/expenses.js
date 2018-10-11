var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;


/* GET expenses. */
router.get('/:budgetRangeId', function(req, res) {
	var db = req.db;
	var rangesColl = db.get('budgetRanges');
	var expensesColl = db.get('expenses');
    rangesColl.find({},{},function(e,range){
        expensesColl.find({"date": {"$gte": range[0].startDate, "$lt": range[0].endDate}},{},function(e,docs){
            res.json(docs);
        });
    });
});

/* POST expense */
router.post('/', function(req, res) {
	var db = req.db;
	var expensesColl = db.get('expenses');
	expensesColl.insert(req.body, function(err, newExpense) {
		res.send(
			(err === null) ? { msg: newExpense[0]._id } : { msg: err }
		);
	})
});

/* PUT expense */
router.put('/', function(req, res) {
    var db = req.db;
    var expensesColl = db.get('expenses');
    expensesColl.update(req.body, function(err, moddedExpense) {
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    })
});

/* DELETE expense */
router.delete('/:id', function(req, res) {
	var db = req.db;
	var expensesColl = db.get('expenses');
	var expenseToDelete = ObjectId(req.params.id);
	expensesColl.remove({ '_id' : expenseToDelete }, function(err) {
		res.send((err === null) ? { msg: '' } : { msg: 'error: ' + err });
	});
});

module.exports = router;
