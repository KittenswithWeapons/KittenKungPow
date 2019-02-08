/*
* Kittens Main Method
* Set up all things
* load all assets here
*/
const deltaTime = 1/60; //FPS timer --- 1/60 is 60fps
const killzone = 200; // Max distance from the edge of the screen that will trigger death
var levelObject;


const ASSET_MANAGER = new AssetManager();
//que all the asset files needed
ASSET_MANAGER.queueDownload("./characters/Karate.png");
ASSET_MANAGER.queueDownload("./Enviroment/PinkCitytiles.png");
ASSET_MANAGER.queueDownload("./Enviroment/PinkCity.gif");
ASSET_MANAGER.queueDownload("./Enviroment/woodenBarrel.png");
ASSET_MANAGER.queueDownload("./Projectiles/fireball.png");

ASSET_MANAGER.downloadAll(function () {});

window.onload = function() {
  const canvas = document.getElementById('gameWorld');
  const context = canvas.getContext('2d');

  displayStartScene(context);

  //move to the next scene
  canvas.addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === 13) { // 13 is enter
      displayFightScene(canvas, context);
    }
  });

}
