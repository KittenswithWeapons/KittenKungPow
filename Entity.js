
class Trait{
	constructor(name){
		this.NAME = name;
	}
	update() {
		console.warn('unhandled');
	}
}
//test comments

class Entity {
    constructor(name) {
				this.Ename = name;
				this.type;
				this.grounded = true;
				this.passDownFlag = false;
				this.jumpCount = 0;
        this.pos = new Vec2(0, 0);
        this.vel = new Vec2(0, 0);
        this.size = new Vec2(0,0);

        this.traits = [];
		}

		handle(item) {}

    addTrait(trait) {
    	this.traits.push(trait);
    	this[trait.NAME] = trait;
    }

    update(deltaTime) {
		if (this.inKillzone()) {
			if (this.type === 'projectile') {
				levelObject.removeEntity(this);
			} else {
				//character death handling / respawn
				this.damage = 0; //damage reset after death
				this.vel.set(0,0); //sets Velocity to 0
				this.go.dir = 0; //terminates accelleration from before death

				this.pos.set(document.getElementById('gameWorld').clientWidth / 2, 80); //spawn in this location
				this.Walking = false;
				this.updateAnimation();
				// this.lives--; //decrement lives
			}
		} else {
			//console.log(this.Ename);
			if (this.Ename === 'character') {
				controllerUpdate(this, 0); //updating controller for character 1
			}
			else if (this.Ename === 'enemy') {
				controllerUpdate(this, 1); //updating controller for enemy
			}

    		this.traits.forEach(trait => {
				//console.log(trait);
    			trait.update(this, deltaTime);
			});
		}
	}

	inKillzone() {
		if (this.pos.x < -killzone || this.pos.x > document.getElementById('gameWorld').clientWidth + killzone
			|| this.pos.y < -killzone || this.pos.y > document.getElementById('gameWorld').clientHeight + killzone) {
			return true;
		}
		return false;
	}
}
