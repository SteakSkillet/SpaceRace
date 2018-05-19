//entities
function Player(name, sprite, x){
	this.name = name;
	this.sprite = sprite;
	this.x = x;

	//defaults
	this.y = 600;
	this.destY = 300;
	this.speed = 8;
	this.width = 10;
	this.height = 18;

	this.fuel = {
		value: 0,
		text: "Fuel: ",
		counter: "supplies",
		increase: 0,
		decrease: 0
	};

	this.supplies = {
		value: 0,
		text: "Supplies: ",
		counter: "training",
		increase: 0,
		decrease: 0
	};

	this.training = {
		value: 0,
		text: "Training: ",
		counter: "fuel",
		increase: 0,
		decrease: 0
	};

	this.ready = false;
	this.move = false;

	this.score = 0;
	this.state = gameState.newGame;
	this.playerState = 0//pending
};
