var p1,p2,asteroid1,asteroid2,asteroid3;
var blast,blastImage,space,spaceImage;
var spaceShip,spaceShipImage, laserImage;
var shoot = 0;
var score = 0;
var laser,asteroidGroup,laserGroup;
var explosionSound,laserSound,explasionImage;
var instruction = 0;
var play = 1;
var end = 2;
var gameState = instruction;
var endline,canvas;
function preload() {
  spaceImage = loadImage("space.png");
  spaceShipImage = loadImage("spaceship.png");
  laserImage = loadImage("laser.png");
  asteroid1 = loadImage("as1.png");
  asteroid2 = loadImage("as2.png");
  asteroid3 = loadImage("as3.png");
  blastImage = loadImage("blast.png");
  explasionImage = loadImage("blast.png");
  explosionSound = loadSound("explosion.mp3");
  laserSound = loadSound("laser sound.mp3");
}

function setup() {  
  canvas = createCanvas(1000,700);
  space = createSprite(250,350,30,20);
  space.addImage(spaceImage);
  space.velocityY = (5 + score/10);

  spaceShip = createSprite(250,600);
  spaceShip.addImage(spaceShipImage);
  spaceShip.scale = 0.6;
  
  p1 = createSprite(250,600);
  //p1.debug = true;
  p1.setCollider("rectangle",70,-27,5,265,156);
  p1.visible = false;
  p2 = createSprite(250,600); 
  p2.setCollider("rectangle",-70,-27,5,265,24);
  //p2.debug = true;
  p2.visible = false;
  
  asteroidGroup = new Group;
  laserGroup = new Group;
  
  endline = createSprite(250,700,500,5);
  endline.visible = false;
}

function draw() {
  background(0);

  if(gameState === play) {
    // console.log(frameCount);
    
    if(space.y > 800) {
      space.y = 300;
    }
    
    shoot = shoot - 1;

    if(keyDown("space") && shoot < 460) {
      laser = createSprite(spaceShip.x,spaceShip.y - 130);
      laser.addImage(laserImage);
      laser.velocityY = -8; 
      laser.scale = 0.7;
      laserGroup.add(laser);
      laserSound.play();
      //console.log(laser.x);
      shoot = laser.y;
    }  

    if(keyDown("right") && spaceShip.x < 1000) {
      spaceShip.x = spaceShip.x + 10;
      p1.x = p1.x + 10;
      p2.x = p2.x + 10;
    }

    if(keyDown("left") && spaceShip.x > 50) {
      spaceShip.x = spaceShip.x - 10;
      p1.x = p1.x - 10;
      p2.x = p2.x - 10;
    }
    
    if(asteroidGroup.isTouching(p2) || asteroidGroup.isTouching(p1)) {
      asteroidGroup.destroyEach();
      var blast = createSprite(spaceShip.x,spaceShip.y - 50);
      blast.addImage(blastImage);
      blast.lifetime = 25;
      explosionSound.play();
      spaceShip.destroy();
      gameState = end;
    }
    
    if(asteroidGroup.isTouching(laserGroup)) {
      asteroidGroup.destroyEach();
      laserGroup.destroyEach();
      explosionSound.play();
      score = score + 1;
    }

    asteroids();
    drawSprites();
    
    stroke("white");
    fill("white");
    textSize(30);
    text("score : " + score,210,60)
    
    if(asteroidGroup.isTouching(endline)) {
      asteroidGroup.destroyEach();
      gameState = end;
    }
  }
  else if(gameState === end) {
    space.velocityY = 0;
    stroke("yellow");
    fill("white");
    textSize(30);
    text("GAME OVER !",canvas.width/2-400,canvas.height/2);
    text("The Corona Viruses have infected the residents of the Earth",canvas.width/2-400,canvas.height/2+100);
    text("Your final score : "+score,canvas.width/2-400,canvas.height/2+200);

    
  }

  if(score == 50){
    gameState = end;

    background(255);
    stroke("black");
    fill("black");
    textSize(40);
    text("You protected your planet from Corona viruses.",canvas.width/2-350,canvas.height/2);
    text("You Won !!!",canvas.width/2-70,canvas.height/2+60);

  }

  if(gameState === instruction) {
    stroke("gold");
    fill("gold");
    textFont("trebuchetMS")
    textSize(40);
    text("------CORONA VIRUS SHOOTERS------",canvas.width/2-300,canvas.height/2-300);
    text("ENJOY THE GAME!",canvas.width/2-300,canvas.height/2+170);
    stroke(255);
    fill(255);
    textSize(25);
    textFont("Helvetica");
    text(" Year 2021.....",canvas.width/2-300,canvas.height/2-250);
    text(" New strain of Corona Viruses are attacking the Earth and its residents.",canvas.width/2-300, canvas.height/2 - 210);
    text(" You are a frontline worker and fighter.",canvas.width/2-300,canvas.height/2-170);
    text(" Help and save the Earth and its residents.",canvas.width/2-300,canvas.height/2-130);
    text(" Press 's' to start game.",canvas.width/2-300,canvas.height/2+50);
    text(" Use right and left arrow keys to move.",canvas.width/2-300,canvas.height/2-50);
    text(" Press 'space' to shoot.",canvas.width/2-300,canvas.height/2-90);
    text(" Shoot 50 Corona Viruses to protect the Earth and its residents.",canvas.width/2-300,canvas.height-350);
    
    
    if(keyDown("s")) {
      gameState = play;
    } 
    if(keyDown("r")) {
      gameState = instruction;
    }
  }
}
  

function asteroids() {
  if(frameCount % 60 === 0) {
  
    var asteroid = createSprite(Math.round(random(50,1000)),-20);
    asteroid.velocityY = (6 + score/10);
    asteroid.lifetime = 200;
    asteroid.scale = random(0.4,0.5);
    //asteroid.debug = true;

    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: asteroid.addImage(asteroid1);
              asteroid.setCollider("circle",-80,10,160);
              break;
      case 2: asteroid.addImage(asteroid2);
              asteroid.setCollider("circle",50,0,150);
              break;
      case 3: asteroid.addImage(asteroid3);
              asteroid.setCollider("circle",0,0,170)
      default: break;
    }
    
    //console.log(asteroid.x);
    asteroidGroup.add(asteroid);
  }
}