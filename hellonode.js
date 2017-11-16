//Load HTTP module
//var http = require("http");
var express = require('express');
var app = express();
var serv = require('http').Server(app);
var state = require("./States.js");

//require("./Index.js");



//Create HTTP server and listen on port 8000 for requests
http.createServer(function (request, response) {

   // Set the response HTTP header with HTTP status and Content type
   response.writeHead(200, {'Content-Type': 'text/plain'});
   
   // State Test works perfectly.
   /*var testState = new state.BaseState();
   testState.createPlayer();
   testState.createPlayer();
   testState.createPlayer();
   testState.createPlayer();
   testState.createPlayer();
   testState.createPlayer();
   testState.changeState();
   testState.changeState();*/
   
   //var model = new GameModel(testState),
	//view = new GameView(model),
	//controller = new GameController(model,view);
   
   response.end('Hello World\n');
}).listen(8000);

// Print URL for accessing server
console.log('Server running at http://127.0.0.1:8000/')