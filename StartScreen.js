function startScreen(canvas, context) {
  Promise.all([
    createTitleCat('titlecat'),
    loadScene('TitleScreen3'),
])
.then(([TitleCat, StartScene]) => {

    setUpControllers();

    StartScene.addEntity(TitleCat);
    TitleCat.pos.set(370, 390);

    //sound
    mainMusic = new sound('./sound/MainTheme.wav');
    mainMusic.sound.volume = .05; //main theme volume
    mainMusic.sound.loop = true; //loops the main theme
    mainMusic.play(); //plays the main theme

    //Timer for the Start Screen

    masterTimer.update = function update(deltaTime) {
    StartScene.update(deltaTime);
    StartScene.comp.draw(context);
    controllerMenuUpdate(StartScene);
    }

    // next screen --------------------
    nextHandler = function(e) {
      if (e.code === 'Enter') {
        //console.log('Level selected: ' + LChoices[choiceRow][choiceCol]);
        //delete scene ---------------------------------------------------
        mainMusic.stop(); //stops the main music
        StartScene.clearScene();
        //----------------------------------------------------------------
        displayCharSelectScene(canvas, context);
        this.removeEventListener('keydown', nextHandler, false);
        return;
      }
    };
    //move to the next scene
    this.addEventListener('keydown', nextHandler, false);
    });

    function controllerMenuUpdate(StartScene) {                 //controller support
      if (controllers[0] != null){
        if (controllers[0].buttons[9].pressed){  // Y button???
          if (controllers[0].Start_buttonPressed === false) {
            controllers[0].Start_buttonPressed = true;
            // do Start button stuff
            mainMusic.stop(); //stops the main music
            StartScene.clearScene();
            //----------------------------------------------------------------
            displayCharSelectScene(canvas, context);
            this.removeEventListener('keydown', nextHandler, false);
            //
          }
        } else {
          controllers[0].Start_buttonPressed = false;
        }
      }
    }

    return;
}
