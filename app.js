var express = require("express");
var app = express();
var request = require("request");
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

var url = "http://www.omdbapi.com/?s=star&apikey=thewdb";
var port = process.env.PORT || 8080;

app.get("/", function(req,res){
	res.render("home");
});

app.get("/results", function(req,res){
	var searchTerm = req["query"]["movieName"];
	for(var i=0; i<searchTerm.length; i++){
		if(searchTerm[i] === " "){
			searchTerm[i] = "+";
		}
	}

	url = "http://www.omdbapi.com/?s=" + searchTerm + "&apikey=thewdb";

	request(url, function(error, response, body){
		if(error){
			console.log("Error");
			res.send("Nothing to display");
		}

		else if(!error && response.statusCode == 200){
			//console.log(req.body);
			var data = JSON.parse(body);
			//console.log(req);
			// res.send(results);
			res.render("results", {data:data});
		}
	});
});

app.listen(port, function(){
	console.log("Welcome to Movie Searcher");
	console.log("Server has started");
}); 