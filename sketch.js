var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud, cloudsGroup, cloudImage;
var obstacle,obstacleImage1,obstacleImage2,obstacleImage3,obstacleImage4,obstacleImage5,obstacleImage6
var score = 0;
var PLAY = 1;
var END = 0;
var gamestate = PLAY;
var gameover;
var gameover2;
var restart ;
var restar2;
var checkpoint;
var die ;
var jump;



var newImage;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacleImage1 = loadImage("obstacle1.png");
  obstacleImage2 = loadImage("obstacle2.png");
  obstacleImage3 = loadImage("obstacle3.png");
  obstacleImage4 = loadImage("obstacle4.png");
  obstacleImage5 = loadImage("obstacle5.png");
  obstacleImage6 = loadImage("obstacle6.png");
  gameover2 = loadImage ("gameOver.png");
  restart2 = loadImage ("restart.png");
  checkpoint = loadSound ("checkpoint.mp3")
  die= loadSound ("die.mp3")
  jump = loadSound ("jump.mp3")

 
}


function setup() {
  createCanvas(windowWidth,windowHeight);

  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  gameover = createSprite(300,100);
  gameover.addImage("gameover",gameover2);
  restart = createSprite(300,140);
  restart.addImage ("restart",restart2); 
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  //ejemplo de concatenación
  console.log("Hola"+ 5);
  //grupo de obstaculos
  obstaclesGroup = createGroup();
  //grupo de nubes
  cloudsGroup = createGroup ();
  //activar colicionador
  trex.setCollider("rectangle",0,0, 50,trex.height);
  trex.debug = true;  
  console.log("esto es un mensaje")
}

function draw() {
  background(180);
  text("Score"+score,400,19 );
  score = score + Math.round(frameCount/60);
  
  if (gamestate === PLAY){
    
    ground.velocityX = -(4+3*score /100);

    score = score + Math.round(frameCount/60);
    
    gameover.visible = false;
    restart.visible = false;
      
    if (ground.x < 0){
        ground.x = ground.width/2;
  }

    if(touches.length>0 || keyDown("space")&& trex.y >= 100) {
        trex.velocityY = -10;
        jump.play()
        touches = []
  }
    if(score %100 == 0){
      checkpoint.play()
    }
      trex.velocityY = trex.velocityY + 0.8;
      //aparecer obtaculos
      spawnObstacles();
      //aparecer nubes
      spawnClouds();

    if(obstaclesGroup.isTouching(trex)){
     // trex.velocityY= -12
      die.play()
      gamestate = END;
    } 
  }
  else if (gamestate === END){
    gameover.visible = true;
    restart.visible = true;
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach (0);
    cloudsGroup.setVelocityXEach (0); 
    trex.changeAnimation( "collided",trex_collided);
    cloudsGroup.setLifetimeEach(-1);
    obstaclesGroup.setLifetimeEach(-1);
    if (mousePressedOver(restart)){
      reset();

 
  }

  }
  trex.collide(invisibleGround);
  drawSprites();
}


function spawnClouds() {
  //escribir aquí el código para aparecer las nubes
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,100,40,10);
    cloud.addImage(cloudImage)
    cloud.y = Math.round(random(10,60))
    cloud.scale = 0.4;
    cloud.velocityX = -3;
    
    
    //asignar tiempo de vida a una variable
    cloud.lifetime = 200
    // grupo nubes
    cloudsGroup.add(cloud)
    //ajustar la profundidad
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    }
}
  function spawnObstacles(){
  if ( frameCount % 60 === 0){
  var obstacle = createSprite(600,165,10,40)
  obstacle.velocityX= -(6+score /100)
  var rand = Math.round(random(1,6))
  switch(rand){
    case 1: obstacle.addImage(obstacleImage1);
      break;
    case 2:obstacle.addImage(obstacleImage2);
      break;
    case 3 :obstacle.addImage(obstacleImage3);
      break;
    case 4 :obstacle.addImage(obstacleImage4);
      break;
    case 5 :obstacle.addImage(obstacleImage5);
      break;
    case 6 :obstacle.addImage(obstacleImage6);
      break;
      default: break;
  }
  obstacle.scale = .5
  obstacle.lifetime = 300
  //grupo obstaculos
  obstaclesGroup.add(obstacle);
  }
}
function reset(){
  gamestate= PLAY
  gameover.visible = false;
  restart.visible = false;
  obstaclesGroup.destroyEach()
  cloudsGroup.destroyEach()
  score=0
}
