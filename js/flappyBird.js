var game = new Phaser.Game(500, 500, Phaser.AUTO, 'flappy', { preload: preload, create: create, update: update });

function preload() {
    game.load.image('sky', 'assets/sky.jpg');
    game.load.image('pipe1', 'assets/pole1.png');
    game.load.image('pipe2', 'assets/pole2.png');
    //game.load.image('star', 'assets/star.png');
    //game.load.image('bird', 'assets/star.png');
    game.load.image('gameover', 'assets/game_over3.jpg');
    game.load.spritesheet('bird', 'assets/iconslucent.png',47,41);
    //game.load.spritesheet('bird', 'assets/baney1.png',32,39);
    //game.load.spritesheet('button', 'assets/button.png',64,32);
}

var gap_difficulty=35; // maybe let the user configure it ?
var bird;
var gover;              
var alive=true; // feel good, right ?! 
var pipething;  // if it looks like a pipe, smells like a pipe ... it must be a pipe ! This is the pair of pipes actually :-/
var cursors;    // cursers ?
var pipe1,pipe2,pipe3,pipe4; // Bird folk havent discovered lists yet, also at most 4 pipes on screen at a time (less complexity)
var score = 0; // :-(
var scoreText;
var player;
var but; // but what dear ?
var respawnCount = 0;  // respawning your way to immortality
var gamepaused = true; // wonders why ...

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

    //  Our two animations, walking left and right.
    
    //player.animations.add('up', [2], 10, true);
    //player.animations.add('down', [1], 10, true);
    // animate your player (take role of your favourite godess as you breathe life into this avian foe)
    player.animations.add('still', [1,2,3,4,5,6,7,8,9,10,11,12], 10, true);
    player.animations.play('still');
    
    //  The score (shiny !!)
    scoreText = game.add.text(225, 50, '0', { font:'bold 48pt Arial', fontSize: '32px', stroke:'blue',fill: '#FFFFFF', fontWeight:'bold' });

    //  Our controls. (Hold your horses here, thank you)
    cursors = game.input.keyboard.createCursorKeys();

    // CHEAT HERE
    respawnCount = 0;
}

function update() {

    //  Collide the player and the stars with the platforms
    game.physics.arcade.collide(player, pipething,diebitch,null,this);
   
    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    game.physics.arcade.overlap(player, pipething, diebitch, null, this);
    //game.physics.arcade.overlap(player, pipething, diebitch, null, this);
    
    //  Reset the players velocity (movement)
    //player.body.velocity.x = 0;

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
    
    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown)// && player.body.touching.down)
    {
        player.body.velocity.y = -250;
        //player.frame=0;
    }
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

    if(respawnCount > 0)
    {
        respawnCount = respawnCount + 1;
    }

    if(respawnCount > 100)
    {
        resetgame();
    }
}

function killpipe(player,p){
    p.kill();
}

function createpipe(player,posx,posy,whichpipe){
    var pp = pipething.create(posx,posy,whichpipe);
    pp.body.immovable = true;
    return pp;

}
function diebitch(player,pipe)
{
    //console.log("You Die !!!");
    player.kill();
    alive=false;
    gover=game.add.sprite(100, 150, 'gameover');
    //but=game.add.button(game,0, 0, 'button',resetgame,this,1,0,2,3);
    respawnCount = 1;
}
function resetgame()
{
    gover.kill();
    pipe1.body.position.x=200;
    pipe2.body.position.x=200;
    pipe3.body.position.x=450;
    pipe4.body.position.x=450;
    alive=true;

    player = game.add.sprite(250, game.world.height - 320, 'bird');
    game.physics.arcade.enable(player);
    player.body.bounce.y = 0.1;
    player.body.gravity.y = 1100;
    player.body.collideWorldBounds = true;
    player.animations.add('still', [1,2,3,4,5,6,7,8,9,10,11,12], 10, true);
    player.animations.play('still');
    gamepaused = true;
    score = 0;
    scoreText.text = '0';
    respawnCount = 0;
    //but.kill();
}