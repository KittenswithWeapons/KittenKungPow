var characters = ["./characters/Karate.png", "./characters/Archer.png", "./characters/Wizard.png",
"./characters/Rogue.png", "./characters/Warrior.png", "./characters/Soldier.png", "./characters/Vagrant.png",
"./characters/FatCat.png"];

function createCharacter(name){
        const Character = new Entity(name);
        Character.frameSize = 128;
        Character.size.set(40, 65); //set to actuall pixel size of character, determines collision box. kat is 18,29
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
        Character.damage = 0;
        Character.choice = 0;

        Character.updateAnimation = function() {
            //idle values
            this.startX = 19 * 2;
            this.startY = (24 * 2) - 6;
            this.FrameWidth = Character.frameSize;
            this.FrameHeight = Character.frameSize/2;
            this.FrameSpeed = 0.1;
            this.FrameLength = 4;
            this.FrameLoop = true;
            this.FrameReverse = true;

             if (Character.go.dir > 0 && !Character.Throwing) {
               //runRight
               //console.log('right animate');
               this.startY = (88 * 2) - 6;
               this.FrameLength = 8;
               this.FrameSpeed = 0.07;
               this.FrameReverse = false;
               Character.heading = 1
               Character.flipped = false;
            }
            else if (Character.go.dir < 0 && !Character.Throwing) {
              //runLeft
              //console.log('left animate');
              //this.startX = this.startX + this.FrameWidth;
              this.startY = (88 * 2) - 6;
              //this.FrameWidth = -this.FrameWidth;
              this.FrameLength = 8;
              this.FrameSpeed = 0.07;
              Character.heading = -1
              Character.flipped = true;
            }
            else if (Character.Jumping && !Character.Throwing) {
              this.startY = (2*Character.frameSize + 24 * 2) - 6;
              this.FrameLength = 8;
              this.FrameSpeed = 0.07;
              //console.log('jump ani');
            }
            else if (Character.Punching) { //not working
              this.startY = (9*Character.frameSize + 24 * 2) - 6;
              this.FrameWidth = Character.frameSize;
              this.FrameHeight = Character.frameSize;
              this.FrameLength = 10;
              this.FrameSpeed = 0.05;
              //console.log('punch');
            }
            else if (Character.Throwing) { //not working
              this.startY = (5*Character.frameSize + 24 * 2) - 6;
              this.FrameWidth = Character.frameSize;
              this.FrameHeight = Character.frameSize;
              this.FrameLength = 7;
              this.FrameSpeed = 0.04;
              this.FrameLoop = false;   //input holding needs fixed and then this should be set to false
              this.FrameReverse = false;

            }

            Character.animation = new Animation(ASSET_MANAGER.getAsset(
                characters[Character.choice]),
                this.startX, this.startY, this.FrameWidth, this.FrameHeight ,
                 this.FrameSpeed, this.FrameLength,
                 this.FrameLoop, this.FrameReverse);

            //console.log(Character.pos.x, Character.pos.y);

        }

        Character.draw = function (context) {

            if (Character.heading === -1) {
                //Character.pos.x *= -1;
                context.save();
                context.translate(22 * 2,0);
                context.scale(-1,1);
                Character.animation.drawFrame(deltaTime, context, -this.pos.x, this.pos.y);
                context.restore();

             }
             if (Character.heading === 1) {
                 Character.animation.drawFrame(deltaTime, context, this.pos.x, this.pos.y);
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
