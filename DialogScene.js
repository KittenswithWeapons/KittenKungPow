var dialogNum = 1

function dialogScene(canvas, context, dialogNum) {
  Promise.all([
    loadDialog('dialog', dialogNum),
])
.then(([Scene]) => {
    context.clearRect(0, 0, 1280,720); //turn this off after background added
    setUpControllers();


    //Timer for the Character Selection Screen
    masterTimer.update = function update(deltaTime) {
    Scene.update(deltaTime);
    Scene.comp.draw(context);
    controllerMenuUpdate(Scene);
    }

    // next screen --------------------
    charNextHandler = function(e) {
      if (e.code === 'Enter') {
        //delete scene ---------------------------------------------------
        Scene.clearScene();
        this.removeEventListener('keydown', charNextHandler, false);
        //----------------------------------------------------------------
        displaySinglePlayer(singleplayerCharSel);  //SinglePlayer tester
      }
    };
    //move to the next scene
    this.addEventListener('keydown', charNextHandler, false);
    });

    function controllerMenuUpdate(Scene) {                 //controller support
      if (controllers[0] != null){
        //-------------------------------------------------------------------------------------A
        if (controllers[0].buttons[0].pressed){  // A button
          if (controllers[0].A_buttonPressed === false) {
            controllers[0].A_buttonPressed = true;
            // do A button stuff
            Scene.clearScene();
            displaySinglePlayer(singleplayerCharSel);
            //
          }
        } else {
          controllers[0].A_buttonPressed = false;
        }
        //-------------------------------------------------------------------------------------A END
      }
    }
}
