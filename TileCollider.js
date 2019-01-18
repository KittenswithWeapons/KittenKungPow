import TileResolver from './TileResolver.js';

export default class TileCollider {
    constructor(tileMatrix) {
        this.tiles = new TileResolver(tileMatrix);
    }

    checkX(entity) {

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

           if (entity.vel.x > 0) {
             if (entity.pos.x + entity.size.x  > match.x1) {
                   entity.pos.x = match.x1 - entity.size.x;
                   entity.vel.x = 0;
                   //console.log('OOPS hit a big ol and tried to move: ' + match.tile.name);

               }
           } else if (entity.vel.x < 0) {
               if (entity.pos.x < match.x2) {
                   entity.pos.x = match.x2;
                   entity.vel.x = 0;
                   //console.log('OOPS hit a big ol ' + match.tile.name);

               }
           }
       });
    }

    checkY(entity) { //this needs work to get the y checks to be good, so we can come up thru a platform and press "down" to push the char down
        let y;
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

        matches.forEach(match => {
            if (match.tile.name !== 'ground' && match.tile.name !== 'platform' && match.tile.name !== 'levelobject') {
                return;

            }

            if (entity.vel.y > 0) {
                if (entity.pos.y + entity.size.y > match.y1) {   //passdown needs to happen somehow here  &axes > .2 &axes < .7
                    entity.pos.y = match.y1 - entity.size.y;     // controller needs to see if standing on platform
                    entity.vel.y = 0;
                    //console.log('HIT-DOWN'); //hit trigger
                }
            } else if (entity.vel.y < 0) {
                if (entity.pos.y < match.y2) {
                	if (match.tile.name === 'platform') { //checks to see what we hit and if we can go thru it
                		return;
                    //x check needs to be turned off when passthru is happening #bug
                	}else {
	                    entity.pos.y = match.y2;
	                    entity.vel.y = 0;
	                    //console.log('HIT-UP'); //trigger hit
	                   //console.log(match.tile.name);//what did we hit
                	}
                }
            }
        });
        //entity.passdown.engageFlag = true;
    }
}
