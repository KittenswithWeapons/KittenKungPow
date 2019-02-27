/*
TUNE THE BEES KNEES OFFF THIS THING
*/

class Knockback extends Trait {
	constructor() {
		super('kback');

		this.duration = 0.4;
		this.velocity = 0;
		this.speed = 0;
		this.engageTime = 0;
    this.dir = 0;
		this.dirSave = 0;
	}

	start(velocity, dir) {
    this.dir = dir;
		this.velocity = velocity;
		this.speed = this.velocity * 5;
		this.engageTime = this.duration;
	}

	cancel() {
		this.engageTime = 0;
	}

	update(entity, deltaTime) {
    if (this.engageTime > 0) {
			if (this.engageTime > this.duration * .95) {
				entity.vel.y = -this.speed*1.5;
	      entity.vel.x = this.speed * this.dir ;
	    	this.engageTime -= deltaTime;
			} else {
				entity.vel.x = this.speed * this.dir;
				this.engageTime -= deltaTime;
			}
			//console.log('velocityX ' + entity.vel.x);
    }

	}
}
