var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var GameData = {};

function GameModel(state) {
	GameData.data = 'This is the model.';
	
	var playerArray = [];					//array of players?
	var playerCount = 0;
	console.log(state.getValue());
	
	
	
	
	
	
	this.modelChangeState = function() {
		state.obtainNumberOfPlayersFromModel(playerCount);	//update player count for so the state knows.
		state.changeState();								//change the state
		console.log(state.getValue());						//Log state into console.
	}
	
	this.displayPlayer = function() {				//testing
		this.playerArray[0].displayNumber();
	}
	
	this.createPlayer = function() {					//creates the players in the game and adds it to array.
		console.log("Creating player number:" + playerCount);		
		playerArray.push(new Player(playerCount));
		playerArray[playerCount].displayNumber();
		playerCount++;
	}
	
	
	this.returnNumberOfPlayers = function() {
		return 20;
		//return playerArray.size;
	}
	
	
	
}
function GameView(model){
	this.model = model;
	this.display = function() {
		
		test_image = new Image();
		test_image.src = 'assets/pawPrint.jpg'
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
	model.modelChangeState();
	model.createPlayer();
	//model.x.displayTest();
	
});
}


function main() {
	console.log('Hey');
	var state = new BaseState();
	var model = new GameModel(state),
	view = new GameView(model),
	controller = new GameController(model,view);
	
	/*console.log(state.getValue());	//this works
	state.changeState();
	console.log(state.getValue());
	state.changeState();
	console.log(state.getValue());*/
	
};


main();