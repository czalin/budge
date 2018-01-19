var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;


/* GET expenses. */
router.get('/:budgetRangeID', function(req, res) {
	var db = req.db;
	var ranges = db.get('budgetRanges');
	var expenses = db.get('expenses');
	//ranges.find({"_id" : ObjectId(req.params.budgetRangeID)},{},function(e,range){
    ranges.find({},{},function(e,range){
        expenses.find({"date": {"$gte": range[0].startDate, "$lt": range[0].endDate}},{},function(e,docs){
            res.json(docs);
        });
    });
});

/* POST to addexpense */
router.post('/', function(req, res) {
	var db = req.db;
	var expenses = db.get('expenses');
	expenses.insert(req.body, function(err, newExpense) {
		res.send(
			(err === null) ? { msg: newExpense[0]._id } : { msg: err }
		);
	})
});

/* PUT to modexpense */
router.put('/', function(req, res) {
    var db = req.db;
    var expenses = db.get('expenses');
    expenses.update(req.body, function(err, moddedExpense) {
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    })
});

/* DELETE to deleteuser */
router.delete('/:id', function(req, res) {
	var db = req.db;
	var expenses = db.get('expenses');
	var expenseToDelete = req.params.id;
	collection.remove({ '_id' : expenseToDelete }, function(err) {
		res.send((err === null) ? { msg: '' } : { msg: 'error: ' + err });
	});
});

module.exports = router;
