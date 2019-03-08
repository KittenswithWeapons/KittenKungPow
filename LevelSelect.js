function selectLevel(canvas, context, Cselected) {
  Promise.all([
    createCursor('cursor'),
    loadScene('levelSelect'),
])
.then(([Cursor, Scene]) => {
    setUpControllers();
    //console.log('level got passed: '+ Cselected);
    Scene.addEntity(Cursor);  //add cursor to the scene
    Cursor.pos.set(83 + 250, 275);

    choiceRow = 0;
    choiceCol = 0;
    LChoices = [
      ['PinkCity', 'FutureTown', 'FutureCity', 'Waterfall'],
      ['LightMeows', 'BlueNight', 'Ocean', 'Dojo']
    ];

    //cursor movement
    levelCursorHandler = function(e) {
      var key = e.which || e.keyCode;
      //console.log(key);
      if (e.code === 'KeyD') {    //right
        if(choiceCol < LChoices[choiceRow].length-1) {
          choiceCol++;
          Cursor.pos.x += 256 + 30;
        }
      }
      if (e.code === 'KeyA') {    //left
        if(choiceCol > 0) {
          choiceCol--;
          Cursor.pos.x -= 256 + 30;
        }
      }
      if (e.code === 'KeyS') {    //down
        if(choiceRow < LChoices.length-1) {
          choiceRow++;
          Cursor.pos.y += 288;
        }
      }
      if (e.code === 'KeyW') {     //up
        if(choiceRow > 0) {
          choiceRow--;
          Cursor.pos.y -= 288;
        }
      }
    };
    //adds cursor control to window
    this.addEventListener('keydown', levelCursorHandler, false);

    Lselected = LChoices[choiceRow][choiceCol];

    //Timer for the Level Selection Screen

    masterTimer.update = function update(deltaTime) {
    Scene.update(deltaTime);
    Scene.comp.draw(context);
    controllerMenuUpdate(Scene);
    //console.log('Level update');
    }


    // next screen --------------------
    levelNextHandler = function(e) {
      if (e.code === 'Enter') {
        //console.log('Level selected: ' + LChoices[choiceRow][choiceCol]);
        //delete scene ---------------------------------------------------
        Scene.removeEntity(Cursor);
        Scene.clearScene();
        this.removeEventListener('keydown', levelCursorHandler, false);
        this.removeEventListener('keydown', levelNextHandler, false);
        //----------------------------------------------------------------
        displayFightScene(canvas, context, LChoices[choiceRow][choiceCol], Cselected);
        return Lselected;
      }
    };
    //move to the next scene
    this.addEventListener('keydown', levelNextHandler, false);



    function controllerMenuUpdate(Scene) {                 //controller support
      if (controllers[0] != null){


        if (controllers[0].buttons[9].pressed){  // Y button???
          if (controllers[0].Start_buttonPressed === false) {
            controllers[0].Start_buttonPressed = true;
            // do Start button stuff
            //console.log('Level selected: ' + LChoices[choiceRow][choiceCol]);
            //delete scene ---------------------------------------------------
            Scene.removeEntity(Cursor);
            Scene.clearScene();
            this.removeEventListener('keydown', levelCursorHandler, false);
            this.removeEventListener('keydown', levelNextHandler, false);
            //----------------------------------------------------------------
            displayFightScene(canvas, context, LChoices[choiceRow][choiceCol], Cselected);
            return Lselected;
            // START BUTTON END
          }
        } else {
          controllers[0].Start_buttonPressed = false;
        }





      }
    }


    return Lselected; //returns what Level was selected
    });
}
