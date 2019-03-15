
function agentManager(entity) {
    // this.level = levelObject;
    this.agent = entity;
    // this.input = setupKeyboard(this.agent);
    this.keyHeld = true;
    this.delay = startFightDelay;
    this.target;
    this.targetDist = Infinity;
    this.myStyle;
    this.choice;
    this.difficulty = this.agent.difficulty;
    this.thinkSuccess = 0;
};

agentManager.prototype.update = function () {
    this.choice = this.agent.choice;

    if (this.choice === 0 || this.choice === 3 || this.choice === 4 || this.choice === 6 || this.choice === 7 || this.choice === 2 || this.choice === 8) {
        this.myStyle = 'melee';
    } else {
        this.myStyle = 'ranged';
    }

    this.selectTarget();

    var thinkChance;
    if (this.difficulty === 1) { // Difficulty 1 thinks to make a new move 50% of the time they're updated
        thinkChance = (Math.floor(Math.random() * 100) + 1);

    } else if (this.difficulty === 2) { // Difficulty 2 thinks to make a new move 75% of the time they're updated
        thinkChance = (Math.floor(Math.random() * 100) + 1) * 2;

    } else if (this.difficulty === 3) { // Difficulty 3 always thinks to make a new move when they're updated
        thinkChance = 100;
    }
    if (this.target.Ename === 'item') thinkChance = 100;
    if (thinkChance > 50) {
        this.thinkSuccess++;
        if(this.target !== undefined) { //jake added this if statement to handle when the agent has no target
            if ((this.agent.pos.y > 700) || (this.agent.pos.x < 80)
                || (this.agent.pos.x > 1120) || (this.agent.pos.y < 100)) {

                this.avoidKillzone();
            } else {
                this.move();
            }
            this.keyHeld = !this.keyHeld;
        }
    }

};

agentManager.prototype.move = function () {
    var targetX = this.target.pos.x;
    var targetY = this.target.pos.y;

    var xDist = targetX - this.agent.pos.x;
    var yDist = targetY - this.agent.pos.y;

    if (this.target.Ename === 'character') { // Target the human player
        if (xDist > 0) { // Face the target to the right
            this.agent.heading = 1;
        } else { // or to the left
            this.agent.heading = -1;
        }

        if (this.myStyle === 'melee') { // Melee fighting style

            if (this.targetDist > 50) { // move to target
                if (xDist > 0) {
                    this.right();

                }
                if (xDist < 0) {
                    this.left();

                }
                if (yDist < 0) {
                    this.jump();
                }
                if (yDist > 0){
                    this.down();
                }
                random = Math.floor(Math.random() * 2);
                if (random === 0) this.attack(false);
            } else {
                if (yDist > 0) {
                    this.jump();
                }
                if (yDist < 0){
                    this.down();
                }
                this.attack(true);
            }

        } else { // Ranged fighting style

            if (this.targetDist < 50) { // move away from target
                if (xDist > 0) {
                    this.left();

                }
                if (xDist < 0) {
                    this.right();

                }
                if (yDist < 0) {
                    this.down();
                }
                if (yDist > 0){
                    this.jump();
                }
                this.attack(true);
            } else {
                if (yDist < -5) {
                    this.jump();
                }
                if (yDist > 5){
                    this.down();
                }
                random = Math.floor(Math.random() * 2);
                if (random ===0) this.attack(false);
            }
        }

    } else { // Target is an item
        if (xDist > 0) {
            this.right();

        }
        if (xDist < 0) {
            this.left();

        }

        if (yDist > 0) {
            this.down();
        }
        if (yDist < 0) {
            this.jump();
        }
    }
};

agentManager.prototype.avoidKillzone = function () {

    if (this.agent.pos.y > 700) {
        this.jump();
    }
    if (this.agent.pos.x < 80) {
        this.right();

    }
    if (this.agent.pos.x > 1120) {
        this.left();

    }
    if (this.agent.pos.y < 100) {
        this.down();
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

    random = Math.floor(Math.random() * 10);
    if (closestItemDist < 500 && random > 3) {
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
            random = Math.floor(Math.random() * 3);
            if (random > 0) this.special();
        }
    } else {
        if (this.myStyle === 'melee') {
            random = Math.floor(Math.random() * 3);
            if (random > 0) this.special();
        } else {
            random = Math.floor(Math.random() * 2);
            if (random === 0) this.light();
            else this.heavy();
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
