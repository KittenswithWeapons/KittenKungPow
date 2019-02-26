// import {Trait} from '../Entity.js';
const maxVel = 1000;
class Velocity extends Trait {

	constructor() {
		super('velocity');
	}
	update(entity, deltaTime) {
		if (entity.vel.x > maxVel) entity.vel.x = maxVel;
		if (entity.vel.y > maxVel) entity.vel.y = maxVel;
		if (entity.vel.x < -maxVel) entity.vel.x = -maxVel;
		if (entity.vel.y < -maxVel) entity.vel.y = -maxVel;
            entity.pos.x += entity.vel.x * deltaTime;
            entity.pos.y += entity.vel.y * deltaTime;
	}
}
