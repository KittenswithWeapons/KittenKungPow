import {Trait} from '../Entity.js';

export default class PassDown extends Trait {
	constructor() {
		super('passdown');

		this.duration = 0.04;
		this.velocity = 150;
		this.engageFlag = false;
		this.engageTime = 0;
	}

	start() {
		//console.log('start');
			this.engageFlag = true;
			this.engageTime = this.duration;

	}

	cancel() {
		this.engageFlag = false;
	}

	update(entity, deltaTime) {
						//console.log(entity.passDownFlag);
            if (this.engageTime > 0 && entity.passDownFlag) {
							//console.log('going down');
							//console.log(entity.vel.y);
            	entity.vel.y = +this.velocity;
            	this.engageTime -= deltaTime
            } else {
							this.engageFlag = false;
						}
	}
}

//tuning to be done
