var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/


var state = require("./server/States.js");
//require("./client/Index.js");
//require('path');
var serv = require('http').Server(app);

var testState = new state.BaseState();
//__dirname = path.resolve(path.dirname(''));
app.get('/',function(req, res) {
	//res.sendFile(__dirname + '/client/Index.js');
	//console.log(req);
	//var testState = new state.BaseState();
	//var mod = model(testState);
	
	if(testState.returnNumberOfPlayers() < 15){
		testState.createPlayer();
	}
	else{
		console.log("There are already 15 players.");
		testState.changeState();
	}
	
   
   
   //testState.changeState();
   //testState.changeState();
   //testState.changeState();
   //var testText = "This was sent from the server.";
   //res.send(testText);
   
   
   //res.send();
	res.sendFile(__dirname + '/client/index.html');
	//res.sendFile(__dirname + '/client/index.js');
	//res.sendFile(__dirname + '/client/clientExample.js');
	
});

//app.get('/bish',function(req, res){
app.post('/startPressed',function(req,res){
	console.log(req.body);
	res.status(200);
	var myObj = {class: 'class1', id:123};
	//res.send(myObj);
	//start Was pressed.
	testState.setStartWasPressed(true);
	testState.changeState();
	testState.changeState();
	
	res.send(testState.getPlayerPost());
	
	
	//res.send(req.body);
	//JSON.stringify(
});

app.post('/voteWasMade',function(req,res){
	console.log(req.body);
	
	
	
	console.log(Object.keys(req.body)[0]);
	
	//console.log(req);
	console.log("Server response to voteWasMade");
	res.status(200);
	res.send("hey");
});
//app.use('/client',express.static(_dirname+'/client'));
app.use('/client',express.static(__dirname+'/client'));
serv.listen(2000);