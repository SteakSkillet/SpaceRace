//Space Race

//Set background
var canvas = document.createElement("canvas");
var context = canvas.getContext("2d");
canvas.width = 960;
canvas.height = 720;
canvas.style.backgroundColor = "green";
document.body.appendChild(canvas);

//set state
var gameState = {
	newGame: 0
};

var usa = new Player("USA", "USA", 230);
var ussr = new Player("USSR", "USSR", 650);

var player1Opt1 = new Rect(65, 50);
var player1Opt2 = new Rect(65, 150);
var player1Opt3 = new Rect(65, 250);

var player2Opt1 = new Rect(795, 50);
var player2Opt2 = new Rect(795, 150);
var player2Opt3 = new Rect(795, 250);

spriteLoader.source = "./images/";
spriteLoader.keys = [
	"USA",
	"USSR"
];

spriteLoader.loadSprites();
spriteLoader.doAfterLoaded = gameLoop;

//Turn options
function createOption(activePlayer, inactivePlayer, resourceIncrease, resourceDecrease){
	activePlayer[resourceIncrease].increase = randomInt(1, 4);
	console.log(activePlayer[resourceIncrease].increase);
	inactivePlayer[resourceDecrease].decrease = randomInt(0, 3);
	console.log(inactivePlayer[resourceDecrease].decrease);
};

createOption(usa,ussr,"fuel","supplies");
createOption(usa,ussr,"supplies","training");
createOption(usa,ussr,"training","fuel");

createOption(ussr,usa,"fuel","supplies");
createOption(ussr,usa,"supplies","training");
createOption(ussr,usa,"training","fuel");

/*function turnOption(activePlayer, inactivePlayer, resourceIncrease, resourceDecrease){
	store increase
	store decrease
	set player state to ready
};*/

/*usa presses q
turnOption(usa, ussr, fuel, supplies);
	clear other increases
	clear other decreases
	usa.playerState = 1; //ready
	if (usa.playerState = 1 && ussr.playerState = 1){
		usa.fuel.value = usa.fuel.value + usa.fuel.increase;
		ussr.
	};*/

function randomInt(min, max){
	return Math.floor(Math.random() * (max - min)) + min;
};

//render all images
function renderAll(){
	//Display shuttles
		var usaImage = spriteLoader.getSprite("USA");
		var ussrImage = spriteLoader.getSprite("USSR");

		context.drawImage(usaImage, usa.x, usa.y);
		context.drawImage(ussrImage, ussr.x, ussr.y);

//Display resources
	function displayResources(player, resource, x, y){
		var textToWrite = player[resource].text;
		var textWidth = context.measureText(textToWrite).width;

		context.fillStyle = "black";
		context.fillText(textToWrite, x, y);

		context.fillStyle = "black";
		context.fillText(player[resource].value, x + textWidth, y);
	};

	displayResources(usa, "fuel", 50, 600);
	displayResources(usa, "supplies", 50, 620);
	displayResources(usa, "training", 50, 640);

	displayResources(ussr, "fuel", 795, 600);
	displayResources(ussr, "supplies", 795, 620);
	displayResources(ussr, "training", 795, 640);

	if (usa.launching || ussr.launching) {
		var launching = usa.launching ? usa : ussr;
    if (launching.y > launching.destY) {
        launching.y -= launching.speed;
    }
	else {
        launching.launching = false;
    }
    }

	//Display turn options
	function displayOptions(activePlayer, inactivePlayer, resourceIncrease, resourceDecrease, option){
		var textToWrite = activePlayer[resourceIncrease].text;
		var textWidth = context.measureText(textToWrite).width;

		context.fillStyle = "black";
		context.fillText(textToWrite, option.x + 20, option.height / 2 + option.y - 16);
		context.fillText(activePlayer[resourceIncrease].increase, option.x + 20 + textWidth, option.height / 2 + option.y - 16);

		var textToWrite2 = inactivePlayer[resourceDecrease].text;
		var textWidth2 = context.measureText(textToWrite2).width;

		context.fillStyle = "black";
		context.fillText(textToWrite2, option.x + 20, option.height / 2 + option.y + 16);
		context.fillText(inactivePlayer[resourceDecrease].decrease, option.x + 20 + textWidth2, option.height / 2 + option.y + 16);
	};

	displayOptions(usa, ussr, "fuel", "supplies", player1Opt1);
	displayOptions(usa, ussr, "supplies", "training", player1Opt2);
	displayOptions(usa, ussr, "training", "fuel", player1Opt3);

	displayOptions(ussr, usa, "fuel", "supplies", player2Opt1);
	displayOptions(ussr, usa, "supplies", "training", player2Opt2);
	displayOptions(ussr, usa, "training", "fuel", player2Opt3);

	function drawRect(rect){
	context.rect(rect.x, rect.y, rect.width, rect.height)
	context.stroke();
	};

	drawRect(player1Opt1);
	drawRect(player1Opt2);
	drawRect(player1Opt3);
	drawRect(player2Opt1);
	drawRect(player2Opt2);
	drawRect(player2Opt3);

	/*if (endGame == true){
		var player1Text = "USA Score: ";
		var player1TextWidth = context.measureText(player1Text).width;

		context.fillText(player1Text, usa.x, 320);
		context.fillText(usa.score, usa.x + player1TextWidth, 320);

		var player2Text = "USSR Score: ";
		var player2TextWidth = context.measureText(player2Text).width;

		context.fillText(player2Text, ussr.x, 320);
		context.fillText(ussr.score, ussr.x + player2TextWidth, 320);
	};*/

};

