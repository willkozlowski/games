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
let ncoins = 5
let coinX = [];
let coinY = [];
let r = 10;
let timer = 10;
let screenx = 500
let screeny = 500
let rectx0 = 250
let recty0 = 250
let rectw0 = 30
let recth0 = 30

//setting up the canvas, setting random variables for the coin positions, and creating the iscontant function that finds if the player is contacting a coin or not.
function setup() {
  createCanvas(screenx, screeny);
  score = 0;
  print("score=" + score)
  r = 10;
  for (var i = 0; i < ncoins; i++) {
    coinX.push(random(width))
    coinY.push(random(height))
  }
}

function restart() {
  score = 0;
  print("score=" + score)
  coinX.length = 0
  coinY.length = 0
  for (var i = 0; i < ncoins; i++) {
    coinX.push(random(width))
    coinY.push(random(height))
  }
}

function iscontact(x, y, xobj, yobj, r) {
  for (var i = 0; i < xobj.length; i++) {
    if (abs(y - yobj[i]) <= r && abs(x - xobj[i]) <= r) {
      return i
    }
  }
  return -1
}

function iscontactrect(x, y, rectx0, recty0, rectw0, recth0) {
  if ((rectx0 <= x) && (x <= rectx0 + rectw0) && (recty0 <= y) && (y <= recty0 + recth0)) {
    return 1
  }
  return -1
}

function draw() {
  background(220); //creating background
  rect(rectx0, recty0, rectw0, recth0)
  textAlign(CENTER, CENTER);
  textSize(14);
  text("Rules: Collect the coins in ten seconds, use arrow keys to move", width / 2, height * 0.05);
  textSize(80); //creating the rules to be printed on the screen when you start the program
  if (score >= coinX.length) { //setting an if statement to tell whether or not the player won
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
      x = 20
      y = 20
      timer = 10;
      restart();
    }
    return
  }
  fill(0)
  fill(255, 255, 0);
  for (let i = 0; i < coinX.length; i++) {
    ellipse(coinX[i], coinY[i], 30, 30);
  }
  let keydir = 0
  if (keyIsDown(LEFT_ARROW)) { //setting movement keys
    x -= 5;
    keydir = 1
  }

  if (keyIsDown(RIGHT_ARROW)) {
    x += 5;
    keydir = 2
  }

  if (keyIsDown(UP_ARROW)) {
    y -= 5;
    keydir = 3
  }

  if (keyIsDown(DOWN_ARROW)) {
    y += 5;
    keydir = 4

  }

  fill(0)
  ellipse(x, y, 30, 30); //creating character

  if (x < 5) { //making sure the character cannot go off the canvas.
    x = x + move;
  }

  if (y >= (screeny - 5)) {
    y = y - move;
  }

  if (y < 5) {
    y = y + move;
  }

  if (x >= (screenx - 5)) {
    x = x - move;
  }
  //check if the player is colliding with the rectangle
  k = iscontactrect(x, y, rectx0, recty0, rectw0, recth0)
  if (k >= 0) {
    if (keyIsDown(LEFT_ARROW)) { //setting movement keys
      x += 5;
    }

    if (keyIsDown(RIGHT_ARROW)) {
      x -= 5;
    }

    if (keyIsDown(UP_ARROW)) {
      y += 5;
    }

    if (keyIsDown(DOWN_ARROW)) {
      y -= 5;

    }
  }

  //figuring out whether or not the player has touched a specific coin.
  k = iscontact(x, y, coinX, coinY, r)
  if (k >= 0) {
    score = score + 1
    coinY[k] = -500;
    coinX[k] = -500
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
    rect(250, 150, 465, 100);
    fill(0);
    text("GAME OVER", width / 2, height * 0.7); //figuring out if the player lost or not
    text("PLAY AGAIN", width / 2, height * 0.3);
    x = -5000 // couldn't find a way to make the the ball unable to move when this condition is met, so i teleported it 5000 units away from the canvas
    y = -5000
    if (mouseIsPressed) {
      x = 20
      y = 20
      timer = 10
      restart();
    }
    return
  }

}
