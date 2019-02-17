function setupKeyboard(entity) {

    const input = new keyBoardState(); //new keyboard


    input.addMapping('Space', keyState => { //jump
        //console.log(keyState);
        if (keyState) {
            entity.Jumping = true;
            entity.grounded = false;
            entity.jump.start();
            entity.updateAnimation();
        } else {
            entity.Jumping = false;
            entity.updateAnimation();
        }
    });

    input.addMapping('ArrowLeft', keyState => { //punch
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

    input.addMapping('ArrowUp', keyState => { //Fireball 
        if (keyState) {
          if (!entity.Throwing) {
            entity.Throwing = true;
            entity.updateAnimation();
            window.setTimeout(function() {
            ThrowProjectile("fireball", entity);
            entity.Throwing = false;
            entity.updateAnimation();} , 280)
          }
        }
    });

    var goRight = false;
    var goLeft = false;
    input.addMapping('KeyD', keyState => { //go right
        if (keyState) {
          goRight = true;
          entity.go.dir += 1;
          entity.updateAnimation();
        } else {
          entity.go.dir -= 1;
          goRight = false;
          entity.updateAnimation();
        }

    });

    input.addMapping('KeyA', keyState => { //go left
        if (keyState) {
          goLeft = true;
          entity.go.dir -= 1;
          entity.updateAnimation();
        } else {
          entity.go.dir += 1;
          goLeft = false;
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

    input.addMapping('Digit1', keyState => {if (keyState) entity.choice = 0; entity.updateAnimation();});
    input.addMapping('Digit2', keyState => {if (keyState) entity.choice = 1; entity.updateAnimation();});
    input.addMapping('Digit3', keyState => {if (keyState) entity.choice = 2; entity.updateAnimation();});
    input.addMapping('Digit4', keyState => {if (keyState) entity.choice = 3; entity.updateAnimation();});
    input.addMapping('Digit5', keyState => {if (keyState) entity.choice = 4; entity.updateAnimation();});
    input.addMapping('Digit6', keyState => {if (keyState) entity.choice = 5; entity.updateAnimation();});
    input.addMapping('Digit7', keyState => {if (keyState) entity.choice = 6; entity.updateAnimation();});
    input.addMapping('Digit8', keyState => {if (keyState) entity.choice = 7; entity.updateAnimation();});


    return input;

}
