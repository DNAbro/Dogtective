exports.BaseState = function() {
	
	require("./Player.js");
	var self = this;
	
	var playerArray = [];					//array of players?
	var playerCount = 0;
	var dogtectiveCount = 2;
	var packCount = 0;
	var startWasPressed = false;
	var playerPOST = {};
	
	
	//eliminates player from game

	this.eliminatePlayer = function(playerNum){
		//goes through the player Array looking for the Player Number to eliminate.
		for(i = 0; i <= this.container.getPlayerArrayLength()-1; i++){
			if(playerArray[i].getPlayerNumber() == playerNum){
				playerArray[i].eliminatePlayer();
				
				//lowers count of active players.
				if(playerArray[i].getRoleName() == "Dogtective"){
					dogtectiveCount--;
				}
				else{
					packCount--;
				}
			}
		}	
	}
	
	//creates the players
	this.createPlayer = function() {					
		console.log("Creating player number:" + playerCount);		
		playerArray.push(new Player(playerCount));
		playerArray[playerCount].displayNumber();
		playerCount++;
	}
	
	
	//returns PlayerArray
	this.getPlayerArray = function() {
		return playerArray;
	}
	
	//returns Player from Array
	this.getPlayerFromArray = function(num) {
		return playerArray[num];
	}
	
	this.getPlayerChoice = function(num) {
		return playerArray[num].getChoice();
	}
	
	//returns playerRole, gets one specified in array, NOT playerNumber.
	this.getPlayerRole = function(num){
		playerArray[num].getRoleName();
	}
	
	//returns the current number of players.
	this.returnNumberOfPlayers = function() {
		return playerCount;
		//return playerArray.size;
	}
	this.getDogtectiveCount = function() {
		return dogtectiveCount;
	}
	
	this.getPlayerArrayLength = function() {
		return playerArray.length;
	}
	
	this.setStartWasPressed = function(bool){
		startWasPressed = bool;
		console.log("Start was pressed and alerted the model.");
	}
	
	this.getStartWasPressed = function(){
		return startWasPressed;
	}
	
	this.getPlayerPost = function() {
		return playerPOST;
	}
	
	this.setPlayerPost = function(x) {
		playerPOST = x;
	}
		
	
	this.assignRoleToPlayer = function(num,roleNum) {
		console.log("assigning #:" + num);
		playerArray[num].setRole(roleNum);
		playerArray[num].displayNumber();
		playerArray[num].displayRole();
		packCount = playerCount - 2;		//this should be fine.
		console.log("PackCount:" + packCount);
		//playerArray[num].getRoleName();
	}
	
	////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////
	
	
	
	//this.state = new BaseState(self);
	this.state = new StartState(self);
	this.changeState = function(){
		self.state.next();			//next() moves to next state
		//every state has an implemenation of next().
	}
	this.getValue = function() {	//testing to get values from states
		return self.state.value
	}
	
	this.doAction = function(){
		
	}
	
	
}

//State where people log in to the game.
function StartState(container){
	var self = this;			//this is the state
	this.container = container;
	this.value = 'StartState';
	container.state = this;
	this.next = function(){
		
		
		console.log("1.Inside of StartState once next() is activated:" + this.container.returnNumberOfPlayers());	//this works
		
		//if the players are less than 5 it can't start into the intro stage.
		if(this.container.returnNumberOfPlayers() > 5 && this.container.getStartWasPressed()){		//TODO: add start conditional later
			return new IntroState(self.container);		//go to the next state
		}
		else{
			this.container.setStartWasPressed(false);
		}
	
	}
}

//Roles are assigned here.
function IntroState(container){
	var self = this;			//this is the state
	
	
	this.container = container;
	this.value = 'IntroState';
	container.state = this;
	
	var numOfPlayers = this.container.returnNumberOfPlayers();
	var randomArray = [];
	
	console.log("Testing if this activates as soon as you move into the state");
	this.next = function(){
		
		console.log("Moving from Intro to Choose");
		
		for(i = 0; i <= this.container.getPlayerArrayLength()-1; i++){
			switch(i){
				case 0:
				randomArray.push(1)				//Dogtective
				break;
				case 1:
				randomArray.push(2);			//Pugtector
				break;
				case 2:
				randomArray.push(3);			//Watchhound
				break;
				case 3:
				randomArray.push(4);			//PackMember
				break;
				case 4:
				randomArray.push(5);			//PackLeader
				break;
				case 5:							//2nd Dogtective
				randomArray.push(1);	
				break;
				default:
				randomArray.push(4);			//rest are Packmembers.
			}
		}
		
		randomArray.sort(function(a,b){return 0.5 - Math.random()});
		
		for(i = 0; i <= this.container.getPlayerArrayLength()-1; i++){
			this.container.assignRoleToPlayer(i,randomArray[i]);
		}
		
		//Next state cause this will call the next state immediately
		this.container.getPlayerPost()[0] = { state: 'ChooseState'};
		
		
		for(i = 0; i <= this.container.getPlayerArrayLength()-1; i++){
			//console.log('Adding to Post:' + this.container.getPlayerFromArray(i).getPlayerRoleName());
			var play1 = { playerNumber: this.container.getPlayerFromArray(i).getPlayerNumber(), playerRole: this.container.getPlayerFromArray(i).getRoleName(), inGame: this.container.getPlayerFromArray(i).getPlayerIsInGame()}; 
		
			this.container.getPlayerPost()[i+1] = play1;
		}
		
		return new ChooseState(self.container);
	
	}
}

