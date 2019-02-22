
function agentManager(entity) {
    // this.level = levelObject;
    this.agent = entity;
    this.input = setupKeyboard(entity);
    this.keyHeld = true;
    this.delay = 1;
    this.target;
    this.targetDist = Infinity;
};

agentManager.prototype.update = function () {

    this.selectTarget();
    console.log(this.agent.Ename + "s target is " + this.target.Ename);
    console.log(this.target.Ename + " is " + this.targetDist + " units away");
    this.move();
    this.attack();
    this.keyHeld = !this.keyHeld;
};

agentManager.prototype.move = function () {
    var myX = this.agent.pos.x;
    var myY = this.agent.pos.y;

    var targetX = this.target.pos.x;
    var targetY = this.target.pos.y;

    var xDist = targetX - myX;
    var yDist = targetY - myY;

    var choice = this.agent.choice;
    var myStyle;
    if (choice === 0 || choice === 3 || choice === 4 || choice === 6 || choice === 7) {
        myStyle = 'melee';
    } else {
        myStyle = 'ranged';
    }


    // Check if close to killzone
    if (myX < 80) {
        this.right();
    } 
    if (myX > 1120) {
        this.left();
    }
    if (myY > 700) {
        this.jump();
        this.jump();
    }
    if (myY < 100) {
        this.down();
    }

    if (this.target.Ename === 'character') { // Target the human player
        
        if (myStyle === 'melee') { // Up close fighting style
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
                this.attack();
            } else {
                this.attack();
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
                this.attack();
            } else {
                this.attack();
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

agentManager.prototype.attack = function () {
    var random = Math.floor(Math.random() * 3);
    if (random === 0) { // Light
        this.light();
    } else if (random === 1) { // Heavy 
        this.heavy();
    } else { // Special
        this.special();
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
