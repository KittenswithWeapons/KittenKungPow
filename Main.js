
const ASSET_MANAGER = new AssetManager();
//que all the asset files needed
ASSET_MANAGER.queueDownload("./characters/Karate.png");
ASSET_MANAGER.queueDownload("./Enviroment/PinkPlatform.png");
ASSET_MANAGER.queueDownload("./Enviroment/PinkCity.gif");
ASSET_MANAGER.queueDownload("./Enviroment/woodenBarrel.png");

ASSET_MANAGER.downloadAll(function () {});


Promise.all([
    createCharacter(),
    loadLevel('PinkCity'),
])
.then(([Character, level]) => {
    const canvas = document.getElementById('gameWorld');
    const context = canvas.getContext('2d');

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
