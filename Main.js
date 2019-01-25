import Timer from './Timer.js';
import {loadLevel} from './loaders.js';
import {createCharacter, createEnemy} from './entities.js';
import {setupKeyboard} from './input.js';
import {createCollisionLayer} from './layers.js';
import {setUpControllers, controllerUpdate} from './Controllers.js';
import {AssetManager} from './assetmanager.js';

const ASSET_MANAGER = new AssetManager();
//que all the asset files needed
//ASSET_MANAGER.queueDownload("./characters/Karate.png");
ASSET_MANAGER.queueDownload("./Enviroment/PinkPlatform.png");
ASSET_MANAGER.queueDownload("./Enviroment/PinkCity.gif");
ASSET_MANAGER.queueDownload("./Enviroment/woodenBarrel.png");

//Loads all assets and begins the game
ASSET_MANAGER.downloadAll(function () {
const canvas = document.getElementById('gameWorld');
const context = canvas.getContext('2d');
//Starts the fight sequence scene
Promise.all([
    createCharacter(),
    createEnemy(),
    loadLevel('PinkCity'),
    assetManager.downloadAll,
])
.then(([Character, Enemy, level]) => {
    Character.pos.set(400, 180); //sets the character1 position
    Enemy.pos.set(600,400); //sets position for character 2 #enemy

    level.comp.layers.push(createCollisionLayer(level)); //creates collision layer
    level.entities.add(Character); //adds character to the level
    level.entities.add(Enemy); //adds enemy character to the level

    const input = setupKeyboard(Character); //sets up keyboard controlls for the character
    input.listenTo(window); //connects the keyboard to listen to the window
    const controllerInput = setUpControllers(Character); //change to set up controllers specific for each character.
    //mouse placement debugger
    // ['mousedown', 'mousemove'].forEach(eventName => {
    //     canvas.addEventListener(eventName, event => {
    //         if (event.buttons === 1) {
    //             Character.vel.set(0, 0);
    //             Character.pos.set(event.offsetX, event.offsetY);
    //         }
    //     });
    // });

    //timer and update Loop
    const timer = new Timer(1/60);
    timer.update = function update(deltaTime) {  //this is the main update loop
        level.update(deltaTime);                // updates all the things on the level.
        level.comp.draw(document.getElementById('gameWorld').getContext('2d')); //draws the new version of the level.
    }
    timer.start();
});

})
