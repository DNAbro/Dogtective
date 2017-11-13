function BaseState() {
	var self = this;
	var numOfPlayers;
	var mod;
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
	
	//grabs number of players from the model.
	this.obtainNumberOfPlayersFromModel = function(number){		//this is shitty programming probably.
		numOfPlayers = number;
	}
	
	//gets the model to update itself locally.
	this.getModel = function(model){	//testing
		mod = model;
		console.log(mod);
		//console.log("Testing model capture:"+model.returnNumberOfPlayers());
		console.log("Testing model capture:"+mod.returnNumberOfPlayers());
	}
	
	//update the model from state.
	this.updateModel = function(){		
		return mod;
	}
	
	//used by states to get the number of players.
	this.getNumOfPlayers = function(){
		
		return numOfPlayers;
	}
}

//State where people log in to the game.
function StartState(container){
	var self = this;			//this is the state
	this.container = container;
	this.value = 'I am in StartState';
	container.state = this;
	this.next = function(){
		
		
		console.log("1.Inside of StartState once next() is activated:" + this.container.getNumOfPlayers());	//this works
		
		//if the players are less than 5 it can't start into the intro stage.
		if(this.container.getNumOfPlayers() < 5){		//TODO: add start conditional later
			
		}
		else{
			
			return new IntroState(self.container);		//go to the next state
		
		}
	
	}
}

//Roles are assigned here.
function IntroState(container){
	var self = this;			//this is the state
	
	
	this.container = container;
	this.value = 'I am in IntroState';
	container.state = this;
	
	var numberOfPlayers = this.container.getNumOfPlayers();	//number of players.
	this.next = function(){
		return new ChooseState(self.container);
	
	}
}

//First choosing phase, Dogtective chooses, Pugtector chooses, Watchhound chooses.
function ChooseState(container){
	var self = this;			//this is the state
	this.container = container;
	this.value = 'I am in ChooseState';
	container.state = this;
	this.next = function(){
		return new SicState(self.container);
	
	}
}

//maybe need a results stage


//Timer activates, Packleader needs to be convinced and then chooses.
function SicState(container){
	var self = this;			//this is the state
	this.container = container;
	this.value = 'I am in SicState';
	container.state = this;
	this.next = function(){
		return new EndState(self.container);
	
	}
}

//Results stage showing who won.
function EndState(container){
	var self = this;			//this is the state
	this.container = container;
	this.value = 'I am in EndState';
	container.state = this;
	this.next = function(){
		return new IntroState(self.container);
	
	}
}