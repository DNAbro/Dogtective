var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', function(){		//keeps canvas to Event
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
});

var mouse = {
	x: undefined,
	y: undefined
}

window.addEventListener('mousemove',function(event){
	
	mouse.x = event.x;
	mouse.y = event.y;
	
});

function reqListener () {
	console.log(this.responseText);
}

function Controller(view){
	
	/*var xhttp = new XMLHttpRequest();		//request to node server
	xhttp.addEventListener("load", reqListener);
	xhttp.open("GET", "bish");	//specifies type of request
	xhttp.send();								//send the request to server, GET
	//xhttp.send(string);					//POST*/
	var request = new XMLHttpRequest();
	var state = 'StartState';
	
	
	window.addEventListener('click',function(event){
		
		console.log('MouseX location:' + mouse.x);
		console.log('MouseY location:' + mouse.y);
		////////////////////////////////////////////////////////////////////////////////
		///////////////////////////////////////////////////////////////////////////////
		//////////////////////////////////////////////////////////////////////////////
		//only for the start portion.
	if(mouse.x > view.getStartX() && mouse.x < view.getStartendX() && mouse.y > view.getStartY() && mouse.y < view.getStartendY() && state == 'StartState') {	
		
			//in order to get the response, it must be in onreadystatechange.
			request.onreadystatechange = function () {
				var DONE = this.DONE || 4;
				//if (this.readyState === DONE){
				if (this.readyState === DONE && this.status==200){	
					console.log(this);
					console.log('Response:' +request.response);
					var resp = JSON.parse(request.response);
					console.log(resp[1].playerRole);
					//view.displayInfoScreen();
					var count = Object.keys(resp).length-1;
					console.log(count);
					//need to send array of ingame or out.
					var inOrOut = {};
					for(var i = 0; i < count; i++){
						inOrOut[i] = resp[i+1].inGame;
						console.log(inOrOut[i]);
					}
					
					
					view.displayChoosingScreen(count,inOrOut);
					console.log(resp[0].state);
					state = resp[0].state;
					console.log(state)
					//TODO Now that I can get it to appear, the screen needs to change depending on who was chosen
				}
			};
		request.open('POST', 'startPressed', true);
		request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
		console.log("I did it bish is ready to go out.");
		request.send();  // No data needs to be sent along with the 
		
		console.log('Response:' +request.response);
		console.log('ResponseText:'+request.responseText);
		
		
		
		
		console.log('Start was pressed.');
	
	}	//if
	///////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////
	if(state == "ResultsState"){
		//all this is a screen that displays the results.
		//just click to continue to the next screen.
		state = "SicState";
		console.log("Moving to SicState.");
		var request3 = new XMLHttpRequest();
		request3.onreadystatechange = function () {
					var DONE = this.DONE || 4;
					//if (this.readyState === DONE){
					if (this.readyState === DONE && this.status==200){	
						console.log(this);
						console.log('Response:' +request3.response);
						var resp2 = JSON.parse(request3.response);
						//console.log(resp2.Player);	//this works
						var count = Object.keys(resp2).length-1;
						console.log(count);
						//need to send array of ingame or out.
						var inOrOut3 = {};
						for(var i = 0; i < count; i++){
							inOrOut3[i] = resp2[i+1].inGame;
							console.log(inOrOut3[i]);
						}
					
					
					view.displayChoosingScreen(count,inOrOut3);
					
					}
				};
				
				request3.open('POST', 'results', true);
				request3.send();
		
		//note need to grab the most recent update from server on who is eliminated.
	}
	if(state == "ResultsState2"){
		//all this is a screen that displays the results.
		//just click to continue to the next screen.
		state = "ChooseState";
		console.log("Moving to ChooseState.");
		var request5 = new XMLHttpRequest();
		request5.onreadystatechange = function () {
					var DONE = this.DONE || 4;
					//if (this.readyState === DONE){
					if (this.readyState === DONE && this.status==200){	
						console.log(this);
						console.log('Response:' +request5.response);
						var resp2 = JSON.parse(request5.response);
						//console.log(resp2.Player);	//this works
						var count = Object.keys(resp2).length-1;
						console.log(count);
						//need to send array of ingame or out.
						var inOrOut3 = {};
						for(var i = 0; i < count; i++){
							inOrOut3[i] = resp2[i+1].inGame;
							console.log(inOrOut3[i]);
						}
					
					
					view.displayChoosingScreen(count,inOrOut3);
					
					}
				};
				
				request5.open('POST', 'results', true);
				request5.send();
		
		//note need to grab the most recent update from server on who is eliminated.
	}
	////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////
	//choosing
	//Note this probably will break cause choosestate is set above.
	if(state == 'ChooseState'){
		
		var len = Object.keys(view.getChooseLocationsX()).length;
		var request2 = new XMLHttpRequest();
		
		for(var i = 0; i < len; i++){
			
			if(mouse.x > view.getChooseLocationsX()[i] && mouse.x < (view.getChooseLocationsX()[i] + view.getChooseSizeX()) && mouse.y > view.getChooseLocationsY()[i] && mouse.y < (view.getChooseLocationsY()[i]+view.getChooseSizeY())){
					console.log("I am clicking:" + i);
				
					//ideally each players sends their choice to the server
					//idk how to do that on an individual basis yet so juan what the fuck
					request2.onreadystatechange = function () {
					var DONE = this.DONE || 4;
					//if (this.readyState === DONE){
					if (this.readyState === DONE && this.status==200){	
						console.log(this);
						console.log('Response:' +request2.response);
						var resp = JSON.parse(request2.response);
						console.log(resp.Player);	//this works
						if(resp.Player != undefined){
							view.displayResultsScreen(resp.Player);
							//Okay now I should make the next screen show who got eliminated
							//Results now it's own state, no need to alert server for data.
							state = "ResultsState";
							}
						}
					};
				request2.open('POST', 'voteWasMade', true);
				//request2.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
				request2.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
				//request2.send({"number": "4" });
				
				var vote = { 'player' : 1,'vote' : i};
				//request2.send(i);
				request2.send(JSON.stringify(vote));
				
				
				//request2.send(js);
				console.log("Vote Was Made.");
				
				
			}
				
		}
	}
	
	///////////////////////////////////////////////////////////////////////
	if(state == "SicState"){
		
		console.log("I am here in the client side sic state");
		var len2 = Object.keys(view.getChooseLocationsX()).length;
		var request4 = new XMLHttpRequest();
		
		for(var k = 0; k < len2; k++){
		
		if(mouse.x > view.getChooseLocationsX()[k] && mouse.x < (view.getChooseLocationsX()[k] + view.getChooseSizeX()) && mouse.y > view.getChooseLocationsY()[k] && mouse.y < (view.getChooseLocationsY()[k]+view.getChooseSizeY())){
					console.log("I am clicking:" + k);
				
					//ideally each players sends their choice to the server
					//idk how to do that on an individual basis yet so juan what the fuck
					request4.onreadystatechange = function () {
					var DONE = this.DONE || 4;
					//if (this.readyState === DONE){
					if (this.readyState === DONE && this.status==200){	
						console.log(this);
						console.log('Response:' +request4.response);
						var resp = JSON.parse(request4.response);
						console.log(resp.Player);	//this works
						if(resp.Player != undefined){
							view.displayResultsScreen(resp.Player);
							//Okay now I should make the next screen show who got eliminated
							//Results now it's own state, no need to alert server for data.
							state = "ResultsState";
							}
						}
					};
				request4.open('POST', 'sicEm', true);
				//request2.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
				request4.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
				//request2.send({"number": "4" });
				
				var vote = { 'player' : 4,'vote' : k};
				//request2.send(i);
				request4.send(JSON.stringify(vote));
		}
		}
	}
	
	
	//////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////
	});
	

}

