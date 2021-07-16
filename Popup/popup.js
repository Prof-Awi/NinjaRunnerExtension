var ninja,ninjarunning,ninjaslide,ninjajump,ninjadead,ninjacut
var score,gamestate,groundimg,resetimg,reset
var obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,bomb
var ground,invisbleground
var obstaclesGroup
var bombGroup
var score = 0

var PLAY = 1
var END = 0

function preload(){
  ninjarunning = loadAnimation("Run__000.png","Run__001.png","Run__002.png","Run__003.png","Run__004.png","Run__005.png","Run__006.png","Run__007.png","Run__008.png","Run__009.png",)
  ninjaslide = loadAnimation("Slide__000.png","Slide__001.png","Slide__002.png","Slide__003.png","Slide__004.png","Slide__005.png","Slide__006.png","Slide__007.png","Slide__008.png","Slide__009.png",)
  ninjajump = loadAnimation("Jump__000.png","Jump__001.png","Jump__002.png","Jump__003.png","Jump__004.png","Jump__005.png","Jump__006.png","Jump__007.png","Jump__008.png","Jump__009.png",)
  ninjacut = loadAnimation("Attack__000.png","Attack__001.png","Attack__002.png","Attack__003.png","Attack__004.png","Attack__005.png","Attack__006.png","Attack__007.png","Attack__008.png","Attack__009.png",)
  ninjadead = loadAnimation("Dead__000.png","Dead__001.png","Dead__002.png","Dead__003.png","Dead__004.png","Dead__005.png","Dead__006.png","Dead__007.png","Dead__008.png","Dead__009.png",)
  obstacle1 = loadImage("Obstacle1.png");
  obstacle2 = loadImage("Obstacle2.png");
  obstacle3 = loadImage("Obstacle3.png");
  obstacle4 = loadImage("Obstacle4.png");
  obstacle5 = loadImage("Obstacle5.png");
  bombimg = loadImage("bomb.png");
  resetimg = loadImage("reset.png");

}

function setup() {
  createCanvas(780, 467);
  groundimg = loadImage("bg.jpeg")
  ground = createSprite(1729.5,233.5)
  ground.addImage(groundimg)
  ground2 = createSprite(576.5,233.5)
  ground2.addImage(groundimg)
  ninja = createSprite(180,377)
  ninja.addAnimation("running",ninjarunning)
  ninja.addAnimation("slider",ninjaslide)
  ninja.addAnimation("jumper",ninjajump)
  ninja.addAnimation("attack",ninjacut)
  ninja.addAnimation("dead",ninjadead)

  ninja.scale = 0.2
  invisbleground = createSprite(576.5,422,1153,10)
  invisbleground.visible = false
  gamestate = PLAY
  reset = createSprite(390,233.5);
  reset.addImage(resetimg)
  reset.visible = false
  reset.scale = 0.1

  obstaclesGroup = createGroup()
  bombGroup = createGroup()




}

function draw() {
  background("lightblue");

  if (gamestate === PLAY){
    speed = -(10+score)
    if (speed>=15){
      speed = 15
    }
    var num = Math.round(random(1,2))
    if(num==1){
      spawnBomb()
    }else{spawnObstacles()}
    ground.x = ground.x + speed;
    ground2.x = ground2.x + speed;
    ninja.velocityY = ninja.velocityY + 0.8
    var yes
    if (ground.x < -576.5) {
      ground.x = 1729.5
    }
    if (ground2.x < -576.5) {
      ground2.x = 1729.5
    }
    ninja.collide(invisbleground)
    if(keyDown("down_arrow")&&ninja.y >=371.2){
      ninja.changeAnimation("slider",ninjaslide)
      ninja.scale = 0.12
      ninja.velocityY=10
      if(obstaclesGroup.isTouching(ninja)){
        gamestate = END
      }
    }
    else if(keyDown("up_arrow")&&ninja.y >=371.2){
      ninja.changeAnimation("jumper",ninjajump)
      ninja.scale = 0.2
      ninja.velocityY = -13;
      if(obstaclesGroup.isTouching(ninja)){
        gamestate = END
      }
    }
    else if(keyDown("right_arrow")){
      ninja.changeAnimation("attack",ninjacut)
      if(obstaclesGroup.isTouching(ninja)){
        score+=1
        obstaclesGroup.destroyEach()
        
      }

    }
    else{
      ninja.scale = 0.2
      ninja.changeAnimation("running",ninjarunning)
      if(obstaclesGroup.isTouching(ninja)){
        gamestate = END
      }
    }
    if(bombGroup.isTouching(ninja)){
      gamestate = END
    }




  }
  else if(gamestate===END){
    obstaclesGroup.setVelocityXEach(0);
    bombGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1)
    bombGroup.setLifetimeEach(-1)
    ninja.changeAnimation("dead",ninjadead)
    ninja.collide(invisbleground)
    ninja.velocityY = 10
    reset.visible = true
    if (mousePressedOver(reset)){

      obstaclesGroup.destroyEach()
      bombGroup.destroyEach()
      score = 0
      ninja.changeAnimation("running",ninjarunning)
      reset.visible = false
      gamestate = PLAY


    }

  }



  drawSprites()

  textSize(20)
  fill("red")
  text("Score is: "+score,600,30)


  

}

function spawnObstacles(){
  if (frameCount % 100 === 0){
    var obstacle = createSprite(width-20,Math.round(random(340,380)),10,40);
    obstacle.velocityX = speed;

  
     //generate random obstacles
     var rand = Math.round(random(1,6));

     switch(rand) {
       case 1: obstacle.addImage(obstacle1);obstacle.lifetime = width*frameRate();obstaclesGroup.add(obstacle);
               break;
       case 2: obstacle.addImage(obstacle2);obstacle.lifetime = width*frameRate();obstaclesGroup.add(obstacle);
               break;
       case 3: obstacle.addImage(obstacle3);obstacle.lifetime = width*frameRate();obstaclesGroup.add(obstacle);
               break;
       case 4: obstacle.addImage(obstacle4);obstacle.lifetime = width*frameRate();obstaclesGroup.add(obstacle);
               break;
       case 5: obstacle.addImage(obstacle5);obstacle.lifetime = width*frameRate();obstaclesGroup.add(obstacle);
               break;
       default: break;
     }

     obstacle.lifetime = width*frameRate()
     obstacle.scale = 0.08
    //add each obstacle to the group
     obstaclesGroup.add(obstacle);

    
     //assign scale and lifetime to the obstacle           
    
    //add each obstacle to the group

  }
 }


function spawnBomb(){
  if (frameCount % 100 === 0){
    var location
    if(Math.round(random(1,2))==1){
      location = 380
    }else{location = 340}
    var bomb = createSprite(width-20,location,10,40);
    bomb.velocityX = speed;
    bomb.scale = 0.08

    bomb.addImage(bombimg);
    bomb.lifetime = width*frameRate();bombGroup.add(bomb);
    bomb.setCollider("circle",-40,40,200)
  }
}



