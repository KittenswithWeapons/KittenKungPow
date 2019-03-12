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
        //-------------------------------------------------------------------------------------A
        if (controllers[0].buttons[0].pressed){  // A button
          if (controllers[0].A_buttonPressed === false) {
            controllers[0].A_buttonPressed = true;
            // do A button stuff
            Scene.removeEntity(Cursor);
            Scene.clearScene();
            this.removeEventListener('keydown', levelCursorHandler, false);
            this.removeEventListener('keydown', levelNextHandler, false);
            //----------------------------------------------------------------
            displayFightScene(canvas, context, LChoices[choiceRow][choiceCol], Cselected);
            return Lselected;
            //
          }
        } else {
          controllers[0].A_buttonPressed = false;
        }
        //-------------------------------------------------------------------------------------A END

        // B Button-----------------------------------------------------------------
        if (controllers[0].buttons[1].pressed){  // B button???
          if (controllers[0].B_buttonPressed === false) {
            controllers[0].B_buttonPressed = true;
            // do B button stuff
            displayCharSelectScene(canvas, context);
            //
          }
        } else {
          controllers[0].B_buttonPressed = false;
        }
        //--------------------------------------------------------------------------


//JOYSTICK SECTION----------------------------------------------------------
//------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------
//left JOYSTICK
//------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------
        //left right action
    		if (controllers[0].axes[0] > 0.4) { //go right
          if (!right) {
            if(choiceCol < LChoices[choiceRow].length-1) {
              choiceCol++;
              Cursor.pos.x += 256 + 30;
            }
            right = true;
          }
    			//console.log('RIGHT');
    		} else if (controllers[0].axes[0] < -0.4) { //go left
            if (!left) {
              if(choiceCol > 0) {
                choiceCol--;
                Cursor.pos.x -= 256 + 30;
              }
              left = true
            }
    			//console.log('LEFT');
    		} else if (controllers[0].axes[0] < 0.4 & controllers[0].axes[0] > -0.4 ) { // stops the kitty
          right = false;
          left = false;
    		}

        //updown
        if (controllers[0].axes[1] > 0.5) { //go down
          if (!down) {
            down = true;
            if(choiceRow < LChoices.length-1) {
              choiceRow++;
              Cursor.pos.y += 288;
            }
          }
        } else if (controllers[0].axes[1] < -0.5) { //go up
            if (!up) {
              up = true;
              if(choiceRow > 0) {
                choiceRow--;
                Cursor.pos.y -= 288;
              }
            }
        } else if (controllers[0].axes[1] < 0.5 & controllers[0].axes[1] > -0.5 ) { // stops the kitty
          //do nothing
          down = false;
          up = false;
        }
//------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------
//end left JOYSTICK
//------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------



      }
    }


    return Lselected; //returns what Level was selected
    });
}
