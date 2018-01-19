var express = require('express');
var router = express.Router();

/* GET user. */
router.get('/', function(req, res) {
	var db = req.db;
	var userColl = db.get('userlist');
	userColl.find({},{},function(e,docs){
		res.json(docs);
	});
});

/* POST user */
router.post('/', function(req, res) {
	var db = req.db;
	var userColl = db.get('userlist');
    userColl.insert(req.body, function(err, result) {
		res.send(
			(err === null) ? { msg: '' } : { msg: err }
		);
	})
});

/* PUT user */
router.put('/', function(req, res) {
    var db = req.db;
    var userColl = db.get('expenses');
    userColl.update(req.body, function(err, moddedExpense) {
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    })
});

/* DELETE user */
router.delete('/:id', function(req, res) {
	var db = req.db;
	var userColl = db.get('userlist');
	var userToDelete = req.params.id;
    userColl.remove({ '_id' : userToDelete }, function(err) {
		res.send((err === null) ? { msg: '' } : { msg: 'error: ' + err });
	});
});

module.exports = router;
