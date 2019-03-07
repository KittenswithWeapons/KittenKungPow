
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
				this.difficulty = 1; // CPU difficulty setting is 1-3. 1 being easiest and 3 being the hardest
				this.input = new setupKeyboard(this);
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
			if (this.type === 'projectile' || this.type === 'Item') {
				levelObject.removeEntity(this);
			} else {
				//character death handling / respawn
				//console.log( this.Ename + ' death at: ' + this.pos.x + ' , ' + this.pos.y);
				this.lives--; //decrement lives
				if (this.lives > 0) {
					this.damage = 0; //damage reset after death
					this.vel.set(0,0); //sets Velocity to 0
					this.go.dir = 0; //terminates accelleration from before death
					this.Walking = false;
					var offset = Math.floor(Math.random() * 4) * 40;
					if (Math.floor(Math.random() * 2) > 0) offset = offset * -1;

					this.pos.set(640 + offset, 80); //spawn in this location
				} else {
					levelObject.removeEntity(this);
					playerNum--;
					//console.log(levelObject.getLastCharacter());
					//console.log(' player num '+playerNum);
					if (playerNum == 2 || !levelObject.isPlayerStillAlive()) {
						var pNum = levelObject.getLastCharacter().player;
						//console.log('End Round');
						window.setTimeout(function() {
							if (singlePlayerFlag) {					//singleplayer level change handling
								SPlevelchoice++; //next level
								SPenemy++; //next enemy

								//LOSS
								if (pNum != 1) {
									console.log('YOU LOSE!');
									location.reload(); //restarts the game
								}
								//

								//WIN - next level
								//var playerChar = levelObject.getLastCharacter().choice; // returns the player selected character to be playable in the next round
								levelMusic.stop(); //stops music on the level
								playerNum--; //needed to reset player count
								dialogNum++; //next dialog
								if (dialogNum > 8) {
									//SinglePlayer completed
									//maybe a win screen here...................................................

									//..........................................................................
									location.reload();
								}
								dialogScene(myCanvas, myContext, dialogNum); //next level START
								//WIN end

							} else {
								if(pNum != 1) {
									var r = confirm("CPUs WIN");
									location.reload();
								} else {
									var r = confirm("Player " + pNum + " Wins!");
									location.reload();
								}
							}
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
