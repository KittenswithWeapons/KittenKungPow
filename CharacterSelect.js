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
    cursorHandler = function(e) {
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
    this.addEventListener('keypress', cursorHandler, false);



    var CselectedNum = CChoices[choiceRow][choiceCol];  //character selected
    Cselected = new Array();  //character selection array



    //Timer for the Character Selection Screen
    const CharTimer = new Timer(deltaTime);
    CharTimer.update = function update(deltaTime) {
    Scene.update(deltaTime);
    Scene.comp.draw(context);
    }

    CharTimer.start(); //timer start

    // next screen --------------------
    charNextHandler = function(e) {
      if (e.code === 'Enter') {
        Cselected[0] = CChoices[CselectedNum];
        //console.log('characters selected: ' + CChoices[choiceRow][choiceCol]);
        //delete scene ---------------------------------------------------
        CharTimer.update = function update(deltaTime) {/*end timer*/}
        Scene.removeEntity(Cursor);
        Scene.clearScene();
        //----------------------------------------------------------------
        displayLevelSelectScene(canvas, context, CChoices[choiceRow][choiceCol]);
        this.removeEventListener('keypress', cursorHandler, false);
        this.removeEventListener('keypress', charNextHandler, false);
        return CChoices[choiceRow][choiceCol];
      }
    };
    //move to the next scene
    this.addEventListener('keypress', charNextHandler, false);


    return CChoices[choiceRow][choiceCol]; //returns what character was selected
    });
}
