
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
				this.passDownFlag = false;
				this.jumpCount = 0;
        this.pos = new Vec2(0, 0);
        this.vel = new Vec2(0, 0);
        this.size = new Vec2(0,0);

        this.traits = [];
    }

    addTrait(trait) {
    	this.traits.push(trait);
    	this[trait.NAME] = trait;
    }

    update(deltaTime) {

		if (this.inKillzone()) {
			if (this.type === 'projectile') {
				levelObject.removeEntity(this);
			} else {
				this.vel.set(0, 0);
				this.pos.set(document.getElementById('gameWorld').clientWidth / 2, 80);
				// this.lives--;
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
