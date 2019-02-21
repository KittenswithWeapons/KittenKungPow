
function agentManager(entity) {
    // this.level = levelObject;
    this.agent = entity;
    this.input = setupKeyboard(entity);
    this.keyHeld = true;
    this.delay = 200;
    this.target;
    this.targetDist = Infinity;
};

agentManager.prototype.update = function () {
    
    this.selectTarget();
    console.log(this.agent.Ename + "s target is " + this.target.Ename);
    console.log(this.target.Ename + " is " + this.targetDist + " units away");
    this.selectMove();
    this.selectAttack();
    this.keyHeld = !this.keyHeld;
};

agentManager.prototype.selectMove = function () {

    if (this.agent.pos.x < 80) {
        this.right();
    } else if (this.agent.pos.x > 1120) {
        this.left();
    } 
    if (this.agent.pos.y > 700) {
        this.jump();
        this.jump();
    } else if (this.agent.pos.y < 100) {
        this.down();
    }

    if (this.targetDist > 100) {
        if (this.target.pos.y < this.agent.pos.y) {
            this.jump();
            if (this.target.pos.x < this.agent.pos.x) {
                this.left();
            } else {
                this.right();
            }
        } else {
            if (this.target.pos.y > this.agent.pos.y + 100) this.down();
            if (this.target.pos.x < this.agent.pos.x) {
                this.left();
            } else {
                this.right();
            }
        }
    } else {
        console.log(this.agent.Ename + " Says " + this.target.Ename + " is too close!");
        console.log(this.target.Ename + " is " + this.targetDist + " units away!");
        this.jump();
        if (this.target.pos.x < this.agent.pos.x) {
            this.right();
        } else {
            this.left();
        }
    }

};

agentManager.prototype.selectTarget = function () {
    var closestDist = Infinity;
    var closestEnemy;
    levelObject.entities.forEach(Entity => {
        if (Entity != this.agent) {
            // var dist = Math.hypot(Entity.pos.x-this.agent.pos.x, Entity.pos.y-this.agent.pos.x);
            var dist = Math.sqrt( Math.pow((this.agent.pos.x-Entity.pos.x), 2) 
                                    + Math.pow((this.agent.pos.y-Entity.pos.y), 2));
            if (dist < closestDist) {
                closestDist = dist;
                closestEnemy = Entity;
            }
        }
    });
    this.target = closestEnemy;
    this.targetDist = closestDist;
};

agentManager.prototype.selectAttack = function () {
    
};

agentManager.prototype.jump = function () {
    this.agent.Jumping = true;
    this.agent.grounded = false;
    this.agent.jump.start();
    this.agent.updateAnimation();
}

agentManager.prototype.punch = function () {
    this.agent.punch.start();
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
