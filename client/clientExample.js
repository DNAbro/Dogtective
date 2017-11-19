var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', function(){		//keeps canvas to Event
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
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
		
		
		request.onreadystatechange = function () {
			var DONE = this.DONE || 4;
			if (this.readyState === DONE){
				console.log(this);
			}
		};
	request.open('POST', 'bish', true);
	request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	console.log("I did it bish is ready to go out.");
	request.send();  // No data needs to be sent along with the 
	
	view.displayImage('DogtectiveFinalTitle.png');
	//view.display();
	
	//model.modelChangeState();
	//model.addPlayer();
	//model.x.displayTest();
	
	});

}

function View(){
	
	this.displayImage = function(imageName){
		test_image = new Image();
		test_image.src = 'client/assets/'+imageName;
		test_image.onload = function() {
			context.drawImage(test_image, 100, 100);
		}
		console.log("I should be displaying the image given " + imageName);
	}
	
	
	//displayImage('DogtectiveFinalTitle.png');
}

function main() {
	console.log('Testing clientExample.');
	
	
	view = new View(),
	controller = new Controller(view);
	
	
	
};




main();