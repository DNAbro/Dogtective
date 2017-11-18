Player = function(number) {
	
	var playerNumber = number;
	var playerRole;
	var playerIsCurrentlyInGame = true;		//not eliminated.
	
	
	
	
	this.eliminatePlayer = function(){
		playerIsCurrentlyInGame = false;
	}
	
	
	this.getPlayerNumber = function() {
		return playerNumber;
	}
	this.displayNumber = function() {
		
		console.log("I am player number:"+ playerNumber);
		
	}
	
	this.setChoice = function(num) {
		playerRole.setChoiceNum(num);
	}
	
	this.getChoice = function(){
		playerRole.getChoiceNum();
	}
	
	this.getRoleName = function() {
		playerRole.getRole();
		//console.log(playerRole);
	}
	this.displayRole = function() {
		console.log(playerRole.getRole());
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

//No special role.
function PackMemberRole(){
	
	var displayText = "You are a Pack Member!";
	var roleText = "PackMember";
	
	this.getRole = function(){
		return roleText;
	}
	//unused
	var choiceNum;			//Player number of the one packLeader chooses in
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