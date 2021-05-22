//Declaring variable
var monkey, monkeyRunning;
var banana, bananaImage, obstacle, obstacleImage;
var bananaGroup, rockGroup;
var ground, invisibleGround;
var GameState;
var PLAY, END;

function preload() {
  //Loading animation and images
  monkeyRunning = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");
  

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}

function setup() {
  createCanvas(400, 400);

  PLAY = 1;
  END = 0;
  GameState = PLAY;
  //Creating groups
  bananaGroup = new Group();
  rockGroup = new Group();
  //Creating sprites
  monkey = createSprite(70, 270, 50, 50);
  monkey.addAnimation("runningMonkey", monkeyRunning);
  monkey.scale = 0.1;

  ground = createSprite(250, 305, 1000, 10);
  ground.x = ground.width / 2;
  
  invisibleGround = createSprite(250, 310, 1000, 10);
  invisibleGround.x = ground.width / 2;
}


function draw() {
  //Setting background color
  background("lightblue");

  if (GameState === PLAY) {

    //reset the ground it moves out of the canvas
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
    //Giving jump movement for monkey
    if (keyDown("space") && monkey.isTouching(ground) ) {
      monkey.velocityY = -20;
    }  
    //Adding score
    score = Math.round(frameCount / 3);
    
    if (monkey.isTouching(bananaGroup)) {
    bananaGroup.destroyEach();
  }
   //Calling the functions here
   food();
   obstacle();
    //If monkey hits the rock, gamestate should change to end
    if (monkey.isTouching(rockGroup)) {
      GameState = END;
    }
} 
  
  if (GameState === END) {
    ground.velocityX = 0;
    rockGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    bananaGroup.setLifetimeEach(-1);
    rockGroup.setLifetimeEach(-1);
    invisibleGround.velocityX = 0;
    background("black")
    text="Gameover";
  }


  //Giving gravity and collide with the invisible ground
  monkey.velocityY = monkey.velocityY + 0.9;
  monkey.collide(invisibleGround);
  //Displaying the score
  stroke("black");
  textSize(20);
  fill("black");
  text("Score:" + score, 300, 50);
  
  drawSprites();
}

function food() {

  if (frameCount % 80 === 0) {
    var banana = createSprite(400, 10, 10, 20);
    banana.addImage("banana", bananaImage);
    banana.velocityX = -(5 + 2 * score / 100);
    banana.y = Math.round(random(120, 200));
    banana.scale = 0.05;
    bananaGroup.add(banana);
    bananaGroup.setLifetimeEach(100);
    banana.setCollider("rectangle", 0, 0, 400, 400);

  }

}

function obstacle() {

  if (frameCount % 200 === 0) {
    var obstacle = createSprite(400, 275, 23, 32);
    obstacle.velocityX = -(5 + 2 * score / 100);
    obstacle.addImage("obstacle", obstacleImage);
    obstacle.scale = 0.1;
    rockGroup.add(obstacle);
    rockGroup.setLifetimeEach(100);
    obstacle.setCollider("circle", 0, 0, 200)
  }

}