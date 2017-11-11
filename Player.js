function Player(number){
	
	var playerNumber = number;
	var playerRole;
	
	this.displayNumber = function() {
		
		console.log("I am player number:"+ playerNumber);
		
	}
	
	this.setRole = function(role){
		
		playerRole = role;
	}
	
}

//Active during ChoosePhase, chooses which player to eliminate from the game.
function DogtectiveRole(){
	
	var displayText = "You are a Dogtective!";
	
}

//Chooses who gets protected each choosephase.
function PugtectorRole(){
	
	var displayText = "You are the Pugtector!";
	
}

//Can discover the identity of one player.
function WatchhoundRole(){
	
	var displayText = "You are the Watchhound!";
	
}

//Active during the SicEm phase. Packleader reveals themselves.
function PackLeaderRole(){
	
	var displayText = "You are the Pack Leader! Reveal yourself.";
	
}

//No special role.
function PackMemberRole(){
	
	var displayText = "You are a Pack Member!";
	
}