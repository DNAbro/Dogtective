var express = require('express');
var app = express();
var state = require("./server/States.js");
//require("./client/Index.js");
//require('path');
var serv = require('http').Server(app);
//__dirname = path.resolve(path.dirname(''));
app.get('/',function(req, res) {
	//res.sendFile(__dirname + '/client/Index.js');
	//console.log(req);
	var testState = new state.BaseState();
	//var mod = model(testState);
	
   testState.createPlayer();
   testState.createPlayer();
   testState.createPlayer();
   testState.createPlayer();
   testState.createPlayer();
   testState.createPlayer();
   testState.changeState();
   testState.changeState();
   testState.changeState();
   //var testText = "This was sent from the server.";
   //res.send(testText);
   
   
   //res.send();
	res.sendFile(__dirname + '/client/index.html');
	//res.sendFile(__dirname + '/client/index.js');
	//res.sendFile(__dirname + '/client/clientExample.js');
	
});

app.get('/bish',function(req, res){
	console.log("I fucking did it bitch.");
	res.status(200);
	var myObj = {class: 'class1', id:123};
	res.send(myObj);
	//JSON.stringify(
});
//app.use('/client',express.static(_dirname+'/client'));
app.use('/client',express.static(__dirname+'/client'));
serv.listen(2000);