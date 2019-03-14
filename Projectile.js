function createProjectile(name, originEntity, damageModifier) {
    const Projectile = new Entity(name); //creates the projectile as an entity
    Projectile.origin = originEntity;
    Projectile.type = 'projectile';
    Projectile.addTrait(new Velocity());
    Projectile.addTrait(new Throw());
    Projectile.speed = 100;
    Projectile.explosion = false;
    Projectile.fire = false;
    Projectile.heading = originEntity.heading;
    Projectile.throw.dir = Projectile.heading; //propels the projectile in the direction that the character is facing
    Projectile.damageModifier = damageModifier || 1;
    //console.log(damageModifier);

    if(name == 'fireball') {
        Projectile.size.set(25, 30);         //size of the projectile.
        Projectile.pos.set(originEntity.pos.x, originEntity.pos.y + 10 + Projectile.size.y/2);   //position of the Projectile starts from where the origin character is, may need to offset
        Projectile.damageValue = 20 * Projectile.damageModifier;//20
    } else if(name == 'arrow') {
        Projectile.size.set(20, 9);
        Projectile.pos.set(originEntity.pos.x, originEntity.pos.y + 30);
        Projectile.damageValue = 8 * Projectile.damageModifier;
    } else if(name == 'trippleArrow') {
        Projectile.size.set(20, 30);
        Projectile.pos.set(originEntity.pos.x, originEntity.pos.y + 10 + Projectile.size.y/2);
        Projectile.damageValue = 30 * Projectile.damageModifier;
    } else if(name == 'forcePush') {
        Projectile.size.set(10, 50);
        Projectile.pos.set(originEntity.pos.x, originEntity.pos.y);
        Projectile.damageValue = 0;
    } else if(name == 'punch') {
        Projectile.size.set(15, 20);
        Projectile.pos.set(originEntity.pos.x, originEntity.pos.y + 25);
        Projectile.damageValue = 15 * Projectile.damageModifier;
    } else if(name == 'kick') {
        Projectile.size.set(20, 20);
        Projectile.pos.set(originEntity.pos.x, originEntity.pos.y + 25);
        Projectile.damageValue = 25 * Projectile.damageModifier;
    } else if(name == 'dagger') {
        Projectile.size.set(15, 20);
        Projectile.pos.set(originEntity.pos.x, originEntity.pos.y + 25);
        Projectile.damageValue = 12 * Projectile.damageModifier;
    } else if(name == 'uppercut') {
        Projectile.size.set(20, 20);
        Projectile.pos.set(originEntity.pos.x, originEntity.pos.y + 25);
        Projectile.damageValue = 30 * Projectile.damageModifier;
    } else if(name == 'shadeStep') {
        Projectile.size.set(10, 10);
        Projectile.pos.set(originEntity.pos.x, originEntity.pos.y + 25);
        Projectile.damageValue = 0;
    } else if(name == 'cash') {
        Projectile.size.set(18, 22);
        Projectile.pos.set(originEntity.pos.x, originEntity.pos.y + 35);
        Projectile.damageValue = 25 * Projectile.damageModifier;
        Projectile.vel.y -= 300;
        window.setTimeout(function() {Projectile.vel.y += 300;}, 700);
    } else if(name == 'slam') {
        Projectile.size.set(10, 50);
        Projectile.pos.set(originEntity.pos.x, originEntity.pos.y);
        Projectile.damageValue = 30 * Projectile.damageModifier;
    } else if(name == 'zap') {
        Projectile.throw.setSpeed(25000);
        Projectile.size.set(15, 20);
        Projectile.pos.set(originEntity.pos.x, originEntity.pos.y + 25);
        Projectile.damageValue = 15 * Projectile.damageModifier;
    } else if(name == 'laser') {
        Projectile.throw.setSpeed(25000);
        Projectile.size.set(15, originEntity.laserHeight + 55);
        Projectile.pos.set(originEntity.pos.x + originEntity.heading * 95, 0);
        Projectile.damageValue = 10 * Projectile.damageModifier;
    } else if(name == 'clone') {
        Projectile.size.set(28, 58);
        Projectile.pos.set(originEntity.pos.x, originEntity.pos.y);
        Projectile.damageValue = 0;
    } else if(name == 'slash') {
        Projectile.size.set(20, 40);
        Projectile.pos.set(originEntity.pos.x, originEntity.pos.y + 10);
        Projectile.damageValue = 15 * Projectile.damageModifier;
    } else if(name == 'shield') {
        //Projectile.throw.setSpeed(25000);
        Projectile.size.set(20, 40);
        Projectile.pos.set(originEntity.pos.x, originEntity.pos.y + 10);
        Projectile.damageValue = 0;
    } else if(name == 'spin') {
        Projectile.throw.setSpeed(30000);
        Projectile.size.set(5, 40);
        Projectile.pos.set(originEntity.pos.x + originEntity.heading * -5 , originEntity.pos.y + 10);
        Projectile.damageValue = 2 * Projectile.damageModifier;
    } else if(name == 'rocket') {
        Projectile.throw.setSpeed(Projectile.speed);
        Projectile.size.set(16, 8);
        Projectile.pos.set(originEntity.pos.x + originEntity.heading * 30, originEntity.pos.y + 30);
        Projectile.damageValue = 0;
    } else if(name == 'blast') {
        Projectile.size.set(10, 30);
        Projectile.pos.set(originEntity.pos.x, originEntity.pos.y-15);
        Projectile.damageValue = 2 * Projectile.damageModifier;
    } else if(name == 'mortar') {
        Projectile.size.set(12, 12);
        Projectile.pos.set(originEntity.pos.x + originEntity.heading * 40, originEntity.pos.y + 40);
        Projectile.damageValue = 0;
        Projectile.vel.y -= 600;
        Projectile.type = 'mortar';
        window.setTimeout(function() {Projectile.vel.y += 600;}, 700);
    } else if(name == 'bottle') {
        Projectile.speed = 25000;
        Projectile.throw.setSpeed(25000);
        Projectile.size.set(16, 6);
        Projectile.pos.set(originEntity.pos.x, originEntity.pos.y + 15);
        Projectile.damageValue = 0;
        Projectile.vel.y += 150;
        Projectile.type = 'bottle';
    } else if(name == 'burn') {
        Projectile.size.set(10, 30);
        Projectile.pos.set(originEntity.pos.x, originEntity.pos.y-15);
        Projectile.damageValue = 2 * Projectile.damageModifier;
    } else if(name == 'spraybottle') {
        Projectile.throw.setSpeed(25000);
        Projectile.size.set(15, 60);
        Projectile.pos.set(originEntity.pos.x + (originEntity.heading == 1 ? 48 : 0), originEntity.pos.y + 15);
        Projectile.damageValue = 20 * Projectile.damageModifier;
    } else if(name == 'newspaper') {
        Projectile.size.set(20, 20);
        Projectile.pos.set(originEntity.pos.x + (originEntity.heading == 1 ? 48 : 0), originEntity.pos.y + 25);
        Projectile.damageValue = 30 * Projectile.damageModifier;
    } else if(name == 'bile') {
        Projectile.size.set(25, 30);         //size of the projectile.
        Projectile.pos.set(originEntity.pos.x, originEntity.pos.y + 10 + Projectile.size.y/2);   //position of the Projectile starts from where the origin character is, may need to offset
        Projectile.damageValue = 25 * Projectile.damageModifier;//20
    }



    Projectile.handle = function(intent) {
        if(intent == 'getThrower'){
            return originEntity;
        } else if(intent == 'generateExplosion') {
            Projectile.explosion = true;
            window.setTimeout(function() {levelObject.removeEntity(Projectile);}, 170);
            Projectile.throw.setSpeed(0);
            Projectile.vel.y = 0;
            Projectile.size.set(0, 0);
            for(var i = 0; i < 15; i++) {
                window.setTimeout(function() {
                    ThrowProjectile("blast", Projectile, 1);
                    Projectile.heading *= -1;
                    ThrowProjectile("blast", Projectile, 1);
                    Projectile.heading *= -1;
                }, i * 15);
            }
        } else if(intent == 'generateFire') {
            Projectile.vel.y = 0;
            Projectile.fire = true;
            window.setTimeout(function() {levelObject.removeEntity(Projectile);}, 640);
            Projectile.throw.setSpeed(0);
            Projectile.size.set(0, 0);
            for(var i = 0; i < 25; i++) {
                window.setTimeout(function() {
                    ThrowProjectile("burn", Projectile, 1);
                    Projectile.heading *= -1;
                    ThrowProjectile("burn", Projectile, 1);
                    Projectile.heading *= -1;
                }, i * 25);
            }
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
            case 'zap':
                Projectile.animation = new Animation(ASSET_MANAGER.getAsset( //Null animation
                    "./Projectiles/Arrow.png"), 0, 0, 0, 0, 1, 1, true, false);
                break;
            case 'laser':
                Projectile.animation = new Animation(ASSET_MANAGER.getAsset( //Null animation
                    "./Projectiles/Arrow.png"), 0, 0, 0, 0, 1, 1, true, false);
                break;
            case 'clone':
                Projectile.animation = new Animation(ASSET_MANAGER.getAsset(
                    "./characters/Wizard.png"), 36, 170, 128, 84, 0.07, 8, true, false);
                break;
            case 'slash':
                Projectile.animation = new Animation(ASSET_MANAGER.getAsset( //Null animation
                    "./Projectiles/Arrow.png"), 0, 0, 0, 0, 1, 1, true, false);
                break;
            case 'shield':
                Projectile.animation = new Animation(ASSET_MANAGER.getAsset( //Null animation
                    "./Projectiles/Arrow.png"), 0, 0, 0, 0, 1, 1, true, false);
                break;
             case 'spin':
                Projectile.animation = new Animation(ASSET_MANAGER.getAsset( //Null animation
                    "./Projectiles/Arrow.png"), 0, 0, 0, 0, 1, 1, true, false);
                break;
            case 'rocket':
                Projectile.animation = new Animation(ASSET_MANAGER.getAsset(
                    "./Projectiles/rocket.png"), 0, 0, 16, 8, 1, 1, true, false);
                break;
            case 'blast':
                Projectile.animation = new Animation(ASSET_MANAGER.getAsset( //Null animation
                    "./Projectiles/Arrow.png"), 0, 0, 0, 0, 1, 1, true, false);
                break;
            case 'mortar':
                Projectile.animation = new Animation(ASSET_MANAGER.getAsset(
                    "./Projectiles/mortar.png"), 0, 0, 12, 12, 1, 1, true, false);
                break;
            case 'bottle':
                Projectile.animation = new Animation(ASSET_MANAGER.getAsset(
                    "./Projectiles/bottle.png"), 0, 0, 16, 6, 1, 1, true, false);
                break;
            case 'burn':
                Projectile.animation = new Animation(ASSET_MANAGER.getAsset( //Null animation
                    "./Projectiles/Arrow.png"), 0, 0, 0, 0, 1, 1, true, false);
                break;
            case 'bile':
                Projectile.animation = new Animation(ASSET_MANAGER.getAsset(
                    "./Projectiles/bile.png"), 0, 0, 54, 30, 1, 1, true, false);
                break;
            case 'spraybottle':
                Projectile.animation = new Animation(ASSET_MANAGER.getAsset( //Null animation
                    "./Projectiles/Arrow.png"), 0, 0, 0, 0, 1, 1, true, false);
                break;
            case 'newspaper':
                Projectile.animation = new Animation(ASSET_MANAGER.getAsset( //Null animation
                    "./Projectiles/Arrow.png"), 0, 0, 0, 0, 1, 1, true, false);
                break;
        }
    }

    Projectile.boosterAnimation = new Animation(ASSET_MANAGER.getAsset(
        "./effects/rocketBooster.png"), 0, 0, 11, 6, 1, 1, true, false);
    Projectile.explosionAnimation = new Animation(ASSET_MANAGER.getAsset(
        "./effects/explosion.png"), 0, 0, 128, 128, 0.015, 11, false, false);
    Projectile.fireAnimation = new Animation(ASSET_MANAGER.getAsset(
        "./effects/fire.png"), 0, 1, 132, 16, 0.04, 16, false, false);

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
        if(Projectile.explosion == true) {
            Projectile.explosionAnimation.drawFrame(deltaTime, context, Projectile.heading * this.pos.x-64, this.pos.y-64);
        } else if (Projectile.fire == true) {
            Projectile.fireAnimation.drawFrame(deltaTime, context, Projectile.heading * this.pos.x-50, this.pos.y + 20);
        }
        if(name == 'fireball') {
            Projectile.animation.drawFrame(deltaTime, context, (Projectile.heading * this.pos.x - Projectile.size.x/2), (this.pos.y - Projectile.size.y/2), 1/8);
        } else if(name == 'bile') {
            Projectile.animation.drawFrame(deltaTime, context, Projectile.heading * this.pos.x - 15, this.pos.y + 3);
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
        } else if (name == 'clone') {
            Projectile.animation.drawFrame(deltaTime, context, Projectile.heading * this.pos.x, this.pos.y);
        } else if (name == 'rocket' && Projectile.explosion == false) {
            Projectile.throw.setSpeed(Projectile.speed<25000 ? Projectile.speed*=1.1 : Projectile.speed);
            Projectile.animation.drawFrame(deltaTime, context, Projectile.heading * this.pos.x, this.pos.y);
            if(Projectile.speed>=10000) {
                Projectile.boosterAnimation.drawFrame(deltaTime, context, Projectile.heading * this.pos.x - 11, this.pos.y);
            }
        } else if (name == 'mortar' && Projectile.explosion == false) {
            Projectile.animation.drawFrame(deltaTime, context, Projectile.heading * this.pos.x, this.pos.y);
        } else if (name == 'bottle' && Projectile.fire == false) {
            if(Projectile.vel.y < 400) {
                Projectile.vel.y*=1.05;
            }
            Projectile.throw.setSpeed(Projectile.speed<30000 ? Projectile.speed*=1.2 : Projectile.speed);
            Projectile.animation.drawFrame(deltaTime, context, Projectile.heading * this.pos.x, this.pos.y);
        }
        context.restore();
    }

    Projectile.updateAnimation();
    return Projectile;
}


