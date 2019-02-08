//scene manager
function displayStartScene(context) {
  //display the Start Screen
  var img = new Image();
  img.onload = function () {context.drawImage(img, 0, 0);}
  img.src = './SceneBackgrounds/KWW_StartScreen.jpg';
}

function displayCharSelectScene(context) {
  //diplay the character selection screen
  context.clearRect(0, 0, 1280,720); // clears the drawing canvas, seems to help with the loading transition.
  //stuff
}

function displayLevelSelectScene(context) {
  //display the level selection screen
  context.clearRect(0, 0, 1280,720); // clears the drawing canvas, seems to help with the loading transition.
  //stuff
}

function displayMenuScene(context) {
  //display the menu
  context.clearRect(0, 0, 1280,720); // clears the drawing canvas, seems to help with the loading transition.
  //stuff
}

function Pause(context) {
  //pause
  var img = new Image();
  img.onload = function () {context.drawImage(img, 640 - 162, 360 - 50);} //pause img displayed
  img.src = './SceneBackgrounds/PAUSED.png';
  //pause code

  //stuff

  //unpause
  //img.remove();
}

function displayFightScene(canvas, context, levelSelection, characterSelection) {
    context.clearRect(0, 0, 1280,720); // clears the drawing canvas, seems to help with the loading transition.
    Promise.all([
      createCharacter('character'),
      createCharacter('enemy'),
      loadLevel('PinkCity'),
  ])
  .then(([Character, Enemy, level]) => {
      levelObject = level;
      Character.pos.set(400, 280); //sets the character position

      Enemy.pos.set(800, 280); Enemy.heading = -1; //sets enemy pos and heading

      level.comp.layers.push(createCollisionLayer(level));

      level.addEntity(Character); //adds character to the level
      level.addEntity(Enemy);

      //sets up controls
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

      const timer = new Timer(deltaTime);
      timer.update = function update(deltaTime) {
          level.update(deltaTime);
          level.comp.draw(context);

      }

      timer.start();
      });
}
