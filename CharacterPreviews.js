function createCharacterPreview(name, choice) {
    const Character = new Entity(name);
    Character.frameSize = 256;
    Character.choice = choice || 0;

    Character.updateAnimation = function () {
        Character.animation = new Animation(ASSET_MANAGER.getAsset(
            "./characters/idleBig.png"), 0, Character.choice * Character.frameSize, 
            Character.frameSize, Character.frameSize, 0.1, 4, true, false);
    }

    Character.draw = function (context) {
      Character.animation.drawFrame(deltaTime, context, this.pos.x-60, this.pos.y-50);
    }
    Character.updateAnimation();
    return Character;
}
