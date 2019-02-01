function createProjectile(name, originEntity) {
    const Projectile = new Entity(name); //creates the projectile as an entity
    Projectile.type = 'projectile';
    Projectile.size.set(16, 16);         //size of the projectile.
    Projectile.pos = originEntity.pos;   //position of the Projectile starts from where the origin character is, may need to offset
    //Projectile.pos.x = Projectile.pos.x + 60;
    Projectile.addTrait(new Throw());

    Projectile.go.dir = originEntity.heading; //propels the projectile in the direction that the character is facing

    Projectile.updateAnimation = function() {
        this.startX = 0;
        this.startY = 0;
        this.FrameWidth = 32;
        this.FrameHeight = 32;
        this.FrameSpeed = 1;
        this.FrameLength = 1;
        this.FrameLoop = true;
        this.FrameReverse = false;
        Projectile.animation = new Animation(ASSET_MANAGER.getAsset(
            "./Projectiles/fireball.png"),
            this.startX, this.startY, this.FrameWidth, this.FrameHeight ,
             this.FrameSpeed, this.FrameLength,
             this.FrameLoop, this.FrameReverse);
    }

    Projectile.draw = function (context) {
        Projectile.animation.drawFrame(deltaTime, context, this.pos.x, this.pos.y);
    }

    Projectile.updateAnimation();
    return Projectile;
}

function ThrowProjectile(name, originEntity) {
    levelObject.addEntity(createProjectile(name, originEntity));
}
