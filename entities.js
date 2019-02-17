var characters = ["./characters/Karate.png", "./characters/Archer.png", "./characters/Wizard.png",
    "./characters/Rogue.png", "./characters/Warrior.png", "./characters/Soldier.png", "./characters/Vagrant.png",
    "./characters/FatCat.png"];

function createCharacter(name) {
    const Character = new Entity(name);
    Character.frameSize = 128;
    Character.size.set(28, 58); //set to actuall pixel size of character, determines collision box. kat is 18,29
    Character.origin = 'self';
    Character.addTrait(new Velocity());
    Character.addTrait(new Jump());
    Character.addTrait(new Go());
    Character.addTrait(new PassDown());
    Character.addTrait(new Punch());
    Character.heading = 1;
    Character.flipped = false;
    Character.Jumping = false;
    Character.Punching = false;
    Character.Throwing = false;
    Character.pain = false;
    Character.damage = 0;
    Character.choice = 0;

    /*
    * Entity has an empty method called handle that can be overridden by child types.
    * Usage: Tile Collider knows what an entity is but not what a character is. It 
    * can call entity.handle but not Character.updateAnimation. Any entity can override
    * handle for any purpose.
    * @author Logan
    */
    Character.handle = function (item) {
        switch(item) {
            case 'land':
                if(Character.Jumping) {
                    Character.Jumping = false;
                    Character.updateAnimation();
                }
                break;
            case 'pain':
                Character.pain = true;
                Character.updateAnimation();
                window.setTimeout (function() { 
                    Character.pain = false; 
                    Character.updateAnimation(); 
                }, 120);
                break;
        }
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

        if (Character.Jumping  && !Character.Throwing && !Character.grounded) { //grounded is set on checkY in TileCollider
            this.startX = (3 * Character.frameSize + 36);
            this.startY = (2 * Character.frameSize + 48) - 2;
            this.FrameLength = 1;
            this.FrameSpeed = 1;
        }
        else if (Character.go.dir > 0 && !Character.Throwing) { //go right
            this.startY = 172; //88*2-6
            this.FrameLength = 8;
            this.FrameSpeed = 0.07;
            Character.heading = 1
            Character.flipped = false;
        }
        else if (Character.go.dir < 0 && !Character.Throwing) { //go left
            this.startY = 172; //88*2-6
            this.FrameLength = 8;
            this.FrameSpeed = 0.07;
            Character.heading = -1
            Character.flipped = true;
        }
        else if (Character.Throwing) { //not working
            this.startY = (5 * Character.frameSize + 24 * 2) - 6;
            this.FrameWidth = Character.frameSize;
            this.FrameHeight = Character.frameSize;
            this.FrameLength = 8;
            this.FrameSpeed = 0.04;
            this.FrameLoop = false;   //input holding needs fixed and then this should be set to false
            this.FrameReverse = false;
        }
        else if (Character.pain) {
            this.FrameSpeed = 1;
            this.FrameLoop = true;
            this.FrameLength = 1;
        }

        Character.punchAnimation = new Animation(ASSET_MANAGER.getAsset(
            characters[Character.choice]), 36, (9 * Character.frameSize + 48) - 4, 
            Character.frameSize, Character.frameSize, 0.05, 9, false, true);

        Character.animation = new Animation(ASSET_MANAGER.getAsset(
            characters[Character.choice]),
            this.startX, this.startY, this.FrameWidth, this.FrameHeight,
            this.FrameSpeed, this.FrameLength,
            this.FrameLoop, this.FrameReverse);
        
        Character.freezeAnimation = new Animation(ASSET_MANAGER.getAsset(
            characters[Character.choice]),
            this.startX, this.startY, this.FrameWidth, this.FrameHeight,
            1, 1,
            this.FrameLoop, this.FrameReverse);
        
        Character.painAnimation = new Animation(ASSET_MANAGER.getAsset("./effects/Damage.png"), 
        0, 0, 18, 12, 1, 1, true, false);

        //console.log(Character.pos.x, Character.pos.y);

    }

    Character.draw = function (context) {

        if (Character.heading === -1) {
            //Character.pos.x *= -1;
            context.save();
            context.translate(40, -5);
            context.scale(-1, 1);
            if(Character.Punching) { 
                Character.punchAnimation.drawFrame(deltaTime, context, -this.pos.x, this.pos.y);
                if(Character.punchAnimation.isDone()) {
                    Character.Punching = false;
                }
            } else { 
                Character.animation.drawFrame(deltaTime, context, -this.pos.x, this.pos.y); 
            }
            context.restore();

        }
        if (Character.heading === 1) {
            context.save();
            context.translate(-10, -5);
            if(Character.Punching) { 
                Character.punchAnimation.drawFrame(deltaTime, context, this.pos.x, this.pos.y);
                if(Character.punchAnimation.isDone()) {
                    Character.Punching = false;
                }
            } else {
                Character.animation.drawFrame(deltaTime, context, this.pos.x, this.pos.y);
            }
            context.restore();
        }
        if (Character.pain == true) {
            Character.painAnimation.drawFrame(deltaTime, context, this.pos.x+4, this.pos.y+18);
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
