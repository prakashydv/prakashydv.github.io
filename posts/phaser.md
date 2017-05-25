# Flappy Bird in  Phaser

[![N|Solid](image url goes here)](a url here)

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

to be continued ...