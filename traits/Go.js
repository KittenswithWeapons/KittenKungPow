import {Trait} from '../Entity.js';

//left and right movement trait
export default class Go extends Trait {
    constructor() {
        super('go');

        this.dir = 0;
        this.speed = 6000;
    }

    update(entity, deltaTime) {
      
      //moves the character sprite
        entity.vel.x = this.speed * this.dir * deltaTime;
    }
}
