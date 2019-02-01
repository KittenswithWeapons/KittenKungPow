class Throw extends Trait {
    constructor() {
        super('go');

        this.dir = 0;
        this.speed = 6000;
    }

    update(entity, deltaTime) {

      //moves the character sprite
        entity.pos.x = this.speed * this.dir * deltaTime;
    }
}
