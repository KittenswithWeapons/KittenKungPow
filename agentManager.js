
function agentManager(entity) {
    // this.level = levelObject;
    this.agent = entity;
    this.input = setupKeyboard(entity);
    this.keyHeld = true;
    this.delay = 100;
    this.target;
    this.targetDist = Infinity;
};

agentManager.prototype.update = function () {
    // console.log(this.targetDist);
    
    this.selectTarget();
    this.selectMove();
    this.selectAttack();
    this.keyHeld = !this.keyHeld;
};

agentManager.prototype.selectMove = function () {
    var move = Math.floor(Math.random() * (4));
    // console.log("MOVE === " + move);
    // switch (move) {
    //     case 0:
    //         this.jump();
    //         break;
    //     case 1:
    //         this.left();
    //         break;
    //     case 2:
    //         this.right();
    //         break;
    //     case 3:
    //         this.down();
    //         break;
    //     default:
    //         break;
    // }
    if (this.agent.pos.x < 20) {
        this.right();
    } else if (this.agent.pos.x > 1180) {
        this.left();
    } 
    if (this.agent.pos.y > 700 ) {
        this.jump();
    }

    if (this.targetDist > 100) {
        if (this.target.pos.y < this.agent.pos.y) {
            console.log(this.targetDist);
            
            this.jump();
            if (this.target.pos.x < this.agent.pos.x) {
                this.left();
            } else {
                this.right();
            }
        } else {
            if (this.target.pos.x < this.agent.pos.x) {
                this.left();
            } else {
                this.right();
            }
        }
    } else {
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
        var dist = Math.hypot(Entity.pos.x-this.agent.pos.x, Entity.pos.y-this.agent.pos.x);
        if (dist < closestDist) {
            closestDist = dist;
            closestEnemy = Entity;
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
        this.agent.go.dir += 1;
        this.agent.updateAnimation();
      } else {
        if(!this.agent.Walking) {
            this.agent.go.dir = 0;
        } else {
            this.agent.Walking = false;
            this.agent.go.dir -= 1;
        }
        this.agent.updateAnimation();
      }
}

agentManager.prototype.left = function () {
    if (this.keyHeld) {
        this.agent.Walking = true;
        this.agent.go.dir -= 1;
        this.agent.updateAnimation();
      } else {
        if(!this.agent.Walking) {
            this.agent.go.dir = 0;
        } else {
            this.agent.Walking = false;
            this.agent.go.dir += 1;
        }
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