function View(){
	
	var sources = {
		title: 'client/assets/DogtectiveFinalTitle.png',
		pawPrint: 'client/assets/pawPrint.png',
		start: 'client/assets/Start.png',
		dogtectiveD: 'client/assets/DogtectiveDisplay.png',
		packLeaderD: 'client/assets/PackLeaderDisplay.png',
		packMemberD: 'client/assets/PackMemberDisplay.png',
		pugtectorD:  'client/assets/PugtectorDisplay.png',
		WatchhoundD: 'client/assets/WatchhoundDisplay.png',
		eliminated: 'client/assets/pawPrintEliminated.png'
	};
	
		//Looks weird depending on size. Maybe set sizes or something.
	
	startX = canvas.width/4;		//this looks right at the moment. 
	startY = canvas.height/2.5;
	var StartendX;
	var StartendY;
	var chooseLocationsX = {};
	var chooseLocationsY = {};
	var chooseSizeX = 0;
	var chooseSizeY = 0;
	console.log('Canvaswidth:' + canvas.width);
	console.log('Canvasheight:' + canvas.height);
	
	this.getChooseLocationsX = function(){
		return chooseLocationsX;
	}
	this.getChooseLocationsY = function(){
		return chooseLocationsY;
	}
	this.getChooseSizeX = function(){
		return chooseSizeX;
	}
	this.getChooseSizeY =function(){
		return chooseSizeY
	}
	this.displayImage = function(imageName,x,y,sizex,sizey){
		test_image = new Image();
		test_image.src = imageName;
		test_image.onload = function() {
			context.drawImage(test_image, x, y,sizex,sizey);
		}
		console.log("I should be displaying the image given " + imageName);
	}
	this.displayImageAndText = function(imageName,displayText,picX,picY,picSizeX,picSizeY,textX,textY){
		img = new Image();
		img.src = imageName;
		img.onload = function(){
			context.drawImage(img, picX,picY, picSizeX,picSizeY);
			context.font = "20pt Arial";
			context.fillText(displayText,textX,textY);
		}
		
	}
	this.displayImageAndText2 = function(imageName,displayText,picX,picY,picSizeX,picSizeY,textX,textY){
		img2 = new Image();
		img2.src = imageName;
		img2.onload = function(){
			context.drawImage(img2, picX,picY, picSizeX,picSizeY);
			context.font = "20pt Arial";
			context.fillText(displayText,textX,textY);
		}
		
	}
	
	

	
	//this is going to go to the screens of phones
	this.displayInfoScreen = function(){
		var DogtectiveInfo = "You are the Dogtective! \nYou will decide which of the other \nplayers will go to jail.";
		var PugtectorInfo = "You are the Pugtector! You will be able to prevent the Dogtective from sending someone to jail.";
		var WatchhoundInfo = "You are the Watchhound! You will be able to discover who a player actually is each turn.";
		var PackLeaderInfo = "You are the Pack Leader! All final decisions will go through you. Reveal yourself as the leader.";
		var PackMember = "You are a Pack Member! Just a part of the pack.";
		
		
		var lineHeight = 30;
		var lines = DogtectiveInfo.split('\n');
		
		context.clearRect(0, 0, canvas.width, canvas.height);	//clears canvas first.
		
		
		context.font = "30px Arial";
		
		
		//in order for line breaks to work.
		
		//TODO: do this dynamically
		this.displayImage(sources.dogtectiveD, 450, 0,300,100);
		for(var i = 0; i<lines.length; i++){
			context.fillText(lines[i],startX+100,100+startY+(i*lineHeight));
		}
	}
	
	this.displayResultsScreen = function(theyGone){
		var tex = "Player #" + theyGone + " has been eliminated!";
		context.clearRect(0, 0, canvas.width, canvas.height);	//clears canvas first.
		context.fillText(tex, startX, startY);
		
		//note I can just create a state here, it doesn't have to go to the server.
		
		
	}
	
	this.displayChoosingScreen = function(numOfPlayers, inGameStatus){
		context.clearRect(0, 0, canvas.width, canvas.height);
		var sizeX;
		var sizeY;
		var locX = 0;	//this looks fine.
		var locY = canvas.height/6;
		var countTo3 = 1;
		//if 6 players
		
		//size of the pictures about to be loaded
		if(numOfPlayers > 12){
			sizeX = canvas.width/7;
			sizeY = canvas.height/7;
			
		}
		else if(numOfPlayers > 9){
			sizeX = canvas.width/6;
			sizeY = canvas.height/6;
		}
		else if(numOfPlayers > 6){
			sizeX = canvas.width/5;
			sizeY = canvas.height/5;
		}
		else{
			sizeX = canvas.width/4;
			sizeY = canvas.height/4;
		}
		chooseSizeX = sizeX;
		chooseSizeY = sizeY;
		for(var i = 0; i<numOfPlayers; i++){
			console.log('Player ' + i + ' is in: ' + inGameStatus[i]);

			//source image, text, image x location, y, image x size, y size, text x, text y
			if(inGameStatus[i] == true){
				console.log("I am in true and : "+ inGameStatus[i]);
				this.displayImageAndText(sources.pawPrint,i,locX+(countTo3*sizeX),locY,sizeX,sizeY,locX+sizeX/2.2+(countTo3*sizeX),locY+sizeY/1.3);
			}
			if(inGameStatus[i] == false){
				console.log("I get in here.");
				//so it can't draw these two images at the same time? is it cause the onload thing?
				this.displayImageAndText2(sources.eliminated,i,locX+(countTo3*sizeX),locY,sizeX,sizeY,locX+sizeX/2.2+(countTo3*sizeX),locY+sizeY/1.3);
			}

			

			/*else{
				console.log("I get in here.");
				this.displayImageAndText(sources.eliminated,i,locX+(countTo3*sizeX),locY,sizeX,sizeY,locX+sizeX/2.2+(countTo3*sizeX),locY+sizeY/1.3);
			}*/
			
			chooseLocationsX[i]= locX+(countTo3*sizeX);
			chooseLocationsY[i] = locY;
			
			console.log(i);
			console.log('ChooseLocationsX:' + chooseLocationsX[i]);
			countTo3++;
			if(countTo3 == 4){
				countTo3 = 1;
				locY = locY + sizeY;
			}
			
		}
		
		
	}
	
	
	
	this.getStartX = function(){
		return startX;
	}
	this.getStartY = function(){
		return startY;
	}
	this.getStartendX = function(){
		return StartendX;
	}
	this.getStartendY = function() {
		return StartendY;
	}
	
	//runs on load.
	loadImages(sources, function(images){
		context.drawImage(images.title, 40, 30);
		//context.drawImage(images.pawPrint, 350, 55, 93, 104);
		context.drawImage(images.start, startX, startY);
		StartendX = startX + images.start.width;
		StartendY = startY + images.start.height;
		
	});
	
	
	
	
	//displayImage('DogtectiveFinalTitle.png');
}

function loadImages(sources, callback){
	var images = {};
	var loadedImages = 0;
	var numImages = 0;
	
	for(var src in sources) {
		images[src] = new Image();
		images[src].onload = function() {
			if(++loadedImages >=numImages) {
				callback(images);
			}
		};
		images[src].src = sources[src];
	}
}



function main() {
	console.log('Testing clientExample.');
	
	
	
	

		
		
	
	view = new View(),
	controller = new Controller(view);
	
	
	//view.displayImage('DogtectiveFinalTitle.png');
	//view.displayImage('pawPrint.jpg');
	
	
	
};




main();