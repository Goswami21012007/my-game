var bg,coin,sound,bg2
var ground,animal1,animal2,animal3,animal4
var fruit1,fruit2,fruit3,fruit4,fruit5
var fruitsG
var boy,boy_img
var gameOver_img,restart_img
var obstacle,stone1,stone2,stone3,stone4
var strength=100
var score=0;
var PLAY=1
var END=0
var gameState=PLAY; 
var restart,gameOver
var obstaclesG,coinG
function preload(){
boy_running = loadAnimation("boy/boy1.png","boy/boy2.png","boy/boy3.png","boy/boy4.png","boy/boy5.png","boy/boy6.png")
boyImg = loadImage("boy.gif")
bgfinal = loadImage("bg.png")
bg1=loadImage("bg1.jpg")
coin=loadImage("coin.png")
sound=loadSound("coins sound.wav")
bg2=loadImage("bg2.jpg")
restart_img=loadImage("restart.png")
gameOver_img=loadImage("gameover0.png")
stone1=loadImage("stone/stone1.png")
stone2=loadImage("stone/stone2.png")
stone3=loadImage("stone/stone3.png")
stone4=loadImage("stone/stone4.png")
fruit1Img=loadImage("fruits/apple.png")
fruit2Img=loadImage("fruits/grapes.png")

fruit3Img=loadImage("fruits/banana.png")
fruit4Img=loadImage("fruits/pineapple.png")
}
function setup() {
  createCanvas(windowWidth,windowHeight);
  forest = createSprite(width/2, height/2)
  forest.addImage(bgfinal)
  forest.scale = 4
  forest.velocityY = 3;
  forest.y = forest.width/2
  ground=createSprite(width/2, height -20, width,20)
  ground.visible = false

  boy=createSprite(width/2,height-30,50,50)
  boy.addAnimation("running", boy_running)
  boy.debug=true
  boy.setCollider("rectangle",0,0,boy.width,boy.height)
  //boy.addImage(boyImg)
  boy.scale=0.5

  restart=createSprite(windowWidth/2,400,20,20)
  restart.addImage(restart_img)
  restart.scale=1.3
restart.visible=false
  gameOver=createSprite(200,300,20,20)
  gameOver.addImage(gameOver_img)
  gameOver.scale=1.3
gameOver.visible=false
obstaclesG=new Group ()
coinG=new Group()
fruitsG=new Group()
}

function draw() {
  background(255);  
if(gameState===PLAY){
  if(forest.y > height-100)
  {
    forest.y = forest.height/2}
    if(keyDown(UP_ARROW) && boy.y >height/2-100){
      boy.y-=2
      
    }
  //  camera.position.x=boy.x
  //camera.position.y=boy.y
    if(keyDown(DOWN_ARROW)){
      boy.y+=2
      
    }
    if(keyDown(LEFT_ARROW)&& boy.x > width/2 -200){
      
      boy.x-=2
    }
    if(keyDown(RIGHT_ARROW) && boy.x < width/2 +200){
      
      boy.x+=2
    }
    stones()
    coins()
    fruits()
    for(var i=0;i<coinG.length;i++){
      if(boy.isTouching(coinG.get(i))){
        score+=5
        coinG.get(i).destroy()
      }
    }
    for(var i=0;i<fruitsG.length;i++){
      if(boy.isTouching(fruitsG.get(i))){
        strength+=10
        fruitsG.get(i).destroy()
      }}

   for(var i=0;i<obstaclesG.length;i++){
    if(boy.isTouching(obstaclesG.get(i))){
      strength-=10
      obstaclesG.get(i).destroy()
      
   }
    if(strength<=0){
      gameState=END;
    }
    }
}else if (gameState===END){

}


 


  
  

 

  boy.collide(ground)
  
  drawSprites();
  fill (255)
  textSize(30)
  text ("score="+score,300,100)
  text ("strength="+strength,300,200)
  fill (0)
  text ("x"+mouseX+",y"+mouseY,50,50)
}

function stones(){
  if(frameCount % 160 ===0){
   var obstacle=createSprite(Math.round(random(width/2-200, width/2+200)),height/2+200,50,50)
   var r = Math.round(random(1,4))
   switch(r){
      case 1:  obstacle.addImage(stone1);
              break;
      case 2:  obstacle.addImage(stone2);
              break;
      case 3:  obstacle.addImage(stone3);
              break;
      case 4:  obstacle.addImage(stone4);
              break;
      default: break;
   }
   
    obstacle.velocityY=3
    obstacle.scale=1.0
    obstacle.lifetime = 300
    obstacle.debug=true
    obstacle.setCollider("circle",0,0,obstacle.width)
    obstaclesG.add (obstacle)
    
  }
  
  }
function fruits(){
  if(frameCount % 200===0){
  var fruits=createSprite(Math.round(random(width/2-200,width/2+200)),height/2+200,50,50)
  var i=Math.round(random(1,4))
  switch(i){
    case 1:fruits.addImage(fruit1Img)
    break;
    case 2:fruits.addImage(fruit2Img)
    break;
    case 3:fruits.addImage(fruit3Img)
    break;
    case 4:fruits.addImage(fruit4Img)
    break;
    
    default :break;}
   fruits.velocityY=3
    fruits.scale=0.3
    fruits.lifetime = 300
    fruits.debug=true
    fruits.setCollider("circle",0,0,fruits.width)
    fruitsG.add(fruits)
  }
  
}
  function coins(){
    if(frameCount% 300 ===0){
     var coins=createSprite(Math.round(random(width/2-200, width/2+200)),height/2+200,50,50)
      coins.addImage(coin)
        coins.scale=0.4
        coins.velocityY=3
        coins.lifetime = 300
        coins.debug=true
        coins.setCollider("circle",0,0,coins.width)
        coinG.add(coins)
    }
    
  }