function ThrowProjectile(name, originEntity, damageModifier) {
    if(name == 'forcePush') {
        levelObject.addTempEntity(createProjectile(name, originEntity, damageModifier), 150)
    } else if (name == 'punch' || name == 'dagger') {
        levelObject.addTempEntity(createProjectile(name, originEntity, damageModifier), 60)
    } else if (name == 'kick' || name == 'uppercut' || name == 'newspaper') {
        levelObject.addTempEntity(createProjectile(name, originEntity, damageModifier), 50)
    } else if (name == 'slam') {
        levelObject.addTempEntity(createProjectile(name, originEntity, damageModifier), 300)
    } else if (name == 'zap') {
        levelObject.addTempEntity(createProjectile(name, originEntity, damageModifier), 180)
    } else if (name == 'laser') {
        levelObject.addTempEntity(createProjectile(name, originEntity, damageModifier), 150)
    } else if (name == 'clone') {
        levelObject.addTempEntity(createProjectile(name, originEntity, damageModifier), 500)
    } else if (name == 'slash') {
        levelObject.addTempEntity(createProjectile(name, originEntity, damageModifier), 110)
    } else if (name == 'shield') {
        levelObject.addTempEntity(createProjectile(name, originEntity, damageModifier), 100)
    } else if (name == 'spin') {
        levelObject.addTempEntity(createProjectile(name, originEntity, damageModifier), 50)
    } else if (name == 'blast') {
        levelObject.addTempEntity(createProjectile(name, originEntity, damageModifier), 70)
    } else if (name == 'burn') {
        levelObject.addTempEntity(createProjectile(name, originEntity, damageModifier), 120)
    } else if (name == 'spraybottle') {
        levelObject.addTempEntity(createProjectile(name, originEntity, damageModifier), 260)
    } else {
        levelObject.addEntity(createProjectile(name, originEntity, damageModifier));
    }
}
