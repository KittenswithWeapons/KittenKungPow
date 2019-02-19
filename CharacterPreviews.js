var pCharacters = ["./characters/Karate.png", "./characters/Archer.png", "./characters/Wizard.png",
    "./characters/Rogue.png", "./characters/Warrior.png", "./characters/Soldier.png", "./characters/Vagrant.png",
    "./characters/FatCat.png"];

function createCharacterPreview(name, choice) {
    const Character = new Entity(name);
    Character.frameSize = 128;
    Character.size.set(28, 58);
    Character.choice = choice || 0;


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

        Character.animation = new Animation(ASSET_MANAGER.getAsset(
            pCharacters[Character.choice]),
            this.startX, this.startY, this.FrameWidth, this.FrameHeight,
            this.FrameSpeed, this.FrameLength,
            this.FrameLoop, this.FrameReverse);
    }

    Character.draw = function (context) {
      Character.animation.drawFrame(deltaTime, context, this.pos.x, this.pos.y, 2.5);
      }
    Character.updateAnimation();
    return Character;
}
