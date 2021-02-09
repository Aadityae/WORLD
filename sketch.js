// A TASK IS GIVEN TO MAN TO GO SOLAR SYSTEM AND COLLECT EMERALDS BUT WITHOUT TOUCHING THE ENEMY IF THE ROCKET TOUCHES EARTH THAT MAN WILL ENTER EARTH AND START COLLECTING EMERALDS TO FINISH HIS TASK


// Declaring variables
var Space,space_image;
var Rocket,Rocketimage;
var Star,StarImage,StarGroup;
var backgroundImage;
var Earth,EarthImage;
var Path_runner,path;
var Man_running,Man;
var GameOverImg,Gameover;


var Enemy,EnemyImage,Enemygroup;
var score =0;
var Death= 0;

var Gamestate = "play"

// Loading the Images and animation
function preload()
{

    space_image = loadImage("Space.png");
    Rocketimage = loadImage("Flyingsaucer.png");
    EnemyImage = loadImage("Blast.png");
    StarImage = loadImage("stars.png");
    backgroundImage = loadImage("background0.png");
    EarthImage = loadImage("EarthImg.png");
    Path_runner = loadImage("Path.png");
    Man_running = loadAnimation("Run_1.png","Run_2.png","Run_3.png","Run_4.png");
    GameOverImg = loadImage("gameOver.png");

  
  
}

function setup() 
{
   createCanvas(700,500)


    // Creating sprite for Space
    Space = createSprite(300,250,20,20);
    Space.addImage(space_image);
    Space.scale = 4;
    Space.velocityX = -1;

    //Creating sprite for Rocket
    Rocket = createSprite(300,400,20,20);
    Rocket.addImage(Rocketimage);
    Rocket.scale = 0.4;

   Enemygroup = new Group();
   StarGroup =new Group();

     //Creating Earth sprites
     Earth = createSprite(250,370,20,20);
     Earth.addImage(EarthImage);
     Earth.scale = 0.5;

     Rocket.x = 6;
     Rocket.y = 248;

    // Creating Path
    path = createSprite(350,400,10,600);
    path.addImage(Path_runner);
    path.velocityX =-2;
    path.scale =2.9

    path.visible = false;

    //Creating Man Animation
    Man = createSprite(250,400,20,20);
    Man.addAnimation("running",Man_running);
    Man.visible = false;



    Rocket.debug=true;
    Rocket.setCollider("rectangle",10,0,190,190);



  
}



function draw() 
{
  
    background("white")


     // GameState = Play
    if(Gamestate==="play")
      {

        if(Rocket.isTouching(Earth))
      {
        path.visible =true;
        Earth.destroy();
        Rocket.destroy();
        Space.destroy();
        Man.visible = true;

      }

    SpawnStar();
    SpawnMeteor();


    //Infinite Space    
    if(Space.x<0)
      {
        Space.x = Space.width/2;
      }


    //Infinite Space 
    if(path.x<0)
      {
        path.x = path.width/2;

      }





    Rocket.velocityX=0
    Rocket.velocityY=0;


    // Movement of rocket
    if(keyDown("up_arrow"))
      {
        Rocket.velocityY=-2;

      }

    if(keyDown("down_arrow"))
      {
        Rocket.velocityY=2;

      }

    if(keyDown("right_arrow"))
      {
        Rocket.velocityX=5;

      }

    if(keyDown("left_arrow"))
      {
        Rocket.velocityX= -5;

      }


        // Man Animation to collide path
        Man.collide(path)


    // Stop movement and display task completed when score is above 6
    if(score>6)
      {

        StarGroup.destroyEach();
        Enemygroup.destroyEach();
        StarGroup.setVelocityEach(0);
        Enemygroup.setVelocityEach(0);
        Man.velocityX=0;
        path.velocityX=0;



        text("TASK COMPLETED",340,210)






      }

      // Destroy Star and enemy when touching earth
       if(StarGroup.isTouching(Earth))
      {


        StarGroup.destroyEach();

      }


    if(Enemygroup.isTouching(Earth))
      {


        Enemygroup.destroyEach();

      } 


      }




    // Adding score
    if(StarGroup.isTouching(Man))
      {

        score = score+1;
        StarGroup.destroyEach();

      }


    //Adding deaths
    if(Enemygroup.isTouching(Man))
      {

        Death = Death+1;
        Enemygroup.destroyEach();

      }

    //Adding scores
    if(StarGroup.isTouching(Rocket))
      {

        score = score+1;
        StarGroup.destroyEach();

      }

    //Adding deaths
    if(Enemygroup.isTouching(Rocket))
      {

        Death = Death+1;
        Enemygroup.destroyEach();

      }

    // To make Man sprite Jump when space bar is pressed
    if(keyDown("space") && Man.y>159)
      {
        Man.velocityY = -8;

      }

    Man.velocityY = Man.velocityY +0.8;


    //Gamestate end and game over when deaths above 3
    if(Death>3)
      {


        Gamestate="end"
      }

    if(Gamestate==="end")
      {
        StarGroup.destroyEach();
        Enemygroup.destroyEach();
        StarGroup.setVelocityEach(0);
        Enemygroup.setVelocityEach(0);

        path.velocityX=0;

        Gameover = createSprite(340,220,20,20);
        Gameover.addImage(GameOverImg);

        Man.destroy();
        path.destroy();
        Rocket.destroy();
        Space.destroy();
        Earth.destroy();

      }

   drawSprites();
    text("Score :" + score,600,50);
    text("Death:" + Death,300,50);
}


// User defined function for Enemy 
function SpawnMeteor()
{
    if(frameCount%250===0)
      {
        Enemy = createSprite(702,Math.round(random(320,350)),20,20)
        Enemy.addImage(EnemyImage);
        Enemy.velocityX = -5;
        Enemy.scale = 0.3;
        Enemy.lifetime = 140;
        Enemygroup.add(Enemy);
      
    }
  
  
  
}

//User define function for Star points
function SpawnStar()
{
  
    if(frameCount%180===0)
     {

       Star = createSprite(702,Math.round(random(100,350)),20,20);
       Star.addImage(StarImage)
       Star.velocityX = -5;
       Star.scale =0.1;
       Star.lifetime = 140;
       StarGroup.add(Star);


      
   }
  
  
}



