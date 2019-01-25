import Entity from './Entity.js';
import {loadCharacterSprite} from './sprites.js';
import Velocity from './traits/Velocity.js';
import Jump from './traits/Jump.js';
import Go from './traits/Go.js';
import PassDown from './traits/PassDown.js';
import {AssetManager} from './assetmanager.js';

const CHARACTER_MANAGER = new AssetManager();
//que all the asset files needed
CHARACTER_MANAGER.queueDownload("./characters/Karate.png");
//Loads all assets and begins the game
CHARACTER_MANAGER.downloadAll(function() {});

export function createCharacter(){
        const Character = new Entity('character');
        Character.size.set(18, 29); //set to actuall pixel size of character, determines collision box. kat is 18,29
        Character.deltaTime = 0;
        Character.addTrait(new Velocity());
        Character.addTrait(new Jump());
        Character.addTrait(new Go());
        Character.addTrait(new PassDown());

        Character.updateAnimation = function() {
        	Character.animation = new Animation(CHARACTER_MANAGER.getAsset(
              "./characters/Karate.png"),
              21, 24, 18, 29 , 0.2, 4, true, true); //animation frame bug lies here, waiting to be squashed
        }

        Character.draw = function (context) {
            Character.animation.drawFrame(this.deltaTime, context, this.pos.x, this.pos.y);
        }

        Character.updateAnimation();
        return Character;
}

export function createEnemy() {
    return loadCharacterSprite()
    .then(sprite => {
        const Enemy = new Entity('enemy');
        Enemy.size.set(18, 29); //set to actuall pixel size of character, determines collision box. kat is 18,29

        Enemy.addTrait(new Velocity());
        Enemy.addTrait(new Jump());
        Enemy.addTrait(new Go());
        Enemy.addTrait(new PassDown());

        Enemy.draw = function drawCharacter(context) {
            sprite.draw('enemy', context, this.pos.x, this.pos.y);
        }


        return Enemy;
      });

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
