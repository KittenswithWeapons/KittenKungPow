function createBackgroundLayer(level, sprites) {
    const buffer = document.createElement('canvas');
    buffer.width = 1280;
    buffer.height = 720;

    const context = buffer.getContext('2d');


    level.tiles.forEach((tile, x, y) => {
        if (tile.name === 'ground' || tile.name === 'platform')
        sprites.drawTile(tile.name, context, x, y);
    });


    return function drawBackgroundLayer(context) {
        drawBackgroundImage(level.levelName, context);
        context.drawImage(buffer, 0, 0);
    };
}

function createObjectLayer(level, sprites) {
    //debugger;
    const oBuffer = document.createElement('canvas');
    oBuffer.width = 1280;
    oBuffer.height = 720;

    const context = oBuffer.getContext('2d');

    level.tiles.forEach((tile, x, y) => {
        if (tile.name !== 'ground' && tile.name !== 'platform') {
          sprites.drawTile(tile.name, context, x, y);
        }
    });

    return function drawObjectLayer(context) {
        context.drawImage(oBuffer, 0, 0);
    };
}

function drawBackgroundImage(name, context) {
    var img = new Image();
    img.onload = function () {
    context.drawImage(img, 0, 0);
    }
    img.src = `./Enviroment/${name}.gif`;
}



function createSpriteLayer(entities) {
    return function drawSpriteLayer(context) {
        entities.forEach(entity => {
            entity.draw(context);
        });
    };
}

function createSceneBackgroundLayer(scene) {
    //console.log(scene);
    const buffer = document.createElement('canvas');
    buffer.width = 1280;
    buffer.height = 720;

    const context = buffer.getContext('2d');

    //console.log('done');
    return function drawSceneBackgroundLayer(context) {
        drawSceneBackgroundImage(scene.SceneName, context);   ///set up for jpg backgrounds only
        context.drawImage(buffer, 0, 0);
    };
}

function drawSceneBackgroundImage(scene, context) {
    //console.log("draw");
    var img = new Image();
    img.onload = function () {
    context.drawImage(img, 0, 0);
    }
    img.src = `./SceneBackgrounds/${scene}.jpg`;
}


// -----------------------------------------------level preview images layer
function createLevelPreviewLayer(scene) {
    const buffer = document.createElement('canvas');
    buffer.width = 1280;
    buffer.height = 720;

    const context = buffer.getContext('2d');

    //console.log('done');
    return function drawLevelPreviewLayer(context) {
        drawLevelPreviewImages(context);   ///set up for jpg backgrounds only
        context.drawImage(buffer, 0, 0);
    };
}

function drawLevelPreviewImages(context) {
    //draw controls
    var controls = new Image();
    controls.onload = function () {
    context.drawImage(controls, 0, 670); //position the level preview image
    }
    controls.src = "./SceneBackgrounds/levelControls.png";
    //end controls

    //row 1------------------------------------------------------------------------------------------
    var img = new Image();
    img.onload = function () {
    context.drawImage(img, 83, 144); //position the level preview image
    }
    img.src = "./LevelPreviews/PinkCityPreview.PNG";

    var img1 = new Image();
    img1.onload = function () {
    context.drawImage(img1, 83 + 256 + 30, 144); //position the level preview image
    }
    img1.src = "./LevelPreviews/FutureTownPreview.JPG";

    var img2 = new Image();
    img2.onload = function () {
    context.drawImage(img2, 83 + 512 + 60, 144); //position the level preview image
    }
    img2.src = "./LevelPreviews/FutureCityPreview.JPG";

    var img3 = new Image();
    img3.onload = function () {
    context.drawImage(img3, 83 + 768 + 90, 144); //position the level preview image
    }
    img3.src = "./LevelPreviews/WaterfallPreview.PNG";

    //row2 ------------------------------------------------------------------------------------------
    var img4 = new Image();
    img4.onload = function () {
    context.drawImage(img4, 83, 144 + 288); //position the level preview image
    }
    img4.src = "./LevelPreviews/LightMeowsPreview.PNG";

    var img5 = new Image();
    img5.onload = function () {
    context.drawImage(img5, 83 + 256 + 30, 144 + 288); //position the level preview image
    }
    img5.src = "./LevelPreviews/BlueNightPreview.PNG";

    var img6 = new Image();
    img6.onload = function () {
    context.drawImage(img6, 83 + 512 + 60, 144 + 288); //position the level preview image
    }
    img6.src = "./LevelPreviews/OceanPreview.PNG";

    var img7 = new Image();
    img7.onload = function () {
    context.drawImage(img7, 83 + 768 + 90, 144 + 288); //position the level preview image
    }
    img7.src = "./LevelPreviews/DojoPreview.PNG";


    //add more images for previews
}
// ----------------------------------------------Level preview images layer done



