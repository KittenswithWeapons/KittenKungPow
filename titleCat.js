function createTitleCat(name) {
    const titleCat = new Entity(name);
    titleCat.frameWidth = 552;
    titleCat.frameHeight = 336;
    titleCat.drawCount = 0;
    titleCat.frameNum = 0;

    titleCat.updateAnimation = function () {
      titleCat.animation = new Animation(ASSET_MANAGER.getAsset(
            "./SceneBackgrounds/CatFaceAnimation.png"), titleCat.frameWidth * titleCat.frameNum, 0, 
            titleCat.frameWidth, titleCat.frameHeight, 1, 1, true, false);
    }

    titleCat.draw = function (context) {
      if(titleCat.drawCount++ > 50) {
        titleCat.frameNum = Math.floor(Math.random() * (4 - 0 + 1)) + 0;
        titleCat.updateAnimation();
        titleCat.drawCount = 0;
      }
      titleCat.animation.drawFrame(deltaTime, context, this.pos.x, this.pos.y);
    }
    titleCat.updateAnimation();
    return titleCat;
}
