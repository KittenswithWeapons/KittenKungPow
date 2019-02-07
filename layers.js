// export
function createBackgroundLayer(level, sprites) {
    const buffer = document.createElement('canvas');
    buffer.width = 1280;
    buffer.height = 720;

    const context = buffer.getContext('2d');


    level.tiles.forEach((tile, x, y) => {
        sprites.drawTile(tile.name, context, x, y);
    });


    return function drawBackgroundLayer(context) {
        drawBackgroundImage(level.levelName, context);
        context.drawImage(buffer, 0, 0);
    };
}

function drawBackgroundImage(name, context) {
    var img = new Image();
    img.onload = function () {
    context.drawImage(img, 0, 0);
    }
    //img.src = '/Enviroment/' + name + '.gif';
    //console.log(img.src);
    img.src = 'https://raw.githubusercontent.com/KittenswithWeapons/KittenKungPow/master/Enviroment/PinkCity.gif';
}

// export
function createSpriteLayer(entities) {
    return function drawSpriteLayer(context) {
        entities.forEach(entity => {
            entity.draw(context);
        });
    };
}

// export
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
