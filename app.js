var express=require('express');
var mongodb=require('mongodb');
var passport=require('passport');
//var database=require('./modules/database');
var fblogin=require('./modules/fblogin.js');

var app=express();
var MongoClient = mongodb.MongoClient;

app.set('view engine', 'ejs');
app.set('views', __dirname + '/templates');

var db;
var url=process.env.MONGOLAB_URI_POLL;

var doc = {
	answers: '',
	author:  '',
	question: ''
};

app.set('port', (process.env.PORT || 8080));
app.listen(app.get('port'), function() {
    console.log("Listening on " + app.get('port') + ".");
});

app.get("/", function(req, res) {
	res.render('index');
});

app.get("/auth/facebook", function(req, res) {
	res.send("<h1> okay </h1>");
});

MongoClient.connect(url, function(err, db) {
    db = db;
    if (err) {
        console.log(err);
    } else {
        console.log('Connected to the Mongo server.');
    }
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