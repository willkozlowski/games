//setting variables
// (0,0) is upper left of the screen
let x = 20;
let y = 20;
let wall1x = 0;
let wall1y = 40;
let wall1w = 240;
let wall1h = 15;
let score = 0;
let move = 5;
let coinX = [];
let coinY = [];
let r=10;
let timer = 10;

//setting up the canvas, setting random variables for the coin positions, and creating the iscontant function that finds if the player is contacting a coin or not.
function setup() {
  createCanvas(500, 500);
  score = 0;
  print("score=" + score)
  r = 10;

  for (var i = 0; i < 5; i++) {
    coinX.push(random(width), random(height))
    coinY.push(random(width), random(height))
  }
}  

function iscontact(x, y, xobj, yobj) {
for (var i = 0; i < xobj.length; i++) {
  if (abs(y - yobj[i]) <= r && abs(x - xobj[i]) <= r) {
    return 1
    } else {
      return 0
    }
  }
} 
function draw() {
  background(220);//creating background
  textAlign(CENTER, CENTER);
  textSize(14);
  text("Rules: Collect the coin in ten seconds, use arrow keys to move", width / 2, height * 0.05);
  textSize(80); //creating the rules to be printed on the screen when you start the program
  if (score > 4) { //setting an if statement to tell whether or not the player won
    rectMode(CENTER)
    fill(255)
    rect(250, 250, 465, 100)
    fill(0)
    textAlign(CENTER, CENTER);
    textSize(80);
    text("YOU WIN", width / 2, height * 0.7);
    text("PLAY AGAIN", width / 2, height * 0.5)
    x = -5000 // couldn't find a way to make the the ball unable to move when this condition is met, so i teleported it 5000 units away from the canvas
    y = -5000
    if (mouseIsPressed) {
      x=20
      y=20
      timer=10;
      setup();
    }
    return
  }
  fill(0)
  fill(255, 255, 0);
  ellipse(coinX, coinY, 30, 30);
  if (keyIsDown(LEFT_ARROW)) { //setting movement keys
    x -= 5;
  }

  if (keyIsDown(RIGHT_ARROW)) {
    x += 5;
  }

  if (keyIsDown(UP_ARROW)) {
    y -= 5;
  }

  if (keyIsDown(DOWN_ARROW)) {
    y += 5;

  }

  fill(0)
  ellipse(x, y, 30, 30); //creating character

  if (x < 5) { //making sure the character cannot go off the canvas.
    x = x + move;
  }

  if (y >= 495) {
    y = y - move;
  }

  if (y < 5) {
    y = y + move;
  }

  if (x >= 495) {
    x = x - move;
  }
//figuring out whether or not the player has touched a specific coin.
  if (iscontact(x, y, coinX, coinY) > 0) {
    score = score + 1
    coinY1 = -500;
    coinX1 = -500;
    print("score=" + score)
  }
  text(timer, width / 2, height / 2); //creating the timer
  textAlign(CENTER, CENTER);
  textSize(80);
  if (frameCount % 60 == 0 && timer > 0) {
    timer--;
  }
  if (timer == 0) {
    rectMode(CENTER)
    fill(255)
    rect(250, 150,465,100);
    fill(0);
    text("GAME OVER", width / 2, height * 0.7); //figuring out if the player lost or not
    text("PLAY AGAIN", width / 2, height * 0.3);
    x = -5000 // couldn't find a way to make the the ball unable to move when this condition is met, so i teleported it 5000 units away from the canvas
    y = -5000
    if (mouseIsPressed) {
      x=20
      y=20
      timer=10
      setup();
    }
    return
  }

}
