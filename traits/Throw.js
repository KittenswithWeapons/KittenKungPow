class Throw extends Trait {
    constructor() {
        super('throw');

        this.dir = 0;
        this.speed = 9000;  //should be about 10,000ish
    }

    update(entity, deltaTime) {

      //moves the projectile
        entity.vel.x = this.speed * this.dir * deltaTime;
    }
}