//First choosing phase, Dogtective chooses, Pugtector chooses, Watchhound chooses.
function ChooseState(container){
	var self = this;			//this is the state
	this.container = container;
	this.value = 'ChooseState';
	container.state = this;
	
	var dogtectiveChoices = [];
	var dogtectiveChoice;
	var timeHasRanOut = false;
	var eliminationAlreadyHappened = false;
	
	//can I return int or array?
	this.findDogtectiveAndReturnChoice = function(){
		if(this.container.getDogtectiveCount() == 2){
			for(i = 0; i <= this.container.getPlayerArrayLength()-1; i++){
			if(this.container.getPlayerRole() == "Dogtective"){
					dogtectiveChoice.push(this.container.getPlayerChoice());
				}
			}
			return dogtectiveChoices;
		}
		else{
			for(i = 0; i <= this.container.getPlayerArrayLength()-1; i++){
			if(this.container.getPlayerRole() == "Dogtective"){
				return this.container.getPlayerChoice();
				}
			}
		}
	}
	//finds the pugtector
	this.findPugtectorAndReturnChoice = function(){
		for(i = 0; i <= this.container.getPlayerArrayLength()-1; i++){
			if(this.container.getPlayerRole() == "Pugtector"){
				return this.container.getPlayerChoice();
			}
		}
	}
	//finds Watchhound
	this.findWatchhoundAndReturnChoice = function(){
		for(i = 0; i <= this.container.getPlayerArrayLength()-1; i++){
			if(this.container.getPlayerRole() == "Watchhound"){
				return this.container.getPlayerChoice();
			}
		}
	}
	
	//Let the Watchound discover another player
	
	//If Pugtector and Dogtective choose the same thing, don't eliminate.
	//If Dogtectives choose different ones, choose random.
	this.dogtectiveEliminates = function() {
		if(findDogtectiveAndReturnChoice() == findPugtectorAndReturnChoice()){
			//alert that the Pugtector blocked!
			//idk how this is going to happen.
		}
		else{
			this.container.eliminatePlayer(findDogtectiveAndReturnChoice());
			eliminationAlreadyHappened = true;
		}
		
	}
	
	
	function timeUp(){
		//time will countdown regardless so if the choice has already been made,
		//don't let it make timeHasRunOut true.
		//This actually might be unecessary due to creating a new one each time, but whatev.
		if(eliminationAlreadyHappened){
			timeHasRanOut = false;
			eliminationAlreadyHappened = false;
		}
		else{
			timeHasRanOut = true;
		}
		
	}
	
	//Accepted votes.
	
	
	this.next = function(){
		
		console.log("Moving from Choose to Sic");
		
		console.log("Timer should now be set for 5 seconds.");
		setTimeout(timeUp,5000);
		return new SicState(self.container);
	
	}
}

//maybe need a results stage


//Timer activates, Packleader needs to be convinced and then chooses.
function SicState(container){
	var self = this;			//this is the state
	this.container = container;
	this.value = 'SicState';
	container.state = this;
	
	this.findPackLeaderAndReturnChoice = function(){
		for(i = 0; i <= this.container.getPlayerArrayLength()-1; i++){
			if(this.container.getPlayerRole() == "PackLeader"){
				return this.container.getPlayerChoice();
			}
		}
	}
	
	this.packLeaderEliminates = function(){
		this.container.eliminatePlayer(findPackLeaderAndReturnChoice());
	}
	
	//there are two situations where the game will go into the EndState
	//Both Dogtectives are eliminated or the Dogtectives equal or outnumber remaining players
	this.next = function(){
		
		if(this.container.getDogtectiveCount() >= this.container.returnNumberOfPlayers() || this.container.getDogtectiveCount() == 0){
			console.log("Sic to End");
			return new EndState(self.container);
		}
		else{
			console.log("Sic to Choose");
			//I should probably have a results state.
			return new ChooseState(self.container);
		}
		
	
	}
}

//Results stage showing who won.
function EndState(container){
	var self = this;			//this is the state
	this.container = container;
	this.value = 'EndState';
	container.state = this;
	this.next = function(){
		console.log("Moving from End to Intro");
		return new IntroState(self.container);
	
	}
}