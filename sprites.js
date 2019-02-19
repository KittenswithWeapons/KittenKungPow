function loadBackgroundSprites(name) {
    return loadImage(`./Enviroment/${name}tiles.png`)
    .then(image => {
        const sprites = new SpriteSheet(image, 32, 32);
        sprites.defineTile('ground', 1, 0);
        sprites.defineTile('platform', 1, 0);
        return sprites;
    });
}

function loadObjectSprites() {
    return loadImage(`./effects/Damage.png`)
    .then(image => {
        const sprites = new SpriteSheet(image, 32, 32); // will only display 32x32 sprites. #bug
        sprites.defineTile('levelobject', 0, 0);
        return sprites;
    });
}

function loadObjectSprites() {
    return loadImage(`./Enviroment/beer.png`)
    .then(image => {
        const sprites = new SpriteSheet(image, 32, 32); // will only display 32x32 sprites. #bug
        sprites.defineTile('levelobject', 0, 0);
        return sprites;
    });
}
