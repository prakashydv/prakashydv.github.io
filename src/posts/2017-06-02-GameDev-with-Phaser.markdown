---
layout: post
title:  "Flappy Bird in  Phaser"
date:   2017-05-02 00:06:16 +0530
categories: technology frontend
summary: "Game development in HTML5 using Phaser framework"
---

![Flappy What exactly?](../images/flappy.png)

Phaser is an open source game development framework for simple HTML5 2D desktop and mobile browser games, so why not ?!

Dependencies :
  - html5 capable browser
  - run simple http server locally during development (python will do, as always)
  - glitter

### Jumpstarting phaser

create the phaser object (duh!)
```py
var game = new Phaser.Game(500, 500, Phaser.AUTO, 'flappy', { preload: preload, create: create, update: update });
```
... that went well. (the 500s are the width and height). Preload, create and update  are the holy trinity that you must implement to get your game running.

I am a man of simple tastes so my graphics are really spartan. Lets do away with this necessary summoning of evil bitmaps.

```py
function preload() {
    game.load.image('sky', 'assets/sky.jpg');
    game.load.image('pipe1', 'assets/pole1.png');
    game.load.image('pipe2', 'assets/pole2.png');
    game.load.image('gameover', 'assets/game_over3.jpg');
    game.load.spritesheet('bird', 'assets/iconslucent.png',47,41);
}
```

you may have noticed i used a spritesheet for a bird instead of a regular image. spritesheets lets you animate objects in the game, usually a pleasant experience.

Lets define some globally visible parameters and variable. (some people just like to watch the world burn !)

```py
var gap_difficulty=35; // maybe let the user configure it ?
var bird;
var gover;
var alive=true;        // feel good, right ?!
var pipething;         // if it looks like a pipe, smells like a pipe ... it must be a pipe !
var cursors;           // cursers ?
var pipe1,pipe2,pipe3,pipe4; // Bird folk havent discovered lists yet
var score = 0;         // :-(
var scoreText;
var player;
var but;               // but what dear ?
var respawnCount = 0;  // respawning your way to immortality
var gamepaused = true; // wonders why ...
```

Now sit in the lotus position and bring forth the keyboard and as an avatar of the Hindu God Bhrama the creator, Lets Create()

```py
function create() {

    //  enable the Arcade Physics system for physics (hope you scored well in school !)
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  Load the back ground image @[0][0] (coordinates start from top left !)
    game.add.sprite(0, 0, 'sky');

    //  Our Simple Scroller-Game group contains the ground and .. well, pipes, two at a time (holding my horses here)
    pipething = game.add.group();

    //  Enable physics for the group you just created (pipething)
    pipething.enableBody = true;

    //  Now let's create two pipes at (x=200)
    // The gap is the way through
    pipe1 = pipething.create(200, -120, 'pipe1');
    pipe1.body.immovable = true;

    pipe2 = pipething.create(200, 290, 'pipe2');
    pipe2.body.immovable = true;

    //  Now let's create another two pipes slightly ahead (x=450)
    pipe3 = pipething.create(450, -40, 'pipe1');
    pipe3.body.immovable = true;

    pipe4 = pipething.create(450, 370, 'pipe2');
    pipe4.body.immovable = true;

    // The player bird and its initial spawn point (feel creative and randomise this !)
    player = game.add.sprite(250, game.world.height - 320, 'bird');

    //  We need to enable physics on the player (duh!)
    game.physics.arcade.enable(player);

    //  Player physics properties. Give the little guy a slight bounce. (because .. bounce !)
    player.body.bounce.y = 0.1;
    player.body.gravity.y = 1100;

    player.body.collideWorldBounds = true; // when the worlds collide, you die !

    // animate your player (take role of your favourite godess as you breathe life into this avian foe)
    // yay spritesheets !
    player.animations.add('still', [1,2,3,4,5,6,7,8,9,10,11,12], 10, true);
    player.animations.play('still');

    //  The score (must be SHINY !!)
    scoreText = game.add.text(225, 50, '0', { font:'bold 48pt Arial', fontSize: '32px', stroke:'blue',fill: '#FFFFFF', fontWeight:'bold' });

    //  Our controls. (thank you for holding your horses here)
    cursors = game.input.keyboard.createCursorKeys();

    // YOLO ???
    respawnCount = 0;
}
```

Having manifested a cruel world into existence, now play with their petty lives via update()
```py
function update() {
    // Do God stuff
}
```

Creating was the easy part, now deal with the moiseries of your creations.

What happens when a player and platform (the moving pipes) collide ? Call diebitch obviously (more on that later)

```py
    //  Collide the player and the stars with the platforms
    game.physics.arcade.collide(player, pipething,diebitch,null,this);
```

Now lets define actions for key presses
Additionaly you can add code here if you wish to change player animation on
a particular left key press. Sprite sheets are continuosly iterating so no
special animation was necessary. I have left in the code for animation control
as comments for reference.

First the horizontal movements :
```py
    if (cursors.left.isDown)
    {
        //  Move to the left
        player.body.velocity.x = -150;
        //player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        player.body.velocity.x = 150;
        //player.animations.play('right');
    }
    else
    {
        //  Stand still
        //player.animations.stop();
        //player.frame=1;
    }
```

Now the vertical movements, which is simple for our game, if the up button
is pressed the y direction velocity is negative, I chose arbitary figures,
feel free to experiment and choose :

```py
    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown)// && player.body.touching.down)
    {
        player.body.velocity.y = -250;
        //player.frame=0;
    }
```

Now the pipe physics (the pipes are static).
At any given time there are four pipes on screen so we just reuse the pipe objects and respawn/kill as necessary.

```py
	// initialise animations
    player.animations.play('still');
    player.body.velocity.x=0;
    pipe1.body.velocity.x=-100;
    pipe2.body.velocity.x=-100;
    pipe3.body.velocity.x=-100;
    pipe4.body.velocity.x=-100;

    if(pipe1.body.position.x<-50)
    {
        killpipe(player,pipe1);
        killpipe(player,pipe2);
        pipe1=createpipe(player,475,-50-gap_difficulty,'pipe1');
        pipe2=createpipe(player,475,300+gap_difficulty,'pipe2');
        if(alive)
            score+=1;
        scoreText.text = ''+score;
    }


    if(pipe3.body.position.x<-50)
    {
        killpipe(player,pipe3);
        killpipe(player,pipe4);
        pipe3=createpipe(player,475,-80-gap_difficulty,'pipe1');
        pipe4=createpipe(player,475,270+gap_difficulty,'pipe2');
        if(alive)
            score+=1;
        scoreText.text = ''+score;
    }
```

A little max limit on respawn counts ... not that its fun.
```py
	if(respawnCount > 0)
	{
    	respawnCount = respawnCount + 1;
	}
	if(respawnCount > 100)
	{
	    resetgame();
	}
```

Thats pretty much it ! A few squigly lines and you are all set to make
 games you can play in any HTML5 supporting browser, very cool I say.


