import {Trait} from '../Entity.js';

export default class PassDown extends Trait {
	constructor() {
		super('passdown');

		this.duration = 0.01;
		this.velocity = 500;
		this.engageFlag = false;
		this.engageTime = 0;
	}

	start() {

			this.engageFlag = true;
	}

	update(entity, deltaTime) {
            if (this.engageTime > 0) {
            	entity.vel.y = +this.velocity;
            	this.engageTime -= deltaTime
            }
	}
}

//tuning to be done
