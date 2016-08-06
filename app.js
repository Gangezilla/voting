var express = require('express');
var mongodb = require('mongodb');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var path = require('path');
var bodyParser = require('body-parser');
var ObjectId=require('mongodb').ObjectId;

var database=require('./modules/database');


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
app.use(passport.initialize());
app.use(passport.session());
////////////////
//MONGO CONFIG//
////////////////
MongoClient.connect(url, function(err, db) {
    datab = db;
    if (err) {
        console.log(err);
    } else {
        console.log('Connected to the Mongo server.');
        auth = require('./modules/auth')(app, passport, FacebookStrategy, datab);
    }
});
////////////////////
///////ROUTES///////
//ROUTES FOR INDEX//
////////////////////
app.get("/", function(req, res) {
var userDocs={};
	database.getAllResults(datab, 'polls', function(err, doc) {
		res.render("index", {
			polls:(doc)
		});
	});

});
///////////////////////
//ROUTES FOR NEW-POLL//
///////////////////////
app.get("/new-poll", function(req, res) {
    res.render('new-poll');
});

app.post("/new-poll", function(req, res) {
	//nned to come back here later on when you've got user auth working and insert the author into here.
    var answers = {};
    var file = {
        answers: {},
        author: '',
        question: req.body.question
    };
    for (var key in req.body) {
        if (/answer/.test(key)) {
            answers[req.body[key]]=0;
        }
    }
    file.answers = answers;
    console.log(file);
    database.insert(datab, 'polls', file, function(err, doc) {
    	//still need to figure out how to add URL parameter in here.
    	res.render("vote", {
    		question: doc.ops[0].question,
    		answers: doc.ops[0].answers,
    		id: doc.ops[0]._id
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
			console.log(doc[0]._id);
			res.render("vote", {
			id: doc[0]._id,
    		question: doc[0].question,
    		answers: doc[0].answers
    		});
		}
	});
});
//get id out of database, and then fill the page with the relevant stuff.

// passport.authenticate('facebook', { successRedirect: '/',
//                                       failureRedirect: '/login' }));

// });
//////////////////////
//ROUTES FOR FB AUTH//
//////////////////////
app.get('/login', passport.authenticate('facebook', { scope: 'email'}));

app.get('/auth/facebook/callback', 
	passport.authenticate('facebook', {
	  successRedirect: '/',
	  failureRedirect: '/error'
}), function() {
	console.log('testing');
});





