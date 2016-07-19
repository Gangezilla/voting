var mongodb = require('mongodb');
var ObjectId=require('mongodb').ObjectId;

module.exports = {
	//create new question
	insert: function(db, collection_name, data, cb) {
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
		//db.test.find({"_id" : ObjectId("4ecc05e55dd98a436ddcc47c")})
		var collection=db.collection(collection_name);
		collection.find({_id: new ObjectId(data)}).toArray(cb);
	},
	getAllResults: function(db, collection_name, cb) {
		// var cursor = db.collection(collection_name).find();
		// cursor.each(function(err, item) {
		// 	if (item===null) {
		// 		return;
		// 	} else {
		// 		console.log(item);
		// 		cb(item);
		// 	}
		// });
		var collection=db.collection(collection_name);
		// collection.find().toArray(function(err, docs){
  //   	console.log("retrieved records:");
  //   	console.log(docs);
  //   	cb(docs);
    	collection.find({}, function(err, cursor){
    		cursor.toArray(cb);
		});
//});
		// var collection=db.collection(collection_name);
		// collection.find({}, cb);
	},

	getUserResults: function(db, collection_name, user, cb) {

	},

	updatePoll: function(db, collection_name, data, cb) {

	}
};

//need an insert function, a retrieve all polls function, retrieve username function (those would be the same, just diff param), and an update function.