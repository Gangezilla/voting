var express=require('express');
var mongodb=require('mongodb');
var passport=require('passport');
var path=require('path');
var bodyParser = require('body-parser');
//var database=require('./modules/database');
var fblogin=require('./modules/fblogin.js');

var app=express();
var MongoClient = mongodb.MongoClient;

var db;
var url=process.env.MONGOLAB_URI_POLL;

//EXPRESS CONFIG
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

//MONGO CONFIG
MongoClient.connect(url, function(err, db) {
    db = db;
    if (err) {
        console.log(err);
    } else {
        console.log('Connected to the Mongo server.');
    }
});

//ROUTES FOR INDEX
app.get("/", function(req, res) {
	res.render('index');
});

//LOGIC FOR NEW-POLL
app.get("/new-poll", function (req, res) {
	res.render('new-poll');
});

app.post("/new-poll", function(req, res) {
	var answers = [];
	console.dir(req.body);
	for (var key in req.body) {
		if(/name/.test(req.body)) {
			answers.push(key);
			console.log(key);
		}
	}
	var doc = {
	answers: '',
	author:  '',
	question: req.body.question
};
	//compile, insert.
});

//LOGIC FOR FB AUTH

app.get("/auth/facebook", function(req, res) {
	res.send("<h1> okay </h1>");
});



//rough: need to create a form that lets someone create 


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