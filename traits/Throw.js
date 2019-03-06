class Throw extends Trait {
    constructor() {
        super('throw');

        this.dir = 0;
        this.speed = 15000;  //should be about 10,000ish
    }

    setSpeed(speed) {
        this.speed = speed;
    }

    update(entity, deltaTime) {

      //moves the projectile
        entity.vel.x = this.speed * this.dir * deltaTime;
    }
}
