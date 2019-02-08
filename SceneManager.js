//scene manager

function displayStartScene(canvas, context) {
  //display the Start Screen
  var img = new Image();
  img.onload = function () {context.drawImage(img, 0, 0);}
  img.src = './SceneBackgrounds/KWW_StartScreen.jpg';
  // next screen --------------------
  screenNextHandler = function(e) {
    var key = e.which || e.keyCode;
    if (key === 13) { // 13 is enter
      displayCharSelectScene(canvas, context);
      this.removeEventListener('keypress', screenNextHandler, false);
    }
  };
  //move to the next scene
  this.addEventListener('keypress', screenNextHandler, false);
  // other animation or whatsnot for main splash page


}

function displayCharSelectScene(canvas, context) {
  //diplay the character selection screen
  context.clearRect(0, 0, 1280,720); // clears the drawing canvas, seems to help with the loading transition.
  var img = new Image();
  img.onload = function () {context.drawImage(img, 0, 0);}
  img.src = './SceneBackgrounds/Character_SelectScreen.jpg';
  // next screen --------------------
  charNextHandler = function(e) {
    var key = e.which || e.keyCode;
    if (key === 13) { // 13 is enter
      console.log('characters selected: ' + Cselected);
      displayLevelSelectScene(canvas, context);
      this.removeEventListener('keypress', charNextHandler, false);
    }
  };
  //move to the next scene
  this.addEventListener('keypress', charNextHandler, false);
  // character selection -------------------------------------

  Cselected = selectCharacters(canvas, context);




}






function displayLevelSelectScene(canvas, context) {
  //display the level selection screen
  context.clearRect(0, 0, 1280,720); // clears the drawing canvas, seems to help with the loading transition.
  var img = new Image();
  img.onload = function () {context.drawImage(img, 0, 0);}
  img.src = './SceneBackgrounds/Level_SelectScreen.jpg';
  // next screen --------------------
  screenNextHandler = function(e) {
    var key = e.which || e.keyCode;
    if (key === 13) { // 13 is enter
      displayFightScene(canvas, context);
      this.removeEventListener('keypress', screenNextHandler, false);
    }
  };
  //move to the next scene
  this.addEventListener('keypress', screenNextHandler, false);
  // level selection -----------------

  Lselected = selectLevel(canvas, context);





}




function displayMenuScene(canvas, context) {
  //display the menu, optional
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

    canvas.removeEventListener('keypress', function (e) {
      var key = e.which || e.keyCode;
      if (key === 13) { // 13 is enter
        console.log('enter');
      }
    });

    Promise.all([
      createCharacter('character'),
      createCharacter('enemy'),
      loadLevel('PinkCity'),
  ])
  .then(([Character, Enemy, level]) => {
      levelObject = level;
      Character.pos.set(400, 200); //sets the character position

      Enemy.pos.set(900, 280); Enemy.heading = -1; //sets enemy pos and heading

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
