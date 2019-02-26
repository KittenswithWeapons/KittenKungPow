var characters = ["./characters/Karate.png", "./characters/Archer.png", "./characters/Wizard.png",
    "./characters/Rogue.png", "./characters/Warrior.png", "./characters/Soldier.png", "./characters/Vagrant.png",
    "./characters/FatCat.png"];

var playerNum = 1;
function createCharacter(name, choice) {
    const Character = new Entity(name);
    Character.type = 'player'
    Character.frameSize = 128;
    Character.size.set(28, 58); //set to actuall pixel size of character, determines collision box. kat is 18,29
    Character.origin = 'self';
    Character.addTrait(new Velocity());
    Character.addTrait(new Jump());
    Character.addTrait(new Go());
    Character.addTrait(new PassDown());
    Character.addTrait(new Punch());
    Character.addTrait(new Knockback());
    Character.heading = 1;
    Character.Jumping = false;
    Character.dustFinished = false;
    Character.lightAttackFinished = false;
    Character.heavyAttackFinished = false;
    Character.specialAttackFinished = false;
    Character.Walking = false;
    Character.Light = false;
    Character.Heavy = false;
    Character.Special = false;
    Character.pain = false;
    Character.damage = 0;
    Character.lives = 3;
    Character.choice = choice || 0;
    Character.player = playerNum;
    playerNum++;

    /*
    * Entity has an empty method called handle that can be overridden by child types.
    * Usage: Tile Collider knows what an entity is but not what a character is. It
    * can call entity.handle but not Character.updateAnimation. Any entity can override
    * handle for any purpose.
    * @param item is a string indicating intent
    * @author Logan
    */
    Character.handle = function (intent, data) {
        switch(intent) {
            case 'land':
                if(Character.Jumping) {
                    Character.Jumping = false;
                    Character.updateAnimation();
                }
                break;
            case 'painLeft':
                Character.knockback(intent);
                break;
            case 'painRight':
                Character.knockback(intent);
                break;
            case 'pushLeft':
                Character.knockback('painLeft', 300);
                break;
            case 'pushRight':
                Character.knockback('painRight', 300);
                break;
            case 'knockUp':
                Character.knockback(intent, 400);
                break;
            case 'shankLeft':
                Character.knockback('painLeft', 50);
                break;
            case 'shankRight':
                Character.knockback('painRight', 50);
                break;
            case 'shadeLeft':
                Character.pos.x = data.pos.x + 40
                Character.pos.y = data.pos.y - 10;
                Character.heading = -1;
                break;
            case 'shadeRight':
                Character.pos.x = data.pos.x - 40;
                Character.pos.y = data.pos.y - 10;
                Character.heading = 1;
                break;
        }
    }

    /*
    * hurt runs the pain animation and knocks back the character.
    * @param direction is the direction to be knocked back.
    */
    Character.knockback = function(direction, distance) {
        if (Character.go.dir > 0) {
          dirSave = 1;
        } else if (Character.go.dir === 0) {
          dirSave = 0;
        } else {
          dirSave = -1;
        }
        knockbackDistance = distance * 1.3 || Character.damage * 2.5; // jake turned up the knockback *
        if(!Character.pain) {
            Character.pain = true;

            if(direction != 'knockUp') {
                var dir = 1.0;
                if (direction == 'painRight') {
                  dir = -1;
                }
                Character.kback.start(knockbackDistance, dir);
                Character.updateAnimation();

                window.setTimeout (function() {
                    Character.pain = false;
                    Character.updateAnimation();
                }, knockbackDistance * 0.85);
            } else {

                Character.updateAnimation();
                window.setTimeout (function() {Character.pain = false;},knockbackDistance);
            }
        }
        Character.kback.start(knockbackDistance, dir);
    }

    Character.updateAnimation = function () {
        //idle values
        this.startX = 36;
        this.startY = 42;
        this.FrameWidth = Character.frameSize;
        this.FrameHeight = Character.frameSize /2 + 20;
        this.FrameSpeed = 0.1;
        this.FrameLength = 4;
        this.FrameLoop = true;
        this.FrameReverse = false;

        if (Character.Jumping  && !Character.Special && !Character.grounded) { //grounded is set on checkY in TileCollider
            this.startX = (3 * Character.frameSize + 36);
            this.startY = (2 * Character.frameSize + 20) - 2;
            this.FrameLength = 1;
            this.FrameSpeed = 1;
        }
        else if (Character.go.dir > 0 && !Character.Special && !Character.Heavy) { //go right
            if(!Character.pain) {
                this.startY = 172; //88*2-6
                this.FrameLength = 8;
                this.FrameSpeed = 0.07;
                Character.heading = 1;
            } else {Character.heading = -1;}
        }
        else if (Character.go.dir < 0 && !Character.Special && !Character.Heavy) { //go left
            if(!Character.pain) {
                this.startY = 172; //88*2-6
                this.FrameLength = 8;
                this.FrameSpeed = 0.07;
                Character.heading = -1
            } else {Character.heading = 1;}
        }
        if (Character.pain) {
            this.FrameSpeed = 1;
            this.FrameLoop = true;
            this.FrameLength = 1;
        }

        Character.animation = new Animation(ASSET_MANAGER.getAsset(
            characters[Character.choice]),
            this.startX, this.startY, this.FrameWidth, this.FrameHeight,
            this.FrameSpeed, this.FrameLength,
            this.FrameLoop, this.FrameReverse);

        Character.lightAnimation = Character.lightAnimations[Character.choice];
        Character.heavyAnimation = Character.heavyAnimations[Character.choice];
        Character.specialAnimation = Character.specialAnimations[Character.choice];
    }

    /////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////
    //                                                                                         //
    //                               Animations and Attacks                                    //
    //                                                                                         //

    Character.lightAnimations = [
        new Animation(ASSET_MANAGER.getAsset( //Karate
            characters[0]), 36, (9 * Character.frameSize + 48) - 4,
            Character.frameSize, Character.frameSize, 0.04, 9, false, true),
        new Animation(ASSET_MANAGER.getAsset( //Archer
            characters[1]), 36, (6 * Character.frameSize + 48) - 4,
            Character.frameSize, Character.frameSize, 0.04, 8, false, false),
        new Animation(ASSET_MANAGER.getAsset( //Wizard
            characters[2]), 36, (6 * Character.frameSize + 48) - 4,
            Character.frameSize, Character.frameSize, 0.04, 8, false, false),
        new Animation(ASSET_MANAGER.getAsset( //Rogue
            characters[3]), 36, (6 * Character.frameSize + 48) - 4,
            Character.frameSize, Character.frameSize, 0.02, 8, false, false),
        new Animation(ASSET_MANAGER.getAsset( //Warrior
            characters[4]), 36, (6 * Character.frameSize + 48) - 4,
            Character.frameSize, Character.frameSize, 0.04, 8, false, false),
        new Animation(ASSET_MANAGER.getAsset( //Soldier
            characters[5]), 36, (6 * Character.frameSize + 48) - 4,
            Character.frameSize, Character.frameSize, 0.04, 8, false, false),
        new Animation(ASSET_MANAGER.getAsset( //Vagrant
            characters[6]), 36, (6 * Character.frameSize + 48) - 4,
            Character.frameSize, Character.frameSize, 0.04, 8, false, false),
        new Animation(ASSET_MANAGER.getAsset( //FatCat
            characters[7]), 36, (6 * Character.frameSize + 48) - 4,
            Character.frameSize, Character.frameSize, 0.06, 5, false, false)
    ];

    Character.lightAttacks = [
        function() {ThrowProjectile("punch", Character);}, //Karate
        function() {ThrowProjectile("arrow", Character);}, //Archer
        function() {ThrowProjectile("punch", Character);}, //Wizard
        function() {ThrowProjectile("dagger", Character);}, //Rogue
        function() {ThrowProjectile("punch", Character);}, //Warrior
        function() {ThrowProjectile("punch", Character);}, //Soldier
        function() {ThrowProjectile("punch", Character);}, //Vagrant
        function() {ThrowProjectile("cash", Character);} //Fatcat
    ]

    Character.heavyAnimations = [
        new Animation(ASSET_MANAGER.getAsset( //Karate
            characters[0]), 36, (11 * Character.frameSize + 48) - 4,
            Character.frameSize, Character.frameSize, 0.09, 6, false, true),
        new Animation(ASSET_MANAGER.getAsset( //Archer
            characters[1]), 36, (6 * Character.frameSize + 48) - 4,
            Character.frameSize, Character.frameSize, 0.08, 8, false, false),
        new Animation(ASSET_MANAGER.getAsset( //Wizard
            characters[2]), 36, (6 * Character.frameSize + 48) - 4,
            Character.frameSize, Character.frameSize, 0.08, 8, false, false),
        new Animation(ASSET_MANAGER.getAsset( //Rogue
            characters[3]), 36, (15 * Character.frameSize + 48) - 4,
            Character.frameSize, Character.frameSize, 0.06, 10, false, false),
        new Animation(ASSET_MANAGER.getAsset( //Warrior
            characters[4]), 36, (6 * Character.frameSize + 48) - 4,
            Character.frameSize, Character.frameSize, 0.04, 8, false, false),
        new Animation(ASSET_MANAGER.getAsset( //Soldier
            characters[5]), 36, (6 * Character.frameSize + 48) - 4,
            Character.frameSize, Character.frameSize, 0.04, 8, false, false),
        new Animation(ASSET_MANAGER.getAsset( //Vagrant
            characters[6]), 36, (6 * Character.frameSize + 48) - 4,
            Character.frameSize, Character.frameSize, 0.04, 8, false, false),
        new Animation(ASSET_MANAGER.getAsset( //FatCat
            characters[7]), 36, (6 * Character.frameSize + 48) - 4,
            Character.frameSize, Character.frameSize, 0.06, 5, false, false)
    ];

    Character.heavyAttacks = [
        function() {window.setTimeout(function() {ThrowProjectile("kick", Character);}, 200)}, //Karate
        function() {window.setTimeout(function() {ThrowProjectile("trippleArrow", Character);}, 200)}, //Archer
        function() {ThrowProjectile("kick", Character);}, //Wizard
        function() {window.setTimeout(function() {ThrowProjectile("uppercut", Character);}, 200)}, //Rogue
        function() {ThrowProjectile("kick", Character);}, //Warrior
        function() {ThrowProjectile("kick", Character);}, //Soldier
        function() {ThrowProjectile("kick", Character);}, //Vagrant
        function() { window.setTimeout(function() {ThrowProjectile("kick", Character);}, 200)
            // ThrowProjectile("slam", Character);
            // Character.go.dir = 0;
            // setupEmptyKeyboard(Character);
            // window.setTimeout(function() {Character.go.dir = Character.heading * 1;}, 200);
            // window.setTimeout(function() {
            //     Character.go.dir = 0;
            //     setupKeyboard(Character);
            // }, 3000);
        } //Fatcat
    ]

    Character.specialAnimations = [
        new Animation(ASSET_MANAGER.getAsset( //Karate
            characters[0]), 36, (5 * Character.frameSize + 24 * 2) - 6,
            Character.frameSize, Character.frameSize, 0.05, 7, false, false),
        new Animation(ASSET_MANAGER.getAsset( //Archer
            characters[1]), 36, (13 * Character.frameSize + 48) - 4,
            Character.frameSize - 2, Character.frameSize, 0.08, 8, false, false),
        new Animation(ASSET_MANAGER.getAsset( //Wizard
            characters[2]), 36, (6 * Character.frameSize + 48) - 4,
            Character.frameSize, Character.frameSize, 0.08, 8, false, false),
        new Animation(ASSET_MANAGER.getAsset( //Rogue
            characters[3]), 36, 48 - 4,
            Character.frameSize, Character.frameSize, 0.1, 4, false, false),
        new Animation(ASSET_MANAGER.getAsset( //Warrior
            characters[4]), 36, (6 * Character.frameSize + 48) - 4,
            Character.frameSize, Character.frameSize, 0.04, 8, false, false),
        new Animation(ASSET_MANAGER.getAsset( //Soldier
            characters[5]), 36, (6 * Character.frameSize + 48) - 4,
            Character.frameSize, Character.frameSize, 0.04, 8, false, false),
        new Animation(ASSET_MANAGER.getAsset( //Vagrant
            characters[6]), 36, (6 * Character.frameSize + 48) - 4,
            Character.frameSize, Character.frameSize, 0.04, 8, false, false),
        new Animation(ASSET_MANAGER.getAsset( //FatCat
            characters[7]), 36, (5 * Character.frameSize + 48) - 4,
            Character.frameSize, Character.frameSize, 0.05, 10, false, false)
    ];

    Character.specialAttacks = [
        function() {window.setTimeout(function() {ThrowProjectile("fireball", Character);}, 350)}, //Karate
        function() {window.setTimeout(function() { //Archer
                        ThrowProjectile("forcePush", Character);
                        Character.heading *= -1;
                        ThrowProjectile("forcePush", Character);
                        Character.heading *= -1;
                    }, 280); },
        function() {ThrowProjectile("fireball", Character);}, //Wizard
        function() {ThrowProjectile("shadeStep", Character);}, //Rogue
        function() {ThrowProjectile("fireball", Character);}, //Warrior
        function() {ThrowProjectile("fireball", Character);}, //Soldier
        function() {ThrowProjectile("fireball", Character);}, //Vagrant
        function() {
            Character.go.dir = 0;
            setupEmptyKeyboard(Character);
            window.setTimeout(function() {
                Character.go.dir = Character.heading * 1;
                ThrowProjectile("slam", Character);
            }, 200);
            window.setTimeout(function() {
                Character.go.dir = 0;
                setupKeyboard(Character);
            }, 500);
        } //Fatcat
    ]

    Character.staticAnimation = new Animation(ASSET_MANAGER.getAsset(
        characters[Character.choice]), 0, 0, 128, 256, 1, 1, true, false);

    Character.painAnimation = new Animation(ASSET_MANAGER.getAsset("./effects/Damage.png"),
        0, 0, 18, 12, 1, 1, true, false);

    Character.dustAnimation = new Animation(ASSET_MANAGER.getAsset("./effects/Dust.png"),
        0, 0, 16, 16, 0.05, 1, false, false);


    //                                                                                         //
    //                                                                                         //
    /////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////

    Character.draw = function (context) {
        context.save();
        if(Character.heading === -1) {
            context.translate(40, -5);
        } else {
            context.translate(-10, -5);
        }
        context.scale(Character.heading, 1);

        if(!Character.Light && !Character.Heavy && !Character.Special) {
            Character.animation.drawFrame(deltaTime, context, Character.heading * this.pos.x, this.pos.y);
        } else if (Character.Light) {
            Character.lightAnimation.drawFrame(deltaTime, context, Character.heading * this.pos.x, this.pos.y+2);
            if(!Character.lightAttackFinished) {
                Character.lightAttacks[Character.choice]();
                Character.lightAttackFinished = true;
            }
            if(Character.lightAnimation.isDone()) {
                Character.animation.drawFrame(deltaTime, context, Character.heading * this.pos.x, this.pos.y);
                Character.Light = false;
                Character.lightAttackFinished = false;
                Character.lightAnimation.elapsedTime = 0;
            }
        } else if (Character.Heavy) {
            Character.heavyAnimation.drawFrame(deltaTime, context, Character.heading * this.pos.x, this.pos.y+2);
            if(!Character.heavyAttackFinished) {
                Character.heavyAttacks[Character.choice]();
                Character.heavyAttackFinished = true;
            }
            if(Character.heavyAnimation.isDone()) {
                Character.animation.drawFrame(deltaTime, context, Character.heading * this.pos.x, this.pos.y);
                Character.Heavy = false;
                Character.heavyAttackFinished = false;
                Character.heavyAnimation.elapsedTime = 0;
            }
        } else if (Character.Special) {
            Character.specialAnimation.drawFrame(deltaTime, context, Character.heading * this.pos.x, this.pos.y+2);
            if(!Character.specialAttackFinished) {
                Character.specialAttacks[Character.choice]();
                Character.specialAttackFinished = true;
            }
            if(Character.specialAnimation.isDone()) {
                Character.animation.drawFrame(deltaTime, context, Character.heading * this.pos.x, this.pos.y);
                Character.Special = false;
                Character.specialAttackFinished = false;
                Character.specialAnimation.elapsedTime = 0;
            }
        }

        if(Character.Walking && Character.grounded) {
            if(!Character.dustFinished) {
                Character.dustAnimation.drawFrame(deltaTime, context, Character.heading * this.pos.x-7, this.pos.y+46);
            }
            if(Character.dustAnimation.isDone()) {
                Character.dustAnimation.elapsedTime = 0;
                Character.dustFinished = true;
            }
        }
        if(Character.pain) {
            Character.painAnimation.drawFrame(deltaTime, context, Character.heading * this.pos.x+18, this.pos.y+22);
        }
        context.restore();

        drawInfo(context);
        //if(PlayerNum <
    }

    function drawInfo(context) {
        if (Character.lives > 0) {
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

    Character.updateAnimation();
    return Character;
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Animation(spriteSheet, startX, startY, frameWidth, frameHeight, frameDuration, frames, loop, reverse) {
    this.spriteSheet = spriteSheet;
    this.startX = startX;
    this.startY = startY;
    this.frameWidth = frameWidth;
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
    this.frames = frames;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
    this.reverse = reverse;
}

Animation.prototype.drawFrame = function (tick, ctx, x, y, scaleBy) {
    var scaleBy = scaleBy || 1;
    this.elapsedTime += tick;
    if (this.loop) {
        if (this.isDone()) {
            this.elapsedTime = 0;
        }
    } else if (this.isDone()) {
        return;
    }
    var index = this.reverse ? this.frames - this.currentFrame() - 1 : this.currentFrame();
    var vindex = 0;
    if ((index + 1) * this.frameWidth + this.startX > this.spriteSheet.width) {
        index -= Math.floor((this.spriteSheet.width - this.startX) / this.frameWidth);
        vindex++;
    }
    while ((index + 1) * this.frameWidth > this.spriteSheet.width) {
        index -= Math.floor(this.spriteSheet.width / this.frameWidth);
        vindex++;
    }

    var locX = x;
    var locY = y;
    var offset = vindex === 0 ? this.startX : 0;

    ctx.drawImage(this.spriteSheet,
        index * this.frameWidth + offset, vindex * this.frameHeight + this.startY,  // source from sheet
        this.frameWidth, this.frameHeight,
        locX, locY,
        this.frameWidth * scaleBy,
        this.frameHeight * scaleBy);
}

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
