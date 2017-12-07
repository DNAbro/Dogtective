"use strict";
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/

const mdsm = require('./mdsm');



var state = require("./server/States.js");
//require("./client/Index.js");
//require('path');
var serv = require('http').Server(app);

var testState = new state.BaseState();
var count = 0;
testState.changeState();

mdsm.init({
	mode: 'Middleware',
	endpoints: [
		{
			url: '/',
			allowedClassTypes: ['screen'],
			handler: function(sessionData,clientData,request,response,mdsmCookie){
				console.log('Handling doSomething1');
				console.log(sessionData);
				console.log(clientData);
			}
		},
		{
			url: '/login/',
			allowedClassTypes: ['screen'],
			handler: function(sessionData,clientData,request,response,mdsmCookie){
				let clientCookie = mdsm.addClient({
					session: '420',
					clientClass: 'screen',
					clientData: {'Player': count},
				});
				
				testState.createPlayer();
				testState.setCookie(count, clientCookie);
				count++;
				
				
			}
		},
		{
		url: '/startPressed',
			allowedClassTypes: ['screen'],
			handler: function(sessionData,clientData,request,response,mdsmCookie){
				console.log("Please work:");
				console.log(clientData);
			}
		},
		{
		url: '/voteWasMade',
			allowedClassTypes: ['screen'],
			handler: function(sessionData,clientData,request,response,mdsmCookie){
				console.log("Please work:");
				console.log(clientData);
				console.log("Player is :" + clientData.Player);
				
				var j = JSON.parse(Object.keys(request.body)[0]);
				//console.log(Object.keys(req.body)[0]);
				//console.log(j.player)
				console.log("Vote is:" + j.vote);
				testState.assignVote(clientData.Player,j.vote);
				//makeVote
			}
		},
	],
});
//__dirname = path.resolve(path.dirname(''));
app.get('/',function(req,res){
	
	mdsm.processRequest(req, res,
		function(error){
			console.log("Code is: " + error.errorCode);
			if(error.errorCode === 0){
				let newSessionInfo = {
					sessionID: '420',		// Don't specify. Let createSession() generate it.
					timeToLive: 600000,	// 10 second session length
				};
				let newSesh = mdsm.createSession(newSessionInfo);
				let clientCookie = mdsm.addClient({
					session: newSesh,
					clientClass: 'screen',
					clientData: {'Original':'please'},
				});
				res.setHeader('Set-Cookie',['mdsm=' + clientCookie]);
				//res.end('Blah blah');
				
				
				console.log(newSessionInfo.sessionID);
				/*if(testState.returnNumberOfPlayers() < 15 && testState.getValue() == "StartState"){
					testState.createPlayer();
				}
				else{
					console.log("There are already 15 players.");
					//testState.changeState();
				}*/
				res.sendFile(__dirname + '/client/index.html');
			}
			else if(error.errorCode === 1){
				console.log("go to login");
				//cookie is not valid.
				
				res.setHeader('Set-Cookie',[
					`mdsm=; HttpOnly; expires=Thu, 01 Jan 1970 00:00:00 GMT`,
					// `data:59e112e318259d1e5797741c5448971bd108de1f1981a8c048abfedba67a3154=butt; HttpOnly; Max-Age=60`,
					// `data:59e112e318259d1e5797741c5448971bd108de1f1981a8c048abfedba67a3154=butt; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`,
					]);
			}
		
		}
	);
	
	//console.log("Lets see if this works:" +k);
	/*if(testState.returnNumberOfPlayers() < 15 && testState.getValue() == "StartState"){
		testState.createPlayer();
	}
	else{
		console.log("There are already 15 players.");
		//testState.changeState();
	}*/
	
   
   
   
   
	//res.sendFile(__dirname + '/client/index.html');
	//res.sendFile(__dirname + '/client/index.js');
	//res.sendFile(__dirname + '/client/clientExample.js');
		
	
	
});

app.get('/login', function(req,res){
	console.log("login page");
	/*mdsm.processRequest(req, res,
		function(error){
			console.log("Error in login is: " + error.errorCode);
			if(error.errorCode === 0){
				console.log('Session isnt valid');
				let clientCookie = mdsm.addClient({
					session: '420',
					clientClass: 'screen',
					clientData: {'Player': count},
				});
				count++;
				testState.createPlayer();
				res.sendFile(__dirname + '/client/index.html');
			}
			else if(error.errorCode === 1){
				
				let clientCookie = mdsm.addClient({
					session: '420',
					clientClass: 'screen',
					clientData: {'Player': count},
				});
				
				res.sendFile(__dirname + '/client/index.html');

				
				//let clientCookie = mdsm.addClient(420,
					
				
			}
		}
	);*/
	let clientCookie = mdsm.addClient({
					session: '420',
					clientClass: 'screen',
					clientData: {'Player': count},
				});
				
	testState.createPlayer();
	testState.setCookie(count, clientCookie);
	res.setHeader('Set-Cookie',['mdsm=' + clientCookie]);
	count++;
	
	
	
	res.sendFile(__dirname + '/client/index.html');
	res.status(200);

});




