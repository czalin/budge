var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;


/* GET categories. */
router.get('/:budgetRangeId', function(req, res) {
	var db = req.db;
	var catColl = db.get('categories');
	catColl.find({"budgetRangeId" : ObjectId(req.params.budgetRangeId)},{},function(e,docs){
		res.json(docs);
    });
});

/* POST to addexpense */
router.post('/', function(req, res) {
	var db = req.db;
    var catColl = db.get('categories');
	catColl.insert(req.body, function(err, newCategory) {
		res.send(
			(err === null) ? { msg: newCategory[0]._id } : { msg: err }
		);
	})
});

/* PUT to modexpense */
router.put('/', function(req, res) {
    var db = req.db;
    var catColl = db.get('categories');
    catColl.update(req.body, function(err, moddedCategory) {
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    })
});

/* DELETE to deleteuser */
router.delete('/:id', function(req, res) {
	var db = req.db;
    var catColl = db.get('categories');
	var categoryToDelete = ObjectId(req.params.id);
	cattColl.remove({ '_id' : categoryToDelete }, function(err) {
		res.send((err === null) ? { msg: '' } : { msg: 'error: ' + err });
	});
});

module.exports = router;
