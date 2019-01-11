import Entity from './Entity.js';
import {loadCharacterSprite} from './sprites.js';
import Velocity from './traits/Velocity.js';
import Jump from './traits/Jump.js';
import Go from './traits/Go.js';




export function createCharacter() {
    return loadCharacterSprite()
    .then(sprite => {
        const Character = new Entity();
        Character.size.set(65, 70);
        
        Character.addTrait(new Velocity());
        Character.addTrait(new Jump());
        Character.addTrait(new Go());
        
        Character.draw = function drawCharacter(context) {
            sprite.draw('idle', context, this.pos.x, this.pos.y);
        }


        return Character;
    });
}