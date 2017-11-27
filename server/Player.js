Player = function(number) {
	
	var playerNumber = number;
	var playerRole;
	var playerIsCurrentlyInGame = true;		//not eliminated.
	
	
	
	
	this.eliminatePlayer = function(){
		playerIsCurrentlyInGame = false;
		console.log('Player number ' + playerNumber + ' has been eliminated.');
	}
	
	
	this.getPlayerNumber = function() {
		return playerNumber;
	}
	this.displayNumber = function() {
		
		console.log("I am player number:"+ playerNumber);
		
	}
	
	this.getPlayerIsInGame = function() {
		return playerIsCurrentlyInGame;
	}
	this.setChoice = function(num) {
		console.log("Player number " + playerNumber + " is voting for " + num);
		playerRole.setChoiceNum(num);
		playerRole.setChoiceMade(true);
	}
	
	this.getChoice = function(){
		return playerRole.getChoiceNum();
	}
	this.getChoiceMade = function(){
		return playerRole.getChoiceMade();
	}
	
	this.getPackLeaderChoice = function(){
		return playerRole.getPackLeaderChoice();
	}
	
	this.setPLChoice = function(num){
		return playerRole.setPackLeaderChoice();
	}
	this.getRoleName = function() {
		console.log(playerRole.getRole());
		return playerRole.getRole();
		
		
		
	}
	this.displayRole = function() {
		console.log(playerRole.getRole());
	}
	this.getRoleP = function() {
		return playerRole;
	}
	
	this.setRole = function(roleNum){
		console.log("Set role has been called and assigning:" + roleNum);
		switch(roleNum){
			case 1:
			playerRole = new DogtectiveRole();
			//playerRole.displayTest();
			break;
			case 2:
			playerRole = new PugtectorRole();
			//playerRole.displayTest();
			break;
			case 3:
			playerRole = new WatchhoundRole();
			//playerRole.displayTest();
			break;
			case 4:
			playerRole = new PackMemberRole();
			//playerRole.displayTest();
			break;
			case 5:
			playerRole = new PackLeaderRole();
			//playerRole.displayTest();
			break;
		}
		
	}
	
}

//Active during ChoosePhase, chooses which player to eliminate from the game.
function DogtectiveRole(){
	
	var displayText = "You are a Dogtective!";
	var roleText = "Dogtective";
	this.getRole = function(){
		return roleText;
	}
	var choiceNum;			//an int of what the dogtective has chosen.
	var choiceMade = false;
	this.setChoiceMade = function(bool){
		choiceMade = bool;
	}
	this.getChoiceMade = function(){
		return choiceMade;
	}
	this.setChoiceNum = function(num){
		choiceNum = num;
	}
	this.getChoiceNum = function(){
		return choiceNum;
	}
	this.displayTest = function(){
		console.log(displayText);
	}
	
}

//Chooses who gets protected each choosephase.
function PugtectorRole(){
	
	var displayText = "You are the Pugtector!";
	var roleText = "Pugtector";
	this.getRole = function(){
		return roleText;
	}
	var choiceNum;			//an int of what the dogtective has chosen.
	var choiceMade = false;
	this.setChoiceMade = function(bool){
		choiceMade = bool;
	}
	this.getChoiceMade = function(){
		return choiceMade;
	}
	this.setChoiceNum = function(num){
		choiceNum = num;
	}
	this.getChoiceNum = function(){
		return choiceNum;
	}
	this.displayTest = function(){
		console.log(displayText);
	}
	
}

//Can discover the identity of one player.
function WatchhoundRole(){
	
	var displayText = "You are the Watchhound!";
	var roleText = "Watchhound";
	this.getRole = function(){
		return roleText;
	}
	var choiceNum;			//an int of what the dogtective has chosen.
	var choiceMade = false;
	this.setChoiceMade = function(bool){
		choiceMade = bool;
	}
	this.getChoiceMade = function(){
		return choiceMade;
	}
	this.setChoiceNum = function(num){
		choiceNum = num;
	}
	this.getChoiceNum = function(){
		return choiceNum;
	}
	this.displayTest = function(){
		console.log(displayText);
	}
	
}

//Active during the SicEm phase. Packleader reveals themselves.
function PackLeaderRole(){
	
	var displayText = "You are the Pack Leader! Reveal yourself.";
	var roleText = "PackLeader";
	this.getRole = function(){
		return roleText;
	}
	var choiceNum;			//Player number of the one packLeader chooses in
	var choiceMade = true;
	
	var packLeaderChoice = false;
	
	this.setChoiceMade = function(bool){
		choiceMade = bool;
	}
	this.getChoiceMade = function(){
		return choiceMade;
	}
	this.setChoiceNum = function(num){
		choiceNum = num;
	}
	this.getChoiceNum = function(){
		return choiceNum;
	}
	this.displayTest = function(){
		console.log(displayText);
	}
	
	this.setPackLeaderChoice = function(bool){
		packLeaderChoice = bool;
	}
	this.getPackLeaderChoice = function(){
		return packLeaderChoice;
	}
	
}

//No special role.
function PackMemberRole(){
	
	var displayText = "You are a Pack Member!";
	var roleText = "PackMember";
	
	this.getRole = function(){
		return roleText;
	}
	//unused
	var choiceNum;			
	var choiceMade = true;
	
	this.setChoiceMade = function(bool){
		choiceMade = bool;
	}
	this.getChoiceMade = function(){
		return choiceMade;
	}
	this.setChoiceNum = function(num){
		choiceNum = num;
	}
	this.getChoiceNum = function(){
		return choiceNum;
	}
	//unused
	//var choice;			//an int of what the dogtective has chosen.
	this.displayTest = function(){
		console.log(displayText);
	}
	
}