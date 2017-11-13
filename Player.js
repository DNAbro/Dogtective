function Player(number){
	
	var playerNumber = number;
	var playerRole;
	
	this.displayNumber = function() {
		
		console.log("I am player number:"+ playerNumber);
		
	}
	
	this.displayRole = function() {
		playerRole.displayTest();
		//console.log(playerRole);
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
	
	this.displayTest = function(){
		console.log(displayText);
	}
	
}

//Chooses who gets protected each choosephase.
function PugtectorRole(){
	
	var displayText = "You are the Pugtector!";
	
	this.displayTest = function(){
		console.log(displayText);
	}
	
}

//Can discover the identity of one player.
function WatchhoundRole(){
	
	var displayText = "You are the Watchhound!";
	
	this.displayTest = function(){
		console.log(displayText);
	}
	
}

//Active during the SicEm phase. Packleader reveals themselves.
function PackLeaderRole(){
	
	var displayText = "You are the Pack Leader! Reveal yourself.";
	
	this.displayTest = function(){
		console.log(displayText);
	}
	
}

//No special role.
function PackMemberRole(){
	
	var displayText = "You are a Pack Member!";
	
	this.displayTest = function(){
		console.log(displayText);
	}
	
}