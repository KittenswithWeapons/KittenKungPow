class Level {
    constructor(levelName) {
        this.gravity = 2000; //level side gravity. should need a setter for different levels and power-ups    should be 2000
        this.levelName = levelName;
        this.comp = new Compositor();
        this.entities = new Set();
        this.tiles = new Matrix();

        this.tileCollider = new TileCollider(this.tiles);
        this.entityCollider = new EntityCollider(this.entities);   //added
    }

    addEntity(entity) {
      this.entities.add(entity);
      this.entityCollider.addEntityCollider(entity);
    }

    removeEntity(entity) {
      this.entities.delete(entity);
      this.entityCollider.removeEntityCollider(entity);
    }

    update(deltaTime) {
        this.entities.forEach(entity => {
            entity.update(deltaTime);
            //console.log(entity.Ename);
            entity.pos.x += entity.vel.x * deltaTime;
            this.tileCollider.checkX(entity);

            entity.pos.y += entity.vel.y * deltaTime;
            this.tileCollider.checkY(entity);

            if (entity.type === 'projectile'){ //turns off gravity for projectiles
      				entity.vel.y = 0;
      			} else {
              entity.vel.y += this.gravity * deltaTime;
            }

            this.entityCollider.update(entity);

            if (entity.pos.x < -50 || entity.pos.x > 1330) {
              this.removeEntity(entity);
              //console.log(entity.Ename + ': x - Died');
            }
            //add y death later


        });
    }
}
