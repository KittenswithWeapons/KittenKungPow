function startScreen(canvas, context) {
  Promise.all([
    loadScene('TitleScreen2'),
])
.then(([Scene]) => {


    //sound
    mainMusic = new sound('./sound/MainTheme.wav');
    mainMusic.sound.volume = .04; //main theme volume
    mainMusic.sound.loop = true; //loops the main theme
    mainMusic.play(); //plays the main theme

    //Timer for the Start Screen
    const sTimer = new Timer(deltaTime);
    sTimer.update = function update(deltaTime) {
    Scene.update(deltaTime);
    Scene.comp.draw(context);
    }

    sTimer.start(); //timer start

    // next screen --------------------
    nextHandler = function(e) {
      if (e.code === 'Enter') {
        //console.log('Level selected: ' + LChoices[choiceRow][choiceCol]);
        //delete scene ---------------------------------------------------
        mainMusic.stop(); //stops the main music
        sTimer.update = function update(deltaTime) {/*end timer*/}
        Scene.clearScene();
        //----------------------------------------------------------------
        displayCharSelectScene(canvas, context);
      }
    };
    //move to the next scene
    this.addEventListener('keypress', nextHandler, false);
    });
}
