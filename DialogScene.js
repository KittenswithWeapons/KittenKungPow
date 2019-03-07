var dialogNum = 1

function dialogScene(canvas, context, dialogNum) {
  Promise.all([
    loadDialog('dialog', dialogNum),
])
.then(([Scene]) => {



    //Timer for the Character Selection Screen
    masterTimer.update = function update(deltaTime) {
    Scene.update(deltaTime);
    Scene.comp.draw(context);
    }

    // next screen --------------------
    charNextHandler = function(e) {
      if (e.code === 'Enter') {
        //delete scene ---------------------------------------------------
        Scene.clearScene();
        this.removeEventListener('keydown', charNextHandler, false);
        //----------------------------------------------------------------
        displaySinglePlayer(singleplayerCharSel)  //SinglePlayer tester
      }
    };
    //move to the next scene
    this.addEventListener('keydown', charNextHandler, false);
    });
}
