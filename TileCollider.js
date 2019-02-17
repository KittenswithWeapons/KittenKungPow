// import TileResolver from './TileResolver.js';

class TileCollider {
  constructor(tileMatrix) {
    this.tiles = new TileResolver(tileMatrix);
    this.checkXFlag = true;
    this.checkYFlag = true;
  }

  checkX(entity) {
    if (this.checkXFlag) {

      var xCollideFallFactor = 50; //this value needs tweaked
      let x;
      if (entity.vel.x > 0) {
        x = entity.pos.x + entity.size.x;
      } else if (entity.vel.x < 0) {
        x = entity.pos.x;
      } else {
        return;
      }

      const matches = this.tiles.searchByRange(
        x, x,
        entity.pos.y, entity.pos.y + (entity.size.y - 1));

      matches.forEach(match => {
        //console.log('hit: ' + match.tile.name);
        if (match.tile.name !== 'levelobject' && match.tile.name !== 'platform') { //these items are collidable in the x plane
          //console.log('hit dis: ' + match.tile.name);
          return;
        }
        //section below works
        if (entity.type === 'projectile') {
          levelObject.removeEntity(entity);
        }
        if (entity.vel.x > 0) {
          if (entity.pos.x + entity.size.x > match.x1) {
            if (entity.vel.y !== 0 && match.tile.name === 'platform') { //or statement is experimental for turning off x clip during jump, first arguement of statement stays
              //do nothing
              //console.log('passthru');
            } else {
              entity.pos.x = match.x1 - entity.size.x;
              entity.vel.x = 0;
              entity.vel.y = xCollideFallFactor;
              //console.log('OOPS hit a big ol ' + match.tile.name + ' on the right');
            }
          }
        } else if (entity.vel.x < 0) {
          if (entity.pos.x < match.x2) {
            if (entity.vel.y !== 0 && match.tile.name === 'platform') { //or statement is experimental for turning off x clip during jump, first arguement of statement stays
              //do nothing
              //console.log('passthru');
            } else {
              entity.pos.x = match.x2;
              entity.vel.x = 0;
              entity.vel.y = xCollideFallFactor;
              //console.log('OOPS hit a big ol ' + match.tile.name + ' on the left');
            }

          }
        }
      });
    }
  }

  checkY(entity) { //this needs work to get the y checks to be good, so we can come up thru a platform and press "down" to push the char down
    if (this.checkYFlag && entity.type !== 'projectile') {
      let y;
      let passDownFlag;
      if (entity.vel.y > 0) {
        y = entity.pos.y + entity.size.y;
      } else if (entity.vel.y < 0) {
        y = entity.pos.y;
      } else {
        return;
      }
      const matches = this.tiles.searchByRange(         //determines matches
        entity.pos.x, entity.pos.x + entity.size.x,
        y, y);
      //console.log(matches);    //eheck here if the matches array is empty
      matches.forEach(match => {
        if (match.tile.name !== 'ground' && match.tile.name !== 'platform' && match.tile.name !== 'levelobject') {
          return;

        } else { //reset jump number & assign grounded
          if (entity.vel.y > 0 && (match.tile.name === 'ground' || match.tile.name === 'platform'
            || match.tile.name === 'levelobject')) {
            //console.log('jump reset');
            entity.grounded = true;
            entity.handle('land');
            entity.jump.jumpNumber = 0;
          }
        }

        //passdown bypass
        if (match.tile.name === 'platform') {
          entity.passDownFlag = true;
          if (entity.passdown.engageFlag) {
            return;
          }

        } else {
          entity.passDownFlag = false;
        }

        if (entity.vel.y > 0) {
          if (match.tile.name === 'platform' && entity.vel.y < 250
            && entity.pos.y + entity.size.y - 5 > match.y1) { //5(ideal) and vel < 250 are tuning numbers for snapping
            //activates is the char is moving very quickly down #bug
            //disable passthru snap
            //console.log(" disabled snappass");
            //console.log(entity.vel.y);
            return;
          } else {
            if (entity.pos.y + entity.size.y > match.y1) {
              entity.pos.y = match.y1 - entity.size.y;
              entity.vel.y = 0;
              //console.log('snap > 0');
              if (match.tile.name === 'platform' && this.checkXFlag === false) {
                this.checkXFlag = true;
                //console.log('check x on');
                //console.log('land');
              }
            }
          }
        } else if (entity.vel.y < 0) {
          if (entity.pos.y < match.y2) {
            if (match.tile.name === 'platform') { //checks to see what we hit and if we can go thru it
              //console.log('check x off');
              this.checkXFlag = false;
              return;
              //x check needs to be turned off when passthru is happening #bug
            } else {
              entity.pos.y = match.y2;
              entity.vel.y = 0;
              //console.log('snap < 0');
              //console.log('HIT-UP'); //trigger hit
              //console.log(match.tile.name);//what did we hit
            }
          }
        }
      });
    }
  }
}
