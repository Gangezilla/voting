module.exports = {
	//create new question
	insert: function(db, collection_name, data, cb) {
		var collection=db.collection(collection_name);
		collection.insert(data, function(err, res) {
			if (err) {
			console.log(err);
		} else {
			console.log('inserted into '+collection_name);
			cb(res);
			output=res;
		}
		});
	}




};

//need an insert function, a retrieve all polls function, retrieve username function (those would be the same, just diff param), and an update function.