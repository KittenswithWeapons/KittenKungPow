
function agentManager(entity) {
    // this.level = levelObject;
    this.agent = entity;
    this.input = setupKeyboard(entity);
    this.keyHeld = true;
    this.delay = 1;
    this.target;
    this.targetDist = Infinity;
    this.myStyle;
    this.choice;

};

agentManager.prototype.update = function () {
    this.choice = this.agent.choice;
    //console.log("Choice = " + this.choice);

    if (this.choice === 0 || this.choice === 3 || this.choice === 4 || this.choice === 6 || this.choice === 7) {
        this.myStyle = 'melee';
    } else {
        this.myStyle = 'ranged';
    }
    this.selectTarget();
    // console.log(this.agent.Ename + "s target is " + this.target.Ename);
    // console.log(this.target.Ename + " is " + this.targetDist + " units away");
    if(this.target !== undefined) { //jake added this if statement to handle when the agent has no target
      this.move();
      this.attack();
      this.keyHeld = !this.keyHeld;
    }
};

agentManager.prototype.move = function () {
    var myX = this.agent.pos.x;
    var myY = this.agent.pos.y;

    var targetX = this.target.pos.x;
    var targetY = this.target.pos.y;

    var xDist = targetX - myX;
    var yDist = targetY - myY;

    // Check if close to killzone
    if (myX < 80) {
        this.right();
        if (myX < 80) {
            this.right();
        }
    }
    if (myX > 1120) {
        this.left();
        if (myX > 1120) {
            this.left();
        }
    }
    if (myY > 700) {
        this.jump();
        if (myY > 700) {
            this.jump();
        }
    }
    if (myY < 100) {
        this.down();
        if (myY < 100) {
            this.down();
        }
    }

    if (this.target.Ename === 'character') { // Target the human player
        if (xDist > 0) { // Face the target to the right
            this.agent.heading = 1;
        } else { // or to the left
            this.agent.heading = -1;
        }

        if (this.myStyle === 'melee') { // Up close fighting style
            if (this.targetDist > 50) {
                if (xDist > 0) {
                    this.right();
                    if (yDist < 0) {
                        this.jump();
                    } else if (yDist > 0){
                        this.down();
                    }
                } else if (xDist < 0) {
                    this.left();
                    if (yDist < 0) {
                        this.jump();
                    } else if (yDist > 0){
                        this.down();
                    }
                } else {
                    if (yDist < 0) {
                        this.jump();
                    } else if (yDist > 0){
                        this.down();
                    }
                }
                this.attack(true);
            } else {
                this.attack(false);
            }
        } else { // Ranged fighting style
            if (this.targetDist < 50) {
                if (xDist > 0) {
                    this.left();
                    if (yDist < 0) {
                        this.down();
                    } else if (yDist > 0){
                        this.jump();
                    }
                } else if (xDist < 0) {
                    this.right();
                    if (yDist < 0) {
                        this.down();
                    } else if (yDist > 0){
                        this.jump();
                    }
                } else {
                    if (yDist < 0) {
                        this.down();
                    } else if (yDist > 0){
                        this.jump();
                    }
                }
                this.attack(true);
            } else {
                if (yDist < 0) {
                    this.jump();
                } else if (yDist > 0){
                    this.down();
                }
                this.attack(false);
            }
        }

    } else { // Target is an item
        if (xDist > 0) {
            this.right();
        } else if (xDist < 0) {
            this.left();
        }

        if (yDist > 0) {
            this.down();
        } else if (yDist < 0) {
            this.jump();
        }
        this.delay = 20;
    }
};

agentManager.prototype.selectTarget = function () {
    var closestEnemyDist = Infinity;
    var closestEnemy;

    var closestItemDist = Infinity;
    var closestItem;

    levelObject.entities.forEach(Entity => {
        // console.log("Entity type = " + Entity.type);

        if (Entity != this.agent && Entity.Ename === 'character') {
            var dist = Math.sqrt( Math.pow((this.agent.pos.x-Entity.pos.x), 2)
                                    + Math.pow((this.agent.pos.y-Entity.pos.y), 2));
            if (dist < closestEnemyDist) {
                closestEnemyDist = dist;
                closestEnemy = Entity;
            }
        } else if (Entity.type === 'Item') {
            var dist = Math.sqrt( Math.pow((this.agent.pos.x - Entity.pos.x), 2)
                                  + Math.pow((this.agent.pos.y - Entity.pos.y), 2));
            if (dist < closestItemDist) {
                closestItemDist = dist;
                closestItem = Entity;
            }
        }
    });

    if (closestItemDist < 500) {
        this.target = closestItem;
        this.targetDist = closestItemDist;
    } else {
        this.target = closestEnemy;
        this.targetDist = closestEnemyDist;
    }

};

agentManager.prototype.attack = function (isTargetClose) {

    var random;
    if (isTargetClose) {
        if (this.myStyle === 'melee') {
            random = Math.floor(Math.random() * 2);
            if (random === 0) this.light();
            else this.heavy();
        } else {
            this.special();
        }
    } else {
        if (this.myStyle === 'melee') {
            this.special();
        } else {
            random = Math.floor(Math.random() * 2);
            if (random === 0) this.light();
            else this.heavy();
        }
    }
    if (random > 0) {
        random = Math.floor(Math.random() * 3);
        if (random === 0) { // Light
            this.light();
        } else if (random === 1) { // Heavy
            this.heavy();
        } else { // Special
            this.special();
        }
    }


};

agentManager.prototype.jump = function () {
    this.agent.Jumping = true;
    this.agent.grounded = false;
    this.agent.jump.start();
    this.agent.updateAnimation();
}

agentManager.prototype.light = function () {
    // this.agent.punch.start();
    this.agent.Light = true;
    this.agent.updateAnimation();
}

agentManager.prototype.special = function () {
    this.agent.Special = true;
    this.agent.updateAnimation();
}

agentManager.prototype.heavy = function () {
    this.agent.Heavy = true;
    this.agent.updateAnimation();
}

agentManager.prototype.right = function () {
    if (this.keyHeld) {
        this.agent.Walking = true;
        this.agent.go.dir = 1;
        this.agent.updateAnimation();
      } else {
        if(this.agent.dustFinished == true) {
            this.agent.dustFinished = false;
          }
        this.agent.Walking = false;
        this.agent.go.dir = 0;
        this.agent.updateAnimation();
      }
}

agentManager.prototype.left = function () {
    if (this.keyHeld) {
        this.agent.Walking = true;
        this.agent.go.dir = -1;
        this.agent.updateAnimation();
      } else {
        if(this.agent.dustFinished == true) {
            this.agent.dustFinished = false;
          }
        this.agent.Walking = false;
        this.agent.go.dir = 0;
        this.agent.updateAnimation();
      }
}

agentManager.prototype.down = function () {
    if (this.keyPressed) {
        this.agent.passdown.start();
        this.keyPressed = false;
    } else {
        this.agent.passdown.cancel();
        this.keyPressed = true;
    }
}
