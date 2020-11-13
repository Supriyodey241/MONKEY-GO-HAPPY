  var PLAY=1;
  var END =0;
  var gameState = PLAY;
  var monkey , monkey_running;
  var banana ,bananaImage,bananaGroup, obstacle,             obstacleImage,obstacleGroup;
  var score;
  var ground;
  var survivalTime = 0;

function preload(){
 
  monkey_running =                                          loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup(){  
  createCanvas(600,400);

  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(400,350,10000,10);
  ground.x = ground.width /2;
  ground.velocityX = -4;  
  console.log(monkey.y);  

  bananaGroup = new Group();
  obstacleGroup = new Group();  

  score = 0; 
  
}

function draw() {
  background(180);

    if(gameState === PLAY){  
    if (ground.x < 0){
    ground.x = ground.width/2;
    }  

    if(keyDown("space")&& monkey.y >= 309) {
    monkey.velocityY = -18;
    }  
    monkey.velocityY = monkey.velocityY + 0.8  
    monkey.collide(ground);
    }
    
    if(monkey.isTouching(obstacleGroup)){
    gameState=END;  
    }
    

    else if(gameState === END){
    obstacleGroup.destroyEach();  
    bananaGroup.destroyEach();
    monkey.destroy(); 
    ground.destroy();  
    background("black");
    textSize(30);
    fill("orange")  
    text("GAME OVER",250,200)    
    } 


  

  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate())
  text("survivalTime"+survivalTime,300,50);  

  Bananas();
  Obstacles();  
  drawSprites();  
  
}

function Bananas(){
  
    if(World.frameCount%80==0){
    banana=createSprite(600,200,20,20);
    banana.y=Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.velocityX=-4;
    banana.scale=0.1;  
    banana.lifetime=140;
    bananaGroup.add(banana);  
    }
}

function Obstacles(){
    if(World.frameCount%300==0){
    obstacle=createSprite(600,315,20,20);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX=-4;
    obstacle.scale=0.2;  
    obstacle.lifetime=140;
    obstacle.debug=false;
    obstacle.setCollider("rectangle",0,0,400,490);  
    obstacleGroup.add(obstacle);  
    }    
}
