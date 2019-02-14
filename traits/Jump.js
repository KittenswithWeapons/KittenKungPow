// import {Trait} from '../Entity.js';

class Jump extends Trait {
	constructor() {
		super('jump');

		this.duration = 0.1;
		this.velocity = 400;
		this.engageTime = 0;
		this.jumpnumber = 0
	}

	start() {
			this.jumpNumber++;
			this.engageTime = this.duration;
	}

	cancel() {
		this.engageTime = 0;
	}
	update(entity, deltaTime) {
            if (this.engageTime > 0 && this.jumpNumber <= 3) {
							entity.vel.y = -this.velocity;
            	this.engageTime -= deltaTime;
            }
	}
}
