// import {Vec2} from './math.js';
// import {controllerUpdate} from './Controllers.js';

// export class Trait{
	function constructorTrait(name){
		this.NAME = name;
	}
	function update() {
		console.warn('unhandled');
	}
// }
//test comments

// export default class Entity {
    function constructorEntity(name) {
				this.Ename = name;
				this.passDownFlag = false;
				this.jumpCount = 0;
        this.pos = new Vec2(0, 0);
        this.vel = new Vec2(0, 0);
        this.size = new Vec2(0,0);

        this.traits = [];
    }

    function addTrait(trait) {
    	this.traits.push(trait);
    	this[trait.NAME] = trait;
    }
    function update(deltaTime) {
			//console.log(this.Ename);
			if (this.Ename === 'character') {
				controllerUpdate(this, 0); //updating controller for character 1
			}
			else if (this.Ename === 'enemy') {
				controllerUpdate(this, 1); //updating controller for enemy
			}



    	this.traits.forEach(trait => {
    		trait.update(this,deltaTime);
    	});
    }
// }
