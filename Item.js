//item class
function createItem(name) {
    const Item = new Entity(name); //creates the Item as an entity
    Item.type = 'Item';
    Item.size.set(25, 30);         //size of the Item.

    Item.pos.set(600,0);   // set x to random............................
    Item.addTrait(new Velocity());



    Item.updateAnimation = function() {
        this.startX = 0;
        this.startY = 0;
        this.FrameWidth = 512;
        this.FrameHeight = 512;
        this.FrameSpeed = 0.2;
        this.FrameLength = 6;
        this.FrameLoop = true;
        this.FrameReverse = false;
        Item.animation = new Animation(ASSET_MANAGER.getAsset(
            "./Items/fireball.png"),
            this.startX, this.startY, this.FrameWidth, this.FrameHeight ,
             this.FrameSpeed, this.FrameLength,
             this.FrameLoop, this.FrameReverse);
    }

    Item.draw = function (context) {
      Item.animation.drawFrame(deltaTime, context, (this.pos.x - Item.size.x/2), (this.pos.y - Item.size.y/2), 1/8);
    }

    Item.updateAnimation();
    return Item;
}
