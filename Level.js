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

      if(entity.Ename == 'forcePush') {
        var that = this;
        window.setTimeout(function() {
          that.entities.delete(entity);
          that.entityCollider.removeEntityCollider(entity);}, 150);
      } else if (entity.Ename == 'punch') {
        var that = this;
        window.setTimeout(function() {
          that.entities.delete(entity);
          that.entityCollider.removeEntityCollider(entity);}, 60);
      }
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

        });
    }
}
