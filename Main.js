// import Timer from './Timer.js';
// import {loadLevel} from './loaders.js';
// import {createCharacter} from './entities.js';
// import {setupKeyboard} from './input.js';
// import {createCollisionLayer} from './layers.js';
// import {setUpControllers, controllerUpdate} from './Controllers.js';



const canvas = document.getElementById('gameWorld');
const context = canvas.getContext('2d');



Promise.all([
    createCharacter(),
    loadLevel('PinkCity'),
])
.then(([Character, level]) => {

    
    Character.pos.set(400, 180); //sets the character1 position
    
    level.comp.layers.push(createCollisionLayer(level));
    level.entities.add(Character); //adds character to the level


    const input = setupKeyboard(Character);
    const controllerInput = setUpControllers(Character);
    
    ['mousedown', 'mousemove'].forEach(eventName => {
        canvas.addEventListener(eventName, event => {
            if (event.buttons === 1) {
                Character.vel.set(0, 0);
                Character.pos.set(event.offsetX, event.offsetY);
            }
        });
    });
    
    input.listenTo(window);
    

   
    
    const timer = new Timer(1/60);
    timer.update = function update(deltaTime) {
        level.update(deltaTime);
        level.comp.draw(context);
        
        
        
    }

    timer.start();
});
