import SpriteSheet from './SpriteSheet.js';
import {loadImage} from './loaders.js';

export function loadCharacterSprite() {
    return loadImage('/characters/karate.png')
    .then(image => {
        const sprites = new SpriteSheet(image, 16, 16);
        sprites.define('character', 21, 25, 40, 54);
        sprites.define('characterleft', 21, 25, 40, 54);
        sprites.define('enemy', 21, 25, 40, 54);
        return sprites;
    });
}

export function loadBackgroundSprites() {
    return loadImage('/Enviroment/tiles.png')
    .then(image => {
        const sprites = new SpriteSheet(image, 32, 32);
        sprites.defineTile('ground', 3, 4);
        sprites.defineTile('platform', 3, 4);
        sprites.defineTile('sky', 2, 3);
        sprites.defineTile('levelobject', 1, 1);
        return sprites;
    });
}
