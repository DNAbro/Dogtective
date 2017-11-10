function BaseState() {
	var self = this;
	//this.state = new BaseState(self);
	this.state = new StartState(self);
	this.changeState = function(){
		self.state.next();			//next() moves to next state
		//every state has an implemenation of next().
	}
	this.getValue = function() {	//testing to get values from states
		return self.state.value
	}
}

function StartState(container){
	var self = this;			//this is the state
	this.container = container;
	this.value = 'I am in StartState';
	container.state = this;
	this.next = function(){
		return new IntroState(self.container);
	
	}
}

function IntroState(container){
	var self = this;			//this is the state
	this.container = container;
	this.value = 'I am in IntroState';
	container.state = this;
	this.next = function(){
		return new ChooseState(self.container);
	
	}
}

function ChooseState(container){
	var self = this;			//this is the state
	this.container = container;
	this.value = 'I am in ChooseState';
	container.state = this;
	this.next = function(){
		return new SicState(self.container);
	
	}
}

function SicState(container){
	var self = this;			//this is the state
	this.container = container;
	this.value = 'I am in SicState';
	container.state = this;
	this.next = function(){
		return new EndState(self.container);
	
}
}

function EndState(container){
	var self = this;			//this is the state
	this.container = container;
	this.value = 'I am in EndState';
	container.state = this;
	this.next = function(){
		return new IntroState(self.container);
	
}
}