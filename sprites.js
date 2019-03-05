function loadBackgroundSprites(name) {
    return loadImage('./Enviroment/tiles.png')
    .then(image => {
        if (name === 'FutureTown') {
          const sprites = new SpriteSheet(image, 32, 32);
          sprites.defineTile('ground', 0, 2);
          sprites.defineTile('platform', 8, 0);
          return sprites;
        } else if (name === 'PinkCity') {
          const sprites = new SpriteSheet(image, 32, 32);
          sprites.defineTile('ground', 7, 0);
          sprites.defineTile('platform', 7, 0);
          return sprites;
        } else if (name === 'FutureCity') {
          const sprites = new SpriteSheet(image, 32, 32);
          sprites.defineTile('ground', 2, 0);
          sprites.defineTile('platform', 2, 0);
          return sprites;
        } else if (name === 'Waterfall') {
          const sprites = new SpriteSheet(image, 32, 32);
          sprites.defineTile('ground', 0, 2);
          sprites.defineTile('platform', 0, 0);
          return sprites;
        } else if (name === 'LightMeows') {
          const sprites = new SpriteSheet(image, 32, 32);
          sprites.defineTile('ground', 3, 0);
          sprites.defineTile('platform', 3, 0);
          return sprites;
        } else if (name === 'BlueNight') {
          const sprites = new SpriteSheet(image, 32, 32);
          sprites.defineTile('ground', 5, 0);
          sprites.defineTile('platform', 5, 0);
          return sprites;
        } else if (name === 'Ocean') {
          const sprites = new SpriteSheet(image, 32, 32);
          sprites.defineTile('ground', 0, 2);
          sprites.defineTile('platform', 1, 0);
          return sprites;
        } else if (name === 'Dojo') {
          const sprites = new SpriteSheet(image, 32, 32);
          sprites.defineTile('ground', 4, 0);
          sprites.defineTile('platform', 4, 0);
          return sprites;
        }
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
