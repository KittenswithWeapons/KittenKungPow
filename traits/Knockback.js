/*
TUNE THE BEES KNEES OFFF THIS THING
*/

class Knockback extends Trait {
	constructor() {
		super('kback');

		this.duration = 0.1;
		this.velocity = 400;
		this.engageTime = 0;
    this.dir = 0;
	}

	start(velocity, dir) {
    this.dir = dir;
		this.velocity = velocity || 400;
    this.duration = 10/velocity;
		this.engageTime = this.duration;
	}

	cancel() {
		this.engageTime = 0;
	}

	update(entity, deltaTime) {
    if (this.engageTime > 0) {
      entity.vel.x = this.dir * this.velocity * 2;
  		entity.vel.y = -this.velocity;
    	this.engageTime -= deltaTime;
    }
	}
}
