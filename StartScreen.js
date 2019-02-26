function startScreen(canvas, context) {
  Promise.all([
    loadScene('TitleScreen2'),
])
.then(([StartScene]) => {


    //sound
    mainMusic = new sound('./sound/MainTheme.wav');
    mainMusic.sound.volume = .04; //main theme volume
    mainMusic.sound.loop = true; //loops the main theme
    mainMusic.play(); //plays the main theme

    //Timer for the Start Screen
    const sTimer = new Timer(deltaTime);
    sTimer.update = function update(deltaTime) {
    StartScene.update(deltaTime);
    StartScene.comp.draw(context);
    }

    sTimer.start(); //timer start

    // next screen --------------------
    nextHandler = function(e) {
      if (e.code === 'Enter') {
        //console.log('Level selected: ' + LChoices[choiceRow][choiceCol]);
        //delete scene ---------------------------------------------------
        mainMusic.stop(); //stops the main music
        sTimer.update = function update(deltaTime) {/*end timer*/}
        StartScene.clearScene();
        //----------------------------------------------------------------
        displayCharSelectScene(canvas, context);
        this.removeEventListener('keypress', nextHandler, false);
        return;
      }
    };
    //move to the next scene
    this.addEventListener('keypress', nextHandler, false);
    });
    return;
}
