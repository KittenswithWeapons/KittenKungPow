function selectCharacters(canvas, context) {
  Promise.all([
    createCursor('cursor'),
    loadScene('Character_SelectScreen'),
])
.then(([Cursor, Scene]) => {

    Scene.addEntity(Cursor);  //add cursor to the scene
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



    CseletedNum = 0;  //character selected
    Cselected = new Array();  //character selection array
    CChoices = new Array('Karate Cat','Second Cat','3','4','5','6','7','8');  //character choices array


    //default values, delete later
    Cselected[0] = CChoices[CseletedNum];
    Cselected[1] = CChoices[CseletedNum + 1];


    //Timer for the Character Selection Screen
    const CharTimer = new Timer(deltaTime);
    CharTimer.update = function update(deltaTime) {
    Scene.update(deltaTime);
    Scene.comp.draw(context);
    }

    CharTimer.start(); //timer start

    // next screen --------------------
    charNextHandler = function(e) {
      var key = e.which || e.keyCode;
      if (key === 13) { // 13 is enter
        console.log('characters selected: ' + Cselected);
        //delete scene ---------------------------------------------------
        CharTimer.update = function update(deltaTime) {/*end timer*/}
        Scene.removeEntity(Cursor);
        //----------------------------------------------------------------
        displayLevelSelectScene(canvas, context);
        this.removeEventListener('keypress', charNextHandler, false);
      }
    };
    //move to the next scene
    this.addEventListener('keypress', charNextHandler, false);


    return Cselected; //returns what character was selected
    });
}
