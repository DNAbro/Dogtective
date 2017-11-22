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
	
	
	window.addEventListener('click',function(event){
		
	if(mouse.x > view.getStartX() && mouse.x < view.getStartendX() && mouse.y > view.getStartY() && mouse.y < view.getStartendY()) {	
		
			//in order to get the response, it must be in onreadystatechange.
			request.onreadystatechange = function () {
				var DONE = this.DONE || 4;
				//if (this.readyState === DONE){
				if (this.readyState === DONE && this.status==200){	
					console.log(this);
					console.log('Response:' +request.response);
					var resp = JSON.parse(request.response);
					console.log(resp[0].playerRole);
					view.displayInfoScreen();
					//TODO Now that I can get it to appear, the screen needs to change depending on who was chosen
				}
			};
		request.open('POST', 'startPressed', true);
		request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
		console.log("I did it bish is ready to go out.");
		request.send();  // No data needs to be sent along with the 
		
		console.log('Response:' +request.response);
		console.log('ResponseText:'+request.responseText);
		
		
		
		console.log('MouseX location:' + mouse.x);
		console.log('MouseY location:' + mouse.y);
		console.log('Start was pressed.');
	
	}	//if
	
	
	});

}

function View(){
	
	var sources = {
		title: 'client/assets/DogtectiveFinalTitle.png',
		pawPrint: 'client/assets/pawPrint.jpg',
		start: 'client/assets/Start.png',
		dogtectiveD: 'client/assets/DogtectiveDisplay.png',
		packLeaderD: 'client/assets/PackLeaderDisplay.png',
		packMemberD: 'client/assets/PackMemberDisplay.png',
		pugtectorD:  'client/assets/PugtectorDisplay.png',
		WatchhoundD: 'client/assets/WatchhoundDisplay.png'
	};
	
		//Looks weird depending on size. Maybe set sizes or something.
	
	startX = canvas.width/4;		//this looks right at the moment. 
	startY = canvas.height/2.5;
	var StartendX;
	var StartendY;
	console.log('Canvaswidth:' + canvas.width);
	console.log('Canvasheight:' + canvas.height);
	
	this.displayImage = function(imageName,x,y,sizex,sizey){
		test_image = new Image();
		test_image.src = imageName;
		test_image.onload = function() {
			context.drawImage(test_image, x, y,sizex,sizey);
		}
		console.log("I should be displaying the image given " + imageName);
	}
	this.displayImageAndText = function(imageName,displayText){
		img = new Image();
		img.src = imageName;
		img.onload = function(){
			context.drawImage(img, startX,0, 300,300);
			context.font = "20pt Arial";
			context.fillText(displayText,150,150);
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
		//console.log('Start width: ' +images.start.width);
		//console.log('Start length: ' +images.start.height);
		//while I'm testing left bound is 120, right is 500
		//up is 170
		//down is 310
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