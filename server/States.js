exports.BaseState = function() {
	
	require("./Player.js");
	var self = this;
	
	var playerArray = [];					//array of players?
	var playerCount = 0;
	var dogtectiveCount = 2;
	var packCount = 0;
	var startWasPressed = false;
	var playerPOST = {};
	var playerEliminatedPOST = {};
	var winnerPOST = {};
	var winnerHappened = false;
	
	
	//assign vote
	this.assignVote = function(playerNum,voteNum){
		playerArray[playerNum].setChoice(voteNum);
	}
	
	this.resetVote = function(playerNum){
		playerArray[playerNum].resetChoices();
	}
	
	
	//eliminates player from game

	this.eliminatePlayer = function(playerNum){
		//goes through the player Array looking for the Player Number to eliminate.
		for(i = 0; i <= this.getPlayerArrayLength()-1; i++){
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
	
	this.getChoiceWasMadeBool = function(num){
		return playerArray[num].getChoiceMade();
	}
	this.getCookie = function(num){
		return playerArray[num].getCookieID();
	}
	this.setCookie = function(num,cook){
		playerArray[num].setCookieID(cook);
	}
	
	this.getPlayerChoice = function(num) {
		return playerArray[num].getChoice();
	}
	
	//
	this.getPLChoice = function(num){
		return playerArray[num].getPackLeaderChoice();
	}
	this.setWinnerPost = function(win) {
		winnerPOST = win;
	}
	this.getWinnerPost = function(){
		return winnerPOST;
	}
	
	this.setPLChoice = function(playerNum,num){
		playerArray[playerNum].setPLChoice(num);
	}
	
	//returns playerRole, gets one specified in array, NOT playerNumber.
	this.getPlayerRole = function(num){
		return playerArray[num].getRoleName();
	}
	this.setWinner = function(bool){
		winnerHappened = bool;
	}
	this.getWinner = function(){
		return winnerHappened;
	}
	
	//returns the current number of players.
	this.returnNumberOfPlayers = function() {
		return playerCount;
		//return playerArray.size;
	}
	this.getDogtectiveCount = function() {
		return dogtectiveCount;
	}
	this.getPackCount = function() {
		return packCount;
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
	
	this.setElimiantePost = function(x){
		playerEliminatedPOST = x;
	}
	this.getEliminatePost = function(){
		return playerEliminatedPOST;
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
			if(this.container.getPlayerRole(i) == "Dogtective"){
					dogtectiveChoices.push(this.container.getPlayerChoice(i));
				}
			}
			
			return dogtectiveChoices[Math.round(Math.random())];
			//return dogtectiveChoices;
		}
		else{
			for(i = 0; i <= this.container.getPlayerArrayLength()-1; i++){
			if(this.container.getPlayerRole(i) == "Dogtective" && this.container.getPlayerFromArray(i).getPlayerIsInGame()){
				return this.container.getPlayerChoice(i);
				}
			}
		}
	}
	//finds the pugtector
	this.findPugtectorAndReturnChoice = function(){
		for(i = 0; i <= this.container.getPlayerArrayLength()-1; i++){
			if(this.container.getPlayerRole(i) == "Pugtector" && this.container.getPlayerFromArray(i).getPlayerIsInGame()){
				return this.container.getPlayerChoice(i);
			}
			else{
				return -100;	//if the choice has been eliminated.
			}
		}
	}
	//finds Watchhound
	this.findWatchhoundAndReturnChoice = function(){
		for(i = 0; i <= this.container.getPlayerArrayLength()-1; i++){
			if(this.container.getPlayerRole(i) == "Watchhound"){
				return this.container.getPlayerChoice(i);
			}
		}
	}
	
	//Let the Watchound discover another player
	
	//If Pugtector and Dogtective choose the same thing, don't eliminate.
	//If Dogtectives choose different ones, choose random.
	this.dogtectiveEliminates = function() {
		
		var dogChoice = this.findDogtectiveAndReturnChoice();
		if(dogChoice == this.findPugtectorAndReturnChoice()){
			//alert that the Pugtector blocked!
			console.log("Pugtector blocked the Dogtective!");
			
			this.container.setElimiantePost({Player: -100});
			//in client, need to check what this means. if it happens say Pugtector blocked.
			eliminationAlreadyHappened = true;
		}
		else{
			this.container.eliminatePlayer(dogChoice);
			eliminationAlreadyHappened = true;
			this.container.setElimiantePost({Player: dogChoice})
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
	
	this.tallyVotes = function(){
		var allVoted = false;
		var count = 0;
		for(i = 0; i <= this.container.getPlayerArrayLength()-1; i++){
			if(this.container.getChoiceWasMadeBool(i) == true){
				console.log('Player ' + i + ' voted or cant vote.');
				count++;
			}
			else{
				console.log('Player ' + i + ' didnt vote');
			}
		}
		if(count == i){
			allVoted = true;
		}
		else{
			allVoted = false;
		}
		
		return allVoted;
	}
	
	//Accepted votes.
	
	
	this.next = function(){
		
		//check if votes happened.
		if(this.tallyVotes()){
			//eliminate player
			console.log('All votes accounted for.');
			this.dogtectiveEliminates();
			
			//need to alert Watchhound to other players status.
		}
		else{
			console.log('Not all votes accounted for');
		}
		
		
		
		//console.log("Timer should now be set for 30 seconds.");
		//setTimeout(timeUp,30000);
		//test timer later.
		if(eliminationAlreadyHappened){
			console.log("Moving from Choose to Sic");
			return new SicState(self.container);
		}
	
	}
}

//maybe need a results stage


//Timer activates, Packleader needs to be convinced and then chooses.
function SicState(container){
	var self = this;			//this is the state
	this.container = container;
	this.value = 'SicState';
	container.state = this;
	
	var sicEm = false;
	
	this.findPackLeaderAndReturnChoice = function(){
		for(i = 0; i <= this.container.getPlayerArrayLength()-1; i++){
			if(this.container.getPlayerRole(i) == "PackLeader"){
				console.log('Found PL: ' + i);
				return this.container.getPLChoice(i);
			}
		}
	}
	
	this.packLeaderEliminates = function(){
		var plChoice = this.findPackLeaderAndReturnChoice();
		console.log("This is the player number who the PL chose: " + i);
		this.container.eliminatePlayer(plChoice);
		this.container.setElimiantePost({Player: plChoice});
		sicEm = true;
	}
	
	//there are two situations where the game will go into the EndState
	//Both Dogtectives are eliminated or the Dogtectives equal or outnumber remaining players
	this.next = function(){
		
		this.packLeaderEliminates();
		
		if(sicEm){
			if(this.container.getDogtectiveCount() >= this.container.getPackCount() || this.container.getDogtectiveCount() == 0){
				console.log("Sic to End");
				var win;
				if(this.container.getDogtectiveCount() >= this.container.getPackCount()){
					win = { Winner: 0};	//dogtective win
				}
				else{
					win = { Winner: 1}; //pack win.
				}
				this.container.setWinnerPost(win);
				this.container.setWinner(true);
				return new EndState(self.container);
			}
			else{
				console.log("Sic to Choose");
				
				for(i = 0; i <= this.container.getPlayerArrayLength()-1; i++){
					this.container.resetVote(i);
					var temp = {}
					//this.container.setPlayerPost(temp);
					//this.container.setElimiantePost(temp);
					//TODO CLEAR OUT THE ELIMINATEPOST
					sicEm = false;
				}
				
				
				return new ChooseState(self.container);
			}
		
		}
	}
}

//Results stage showing who won.
function EndState(container){
	var self = this;			//this is the state
	this.container = container;
	this.value = 'EndState';
	container.state = this;
	console.log("HOLY SHIT WE FINISHED A GAME MY FUCKING GOD.");
	this.next = function(){
		console.log("Moving from End to Intro");
		return new IntroState(self.container);
	
	}
}