//Turn counter
/*var gameTurn = 0;
function turn(){
	if(usa.turn == ussr.turn)
		gameTurn = gameTurn + 1;
};
//Press turn buttons
function selection(player1, player2, option){
	if(player1.turn == gameTurn){
		player1.turn = player1.turn + 1;
		option(player1, player2);


		turn();
		console.log(player1.name, "Turn:", player1.turn, "GameTurn:", gameTurn);
	};
};*/

//Launch
function launch(player){
	if(player.fuel.value >= 5 + 0.5 * player.supplies.value && player.supplies.value >= 5 && player.training.value >= 5){
		//calculate score
		player.score = player.supplies.value + player.training.value * 1.5;
		//show score
		console.log(player.name, "Score:", player.score);
		//move ship up accordingly
		player.launching = true;
		//trigger end game
		endGame = true;
		//player 2 gets a turn
		};
		//else launch failure
};

function submitMove(activePlayer, option) {
  activePlayer.ready = true;
  activePlayer.move = option;
}

function resolveMove(player0, player1) {
  if (player0.ready && player1.ready) {
    increase(player0);
    increase(player1);
    decrease(player0, player1);
    decrease(player1, player0);

	player0.ready = false;
    player0.move = false;

	player1.ready = false;
    player1.move = false;

	createOption(usa,ussr,"fuel","supplies");
	createOption(usa,ussr,"supplies","training");
	createOption(usa,ussr,"training","fuel");

	createOption(ussr,usa,"fuel","supplies");
	createOption(ussr,usa,"supplies","training");
	createOption(ussr,usa,"training","fuel");
  }
}

function increase(player0) {
  var option = player0.move;
  player0[option].value += player0[option].increase;
}

function decrease(player0, player1) {
  var option = player0.move;
  var counter = player0[option].counter;
  player1[counter].value -= player1[counter].decrease;
  if(player1[counter].value < 0){
	player1[counter].value = 0;
	};

}

document.addEventListener("keydown", function(e) {
	switch (e.keyCode) {
		case 81: //Q player 1 option 1
			submitMove(usa, "fuel");
			break;
		case 87: //W player 1 option 2
			submitMove(usa, "supplies");
			break;
		case 69: //E player 1 option 3
			submitMove(usa, "training");
			break;
		case 32: //space bar launch player 1
			launch(usa);
			break;
		case 73: //I player 2 option 1
			submitMove(ussr, "fuel");
			break;
		case 79: //O player 2 option 2
			submitMove(ussr, "supplies");
			break;
		case 80: //P player 2 option 3
			submitMove(ussr, "training");
			break;
		case 16: //Shift launch player 2
			launch(ussr);
			break;
		default:
			console.log(e.keyCode);

	}
	resolveMove(usa, ussr);
});

function gameLoop() {
	context.clearRect(0, 0, canvas.width, canvas.height);
	renderAll();
    requestAnimationFrame(gameLoop);
};

gameLoop();



//Launch Success

//Launch Failure
