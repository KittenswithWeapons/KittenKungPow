function createProjectile(name, originEntity) {
    const Projectile = new Entity(name); //creates the projectile as an entity
    Projectile.origin = originEntity;
    Projectile.type = 'projectile';
    Projectile.addTrait(new Velocity());
    Projectile.addTrait(new Throw());
    Projectile.heading = originEntity.heading;
    Projectile.throw.dir = Projectile.heading; //propels the projectile in the direction that the character is facing

    if(name == 'fireball') {
        Projectile.size.set(25, 30);         //size of the projectile.
        Projectile.pos.set(originEntity.pos.x, originEntity.pos.y + 10 + Projectile.size.y/2);   //position of the Projectile starts from where the origin character is, may need to offset
        Projectile.damageValue = 20;//20
    } else if(name == 'arrow') {
        Projectile.size.set(20, 9);
        Projectile.pos.set(originEntity.pos.x, originEntity.pos.y + 30);
        Projectile.damageValue = 10;
    } else if(name == 'trippleArrow') {
        Projectile.size.set(20, 30);
        Projectile.pos.set(originEntity.pos.x, originEntity.pos.y + 10 + Projectile.size.y/2);
        Projectile.damageValue = 30;
    } else if(name == 'forcePush') {
        Projectile.size.set(10, 50);
        Projectile.pos.set(originEntity.pos.x, originEntity.pos.y);
        Projectile.damageValue = 0;
    } else if(name == 'punch') {
        Projectile.size.set(15, 20);
        Projectile.pos.set(originEntity.pos.x, originEntity.pos.y + 25);
        Projectile.damageValue = 10;
    } else if(name == 'kick') {
        Projectile.size.set(20, 20);
        Projectile.pos.set(originEntity.pos.x, originEntity.pos.y + 25);
        Projectile.damageValue = 30;
    } else if(name == 'dagger') {
        Projectile.size.set(15, 20);
        Projectile.pos.set(originEntity.pos.x, originEntity.pos.y + 25);
        Projectile.damageValue = 3;
    } else if(name == 'uppercut') {
        Projectile.size.set(20, 20);
        Projectile.pos.set(originEntity.pos.x, originEntity.pos.y + 25);
        Projectile.damageValue = 10;
    } else if(name == 'shadeStep') {
        Projectile.size.set(10, 10);
        Projectile.pos.set(originEntity.pos.x, originEntity.pos.y + 25);
        Projectile.damageValue = 0;
    } else if(name == 'cash') {
        Projectile.size.set(18, 22);
        Projectile.pos.set(originEntity.pos.x, originEntity.pos.y + 35);
        Projectile.damageValue = 10;
        Projectile.vel.y -= 300;
        window.setTimeout(function() {Projectile.vel.y += 300;}, 700);
    } else if(name == 'slam') {
        Projectile.size.set(10, 50);
        Projectile.pos.set(originEntity.pos.x, originEntity.pos.y);
        Projectile.damageValue = 30;
    }

    Projectile.handle = function(intent) {
        if(intent == 'getThrower'){
            return originEntity;
        }
    }

    Projectile.updateAnimation = function() {
        switch(name) {
            case 'fireball':
                Projectile.animation = new Animation(ASSET_MANAGER.getAsset(
                    "./Projectiles/fireball.png"), 0, 0, 512, 512, 0.2, 6, true, false);
                break;
            case 'arrow':
                Projectile.animation = new Animation(ASSET_MANAGER.getAsset(
                    "./Projectiles/Arrow.png"), 0, 0, 33, 9, 1, 1, true, false);
                break;
            case 'trippleArrow':
                Projectile.animation = new Animation(ASSET_MANAGER.getAsset(
                    "./Projectiles/Arrow.png"), 0, 0, 33, 9, 1, 1, true, false);
                break;
            case 'forcePush':
                Projectile.animation = new Animation(ASSET_MANAGER.getAsset( //Null animation
                    "./Projectiles/Arrow.png"), 0, 0, 0, 0, 1, 1, true, false);
                break;
            case 'punch':
                Projectile.animation = new Animation(ASSET_MANAGER.getAsset( //Null animation
                    "./Projectiles/Arrow.png"), 0, 0, 0, 0, 1, 1, true, false);
                break; 
            case 'kick':
                Projectile.animation = new Animation(ASSET_MANAGER.getAsset( //Null animation
                    "./Projectiles/Arrow.png"), 0, 0, 0, 0, 1, 1, true, false);
                break;
            case 'dagger':
                Projectile.animation = new Animation(ASSET_MANAGER.getAsset( //Null animation
                    "./Projectiles/Arrow.png"), 0, 0, 0, 0, 1, 1, true, false);
                break; 
            case 'uppercut':
                Projectile.animation = new Animation(ASSET_MANAGER.getAsset( //Null animation
                    "./Projectiles/Arrow.png"), 0, 0, 0, 0, 1, 1, true, false);
                break;
            case 'shadeStep':
                Projectile.animation = new Animation(ASSET_MANAGER.getAsset(
                    "./Projectiles/shadeStep.png"), 0, 0, 11, 12, 1, 1, true, false);
                break;
            case 'cash':
                Projectile.animation = new Animation(ASSET_MANAGER.getAsset( 
                    "./Projectiles/Cash.png"), 0, 0, 18, 22, 1, 1, true, false);
                break;
            case 'slam':
                Projectile.animation = new Animation(ASSET_MANAGER.getAsset( //Null animation
                    "./Projectiles/Arrow.png"), 0, 0, 0, 0, 1, 1, true, false);
                break; 
        }
    }

    Projectile.draw = function (context) {
        context.save();
        if(Projectile.heading == 1) {
            if(name == 'cash') {
                context.translate(20, 0);
            } else {
                context.translate(-5, 0);
            }
        } else {
            if(name == 'shadeStep') {
                context.translate(10, 0)
            } else if(name == 'fireball') {
                context.translate(30, 0)
            } else if(name == 'cash') {
                context.translate(0, 0);
            } else {
                context.translate(25, 0)
            };
        }
        context.scale(Projectile.heading, 1);
        if(name == 'fireball') {
            Projectile.animation.drawFrame(deltaTime, context, (Projectile.heading * this.pos.x - Projectile.size.x/2), (this.pos.y - Projectile.size.y/2), 1/8);
        } else if (name == 'arrow') {
            Projectile.animation.drawFrame(deltaTime, context, Projectile.heading * this.pos.x, this.pos.y);
        } else if (name == 'trippleArrow') {
            Projectile.animation.drawFrame(deltaTime, context, Projectile.heading * this.pos.x, this.pos.y);
            Projectile.animation.drawFrame(deltaTime, context, Projectile.heading * this.pos.x, this.pos.y + 12);
            Projectile.animation.drawFrame(deltaTime, context, Projectile.heading * this.pos.x, this.pos.y + 24);
        } else if (name == 'shadeStep') {
            Projectile.animation.drawFrame(deltaTime, context, Projectile.heading * this.pos.x, this.pos.y);
        } else if (name == 'cash') {
            Projectile.animation.drawFrame(deltaTime, context, Projectile.heading * this.pos.x - 20, this.pos.y);
        }
        context.restore();
    }

    Projectile.updateAnimation();
    return Projectile;
}


function ThrowProjectile(name, originEntity) {
    if(name == 'forcePush') {
        levelObject.addTempEntity(createProjectile(name, originEntity), 150)
    } else if (name == 'punch' || name == 'dagger') {
        levelObject.addTempEntity(createProjectile(name, originEntity), 60)
    } else if (name == 'kick' || name == 'uppercut') {
        levelObject.addTempEntity(createProjectile(name, originEntity), 50)
    } else {
        levelObject.addEntity(createProjectile(name, originEntity));
    }
}
