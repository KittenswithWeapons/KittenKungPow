import {Trait} from '../Entity.js';

//left and right movement trait
export default class Go extends Trait {
    constructor() {
        super('go');

        this.dir = 0;
        this.speed = 6000;
    }

    update(entity, deltaTime) {
      //this doesnt work yet
      // if (this.dir > 0) {
      //   entity.draw = function drawCharacter(context) {
      //       sprite.draw(entity.Ename, context, this.pos.x, this.pos.y);
      //   }
      // } else if (this.dir < 0) {
      //   entity.draw = function drawCharacter(context) {
      //       sprite.draw(entity.Ename + 'left', context, this.pos.x, this.pos.y); //flip for left travel
      // }

      //moves the character sprite
        entity.vel.x = this.speed * this.dir * deltaTime;
    }
}
