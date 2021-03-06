class Level {
    constructor(levelName) {
        this.gravity = 2000; //level side gravity. should need a setter for different levels and power-ups    should be 2000
        this.levelName = levelName;
        this.comp = new Compositor();
        this.entities = new Set();
        this.tiles = new Matrix();
        this.itemCounter = 0;
        this.itemSpawnRate = 15; //number of seconds between item spawns, should be around 15 or 20

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

    getLastCharacter() {
      var e;
      this.entities.forEach(function(entity) {
        if(entity.type == 'player') {
          e = entity;
        }
      });
      return e;
    }

    isPlayerStillAlive() {
      var result = false;
      this.entities.forEach(function(entity) {
        if(entity.Ename == 'character') {
          result = true;
        }
      });
      return result;
    }


    update(deltaTime) {
      controllerUpdate(null, 0);
      if (!isPaused) {

        if (this.itemCounter > this.itemSpawnRate * 60) {   //item spawning, Seconds * framerate
          var itemCount = 0;
          this.entities.forEach(entity => {
            if (entity.type === 'Item') itemCount++;
          });


          if (itemCount < 5) itemPicker(this);
          this.itemCounter = 0;
        }
        this.itemCounter ++;

        this.entities.forEach(entity => {
            // if (entity.Ename === 'character') {
            //   console.log('current DIR: ' + entity.go.dir);
            // }
            entity.update(deltaTime);
            //console.log(entity.Ename);
            entity.pos.x += entity.vel.x * deltaTime;
            this.tileCollider.checkX(entity);

            entity.pos.y += entity.vel.y * deltaTime;
            this.tileCollider.checkY(entity);

            if (entity.type === 'projectile' && entity.Ename != 'cash' && entity.Ename != 'mortar' && entity.Ename != 'bottle'){ //turns off gravity for projectiles
      				entity.vel.y = 0;
      			} else {
              if(entity.Ename != 'bottle') {
                entity.vel.y += this.gravity * deltaTime;
              }

            }

            this.entityCollider.update(entity);

        });
    }
  }
}

function itemPicker(level) { //picks the item to spawn
  choice = getRandomInt(1, 7); //between 1 and number of items + 1
  if (choice === 1 || choice === 2) {
    level.addEntity(new createItem('health'));
  }
  if (choice === 3 || choice === 4) {
    level.addEntity(new createItem('damage'));
  }
  if (choice === 5) {
    level.addEntity(new createItem('speed'));
  }
  if (choice === 6) {
    level.addEntity(new createItem('berry'));
  }
}
