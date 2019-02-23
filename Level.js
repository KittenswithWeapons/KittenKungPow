class Level {
    constructor(levelName) {
        this.gravity = 2000; //level side gravity. should need a setter for different levels and power-ups    should be 2000
        this.levelName = levelName;
        this.comp = new Compositor();
        this.entities = new Set();
        this.tiles = new Matrix();
        this.itemCounter = 0;
        this.itemSpawnRate = 15; //number of seconds between item spawns

        this.tileCollider = new TileCollider(this.tiles);
        this.entityCollider = new EntityCollider(this.entities);   //added
    }

    addEntity(entity) {
      this.entities.add(entity);
      this.entityCollider.addEntityCollider(entity);
    }

    addTempEntity(entity, timeout) {
      this.entities.add(entity);
      this.entityCollider.addEntityCollider(entity);
      var that = this;
      window.setTimeout(function() {
        that.entities.delete(entity);
        that.entityCollider.removeEntityCollider(entity);}, timeout);
    }

    removeEntity(entity) {
      this.entities.delete(entity);
      this.entityCollider.removeEntityCollider(entity);
    }


    update(deltaTime) {
        if (this.itemCounter > this.itemSpawnRate * 600) {   //item spawning, Seconds * framerate
          this.addEntity(new createItem('health'));
          this.itemCounter = 0;
        }
        this.itemCounter ++;

        this.entities.forEach(entity => {
            entity.update(deltaTime);
            //console.log(entity.Ename);
            entity.pos.x += entity.vel.x * deltaTime;
            this.tileCollider.checkX(entity);

            entity.pos.y += entity.vel.y * deltaTime;
            this.tileCollider.checkY(entity);

            if (entity.type === 'projectile' && entity.Ename != 'cash'){ //turns off gravity for projectiles
      				entity.vel.y = 0;
      			} else {
              entity.vel.y += this.gravity * deltaTime;
            }

            this.entityCollider.update(entity);

        });
    }
}

function itemPicker(level) { //picks the item to spawn
  choice = getRandomInt(1, 3); //between 1 and number of items + 1
  if (choice === 1) {
    level.addEntity(new createItem('health'));
  }
  if (choice === 2) {
    level.addEntity(new createItem('damage'));
  }
}
