function setupKeyboard(entity) {

    const input = new keyBoardState(); //new keyboard


    input.addMapping('Space', keyState => { //jump
        //console.log(keyState);
        if (keyState) {
            entity.jump.start();
            entity.Jumping = true;
            entity.updateAnimation();
        } else {
            entity.Jumping = false;
            entity.jump.cancel();
            entity.updateAnimation();
        }
    });
    
    input.addMapping('KeyW', keyState => { //jump
        //console.log(keyState);
        if (keyState) {
            entity.jump.start();
            entity.Jumping = true;
            entity.updateAnimation();
        } else {
            entity.Jumping = false;
            entity.jump.cancel();
            entity.updateAnimation();
        }
    });
    
    input.addMapping('KeyE', keyState => { //Fireball
        if (keyState) {
          if (!entity.Throwing) {
          entity.Throwing = true;
          entity.updateAnimation();
          ThrowProjectile("fireball", entity);
        } else {entity.updateAnimation(); console.log('double try');}
        } else {
          entity.Throwing = false;
          entity.updateAnimation();
        }
    });

    input.addMapping('KeyF', keyState => { //punch
        if (keyState) {
          entity.punch.start();
          entity.Punching = true;
          entity.updateAnimation();
        } else {
          entity.Punching = false;
            entity.punch.cancel();
          entity.updateAnimation();
        }
    });


    input.addMapping('KeyD', keyState => { //go right
        if (keyState) {
          entity.go.dir = keyState;
          entity.updateAnimation();
        } else {
            entity.go.dir = 0;
            entity.updateAnimation();
        }

    });

    input.addMapping('KeyA', keyState => { //go left
        if (keyState) {
          entity.go.dir = -keyState;
          entity.updateAnimation();
        } else {
            entity.go.dir = 0;
            entity.updateAnimation();
        }
    });

		input.addMapping('KeyS', keyState => { //go left
        if (keyState) {
					entity.passdown.start();
				} else {
					entity.passdown.cancel();
				}

    });

    input.addMapping('KeyC', keyState => { //Enable Computer Control

    });

    return input;

}
