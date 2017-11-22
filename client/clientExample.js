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
		
			request.onreadystatechange = function () {
				var DONE = this.DONE || 4;
				//if (this.readyState === DONE){
				if (this.readyState === DONE && this.status==200){	
					console.log(this);
					console.log('Response:' +request.response);
					console.log('ResponseText:'+request.responseText);
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
		start: 'client/assets/Start.png'
	};
	
	//Lucks weird depending on size. Maybe set sizes or something.
	
	startX = canvas.width/4;		//this looks right at the moment. 
	startY = canvas.height/2.5;
	var StartendX;
	var StartendY;
	console.log('Canvaswidth:' + canvas.width);
	console.log('Canvasheight:' + canvas.height);
	
	
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
	
	this.displayImage = function(imageName){
		test_image = new Image();
		test_image.src = 'client/assets/'+imageName;
		test_image.onload = function() {
			context.drawImage(test_image, 30, 30);
		}
		console.log("I should be displaying the image given " + imageName);
	}
	
	
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