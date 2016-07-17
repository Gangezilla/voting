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
	}
};

//need an insert function, a retrieve all polls function, retrieve username function (those would be the same, just diff param), and an update function.