app.post('/startPressed',function(req,res){
	console.log(req.body);
	res.status(200);
	var myObj = {class: 'class1', id:123};
	//res.send(myObj);
	//start Was pressed.
	testState.setStartWasPressed(true);
	//testState.changeState();
	testState.changeState();
	
	//fix this so PlayerPost is called correctly and doesn't send old info.
	for(var i = 0; i <= testState.getPlayerArrayLength()-1; i++){
			//console.log('Adding to Post:' + this.container.getPlayerFromArray(i).getPlayerRoleName());
			var play1 = { playerNumber: testState.getPlayerFromArray(i).getPlayerNumber(), playerRole: testState.getPlayerFromArray(i).getRoleName(), inGame: testState.getPlayerFromArray(i).getPlayerIsInGame()}; 
		
			testState.getPlayerPost()[i+1] = play1;
		}
	res.send(testState.getPlayerPost());
	
	
	//console.log("3."+req.header.cookie);
	
	//
	mdsm.processRequest(req, res,
		function(error){
			console.log("Error in login is: " + error.errorCode);
			if(error.errorCode === 0){
				
			}
			else if(error.errorCode === 1){

				//let clientCookie = mdsm.addClient(420,
					
				
			}
		}
	);
	
	
	
	//res.send(req.body);
	//JSON.stringify(
});

app.post('/voteWasMade',function(req,res){
	console.log(req.body);
	
	
	//this grabs the message, tbh there is probably a much better way to get this.
	var j = JSON.parse(Object.keys(req.body)[0]);
	//console.log(Object.keys(req.body)[0]);
	//console.log(j.player)
	//console.log(j.vote);
	///
	//testState.assignVote(j.player,j.vote);
	
	mdsm.processRequest(req, res,
		function(error){
			console.log("Error in login is: " + error.errorCode);
			if(error.errorCode === 0){
				
			}
			else if(error.errorCode === 1){

				//let clientCookie = mdsm.addClient(420,
					
				
			}
		}
	);
	
	//console.log(req);
	console.log("Server response to voteWasMade");
	res.status(200);
	
	testState.changeState();
	if(testState.getWinner()){
		console.log("Sending winner post.");
		console.log(testState.getWinnerPost());
		res.send(testState.getWinnerPost());
	}
	else{
		console.log("Sending eliminate");
		res.send(testState.getEliminatePost());
	}
});

app.post('/results',function(req,res){
	console.log(req.body);
	
	var updatePost = {};
	updatePost[0] = { state: 'ChooseState'};
		
		
		for(i = 0; i <= testState.getPlayerArrayLength()-1; i++){
			//console.log('Adding to Post:' + this.container.getPlayerFromArray(i).getPlayerRoleName());
			var play1 = { playerNumber: testState.getPlayerFromArray(i).getPlayerNumber(), playerRole: testState.getPlayerFromArray(i).getRoleName(), inGame: testState.getPlayerFromArray(i).getPlayerIsInGame()}; 
		
			updatePost[i+1] = play1;
		}
	
	res.status(200);
	res.send(updatePost);
});

app.post('/sicEm',function(req,res){
	console.log(req.body);
	//
	var j = JSON.parse(Object.keys(req.body)[0]);
	var plNumber;
	console.log(Object.keys(req.body)[0]);
	console.log(j.vote);
	///
	
		for(i = 0; i <= testState.getPlayerArrayLength()-1; i++){
			if(testState.getPlayerRole(i) == "PackLeader"){
				plNumber = i;
			}
		}
	
	console.log('PL num:' + plNumber);
	
	testState.setPLChoice(plNumber,j.vote);
	testState.changeState();
	
	if(testState.getWinner()){
		res.send(testState.getWinnerPost());
	}
	else{
		res.send(testState.getEliminatePost());
	}
	
	var temp = {};
	testState.setElimiantePost(temp);
});
//app.use('/client',express.static(_dirname+'/client'));
app.use('/client',express.static(__dirname+'/client'));
serv.listen(2000);