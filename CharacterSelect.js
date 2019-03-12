upCushion = 0;
downCushion = 0;
function selectCharacters(canvas, context) {
  Promise.all([
    createCursor('cursor'),

    createCharacterPreview('karate', 0),
    createCharacterPreview('archer', 1),
    createCharacterPreview('wizard', 2),
    createCharacterPreview('rogue', 3),
    createCharacterPreview('warrior', 4),
    createCharacterPreview('soldier', 5),
    createCharacterPreview('vagrant', 6),
    createCharacterPreview('fatCat', 7),

    //loadScene('Char_SelectBackground'),
    loadScene('charSelect'),
])
.then(([Cursor, KarateKat, Archer, Wizard, Rogue, Warrior, Soldier, Vagrant, FatCat, Scene]) => {

    setUpControllers();

    Scene.addEntity(KarateKat);
    KarateKat.pos.set(175, 115);

    Scene.addEntity(Archer);
    Archer.pos.set(445, 115);

    Scene.addEntity(Wizard);
    Wizard.pos.set(725, 115);

    Scene.addEntity(Rogue);
    Rogue.pos.set(1000, 115);

    Scene.addEntity(Warrior);
    Warrior.pos.set(175, 335);

    Scene.addEntity(Soldier);
    Soldier.pos.set(445, 335);

    Scene.addEntity(Vagrant);
    Vagrant.pos.set(725, 335);

    Scene.addEntity(FatCat);
    FatCat.pos.set(1000, 335);

    choiceRow = 0;
    choiceCol = 0;
    CChoices = [
      ['0', '1', '2', '3'],
      ['4', '5', '6', '7']
    ];

    Scene.addEntity(Cursor);  //add cursor to the scene
    //cursor movement
    characterCursorHandler = function(e) {
      var key = e.which || e.keyCode;
      //console.log(key);
      if (e.code === 'KeyD') {    //right
        if(choiceCol < CChoices[choiceRow].length-1) {
          choiceCol++;
          Cursor.pos.x += 275;
        }
      }
      if (e.code === 'KeyA') {    //left
        if(choiceCol > 0) {
          choiceCol--;
          Cursor.pos.x -= 275;
        }
      }
      if (e.code === 'KeyS') {    //down
        if(choiceRow < CChoices.length-1) {
          choiceRow++;
          Cursor.pos.y += 220;
        }
      }
      if (e.code === 'KeyW') {     //up
        if(choiceRow > 0) {
          choiceRow--;
          Cursor.pos.y -= 220;
        }
      }
    };
    //adds cursor control to window
    this.addEventListener('keydown', characterCursorHandler, false);



    var CselectedNum = CChoices[choiceRow][choiceCol];  //character selected
    Cselected = new Array();  //character selection array




    //Timer for the Character Selection Screen
    masterTimer.update = function update(deltaTime) {
    Scene.update(deltaTime);
    Scene.comp.draw(context);
    controllerMenuUpdate(Scene);
    }



    // next screen --------------------
    charNextHandler = function(e) {
      if (e.code === 'Enter') {
        Cselected[0] = CChoices[CselectedNum];
        //console.log('characters selected: ' + CChoices[choiceRow][choiceCol]);
        //delete scene ---------------------------------------------------
        Scene.removeEntity(Cursor);
        Scene.clearScene();
        this.removeEventListener('keydown', characterCursorHandler, false);
        this.removeEventListener('keydown', charNextHandler, false);
        //----------------------------------------------------------------
        if(singlePlayerFlag) {
          singleplayerCharSel = CChoices[choiceRow][choiceCol]
          SINGPLEPLAYERLIFECOUNT = LIVES;
          //displaySinglePlayer(singleplayerCharSel);  //SinglePlayer
          dialogScene(canvas, context, dialogNum);
        } else {
          displayLevelSelectScene(canvas, context, CChoices[choiceRow][choiceCol]);
        }
        return CChoices[choiceRow][choiceCol];
      }

      if (e.code === 'ArrowLeft') { //switch modes
        singlePlayerFlag = false;
        }
      if (e.code === 'ArrowRight') {
        singlePlayerFlag = true;
        }
      if (e.code === 'ArrowUp') { //increment lives
        if(LIVES < 5) {
          LIVES++;
        }
      }
      if (e.code === 'ArrowDown') { //decrement lives
        if(LIVES > 1) {
          LIVES--;
        }
      }
    };
    //move to the next scene
    this.addEventListener('keydown', charNextHandler, false);


    function controllerMenuUpdate(Scene) {                 //controller support
      if (controllers[0] != null){
        //-------------------------------------------------------------------------------------A
        if (controllers[0].buttons[0].pressed){  // A button
          if (controllers[0].A_buttonPressed === false) {
            controllers[0].A_buttonPressed = true;
            // do Start button stuff
            Cselected[0] = CChoices[CselectedNum];
            //console.log('characters selected: ' + CChoices[choiceRow][choiceCol]);
            //delete scene ---------------------------------------------------
            Scene.removeEntity(Cursor);
            Scene.clearScene();
            this.removeEventListener('keydown', characterCursorHandler, false);
            this.removeEventListener('keydown', charNextHandler, false);
            //----------------------------------------------------------------
            if(singlePlayerFlag) {
              singleplayerCharSel = CChoices[choiceRow][choiceCol]
              SINGPLEPLAYERLIFECOUNT = LIVES;
              //displaySinglePlayer(singleplayerCharSel);  //SinglePlayer
              dialogScene(canvas, context, dialogNum);
            } else {
              displayLevelSelectScene(canvas, context, CChoices[choiceRow][choiceCol]);
            }
            return CChoices[choiceRow][choiceCol];
            //
          }
        } else {
          controllers[0].A_buttonPressed = false;
        }
        //-------------------------------------------------------------------------------------A END


//JOYSTICK SECTION----------------------------------------------------------
//------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------
//left JOYSTICK
//------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------
        //left right action
    		if (controllers[0].axes[0] > 0.4) { //go right
          if (!right) {
            if(choiceCol < CChoices[choiceRow].length-1) {
              choiceCol++;
              Cursor.pos.x += 275;
            }
            right = true;
          }
    			//console.log('RIGHT');
    		} else if (controllers[0].axes[0] < -0.4) { //go left
            if (!left) {
              if(choiceCol > 0) {
                choiceCol--;
                Cursor.pos.x -= 275;
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
            if(choiceRow < CChoices.length-1) {
              choiceRow++;
              Cursor.pos.y += 220;
            }
          }
        } else if (controllers[0].axes[1] < -0.5) { //go up
            if (!up) {
              up = true;
              if(choiceRow > 0) {
                choiceRow--;
                Cursor.pos.y -= 220;
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


//------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------
//Right JOYSTICK
//------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------
        //left right action
    		if (controllers[0].axes[2] > 0.4) { //go right
          if (!right) {
            singlePlayerFlag = true;
            rright = true;
          }
    			//console.log('RIGHT');
    		} else if (controllers[0].axes[2] < -0.4) { //go left
            if (!left) {
              singlePlayerFlag = false;
              rleft = true
            }
    			//console.log('LEFT');
    		} else if (controllers[0].axes[2] < 0.4 & controllers[0].axes[2] > -0.4 ) { // stops the kitty
          rright = false;
          rleft = false;
    		}

        //updown
        if (controllers[0].axes[3] > 0.8) { //go down
          if (!down) {
            rdown = true;
            downCushion++;
            if(LIVES > 1 && downCushion > 6) {
              LIVES--;
              downCushion = 0;
            }
          }
        } else if (controllers[0].axes[3] < -0.8) { //go up
            if (!up) {
              rup = true;
              upCushion++;
              if(LIVES < 5 && upCushion > 6) {
                LIVES++;
                upCushion = 0;
              }
            }
        } else if (controllers[0].axes[3] < 0.8 & controllers[0].axes[3] > -0.8 ) { // stops the kitty
          //do nothing
          rdown = false;
          rup = false;
        }
//------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------
//end right JOYSTICK
//------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------


      }
    }


    return CChoices[choiceRow][choiceCol]; //returns what character was selected
    });
}
