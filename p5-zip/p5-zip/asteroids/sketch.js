//<script src="lib/p5.js" type="text/javascript"></script>;
//<script src="lib/p5.play.js" type="text/javascript"></script>

var MF;
var x;
var y;
var w;
var h;
var deathStar;
var bgdImage;
var spr;
var asteroids;
var tie;
var direction;
var lives;
var boundry;
var s;
var bullets;
var lasar;
var level;
var kills;

function preload(){
	bgdImage=loadImage("BackgroundForAsteroids.jpg");
  	MF = loadImage("MF.jpg");
  	deathStar = loadImage("DeathStar.gif");
  	tie = loadImage("TIE-LN_Fighter.jpg");
  	lasar= loadImage("lasar.jpg");
}
function setup() {
  	createCanvas(1920, 1079);
  	lives = 3;
  	x = 683;
  	y = 384;
  	w = 50;
  	h = 50;
  	var asArray = new Array();
  	useQuadTree(true);
  	spr = createSprite(width/2, height/2, x, y);
  	level=1;
  	kills=0
  	
  	
  	asteroids = new Group();
  	bullets = new Group();
  	
  	for (var i = 0; i < 10; i++){
  		createAsteroid(1500, 420);
  	}

  	spr.addImage(MF);
  	spr.setCollider("circle", 20, 20, 30, 30);
  	
}

function draw() {
	background(0);
	image(bgdImage, 0, 0);
	image(deathStar, 1300, 100);
	
	textSize(20);
	fill(255);
	stroke(255);
	text("arrows to move, a to shoot", 50, 25);

	textSize(20);
	fill(255);
	stroke(255);
	text("lives: " + lives, 50, 50);

	textSize(20);
	fill(255);
	stroke(255);
	text("level: " + level, 50, 75);

	textSize(20);
	fill(255);
	stroke(255);
	text("enemies: " + asteroids.length, 50, 100);

	textSize(20);
	fill(255);
	stroke(255);
	text("kills: " + kills, 50, 125);

	
	asteroids.bounce(asteroids);
	asteroids.bounce(spr);
	spr.bounce(asteroids);
	spr.setSpeed(0.4);
	spr.rotateToDirection = true;
	asteroids.overlap(spr, loselife);

	if (asteroids.length==0){
		level+=1;
		for (var i = 0; i < level*5 + 5; i++){
	  		createAsteroid(1500, 420);
	  	}
  	}

	if (keyIsDown(LEFT_ARROW)){
		spr.rotation += -10;
	}
	if (keyIsDown(DOWN_ARROW)){
		spr.setSpeed(0);
	}
	if (keyIsDown(UP_ARROW)){
		spr.setSpeed(7);
		//spr.addSpeed(3, spr.rotation);
	}
	if (keyIsDown(RIGHT_ARROW)){
		spr.rotation += 10;
	}
	if (keyWentDown("A")){
		shoot(spr.position.x, spr.position.y);
	}


	for(var i = 0; i<asteroids.length; i++){
		s = asteroids[i];

		if (s.position.y > height-30){
			s.velocity.y = -abs(s.velocity.y);
		}
		if (s.position.y < 60){
			s.velocity.y = abs(s.velocity.y);
		}
		if (s.position.x > width-30){
			s.velocity.x = -abs(s.velocity.x);
		}
		if (s.position.x < 30){
			s.velocity.x = abs(s.velocity.x);
		}
	}

	if (spr.position.y > height-30){
		spr.velocity.y = -abs(spr.velocity.y);
	}
	if (spr.position.y < 60){
		spr.velocity.y = abs(spr.velocity.y);
	}
	if (spr.position.x > width-30){
		spr.velocity.x = -abs(spr.velocity.x);
	}
	if (spr.position.x < 30){
		spr.velocity.x = abs(spr.velocity.x);
		}
	drawSprites();
}


function createAsteroid(x, y){
	
	var a = createSprite(x, y);
	a.addImage(tie);
	a.setSpeed(4, random(360));
	asteroids.add(a);
	return(a);
}

function shoot(x, y){
	if (lives>0){
		var bullet= createSprite(x, y, 10, 10);
		bullet.addImage(lasar);
		bullet.life=50;
		bullet.setSpeed(17, spr.rotation);
		bullets.add(bullet);
		asteroids.overlap(bullets, asteroidHit);
		}
}
function asteroidHit(asteroid, bullet){
	kills+=1;
	bullet.remove();
	asteroid.remove();
}

function loselife(){
	if (lives>0){
	lives-=1;
	}
	if (lives<1){
		spr.remove();
	}
}
