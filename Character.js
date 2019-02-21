class Character extends Entity{
    constructor(name, playerNum) {
        super(name);
        this.frameSize = 128;
        this.size.set(28, 58);
        this.origin = 'self';
        this.addTrait(new Velocity());
        this.addTrait(new Jump());
        this.addTrait(new Go());
        this.addTrait(new PassDown());
        this.heading = 1;
        this.lightAnimation;
        this.heavyAnimation;
        this.specialAnimation;
        this.staticAnimation = new Animation(ASSET_MANAGER.getAsset(
            "./characters/" + this.name + ".png"), 0, 0, 128, 256, 1, 1, true, false);
        this.painAnimation = new Animation(ASSET_MANAGER.getAsset("./effects/Damage.png"), 
            0, 0, 18, 12, 1, 1, true, false);
        this.Jumping = false;
        this.Walking = false;
        this.Light = false;
        this.Heavy = false;
        this.Special = false;
        this.pain = false;
        this.damage = 0;
        this.lives = 3;
        this.player = playerNum;
    }

    handle(intent) {
        switch(intent) {
            case 'land':
                if(this.Jumping) {
                    this.Jumping = false;
                    this.updateAnimation();
                }
                break;
            case 'painLeft':
                this.knockback(intent);
                break;
            case 'painRight':
                this.knockback(intent);
                break;
        }
    }

    knockback(direction, distance) {
        knockbackDistance = distance || this.damage; 
        if(!this.pain) {
            this.pain = true;
            this.jump.start(knockbackDistance * 0.9);

            var dir = 1.0;
            if(direction == 'painRight') dir = -1;

            this.go.dir += dir * (knockbackDistance / 250);
            this.updateAnimation();
            
            window.setTimeout (function() { 
                this.pain = false;
                if(!this.Walking) {
                    this.go.dir = 0;
                } else {
                    this.go.dir -= dir * (knockbackDistance / 250);
                }
                this.updateAnimation(); 
            }, knockbackDistance * 2 * 0.85);
        }
    }

    updateAnimation() {
        //idle values
        this.startX = 36;
        this.startY = 42;
        this.FrameWidth = this.frameSize;
        this.FrameHeight = this.frameSize /2 + 20;
        this.FrameSpeed = 0.1;
        this.FrameLength = 4;
        this.FrameLoop = true;
        this.FrameReverse = false;

        if (this.Jumping  && !this.Special && !this.grounded) { //grounded is set on checkY in TileCollider
            this.startX = (3 * this.frameSize + 36);
            this.startY = (2 * this.frameSize + 48) - 2;
            this.FrameLength = 1;
            this.FrameSpeed = 1;
        }
        else if (this.go.dir > 0 && !this.Special) { //go right
            if(!this.pain) {
                this.startY = 172; //88*2-6
                this.FrameLength = 8;
                this.FrameSpeed = 0.07;
                this.heading = 1;
            } else {this.heading = -1;}
        }
        else if (this.go.dir < 0 && !this.Special) { //go left
            if(!this.pain) {
                this.startY = 172; //88*2-6
                this.FrameLength = 8;
                this.FrameSpeed = 0.07;
                this.heading = -1
            } else {Character.heading = 1;}
        }
        if (this.pain) {
            this.FrameSpeed = 1;
            this.FrameLoop = true;
            this.FrameLength = 1;
        }

        this.animation = new Animation(ASSET_MANAGER.getAsset(
            "./characters/" + this.name + ".png"),
            this.startX, this.startY, this.FrameWidth, this.FrameHeight,
            this.FrameSpeed, this.FrameLength,
            this.FrameLoop, this.FrameReverse);
    }

    lightAttack() {}
    heavyAttack() {}
    specialAttack() {}

    draw(context) {
        context.save();
        if(this.heading === -1) {
            context.translate(40, -5);
        } else {
            context.translate(-10, -5);
        }
        context.scale(this.heading, 1);

        if(!this.Light && !this.Heavy && !this.Special) { 
            this.animation.drawFrame(deltaTime, context, this.heading * this.pos.x, this.pos.y);
        } else if (this.Light) { 
            this.lightAnimation.drawFrame(deltaTime, context, this.heading * this.pos.x, this.pos.y+2);
            if(this.lightAnimation.isDone()) {
                this.animation.drawFrame(deltaTime, context, this.heading * this.pos.x, this.pos.y);
                lightAttack();
                this.Light = false;
                this.lightAnimation.elapsedTime = 0;
            }
        } else if (Character.Heavy) {
            Character.heavyAnimation.drawFrame(deltaTime, context, Character.heading * this.pos.x, this.pos.y+2);
            if(Character.heavyAnimation.isDone()) {
                Character.animation.drawFrame(deltaTime, context, Character.heading * this.pos.x, this.pos.y);
                heavyAttack();
                Character.Heavy = false;
                Character.heavyAnimation.elapsedTime = 0;
            }
        } else if (Character.Special) {
            Character.specialAnimation.drawFrame(deltaTime, context, Character.heading * this.pos.x, this.pos.y+2);
            if(Character.specialAnimation.isDone()) {
                Character.animation.drawFrame(deltaTime, context, Character.heading * this.pos.x, this.pos.y);
                specialAttack();
                Character.Special = false;
                Character.specialAnimation.elapsedTime = 0;
            }
        }
        if(Character.pain) {
            Character.painAnimation.drawFrame(deltaTime, context, Character.heading * this.pos.x+18, this.pos.y+22);
        }
        context.restore();

        drawInfo(context);
        
    }

    drawInfo(context) {
        if (Character.lives >= 0) {
            context
            context.globalAlpha = 0.8;
            context.lineWidth = 5;
            if (Character.player === 1) {
                context.strokeStyle = "#FF0000";
                context.fillStyle = "#FF6a9e";
            } else if (Character.player === 2) {
                context.strokeStyle = "#008000";
                context.fillStyle = "#65ff96";
            } else if (Character.player === 3) {
                context.strokeStyle = "#0000FF";
                context.fillStyle = "#009FFF";
            } else if (Character.player === 4) {
                context.strokeStyle = "#FFb400";
                context.fillStyle = "#FFFF00";
            }
            context.fillRect(95 + 320 * (Character.player - 1), 678, 105, 40);
            context.strokeRect(95 + 320 * (Character.player - 1), 678, 105, 40);
            
            for(var i = 0; i < Character.lives; i++ ) {
                context.save();
                context
                Character.staticAnimation.drawFrame(0, context, 
                    120 + (i * 18) + 320 * (Character.player - 1), 
                    660, 0.5);
                context.restore();
            }
            context.globalAlpha = 1.0;
            context.lineWidth = 1;
            context.strokeStyle = 'black';
            context.font = "10px Arial";
            context.strokeText("player " + Character.player, 99 + 320 * (Character.player - 1), 689);
            context.lineWidth = 2;
            context.font = "20px Arial";
            context.strokeText(Character.damage, 100 + 320 * (Character.player - 1), 710);
        }
    }
}