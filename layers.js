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

function drawSceneBackgroundImage(scene, context) {
    var img = new Image();
    img.onload = function () {
    context.drawImage(img, 0, 0);
    }
    img.src = `./SceneBackgrounds/${scene}.jpg`;
}

function createSpriteLayer(entities) {
    return function drawSpriteLayer(context) {
        entities.forEach(entity => {
            entity.draw(context);
        });
    };
}

function createSceneBackgroundLayer(scene) {
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
    var img = new Image();
    img.onload = function () {
    context.drawImage(img, 100, 100); //position the level preview image
    }
    img.src = "./LevelPreviews/PinkCityPreview.PNG";

    var img1 = new Image();
    img1.onload = function () {
    context.drawImage(img1, 450, 100); //position the level preview image
    }
    img1.src = "./LevelPreviews/FutureTownPreview.JPG";

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
           context.stroke(); //uncomment to draw boxes for entities
        });

        resolvedTiles.length = 0;
    };
}
