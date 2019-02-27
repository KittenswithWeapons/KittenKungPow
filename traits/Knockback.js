/*
TUNE THE BEES KNEES OFFF THIS THING
*/

class Knockback extends Trait {
	constructor() {
		super('kback');

		this.duration = 0.1;
		this.velocity = 400;
		this.speed = this.velocity * 50;
		this.engageTime = 0;
    this.dir = 0;
		this.dirSave = 0;
	}

	start(velocity, dir) {
    this.dir = dir;
		this.velocity = velocity*2 || 400;
    this.duration = 10/velocity;
		this.engageTime = this.duration;
	}

	cancel() {
		this.engageTime = 0;
	}

	update(entity, deltaTime) {
    if (this.engageTime > 0) {
			if (this.engageTime > this.duration * 0.8) {
				entity.vel.y = -this.speed/2 * deltaTime;
	      entity.vel.x = this.speed * this.dir * deltaTime;
	    	this.engageTime -= deltaTime;
			} else {
				//console.log('still movin ' + this.speed +' '+ this.dir);

				entity.vel.x = this.speed * this.dir * deltaTime;
				this.engageTime -= deltaTime;
			}
			//console.log('velocityX ' + entity.vel.x);
    }

	}
}
