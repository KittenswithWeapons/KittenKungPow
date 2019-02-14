//entity colliding
  class EntityCollider {
    constructor() {
      this.entities = new Set();
    }


  addEntityCollider(entity) {
    this.entities.add(entity);
  }

  removeEntityCollider(entity) {
    this.entities.delete(entity);
  }


  checkEntityCollision(entity) {
    var xCollideFallFactor = 50;
    this.entities.forEach(entityObject => {
      if (entity !== entityObject) {
        //check all for collision
        if (entity.type === 'projectile' || entityObject.type === 'projectile') {
          if (entity.origin === entityObject || entityObject.origin === entity) {
            //console.log('projectile hit origin');
            return;
          }
        }

        if (entity.pos.y + entity.size.y < entityObject.pos.y || entity.pos.y > entityObject.pos.y + entityObject.size.y) {
          return;  //returns if entities are on different y levels.
        }


        if (entity.vel.x > 0) {
          if (entity.pos.x + entity.size.x >= entityObject.pos.x && entity.pos.x + entity.size.x <= entityObject.pos.x + entityObject.size.x/2) { // /3
            if (entity.type === 'projectile') {
              console.log('projectile hit');
              levelObject.removeEntity(entity);
              entityObject.damage += entity.damageValue;
              console.log(entityObject.Ename + '- damage: ' + entityObject.damage);
              return;
            }
            entity.pos.x = entityObject.pos.x - entity.size.x ;
            //push back
            entity.vel.x = entity.vel.x/2;
            entityObject.vel.x = entity.vel.x/2;

            //entity.vel.y = xCollideFallFactor;
            console.log(entity.Ename + ' hit ' + entityObject.Ename + ': x-hit -- 1');
          }
        } else if (entity.vel.x < 0) {
            if (entity.pos.x >= entityObject.pos.x + entityObject.size.x/2 && entity.pos.x <= entityObject.pos.x + entityObject.size.x ) { //division divides the char in hald and then segments further to catch between frames
              if (entity.type === 'projectile') {
                console.log('projectile hit');
                levelObject.removeEntity(entity);
                entityObject.damage += entity.damageValue;
                console.log(entityObject.Ename + '- damage: ' + entityObject.damage);
                return;
              }
              entity.pos.x = entityObject.pos.x + entityObject.size.x;
              //push back
              entity.vel.x = entity.vel.x/2;
              entityObject.vel.x = entity.vel.x/2;

              //entity.vel.y = xCollideFallFactor;
              console.log(entity.Ename + ' hit ' + entityObject.Ename + ': x-hit -- 2');
            }

          }
      }
    });
  }

  update(entity) {
    this.checkEntityCollision(entity);
  }


}
