import SpriteSheet from './SpriteSheet.js';
import {loadImage} from './loaders.js';

export function loadCharacterSprite() {
    return loadImage('/characters/karate.png')
    .then(image => {
        const sprites = new SpriteSheet(image, 16, 16);
        sprites.define('character', 21, 25, 40, 54);
        sprites.define('enemy', 21, 25, 40, 54);
        return sprites;
    });
}

export function loadBackgroundSprites() {
    return loadImage('/Enviroment/PinkPlatform.png')
    .then(image => {
        const sprites = new SpriteSheet(image, 32, 32);
        sprites.defineTile('ground', 1, 0);
        sprites.defineTile('platform', 1, 0);
        //sprites.defineTile('sky', 2, 3);
        sprites.defineTile('levelobject', 1, 1);
        return sprites;
    });
}

// export function loadBackgroundSprites() {
//     const sprites = null;
//     loadImage('/Enviroment/PinkPlatform.png')
//     .then(image => {
//         sprites = new SpriteSheet(image, 32, 32);
//         sprites.defineTile('ground', 1, 0);
//         sprites.defineTile('platform', 1, 0);
//     });
//     loadImage('/Enviroment/Beer.png')
//     .then(image => {
//         sprites.defineTile('beer', 0, 0);
//     });
//     loadImage('/Enviroment/woodenBarrel.png')
//     .then(image => {
//         sprites.defineTile('barrel', 0, 0);
//     });
//
//     return sprites;
// }
