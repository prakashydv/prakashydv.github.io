#Jumpstart HTML 5 Game development with [phaser](https://phaser.io/)

Programming games can be challenging, and often accompanies a steep setup curve. Leaving aside high profile games mostly done in C/C++, which require a sound knowledge of the OGL/DX rendering pipeline, most beginners and wanna-be indie game developers want something easier to get started. I experimented with Love2D and pygame libraries which are based on Lua and python, respectively.

Pygame is well developed and one has the avantage of leveraging other python modules for developing more complex games; for example, using the OpenCV python module, you can easily use camera feed for interesting game controls, the possibilities are limitless (well, almost, if high end MSAA titles are not your immediate concerns). Love2D is simpler and gets things done quicker, might not have much following, but is an excellent stepping stone for programming for kids. However, in my opinion, HTML5 is the quickest, easiest way to jump into game dev. Written in javascript, it just needs a browser to run, no messy setups and installations, and above all, it means it would run on your smartphone browser as well, how about that !?

There is one catch, well, actually its a 'security' feature : it can only be run 'online'. Before you run to fetch your pitchforks, I remind you its all for the best, no need to install apache or any fancy server, a simple HTTP Server can be hosted using the python module : In your cmd prompt just navigate to the folder with the index.html file and use "python -m SimpleHTTPServer", and you can access your webpage/game at the specified port on \\localhost, its really that simple.

As an example, below is a really basic HTML5 game I made with phaser. Yes, so I faked flappy Bird, it just goes onto say that with minimal effort and a good gameplay even simple games can be addictive. phaser is really rich in features like webgl an Canvas support, preloaders, a fairly sophisticated physics engine, sprites support, device scaling, blah blah you get the idea, coupled with a example library to demonstrate all these features, its a complete beginners package.

So lets get our hands wet ... we begin with the core game code written in javascript. Save this as a .js file.

```javascript
var game = new Phaser.Game(500, 500, Phaser.AUTO, 'flappy', { preload: preload, create: create, update: update });
```
This creates a phaser game object with the obvious parameters :
widthxheight = 500x500
Phaser.AUTO is the renderer, meaning it will be autodetected by Phaser. If you feel brave enough try specifying Phaser.WEBGL, Phaser.CANVAS or Phaser.HEADLESS (for no rendering)
'flappy' is the DOM element into which this games canvas will be injected. Either a DOM ID (string) or the element itself.

The object passed as last parameter is the default state object. A object consisting of Phaser.State functions (preload, create, update, render) or null.



