var mongodb = require('mongodb');
var ObjectId=require('mongodb').ObjectId;

module.exports = {
	//create new entry
	insert: function(db, collection_name, data, cb) {
		console.log('inserting');
		var collection=db.collection(collection_name);
		collection.insert(data, function(err, doc) {
			if (err) {
			console.log(err);
		} else {
			console.log('inserted into '+collection_name);
			cb(err, doc);
			return(doc);
		}
		});
	},

	getID: function(db, collection_name, data, cb) {
		console.log('received '+data);
		var collection=db.collection(collection_name);
		collection.find({_id: new ObjectId(data)}).toArray(cb);
		console.log();
	},

	getAllResults: function(db, collection_name, cb) {
		var collection=db.collection(collection_name);
    	collection.find({}, function(err, cursor){
    		cursor.toArray(cb);
		});
	},

	removeDoc: function(db, collection_name, data, cb) {

	},

	getUserResults: function(db, collection_name, user, cb) {

	},

	updatePoll: function(db, collection_name, data, cb) {

	},

	findOne: function(db, collection_name, data, cb) {
		var collection=db.collection(collection_name);
		collection.find({_id: (data)}).toArray(cb);
	},

	findOrCreate: function(db, collection_name, data, cb) {
		console.log('received '+data);
		var collection=db.collection(collection_name);
		collection.find({_id: (data)}, function(err,users) {
			if (!users.length) {
				collection.insert(data, function(err, doc) {
				if (err) {
				console.log(err);
			} else {
				console.log('inserted into '+collection_name);
				cb(err, doc);
				return(doc);
			}
				});
			} else {
				console.log(users);
			}
		});
		console.log();
	},

};

//need an insert function, a retrieve all polls function, retrieve username function (those would be the same, just diff param), and an update function.