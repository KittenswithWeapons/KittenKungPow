/*
TUNE THE BEES KNEES OFFF THIS THING
*/

class Knockback extends Trait {
	constructor() {
		super('kback');

		this.duration = 0.1;
		this.velocityY = 400;
		this.velocityX = 12000
		this.engageTime = 0;
    this.dir = 0;
	}

	start(velocity, dir) {
    this.dir = dir;
		this.velocity = velocity || 400;
		this.engageTime = this.duration;
	}

	cancel() {
		this.engageTime = 0;
	}

	update(entity, deltaTime) {
    if (this.engageTime > 0) {
			if (this.engageTime > this.duration * .95) {

				entity.vel.y = -this.velocityY;

	      entity.vel.x = this.velocityX * this.dir * deltaTime ;

				this.engageTime -= deltaTime;
			} else {

				entity.vel.x = this.velocityX * this.dir * deltaTime;

				this.engageTime -= deltaTime;
			}
			//console.log('velocityX ' + entity.vel.x);
    }

	}
}
