function selectLevel(canvas, context, Cselected) {
  Promise.all([
    createCursor('cursor'),
    loadScene('levelSelect'),
])
.then(([Cursor, Scene]) => {
    //console.log('level got passed: '+ Cselected);
    Scene.addEntity(Cursor);  //add cursor to the scene
    Cursor.pos.set(83 + 250, 275);
    
    choiceRow = 0;
    choiceCol = 0;
    LChoices = [
      ['PinkCity', 'FutureTown', 'FutureCity', 'Waterfall'],
      ['LightMeows', 'FutureTown', 'FutureCity', 'Waterfall']
    ];

    //cursor movement
    cursorHandler = function(e) {
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
    this.addEventListener('keypress', cursorHandler, false);

    Lselected = LChoices[choiceRow][choiceCol];

    //Timer for the Level Selection Screen
    const LevTimer = new Timer(deltaTime);
    LevTimer.update = function update(deltaTime) {
    Scene.update(deltaTime);
    Scene.comp.draw(context);
    }

    LevTimer.start(); //timer start

    // next screen --------------------
    charNextHandler = function(e) {
      if (e.code === 'Enter') {
        //console.log('Level selected: ' + LChoices[choiceRow][choiceCol]);
        //delete scene ---------------------------------------------------
        LevTimer.update = function update(deltaTime) {/*end timer*/}
        Scene.removeEntity(Cursor);
        Scene.clearScene();
        //----------------------------------------------------------------
        displayFightScene(canvas, context, LChoices[choiceRow][choiceCol], Cselected);
        this.removeEventListener('keypress', cursorHandler, false);
        this.removeEventListener('keypress', charNextHandler, false);
        return Lselected;
      }
    };
    //move to the next scene
    this.addEventListener('keypress', charNextHandler, false);


    return Lselected; //returns what Level was selected
    });
}
