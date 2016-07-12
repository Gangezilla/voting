var express=require('express');
var mongodb=require('mongodb');

var app=express();
var MongoClient = mongodb.MongoClient;

app.set('view engine', 'ejs');
app.set('views', __dirname + '/templates');

app.set('port', (process.env.PORT || 8080));
app.listen(app.get('port'), function() {
    console.log("Listening on " + app.get('port') + ".");
});

app.get("/", function(req, res) {
	res.render('index');
});