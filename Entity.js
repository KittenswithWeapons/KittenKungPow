
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
				this.isAgent = false;
				this.agentManager = null;
				if (name.startsWith("CPU-")) {
					this.isAgent = true;
					this.agentManager = new agentManager(this);
				}
		}

		handle(intent) {}

    addTrait(trait) {
    	this.traits.push(trait);
    	this[trait.NAME] = trait;
    }

    update(deltaTime) {
			if (CPUsEnabled) {
				if (this.isAgent) this.agentManager.delay--;
				if (this.isAgent && this.agentManager.delay === 0) {
				this.agentManager.delay = 20;
				this.agentManager.update();
				//console.log(this.Ename);
			}
		}

		if (this.inKillzone()) {
			if (this.type === 'projectile') {
				levelObject.removeEntity(this);
			} else {
				//character death handling / respawn

				this.lives--; //decrement lives
				if (this.lives > 0) {
					this.damage = 0; //damage reset after death
					this.vel.set(0,0); //sets Velocity to 0
					this.go.dir = 0; //terminates accelleration from before death
					this.Walking = false;
					var offset = Math.floor(Math.random() * 4) * 40;
					if (Math.floor(Math.random() * 2) > 0) offset = offset * -1;
					//console.log("Offset = " + offset);

					this.pos.set(640 + offset, 80); //spawn in this location
				} else {
					levelObject.removeEntity(this);
					playerNum--;
					if (playerNum == 2) {
						var pNum = levelObject.getLastCharacter().player;
						window.setTimeout(function() {
							var r = confirm("Player " + pNum + " Wins!");
							location.reload();
						}, 1000);

					}
				}
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
		if (this.pos.x < -killzone || this.pos.x > 1280 + killzone
			|| this.pos.y < -killzone || this.pos.y > 720 + killzone) {
			return true;
		}
		return false;
	}
}
