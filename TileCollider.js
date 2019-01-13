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
            entity.pos.y, entity.pos.y + entity.size.y);
        
//commenting out turns off the x collisions, broken and maybe unneeded
//        matches.forEach(match => {
//            if (match.tile.name !== 'ground') {
//                return;
//            }
//
//            if (entity.vel.x > 0) {
//                if (entity.pos.x + entity.size.x > match.x1) {
//                    entity.pos.x = match.x1 - entity.size.x;
//                    entity.vel.x = 0;
//                    //console.log('whoaRight'); //this triggers at incorrect times
//                }
//            } else if (entity.vel.x < 0) {
//                if (entity.pos.x < match.x2) {
//                    entity.pos.x = match.x2;
//                    entity.vel.x = 0;
//                    //console.log('whoaleft'); //this triggers at incorrect times
//                }
//            }
//        });
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
            if (match.tile.name !== 'ground') {
                return;
            }

            if (entity.vel.y > 0) {
                if (entity.pos.y + entity.size.y > match.y1) {
                    entity.pos.y = match.y1 - entity.size.y;
                    entity.vel.y = 0;
                    //console.log('HIT-DOWN'); //hit trigger
                }
            } else if (entity.vel.y < 0) {          
                if (entity.pos.y < match.y2) {
                	if (match.tile.name === 'ground') { //checks to see what we hit and if we can go thru it
                		return;
                	}else {
	                    entity.pos.y = match.y2;
	                    entity.vel.y = 0;
	                    console.log('HIT-UP'); //trigger hit
	                    console.log(match.tile.name);//what did we hit
                	}
                }
            }
        });
    }
}
