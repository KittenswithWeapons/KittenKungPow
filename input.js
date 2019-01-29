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

    input.addMapping('ArrowRight', keyState => { //go right
        entity.go.dir = keyState;
        
    });

    input.addMapping('KeyA', keyState => { //go left
        entity.go.dir = -keyState;
    });

    input.addMapping('ArrowLeft', keyState => { //go left
        entity.go.dir = -keyState;
    });

    input.addMapping('KeyC', keyState => { //Enable Computer Control
        
    });

    return input;   
    
}






