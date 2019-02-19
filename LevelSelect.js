function selectLevel(canvas, context) {
  Promise.all([
    createCursor('cursor'),
    loadScene('Level_SelectBackground'),
])
.then(([Cursor, Scene]) => {

    Scene.addEntity(Cursor);  //add cursor to the scene
    Cursor.pos.set(410, 275);
    //cursor movement
    cursorHandler = function(e) {
      var key = e.which || e.keyCode;
      //console.log(key);
      if (key === 100) {    //right
        //console.log('keyed');
        Cursor.pos.x += 200;
      }
      if (key === 97) {    //left
        //console.log('keyed');
        Cursor.pos.x -= 200;
      }
      if (key === 115) {    //down
        //console.log('keyed');
        Cursor.pos.y += 250;
      }
      if (key === 119) {     //up
        //console.log('keyed');
        Cursor.pos.y -= 250;
      }
    };
    //adds cursor control to window
    this.addEventListener('keypress', cursorHandler, false);



    LseletedNum = 0;  //Level selected
    Lselected = new Array();  //Level selection array
    LChoices = new Array('PinkCity','2','3','4','5','6','7','8');  //character choices array


    //default values, delete later
    Lselected[0] = LChoices[LseletedNum];
    Lselected[1] = LChoices[LseletedNum + 1];


    //Timer for the Level Selection Screen
    const LevTimer = new Timer(deltaTime);
    LevTimer.update = function update(deltaTime) {
    Scene.update(deltaTime);
    Scene.comp.draw(context);
    }

    LevTimer.start(); //timer start

    // next screen --------------------
    charNextHandler = function(e) {
      var key = e.which || e.keyCode;
      if (key === 13) { // 13 is enter
        console.log('characters selected: ' + Lselected);
        //delete scene ---------------------------------------------------
        LevTimer.update = function update(deltaTime) {/*end timer*/}
        Scene.removeEntity(Cursor);
        //----------------------------------------------------------------
        displayFightScene(canvas, context);
        this.removeEventListener('keypress', charNextHandler, false);
      }
    };
    //move to the next scene
    this.addEventListener('keypress', charNextHandler, false);


    return Lselected; //returns what Level was selected
    });
}
