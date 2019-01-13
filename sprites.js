import SpriteSheet from './SpriteSheet.js';
import {loadImage} from './loaders.js';

export function loadCharacterSprite() {
    return loadImage('/characters/kitten.png')
    .then(image => {
        const sprites = new SpriteSheet(image, 16, 16);
        sprites.define('idle', 0, 0, 34, 42);
        return sprites;
    });
}

export function loadBackgroundSprites() {
    return loadImage('/Enviroment/tiles.png')
    .then(image => {
        const sprites = new SpriteSheet(image, 32, 32);
        sprites.defineTile('ground', 3, 4);
        sprites.defineTile('sky', 2, 3);
        return sprites;
    });
}
