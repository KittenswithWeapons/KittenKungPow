// import {Trait} from '../Entity.js';

//left and right movement trait
class Go extends Trait {
    constructor() {
        super('go');

        this.dir = 0;
        this.speed = 12000;
        this.enable = true
    }

    update(entity, deltaTime) {
      //moves the character sprite
        if (this.enable) {
          entity.vel.x = this.speed * this.dir * deltaTime;
        }
    }
}
