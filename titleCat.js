function createTitleCat(name) {
    const titleCat = new Entity(name);
    titleCat.frameHeight = 172;
    titleCat.frameWidth = 105;

    titleCat.updateAnimation = function () {
      titleCat.animation = new Animation(ASSET_MANAGER.getAsset(
            "./SceneBackgrounds/CatFaceAnimationBig.png"), 0, 0, 
            titleCat.frameWidth, titleCat.frameHeight, 0.5, 5, true, false);
    }

    titleCat.draw = function (context) {
      titleCat.animation.drawFrame(deltaTime, context, this.pos.x, this.pos.y);
    }
    titleCat.updateAnimation();
    return titleCat;
}
