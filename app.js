var express = require('express');
var mongodb = require('mongodb');
var passport = require('passport');
var path = require('path');
var bodyParser = require('body-parser');
var ObjectId=require('mongodb').ObjectId;

var database=require('./modules/database');
var fblogin = require('./modules/fblogin.js');

var app = express();
var MongoClient = mongodb.MongoClient;

var datab;
var url = process.env.MONGOLAB_URI_POLL;
//////////////////
//CONFIG FOR APP//
//EXPRESS CONFIG//
//////////////////
app.set('port', (process.env.PORT || 8080));
app.listen(app.get('port'), function() {
    console.log("Listening on " + app.get('port') + ".");
});


app.set('view engine', 'ejs');
app.set('views', __dirname + '/templates');

app.use(express.static(path.join(__dirname, 'assets')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
////////////////
//MONGO CONFIG//
////////////////
MongoClient.connect(url, function(err, db) {
    datab = db;
    if (err) {
        console.log(err);
    } else {
        console.log('Connected to the Mongo server.');
    }
});
////////////////////
///////ROUTES///////
//ROUTES FOR INDEX//
////////////////////
app.get("/", function(req, res) {
    res.render('index');
});
///////////////////////
//ROUTES FOR NEW-POLL//
///////////////////////
app.get("/new-poll", function(req, res) {
    res.render('new-poll');
});

app.post("/new-poll", function(req, res) {
	//nned to come back here later on when you've got user auth working and insert the author into here.
    var answers = [];
    var file = {
        answers: '',
        author: '',
        question: req.body.question
    };
    for (var key in req.body) {
        if (/answer/.test(key)) {
            answers.push(req.body[key]);
        }
    }
    file.answers = answers;
    database.insert(datab, 'polls', file, function(err, doc) {
    	//still need to figure out how to add URL parameter in here.
    	res.render("vote", {
    		question: doc.ops[0].question,
    		 answers: doc.ops[0].answers
    		});
    });
});
///////////////////
//ROUTES FOR VOTE//
///////////////////
app.get("/vote/:id", function(req, res) {
	var id=req.params.id;
	database.getID(datab, 'polls', id, function(err, doc) {
		//console.log(doc);
		if(err) {
			console.log(err);
			return doc(err);
		} else {
			console.log('outputting... ');
			console.log(doc[0].question);
			res.render("vote", {
    		question: doc[0].question,
    		answers: doc[0].answers
    		});
		}
	});
//get id out of database, and then fill the page with the relevant stuff.

});
//////////////////////
//ROUTES FOR FB AUTH//
//////////////////////
app.get("/auth/facebook", function(req, res) {
    res.send("<h1> okay </h1>");
});

//need to put together a user authentication, probs just fb...

//index could have a little toggle if you're logged in to show your own questions, or everyones.

//authentication.
//write to database, access database. db entry would be like {["_id", question", "answers", "author"]}

// User Story: As an authenticated user, I can keep my polls and come back later to access them.

// User Story: As an authenticated user, I can share my polls with my friends.

// User Story: As an authenticated user, I can see the aggregate results of my polls.

// User Story: As an authenticated user, I can delete polls that I decide I don't want anymore.

// User Story: As an authenticated user, I can create a poll with any number of possible items.

// User Story: As an unauthenticated or authenticated user, I can see and vote on everyone's polls.

// User Story: As an unauthenticated or authenticated user, I can see the results of polls in chart form. (This could be implemented using Chart.js or Google Charts.)

// User Story: As an authenticated user, if I don't like the options on a poll, I can create a new option.
