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
    var dirSave = 0;
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

            //item handling----------------------------------------------------------------------------------
            if (entity.type === 'Item' || entityObject.type === 'Item') {

              //health Milk
              if ((entity.Ename === 'health' && entityObject.type === 'player') ||
                        (entity.type === 'player' && entityObject.Ename === 'health')){
                entityObject.damage -= 75;
                entity.damage -= 75;
                if (entityObject.damage < 0 || entity.damage < 0) {
                  entityObject.damage = 0;
                  entity.damage = 0;
                }
              }
              //damage fish: doubles damage for 5 seconds
              if ((entity.Ename === 'damage' && entityObject.type === 'player') ||
                        (entity.type === 'player' && entityObject.Ename === 'damage')){
                entity.damageModifier = entity.damageModifier * 2;
                entityObject.damageModifier = entityObject.damageModifier * 2;
                window.setTimeout(function() {
                  entity.damageModifier = entity.damageModifier * .5;
                  entityObject.damageModifier = entityObject.damageModifier * .5;
                }, 5000);
              }

              //Choco Speed Bar: doubles speed for 3 seconds
              if ((entity.Ename === 'speed' && entityObject.type === 'player' && !entityObject.hasSpeedBoost) ||
                        (entity.type === 'player' && entityObject.Ename === 'speed' && !entity.hasSpeedBoost)){

                if (entity.type === 'player') {
                  entity.go.speed = entity.go.speed * 2;
                  entity.hasSpeedBoost = true;
                } else if (entityObject.type === 'player') {
                  entityObject.go.speed = entityObject.go.speed * 2;
                  entityObject.hasSpeedBoost = true;
                }
                window.setTimeout(function() {
                  if (entity.type === 'player') {
                    entity.go.speed = entity.go.speed * .5;
                    entity.hasSpeedBoost = false;
                  } else if (entityObject.type === 'player') {
                    entityObject.go.speed = entityObject.go.speed * .5;
                    entityObject.hasSpeedBoost = false;
                  }
                }, 3000);
              }

              //Pickle
              if ((entity.Ename === 'pickler' && entityObject.type === 'player') ||
                        (entity.type === 'player' && entityObject.Ename === 'pickler')){
                //do effecty type things
              }

              //Berry
              if ((entity.Ename === 'berry' && entityObject.type === 'player') ||
                        (entity.type === 'player' && entityObject.Ename === 'berry')){
                //do effecty type things
              }

              //---------------------------------------
              if (entityObject.type === 'Item') {
                levelObject.removeEntity(entityObject);
              } else {
                levelObject.removeEntity(entity);
              }
              return;
            }
            //item handling END------------------------------------------------------------------------------


            if (entity.type === 'projectile') {
              //console.log('projectile hit');
              entityObject.damage += entity.damageValue;
              //console.log(entity.Ename);

              if(entity.Ename == 'forcePush') {
                entityObject.handle('pushLeft');
              } else if(entity.Ename == 'zap') {
                entityObject.handle('painLeft');
              } else if(entity.Ename == 'laser' || entity.Ename == 'clone') {
                entityObject.handle('noKnockback');
              } else if(entity.Ename == 'uppercut') {
                entityObject.handle('knockUp');
              } else if(entity.Ename == 'shadeStep') {
                entity.handle('getThrower').handle('shadeLeft', entityObject);
                levelObject.removeEntity(entity);
              } else if(entity.Ename == 'shield') {
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

              //item handling----------------------------------------------------------------------------------
              if (entity.type === 'Item' || entityObject.type === 'Item') {

                //health Milk
                if ((entity.Ename === 'health' && entityObject.type === 'player') ||
                          (entity.type === 'player' && entityObject.Ename === 'health')){
                  entityObject.damage -= 75;
                  entity.damage -= 75;
                  if (entityObject.damage < 0 || entity.damage < 0) {
                    entityObject.damage = 0;
                    entity.damage = 0;
                  }
                }

                //damage fish: doubles damage for 5 seconds
                if ((entity.Ename === 'damage' && entityObject.type === 'player') ||
                          (entity.type === 'player' && entityObject.Ename === 'damage')){
                  entity.damageModifier = entity.damageModifier * 2;
                  entityObject.damageModifier = entityObject.damageModifier * 2;
                  window.setTimeout(function() {
                    entity.damageModifier = entity.damageModifier * .5;
                    entityObject.damageModifier = entityObject.damageModifier * .5;
                  }, 5000);
                }

                //Choco Speed Bar: doubles speed for 3 seconds
              if ((entity.Ename === 'speed' && entityObject.type === 'player' && !entityObject.hasSpeedBoost) ||
              (entity.type === 'player' && entityObject.Ename === 'speed' && !entity.hasSpeedBoost)){

                  if (entity.type === 'player') {
                    entity.go.speed = entity.go.speed * 2;
                    entity.hasSpeedBoost = true;
                  } else if (entityObject.type === 'player') {
                    entityObject.go.speed = entityObject.go.speed * 2;
                    entityObject.hasSpeedBoost = true;
                  }
                  window.setTimeout(function() {
                    if (entity.type === 'player') {
                      entity.go.speed = entity.go.speed * .5;
                      entity.hasSpeedBoost = false;
                    } else if (entityObject.type === 'player') {
                      entityObject.go.speed = entityObject.go.speed * .5;
                      entityObject.hasSpeedBoost = false;
                    }
                  }, 3000);
                }

                //Pickle
                if ((entity.Ename === 'pickler' && entityObject.type === 'player') ||
                          (entity.type === 'player' && entityObject.Ename === 'pickler')){
                  //do effecty type things
                }

                //Berry
                if ((entity.Ename === 'berry' && entityObject.type === 'player') ||
                          (entity.type === 'player' && entityObject.Ename === 'berry')){
                  //do effecty type things
                }

                //---------------------------------------
                if (entityObject.type === 'Item') {
                  levelObject.removeEntity(entityObject);
                } else {
                  levelObject.removeEntity(entity);
                }
                return;
              }
              //item handling END------------------------------------------------------------------------------


              if (entity.type === 'projectile') {
                //console.log('projectile hit');
                entityObject.damage += entity.damageValue;


                if(entity.Ename == 'forcePush') {
                  entityObject.handle('pushRight');
                } else if(entity.Ename == 'zap') {
                  entityObject.handle('painRight');
                } else if(entity.Ename == 'laser' || entity.Ename == 'clone') {
                    entityObject.handle('noKnockback');
                } else if(entity.Ename == 'uppercut') {
                  entityObject.handle('knockUp');
                } else if(entity.Ename == 'shadeStep') {
                  entity.handle('getThrower').handle('shadeRight', entityObject);
                  levelObject.removeEntity(entity);
                } else if(entity.Ename == 'shield') {
                    //levelObject.removeEntity(entity);
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
