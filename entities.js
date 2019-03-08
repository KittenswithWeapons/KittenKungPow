var characters = ["./characters/Karate.png", "./characters/Archer.png", "./characters/Wizard.png",
    "./characters/Rogue.png", "./characters/Warrior.png", "./characters/Soldier.png", "./characters/Vagrant.png",
    "./characters/FatCat.png", "./characters/FatCat.png"]; //replace last char with old lady final boss

var playerNum = 1;
function createCharacter(name, choice) {
    const Character = new Entity(name);
    Character.context = null;
    Character.type = 'player'
    Character.frameSize = 128;
    Character.size.set(28, 58); //set to actuall pixel size of character, determines collision box.
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
    Character.laserHeight = 0;
    Character.headingLock = false;

    Character.damage = 0;
    Character.damageModifier = 2; //multiplies the damage........jake turned up the damage, was 1

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
            case 'noKnockback':
            Character.knockback('knockUp', 2);
                // if(!Character.pain) {
                //     Character.pain = true;
                //     Character.updateAnimation();
                //     window.setTimeout (function() {
                //         Character.pain = false;
                //         Character.updateAnimation();},20);
                // }
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
        var dir = 1.0;
        if (direction == 'painRight') {
          dir = -1;
        }

        knockbackDistance = distance * .6 || Character.damage; // jake turned up the knockback *
        if(!Character.pain) {
            Character.pain = true;
            if(direction != 'knockUp') {
                Character.go.enable = false;
                Character.kback.start(knockbackDistance, dir);
                Character.updateAnimation();

                window.setTimeout (function() {
                    Character.pain = false;
                    Character.updateAnimation();
                    Character.go.enable = true;
                }, knockbackDistance * 2 * 0.85);
            } else {
                Character.updateAnimation();
                Character.jump.start(knockbackDistance);
                window.setTimeout (function() {Character.pain = false;},knockbackDistance);
            }
        }
        //Character.kback.start(knockbackDistance, dir);
    }

    Character.updateAnimation = function () {
        if (!isPaused) {
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
            this.startY = (2 * Character.frameSize + 20);
            this.FrameLength = 1;
            this.FrameSpeed = 1;
        }
        else if (Character.go.dir > 0 ){//&& !Character.Special && !Character.Heavy) { //go right
            if(!Character.headingLock) {
                if(!Character.pain) {
                    this.startY = 170; //88*2-6
                    this.FrameLength = 8;
                    this.FrameSpeed = 0.07;
                    Character.heading = 1;
                } else {Character.heading = -1;}
            }
        }
        else if (Character.go.dir < 0 ){//} && !Character.Special && !Character.Heavy) { //go left
            if(!Character.headingLock) {
                if(!Character.pain) {
                    this.startY = 170; //88*2-6
                    this.FrameLength = 8;
                    this.FrameSpeed = 0.07;
                    Character.heading = -1
                } else {Character.heading = 1;}
            }
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
            characters[2]), (7 * Character.frameSize + 36), (2 * Character.frameSize + 48) - 4,
            Character.frameSize, Character.frameSize-20, 0.3, 1, false, false),
        new Animation(ASSET_MANAGER.getAsset( //Rogue
            characters[3]), 36, (6 * Character.frameSize + 48) - 4,
            Character.frameSize, Character.frameSize, 0.02, 8, false, false),
        new Animation(ASSET_MANAGER.getAsset( //Warrior
            characters[4]), 36, (3 * Character.frameSize + 48) - 6 ,
            Character.frameSize, Character.frameSize-20, 0.05, 6, false, false),
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
        function() {ThrowProjectile("punch", Character, Character.damageModifier);}, //Karate
        function() {ThrowProjectile("arrow", Character, Character.damageModifier);}, //Archer
        function() {ThrowProjectile("zap", Character, Character.damageModifier);}, //Wizard
        function() {ThrowProjectile("dagger", Character, Character.damageModifier);}, //Rogue
        function() {window.setTimeout(function() {ThrowProjectile("slash", Character, Character.damageModifier);}, 50);}, //Warrior
        function() {ThrowProjectile("punch", Character, Character.damageModifier);}, //Soldier
        function() {ThrowProjectile("punch", Character, Character.damageModifier);}, //Vagrant
        function() {ThrowProjectile("cash", Character, Character.damageModifier);} //Fatcat
    ]

    Character.heavyAnimations = [
        new Animation(ASSET_MANAGER.getAsset( //Karate
            characters[0]), 36, (11 * Character.frameSize + 48) - 4,
            Character.frameSize, Character.frameSize, 0.09, 6, false, true),
        new Animation(ASSET_MANAGER.getAsset( //Archer
            characters[1]), 36, (6 * Character.frameSize + 48) - 4,
            Character.frameSize, Character.frameSize, 0.08, 8, false, false),
        new Animation(ASSET_MANAGER.getAsset( //Wizard
            characters[2]), 36, (3 * Character.frameSize + 48) - 4,
            Character.frameSize, Character.frameSize, 0.8, 1, false, false),
        new Animation(ASSET_MANAGER.getAsset( //Rogue
            characters[3]), 36, (15 * Character.frameSize + 48) - 4,
            Character.frameSize, Character.frameSize, 0.06, 10, false, false),
        new Animation(ASSET_MANAGER.getAsset( //Warrior
            characters[4]), 0, (6 * Character.frameSize + 48) - 4,
            Character.frameSize, Character.frameSize - 20, 0.1, 12, false, false),
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
        function() {window.setTimeout(function() {ThrowProjectile("kick", Character, Character.damageModifier);}, 200)}, //Karate
        function() {window.setTimeout(function() {ThrowProjectile("trippleArrow", Character, Character.damageModifier);}, 200)}, //Archer
        function() {
            for(var i = 0; i < 25; i++) {
                window.setTimeout(function() {
                    ThrowProjectile("laser", Character, Character.damageModifier);
                }, i * 25);
            }
        }, //Wizard
        function() {window.setTimeout(function() {ThrowProjectile("uppercut", Character, Character.damageModifier);}, 300)}, //Rogue
        function() {
            Character.headingLock = true;
            for(var i = 0; i < 30; i++) {
                window.setTimeout(function() {
                    ThrowProjectile("spin", Character, Character.damageModifier);
                    Character.heading *= -1;
                    ThrowProjectile("spin", Character, Character.damageModifier);
                    Character.heading *= -1;
                }, i * 30);
            }
            window.setTimeout(function() {Character.headingLock = false}, 1200);
        }, //Warrior
        function() {ThrowProjectile("kick", Character, Character.damageModifier);}, //Soldier
        function() {ThrowProjectile("kick", Character, Character.damageModifier);}, //Vagrant
        function() { window.setTimeout(function() {ThrowProjectile("kick", Character, Character.damageModifier);}, 200)} //Fatcat
    ]

    Character.specialAnimations = [
        new Animation(ASSET_MANAGER.getAsset( //Karate
            characters[0]), 36, (5 * Character.frameSize + 24 * 2) - 6,
            Character.frameSize, Character.frameSize, 0.05, 7, false, false),
        new Animation(ASSET_MANAGER.getAsset( //Archer
            characters[1]), 36, (13 * Character.frameSize + 48) - 4,
            Character.frameSize - 2, Character.frameSize, 0.08, 8, false, false),
        new Animation(ASSET_MANAGER.getAsset( //Wizard
            characters[2]), 36, (1 * Character.frameSize + 48) - 4,
            Character.frameSize, Character.frameSize-20, 0.07, 8, false, false),
        new Animation(ASSET_MANAGER.getAsset( //Rogue
            characters[3]), 36, 48 - 4,
            Character.frameSize, Character.frameSize, 0.1, 4, false, false),
        new Animation(ASSET_MANAGER.getAsset( //Warrior
            characters[4]), 36, (4 * Character.frameSize + 48) - 4,
            Character.frameSize, Character.frameSize, 1, 1, false, false),
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
        function() {window.setTimeout(function() {ThrowProjectile("fireball", Character, Character.damageModifier);}, 350)}, //Karate
        function() {window.setTimeout(function() { //Archer
                        ThrowProjectile("forcePush", Character, Character.damageModifier);
                        Character.heading *= -1;
                        ThrowProjectile("forcePush", Character, Character.damageModifier);
                        Character.heading *= -1;
                    }, 280); },
        function() { //Wizard
                    Character.heading *= -1;
                    ThrowProjectile("clone", Character, Character.damageModifier);
                    Character.heading *= -1;
                    },
        function() {ThrowProjectile("shadeStep", Character, Character.damageModifier);}, //Rogue
        function() {
            for(var i = 0; i < 30; i++) {
                window.setTimeout(function() {
                    ThrowProjectile("shield", Character, Character.damageModifier);
                }, i * 30);
            }
        }, //Warrior
        function() {ThrowProjectile("fireball", Character, Character.damageModifier);}, //Soldier
        function() {ThrowProjectile("fireball", Character, Character.damageModifier);}, //Vagrant
        function() {
            Character.go.dir = 0;
            removeMovement();
            window.setTimeout(function() {
                Character.go.dir = Character.heading;
                ThrowProjectile("slam", Character, Character.damageModifier);
            }, 200);
            window.setTimeout(function() {
                restoreMovement(Character);
            }, 400);
            window.setTimeout(function() {
                Character.go.dir = 0;
            }, 400);
        } //Fatcat
    ]

    Character.staticAnimation = new Animation(ASSET_MANAGER.getAsset(
        characters[Character.choice]), 0, 0, 128, 256, 1, 1, true, false);

    Character.painAnimation = new Animation(ASSET_MANAGER.getAsset("./effects/Damage.png"),
        0, 0, 18, 12, 1, 1, true, false);

    Character.zapAnimation = new Animation(ASSET_MANAGER.getAsset("./Projectiles/sideLightning.png"),
        0, 0, 170, 50, 0.08, 2, true, false);
    Character.skyLaserAnimation = new Animation(ASSET_MANAGER.getAsset("./Projectiles/skyLaser.png"),
        0, 0, 128, 800, 0.08, 2, true, false);
    Character.impactAnimation = new Animation(ASSET_MANAGER.getAsset("./effects/impact.png"),
        0, 0, 256, 80, 0.06, 2, true, false);

    Character.dustAnimation = new Animation(ASSET_MANAGER.getAsset("./effects/Dust.png"),
        0, 0, 16, 16, 0.05, 1, false, false);


    //                                                                                         //
    //                                                                                         //
    /////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////

    Character.draw = function (context) {
      
        
        if(Character.context == null) {
            Character.context = context;
        }
        context.save();
        
        if(Character.heading === -1) {
            context.translate(40, -5);
        } else {
            context.translate(-10, -5);
        }
        context.scale(Character.heading, 1);
        if (!isPaused) {
        if(!Character.Light && !Character.Heavy && !Character.Special) {
            Character.animation.drawFrame(deltaTime, context, Character.heading * this.pos.x, this.pos.y);
        } else if (Character.Light) {
            if(Character.choice == 2) { Character.zapAnimation.drawFrame(deltaTime, context, Character.heading * this.pos.x+18, Character.pos.y+12);}
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
            if(Character.choice == 2) {
                if(Character.laserHeight < this.pos.y) {
                    Character.skyLaserAnimation.setFrameHeight(800 - (720 - Character.laserHeight) + 10);
                    Character.laserHeight += 40;
                } else {
                    Character.impactAnimation.drawFrame(deltaTime, context, Character.heading * this.pos.x + 50, Character.laserHeight-20);
                }
                Character.skyLaserAnimation.drawFrame(deltaTime, context, Character.heading * this.pos.x + 114, 0);
            }

            if (Character.choice == 4) {
                Character.heavyAnimation.drawFrame(deltaTime, context, Character.heading * this.pos.x-36, this.pos.y+2);
            } else {
                Character.heavyAnimation.drawFrame(deltaTime, context, Character.heading * this.pos.x, this.pos.y+2);
            }
            if(!Character.heavyAttackFinished) {
                Character.heavyAttacks[Character.choice]();
                Character.heavyAttackFinished = true;
            }
            if(Character.heavyAnimation.isDone()) {
                Character.animation.drawFrame(deltaTime, context, Character.heading * this.pos.x, this.pos.y);
                Character.Heavy = false;
                Character.laserHeight = 0;
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

        if(Character.Walking && Character.grounded && !Character.headingLock) {
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
    
        
    } else {
        if(!Character.Light && !Character.Heavy && !Character.Special) {
            Character.animation.drawFrame(0, context, Character.heading * this.pos.x, this.pos.y);
        } else if (Character.Light) {
            if(Character.choice == 2) { Character.zapAnimation.drawFrame(0, context, Character.heading * this.pos.x+18, Character.pos.y+12);}
            Character.lightAnimation.drawFrame(0, context, Character.heading * this.pos.x, this.pos.y+2);
            if(!Character.lightAttackFinished) {
                Character.lightAttacks[Character.choice]();
                Character.lightAttackFinished = true;
            }
            if(Character.lightAnimation.isDone()) {
                Character.animation.drawFrame(0, context, Character.heading * this.pos.x, this.pos.y);
                Character.Light = false;
                Character.lightAttackFinished = false;
                Character.lightAnimation.elapsedTime = 0;
            }
        } else if (Character.Heavy) {
            if(Character.choice == 2) {
                if(Character.laserHeight < this.pos.y) {
                    Character.skyLaserAnimation.setFrameHeight(800 - (720 - Character.laserHeight) + 10);
                    Character.laserHeight += 40;
                } else {
                    Character.impactAnimation.drawFrame(0, context, Character.heading * this.pos.x + 50, Character.laserHeight-20);
                }
                Character.skyLaserAnimation.drawFrame(0, context, Character.heading * this.pos.x + 114, 0);
            }
            Character.heavyAnimation.drawFrame(0, context, Character.heading * this.pos.x, this.pos.y+2);
            if(!Character.heavyAttackFinished) {
                Character.heavyAttacks[Character.choice]();
                Character.heavyAttackFinished = true;
            }
            if(Character.heavyAnimation.isDone()) {
                Character.animation.drawFrame(0, context, Character.heading * this.pos.x, this.pos.y);
                Character.Heavy = false;
                Character.laserHeight = 0;
                Character.heavyAttackFinished = false;
                Character.heavyAnimation.elapsedTime = 0;
            }
        } else if (Character.Special) {
            Character.specialAnimation.drawFrame(0, context, Character.heading * this.pos.x, this.pos.y+2);
            if(!Character.specialAttackFinished) {
                Character.specialAttacks[Character.choice]();
                Character.specialAttackFinished = true;
            }
            if(Character.specialAnimation.isDone()) {
                Character.animation.drawFrame(0, context, Character.heading * this.pos.x, this.pos.y);
                Character.Special = false;
                Character.specialAttackFinished = false;
                Character.specialAnimation.elapsedTime = 0;
            }
        }

        if(Character.Walking && Character.grounded) {
            if(!Character.dustFinished) {
                Character.dustAnimation.drawFrame(0, context, Character.heading * this.pos.x-7, this.pos.y+46);
            }
            if(Character.dustAnimation.isDone()) {
                Character.dustAnimation.elapsedTime = 0;
                Character.dustFinished = true;
            }
        }
        if(Character.pain) {
            Character.painAnimation.drawFrame(0, context, Character.heading * this.pos.x+18, this.pos.y+22);
        }
    }
    context.restore();
        drawInfo(context);
    }

    function drawInfo(context) {
        if (Character.lives > 0) {
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
            if (Character.lives <= 3) {
                for(var i = 0; i < Character.lives; i++ ) {
                    context.save();
                    Character.staticAnimation.drawFrame(0, context,
                        120 + (i * 18) + 320 * (Character.player - 1),
                        660, 0.5);
                    context.restore();
                }
            } else {
                context.save();
                Character.staticAnimation.drawFrame(0, context,
                        120 + 320 * (Character.player - 1),
                        660, 0.5);
                context.restore();

                context.globalAlpha = 1.0;
                context.lineWidth = 2.4;
                context.strokeStyle = 'black';
                context.font = "28px Arial Narrow";
                context.strokeText("X", 162 + 320 * (Character.player - 1),709);
                context.strokeText(Character.lives, 180 + 320 * (Character.player - 1),709);
            }

            context.globalAlpha = 1.0;
            context.lineWidth = 1;
            context.strokeStyle = 'black';
            context.font = "10px Arial";
            context.strokeText("player " + Character.player, 99 + 320 * (Character.player - 1), 689);
            context.lineWidth = 2;
            context.font = "20px Arial";
            context.strokeText(Math.floor(Character.damage), 100 + 320 * (Character.player - 1), 710);
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

Animation.prototype.setFrameHeight = function(frameHeight) {
    this.frameHeight = frameHeight;
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

Animation.prototype.drawStatic = function (ctx, x, y) {
    ctx.drawImage(this.spriteSheet, x, y);
}

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
