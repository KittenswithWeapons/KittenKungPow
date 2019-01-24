// import Entity from './Entity.js';
// import {loadCharacterSprite} from './sprites.js';
// import Velocity from './traits/Velocity.js';
// import Jump from './traits/Jump.js';
// import Go from './traits/Go.js';
// import PassDown from './traits/PassDown.js';

// export 
function createCharacter() {
    return loadCharacterSprite()
    .then(sprite => {
        const Character = new Entity('character');
        Character.size.set(18, 29); //set to actuall pixel size of character, determines collision box. kat is 18,29

        Character.addTrait(new Velocity());
        Character.addTrait(new Jump());
        Character.addTrait(new Go());
        Character.addTrait(new PassDown());

        Character.draw = function drawCharacter(context) {
            sprite.draw('character', context, this.pos.x, this.pos.y);
        }


        return Character;
    });
}

// export 
function createEnemy() {
    return loadCharacterSprite()
    .then(sprite => {
        const Enemy = new Entity('enemy');
        Enemy.size.set(18, 29); //set to actuall pixel size of character, determines collision box. kat is 18,29

        Enemy.addTrait(new Velocity());
        Enemy.addTrait(new Jump());
        Enemy.addTrait(new Go());
        Enemy.addTrait(new PassDown());

        Enemy.draw = function drawCharacter(context) {
            sprite.draw('enemy', context, this.pos.x, this.pos.y);
        }


        return Enemy;
      });

}
