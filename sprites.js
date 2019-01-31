// function loadCharacterSprite() {
//     return loadImage('https://raw.githubusercontent.com/KittenswithWeapons/KittenKungPow/master/characters/Karate.png')
//     .then(image => {
//         const sprites = new SpriteSheet(image, 16, 16);
//         sprites.define('character', 21, 25, 40, 54);
//         return sprites;
//     });
// }

function loadBackgroundSprites(name) {
    return loadImage(`./Enviroment/${name}tiles.png`)
    .then(image => {
        const sprites = new SpriteSheet(image, 32, 32);
        sprites.defineTile('ground', 1, 0);
        sprites.defineTile('platform', 1, 0);
        sprites.defineTile('levelobject', 1, 1);
        return sprites;
    });
}