// -----------------------------------------------Character preview images layer
function createCharPreviewLayer(scene) {
    const buffer = document.createElement('canvas');
    buffer.width = 1280;
    buffer.height = 720;

    const context = buffer.getContext('2d');

    //console.log('done');
    return function drawCharPreviewLayer(context) {
        drawCharPreviewImages(context);   ///set up for jpg backgrounds only
        context.drawImage(buffer, 0, 0);
    };
}

function drawCharPreviewImages(context) {
    previews = new Array('KarateCatPreview');
    previews.forEach(cat => {
      var img = new Image();
      img.onload = function () {
      context.drawImage(img, 300, 300); //position the Character preview image
      }
      img.src = `./CharacterPreviews/${cat}.png`;
    });

    //add more images for previews
}
// ----------------------------------------------Character preview images layer done



function createModesLayer(scene) {
    const buffer = document.createElement('canvas');
    buffer.width = 1280;
    buffer.height = 720;

    const context = buffer.getContext('2d');

    //console.log('done');
    return function drawModes(context) {
        drawModesLayer(context);
        context.drawImage(buffer, 0, 0);
    };
}

function drawModesLayer(context) {

  //draw controls
  var controls = new Image();
  controls.onload = function () {
  context.drawImage(controls, 0, 670); //position the level preview image
  }
  controls.src = "./SceneBackgrounds/charControls.png";
  //end controls

  //draw extended controls
  var arrows = new Image();
  arrows.onload = function () {
  context.drawImage(arrows, 1130, 680); //position the level preview image
  }
  arrows.src = "./Options/arrows.png";
  //end extended controls

  //draw lives
  var lifecount = new Image();
  lifecount.onload = function () {
  context.drawImage(lifecount, 990, 690); //position the level preview image
  }
  lifecount.src = `./Options/lives${LIVES}.png`;
  // lifecount.src = './Options/lives1.png';
  //end lives

  // Mode switch images-------------------------------------------------------
  var storyModeIMG = new Image();
  storyModeIMG.onload = function () {
  context.drawImage(storyModeIMG, 690, 685); //position
  }
  storyModeIMG.src = "./Options/StoryModeOff.png";

  var freePlayIMG = new Image();
  freePlayIMG.onload = function () {
  context.drawImage(freePlayIMG, 390, 685); //position
  }
  freePlayIMG.src = "./Options/FreePlayOn.png";

  if (singlePlayerFlag) {
    storyModeIMG.src = "./Options/StoryModeOn.png";
    freePlayIMG.src = "./Options/FreePlayOff.png";
  } else {
    storyModeIMG.src = "./Options/StoryModeOff.png";
    freePlayIMG.src = "./Options/FreePlayOn.png";
  }
  //--------------------------------------------------------------------------
}



function createDialogBackgroundLayer(scene, dialogNum) {
    //console.log(scene);
    const buffer = document.createElement('canvas');
    buffer.width = 1280;
    buffer.height = 720;

    const context = buffer.getContext('2d');

    //console.log('done');
    return function drawDialogBackgroundLayer(context) {
        drawDialogBackgroundImage(scene.SceneName, context, dialogNum);   ///set up for jpg backgrounds only
        context.drawImage(buffer, 0, 0);
    };
}

function drawDialogBackgroundImage(scene, context, dialogNum) {
    //console.log("draw");
    var img = new Image();
    img.onload = function () {
    context.drawImage(img, 0, 0);
    }
    img.src = `./Dialogs/dialog${dialogNum}.png`;
}

function createDialogLevelLayer(name) {
    const buffer = document.createElement('canvas');
    buffer.width = 1280;
    buffer.height = 720;
    const context = buffer.getContext('2d');
    return function drawDialogLevelLayer(context) {
        drawDialogLevelImage(name, context);
        context.drawImage(buffer, 0, 0);
    };
}
function drawDialogLevelImage(name, context) {
    var img = new Image();
    img.onload = function () {
    context.drawImage(img, 0, 0);
    }
    img.src = `./Enviroment/${name}.gif`;
}






function createCollisionLayer(level) {
    const resolvedTiles = [];

    const tileResolver = level.tileCollider.tiles;
    const tileSize = tileResolver.tileSize;

    const getByIndexOriginal = tileResolver.getByIndex;
    tileResolver.getByIndex = function getByIndexFake(x, y) {
        resolvedTiles.push({x, y});
        return getByIndexOriginal.call(tileResolver, x, y);
    }

    //collision debug; for drawing collision boxes
    return function drawCollision(context) {
        context.strokeStyle = 'orange';
        resolvedTiles.forEach(({x, y}) => {
            context.beginPath();
            context.rect(
                x * tileSize,
                y * tileSize,
                tileSize, tileSize);
            //context.stroke(); //uncomment to draw boxes for tiles
        });

        context.strokeStyle = 'red';
        level.entities.forEach(entity => {
            context.beginPath();
            context.rect(
                entity.pos.x, entity.pos.y,
                entity.size.x, entity.size.y);
            //context.stroke(); ///uncomment to draw boxes for entities
        resolvedTiles.length = 0;
        });
    }
}
