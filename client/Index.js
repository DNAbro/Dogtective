

var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var GameData = {};

//function GameModel(state) {
function GameModel() {
	GameData.data = 'This is the model.';
	
	
	/*console.log(state.getValue());
	
	
	
	
	
	//the model tells the state to change.
	this.modelChangeState = function() {
		state.changeState();								//change the state
		console.log(state.getValue());						//Log state into console.
		
	}
	
	this.addPlayer = function() {
		state.createPlayer();
	}*/
	
	
	
	
	//creates a new player and adds it to the array.
	
	
	
	
}
function GameView(model){
	this.model = model;
	this.display = function() {
		
		test_image = new Image();
		test_image.src = 'client/assets/pawPrint.jpg'
		test_image.onload = function() {
			context.drawImage(test_image, 100, 100);
		}
		console.log('I am doing the function.');
		console.log(GameData.data);
	}

}

function GameController(model,view){
	window.addEventListener('click',function(event){
	
	view.display();
	//model.modelChangeState();
	//model.addPlayer();
	//model.x.displayTest();
	
});
}


function main() {
	console.log('Hey');
	//var state = new BaseState();
	//$.get('/').done(function(state)){ console.log(state.playerCount);});
	//var model = new GameModel(state),
	var model = new GameModel(),
	view = new GameView(model),
	controller = new GameController(model,view);
	
	/*console.log(state.getValue());	//this works
	state.changeState();
	console.log(state.getValue());
	state.changeState();
	console.log(state.getValue());*/
	
};




main();