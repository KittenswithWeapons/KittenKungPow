const CHARACTER_MANAGER = new AssetManager();
//que all the asset files needed
CHARACTER_MANAGER.queueDownload("./characters/Karate.png");
//Loads all assets and begins the game
CHARACTER_MANAGER.downloadAll(function() {});

function createCharacter(){
        const Character = new Entity('character');
        Character.size.set(18, 29); //set to actuall pixel size of character, determines collision box. kat is 18,29
        Character.deltaTime = 0;
        Character.addTrait(new Velocity());
        Character.addTrait(new Jump());
        Character.addTrait(new Go());
        Character.addTrait(new PassDown());
        Character.addTrait(new Punch());
        Character.heading = 1;

        Character.Jumping = false;
        Character.Punching = false;


        Character.flipped = false;

        Character.updateAnimation = function() {
            //idle values
            this.startX = 21;
            this.startY = 24;
            this.FrameWidth = 64;
            this.FrameHeight = 32;
            this.FrameSpeed = 0.2;
            this.FrameLength = 4;
            this.FrameLoop = true;
            this.FrameReverse = true;



             if (Character.go.dir > 0) {
               //runRight
              //console.log('right animate');
               this.startY = 88;
               this.FrameLength = 8;
               this.FrameSpeed = 0.06;
               this.FrameReverse = false;
               Character.heading = 1
            }
            if (Character.go.dir < 0) {
              //runLeft
              //console.log('left animate');
              this.startY = 88;
              this.FrameLength = 8;
              this.FrameSpeed = 0.06;
              Character.heading = -1

            }
            if(Character.go.dir === 0) {
              //idle
              this.startX = 21;
              this.startY = 24;
              this.FrameWidth = 64;
              this.FrameHeight = 32;
              this.FrameSpeed = 0.2;
              this.FrameLength = 4;
              this.FrameLoop = true;
              this.FrameReverse = true;
              //console.log('idle');
            }

            if (Character.Jumping) {
              this.startY = 155;
              this.FrameLength = 8;
              this.FrameSpeed = 0.07;
              console.log('jump ani');
            }

            if (Character.Punching) {
              this.StartY = 155; //490
              this.FrameLength = 6;
              this.FrameLength = 0.5;
            }


            Character.animation = new Animation(CHARACTER_MANAGER.getAsset(
                "./characters/Karate.png"),
                this.startX, this.startY, this.FrameWidth, this.FrameHeight ,
                 this.FrameSpeed, this.FrameLength,
                 this.FrameLoop, this.FrameReverse);

            //console.log(this.startY);
        }

        Character.draw = function (context) {
            // console.log(Character.flipped);
            //  if (Character.heading === -1) {
            //    if (!Character.flipped) {
            //      context.scale(-1,1);
            //      Character.flipped = true;
            //    }
            //  }
            //  if (Character.flipped && Character.heading === 1) {
            //      context.scale(-1,1);
            //      Character.flipped = false;
            //      console.log('flip back');
            //    }
            Character.animation.drawFrame(this.deltaTime, context, this.pos.x, this.pos.y);

        }


        Character.updateAnimation();
        return Character;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
//////////////////////////////////////////////////////////////////////
