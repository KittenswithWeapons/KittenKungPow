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

  clearEntityColliders() {
    this.entities.clear();
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

            if (entity.type === 'Item' || entityObject.type === 'Item') { //item handling------------------------
              //console.log('item hit! from left');
              if ((entity.Ename === 'health' && entityObject.type === 'player') ||
                        (entity.type === 'player' && entityObject.Ename === 'health')){
                entityObject.damage -= 50;
                entity.damage -= 50;
                if (entityObject.damage < 0 || entity.damage < 0) {
                  entityObject.damage = 0;
                  entity.damage = 0;
                }
              }
              if (entityObject.type === 'Item') {
                levelObject.removeEntity(entityObject);
              } else {
                levelObject.removeEntity(entity);
              }
              return;
            }
            //item handling END---------------------------------------------


            if (entity.type === 'projectile') {
              //console.log('projectile hit');
              entityObject.damage += entity.damageValue;
              if(entity.Ename == 'forcePush') {
                entityObject.handle('pushLeft');
              } else if(entity.Ename == 'dagger') {
                entityObject.handle('painLeft');
              } else if(entity.Ename == 'uppercut') {
                entityObject.handle('knockUp');
              } else if(entity.Ename == 'shadeStep') {
                entity.handle('getThrower').handle('shadeLeft', entityObject);
                levelObject.removeEntity(entity);
              } else {
                levelObject.removeEntity(entity);
                entityObject.handle('painLeft');
              }
              //console.log(entityObject.Ename + '- damage: ' + entityObject.damage);
              return;
            }
            entity.pos.x = entityObject.pos.x - entity.size.x ;
            //push back
            entity.vel.x = entity.vel.x/2;
            entityObject.vel.x = entity.vel.x/2;

            //entity.vel.y = xCollideFallFactor;
            //console.log(entity.Ename + ' hit ' + entityObject.Ename + ': x-hit -- 1');
          }
        } else if (entity.vel.x < 0) {
            if (entity.pos.x >= entityObject.pos.x + entityObject.size.x/2 && entity.pos.x <= entityObject.pos.x + entityObject.size.x ) { //division divides the char in hald and then segments further to catch between frames

              if (entity.type === 'Item' || entityObject.type === 'Item') { //item handling------------------------
                //console.log('item hit! from right');
                if ((entity.Ename === 'health' && entityObject.type === 'player') ||
                          (entity.type === 'player' && entityObject.Ename === 'health')){
                  entityObject.damage -= 50;
                  entity.damage -= 50;
                  if (entityObject.damage < 0 || entity.damage < 0) {
                    entityObject.damage = 0;
                    entity.damage = 0;
                  }
                }
                if (entityObject.type === 'Item') {
                  levelObject.removeEntity(entityObject);
                } else {
                  levelObject.removeEntity(entity);
                }
                return;
              }
              //item handling END---------------------------------------------


              if (entity.type === 'projectile') {
                //console.log('projectile hit');
                entityObject.damage += entity.damageValue;
                if(entity.Ename == 'forcePush') {
                  entityObject.handle('pushRight');
                } else if(entity.Ename == 'dagger') {
                  entityObject.handle('painRight');
                } else if(entity.Ename == 'uppercut') {
                  entityObject.handle('knockUp');
                } else if(entity.Ename == 'shadeStep') {
                  entity.handle('getThrower').handle('shadeRight', entityObject);
                  levelObject.removeEntity(entity);
                } else {
                  levelObject.removeEntity(entity);
                  entityObject.handle('painRight');
                }
                //console.log(entityObject.Ename + '- damage: ' + entityObject.damage);
                return;
              }
              entity.pos.x = entityObject.pos.x + entityObject.size.x;
              //push back
              entity.vel.x = entity.vel.x/2;
              entityObject.vel.x = entity.vel.x/2;

              //entity.vel.y = xCollideFallFactor;
              //console.log(entity.Ename + ' hit ' + entityObject.Ename + ': x-hit -- 2');
            }

          }
      }
    });
  }

  update(entity) {
    this.checkEntityCollision(entity);
  }


}
