
var game = new Phaser.Game(800, 600, Phaser.AUTO, '0rbit', { preload: preload, create: create, update: update });

function preload() {
    game.load.image('sky', 'assets/sky.jpg');
    game.load.image('sat', 'assets/diamond.png');
    //game.load.spritesheet('sat', 'assets/scooter-sprite-99.png',99,154,8);
    //game.load.image('bugs', 'assets/bugs.png');
    game.load.spritesheet('planet', 'assets/planet.png',64,64,71);
}

var satelite;
var planet;
var moon;
var earth;
var CONST;
var sign;
var bmd;
var THRESHOLD;
function create() {

    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);
    
    //  A simple background for our game
    game.add.sprite(0, 0, 'sky');

    satelite = game.add.group();
    satelite.enableBody = true;
    
    planet = game.add.group();
    planet.enableBody = true; // experimental


    //moon = game.add.sprite(20,20, 'sat');
    //moon.enableBody = true;
    
    moon = satelite.create(20, 20,'sat',0);
    moon.body.immovable =  false;
    //moon.body.collideWorldBounds = true;
    
    //satelite.callAll('animations.add', 'animations', 'spin',[1,2,3,4,5,6,7],8, true);
    //satelite.callAll('animations.play', 'animations', 'spin');
    
    moon.body.velocity.x=20;
    moon.body.velocity.y=0;
    moon.body.mass = 1;
    //planet = game.add.group();
    //planet.enableBody = true;
    //earth = satelite.create(200, 200, 'planet');
    //earth.body.immovable = true;

    //earth = game.add.sprite(400-32, 300-32, 'planet');
    earth = planet.create(350-32, 250-32,'planet',0);
    earth.enableBody = true;

    earth.animations.add('rotate');
    earth.animations.play('rotate', 20, true);
    
    // experiment - make earth movable
    earth.body.immovable =  false;
    earth.body.mass = 10;
    
    earth.body.velocity.x=0;
    earth.body.velocity.y=0;
    
    // for tracking path
    bmd = game.add.bitmapData(800,600);
	bmd.context.fillStyle = '#ffffff';
    game.add.sprite(0, 0, bmd);
    
    game.physics.arcade.enable(earth);
    CONST = 20.0;
    THRESHOLD= 10;
}

function sign(A,B)
{
    var sgn;
    if(A>B)
        sgn= -1 ; 
    else
        sgn = 1;
    return sgn;
}
function update() {
    // debug
    game.debug.spriteInfo(moon, 32, 32);
    game.debug.spriteInfo(earth, 500, 32);


    var moonX=moon.body.position.x + 14;
    var moonY=moon.body.position.y + 16;
    var erthX=earth.body.position.x + 32;
    var erthY=earth.body.position.y + 32;
    //console.log(moon.body.velocity.x);
    var delta=Math.sqrt((moonX - erthX)*(moonX - erthX) + (moonY - erthY)*(moonY - erthY));
    if(delta>THRESHOLD)
    {
        moon.body.velocity.x = moon.body.velocity.x + 0.8*sign(moonX,erthX)*CONST/delta;
        moon.body.velocity.y = moon.body.velocity.y + 0.8*sign(moonY,erthY)*CONST/delta;

        //experimental
        earth.body.velocity.x = earth.body.velocity.x - 0.1*sign(moonX,erthX)*CONST/delta;
        earth.body.velocity.y = earth.body.velocity.y - 0.1*sign(moonY,erthY)*CONST/delta;


    }
    bmd.context.fillRect(moonX,moonY,1,1);
    bmd.context.fillRect(erthX,erthY,1,1);
	bmd.dirty = true;
}

function resetgame()
{
    moon.body.position.x = 20;
    moon.body.position.y = 20;
    moon.body.velocity.x = 0;
    moon.body.velocity.y = 0;
}

