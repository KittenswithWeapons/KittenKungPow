/*
TUNE THE BEES KNEES OFFF THIS THING
*/

class Knockback extends Trait {
	constructor() {
		super('kback');

		this.duration = 0.1;
		this.velocityY = 400;
		this.velocityX = this.velocityY * 30;
		this.engageTime = 0;
    this.dir = 0;
	}

	start(velocity, dir) {
    this.dir = dir;
		this.velocityY = velocity;
		this.velocityX = this.velocityY * 30;
		this.engageTime = this.duration;
	}

	cancel() {
		this.engageTime = 0;
	}

	update(entity, deltaTime) {
		if ((this.engageTime) > 0.05) {
			//console.log(this.velocityX);
			entity.vel.x = this.velocityX * 1.5 * this.dir * deltaTime;
			this.engageTime -= deltaTime;
			if (this.velocityX > 1500) {
					entity.vel.x = this.velocityX * 3 * this.dir * deltaTime;
					entity.vel.y = -this.velocityY * 1.5;
	    }
		} else if (this.engageTime > 0) {
			this.velocityX = this.velocityX * 1.5 * this.dir * deltaTime;
		}

	}
}
