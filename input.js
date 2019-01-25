// import Keyboard from './KeyboardState.js';



// export 
function setupKeyboard(entity) {

    const input = new Keyboard(); //new keyboard


    input.addMapping('Space', keyState => { //jump
        if (keyState) {
            entity.jump.start();
        } else {
            entity.jump.cancel();
        }
    });

    input.addMapping('KeyD', keyState => { //go right
        entity.go.dir = keyState;

    });

    input.addMapping('KeyA', keyState => { //go left
        entity.go.dir = -keyState;
    });

		input.addMapping('KeyS', keyState => { //go left
        if (keyState) {
					entity.passdown.start();
				} else {
					entity.passdown.cancel();
				}

    });

    return input;

}
