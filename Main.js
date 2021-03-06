/*
* Kittens Main Method
* Set up all things
* load all assets here
*/
const deltaTime = 1/60; //FPS timer --- 1/60 is 60fps
const killzone = 400; // Max distance from the edge of the screen that will trigger death
var levelObject;
var levelChoice;
var CPUsEnabled = true;
const masterTimer = new Timer(deltaTime);
var isPaused = false;
var startFightDelay = 150;

const ASSET_MANAGER = new AssetManager();
//que all the asset files needed
ASSET_MANAGER.queueDownload("./characters/Karate.png");
ASSET_MANAGER.queueDownload("./characters/idleBig.png");
ASSET_MANAGER.queueDownload("./effects/Damage.png");
ASSET_MANAGER.queueDownload("./effects/Dust.png");
ASSET_MANAGER.queueDownload("./effects/impact.png");
ASSET_MANAGER.queueDownload("./effects/explosion.png");
ASSET_MANAGER.queueDownload("./effects/fire.png");
ASSET_MANAGER.queueDownload("./effects/rocketBooster.png");
ASSET_MANAGER.queueDownload("./characters/Archer.png");
ASSET_MANAGER.queueDownload("./characters/Wizard.png");
ASSET_MANAGER.queueDownload("./characters/Rogue.png");
ASSET_MANAGER.queueDownload("./characters/Warrior.png");
ASSET_MANAGER.queueDownload("./characters/Soldier.png");
ASSET_MANAGER.queueDownload("./characters/Vagrant.png");
ASSET_MANAGER.queueDownload("./characters/FatCat.png");
ASSET_MANAGER.queueDownload("./characters/granny.png");
ASSET_MANAGER.queueDownload("./characters/fatcatBig.png");
ASSET_MANAGER.queueDownload("./Enviroment/PinkCity.gif");
ASSET_MANAGER.queueDownload("./Projectiles/fireball.png");
ASSET_MANAGER.queueDownload("./Projectiles/bile.png");
ASSET_MANAGER.queueDownload("./Projectiles/spraybottle.png");
ASSET_MANAGER.queueDownload("./Projectiles/Arrow.png");
ASSET_MANAGER.queueDownload("./Projectiles/rocket.png");
ASSET_MANAGER.queueDownload("./Projectiles/shadeStep.png");
ASSET_MANAGER.queueDownload("./Projectiles/Cash.png");
ASSET_MANAGER.queueDownload("./Projectiles/sideLightning.png");
ASSET_MANAGER.queueDownload("./Projectiles/skyLaser.png");
ASSET_MANAGER.queueDownload("./Projectiles/mortar.png");
ASSET_MANAGER.queueDownload("./Projectiles/bottle.png");
ASSET_MANAGER.queueDownload("./SceneBackgrounds/CatFaceAnimation.png");

ASSET_MANAGER.downloadAll(function () {});

window.onload = function() {
  const canvas = document.getElementById('gameWorld');
  const context = canvas.getContext('2d');

  //start of fullscreen resizing -----------------------------------------------------------------
  function resize() {
  	// Our canvas must cover full height of screen regardless of the resolution
  	var height = window.innerHeight;
  	// So we need to calculate the proper scaled width that should work well with every resolution
  	var ratio = canvas.width/canvas.height;
  	var width = height * ratio;
  	canvas.style.width = width+'px';
  	canvas.style.height = height+'px';
  }
  window.addEventListener('load', resize, false);
  window.addEventListener('resize', resize, false);
  //end of fullscreen resizing -------------------------------------------------------------------

  //start the Game
  //displayFightScene(canvas, context);
  masterTimer.start();
  resize();
  window.focus();


  studioDisplay(canvas, context);
  window.setTimeout(function() {
    displayStartScene(canvas, context);
  }, 1300);
}
