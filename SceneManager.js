//scene manager

let LevelSelection;
let CharacterSelection;
var myCanvas;
var myContext;


function displayStartScene(canvas, context) {
  //context.clearRect(0, 0, 1280,720);
  myCanvas = canvas;
  myContext = context;
  startScreen(canvas, context);

}



function displayCharSelectScene(canvas, context) {
  //diplay the character selection screen allowing for character selection
  //context.clearRect(0, 0, 1280,720); // clears the drawing canvas, seems to help with the loading transition.
  // character selection -------------------------------------
  CharacterSelection = selectCharacters(canvas, context);
}



function displayLevelSelectScene(canvas, context, CSelections) {
  //display the level selection screen
  //context.clearRect(0, 0, 1280,720); // clears the drawing canvas, seems to help with the loading transition.
  // level selection----------------------------------------
  LevelSelection = selectLevel(canvas, context, CSelections);
}

function displaySinglePlayer(char) {
  SinglePlayer(myCanvas, myContext, char);
}

function displayMenuScene(canvas, context) {
  //display the menu, optional
  context.clearRect(0, 0, 1280,720); // clears the drawing canvas, seems to help with the loading transition.
  //stuff
}

function displayFightScene(canvas, context, levelSelection, characterSelection) {
    //context.clearRect(0, 0, 1280,720); // clears the drawing canvas, seems to help with the loading transition.

    console.log("returned char selection: "+ characterSelection + "    returned level selection: "+ levelSelection);

    canvas.removeEventListener('keypress', function (e) {
      var key = e.which || e.keyCode;
      if (key === 13) { // 13 is enter
        console.log('enter');
      }
    });

    var cpu1 = Math.floor(Math.random() * 8);
    var cpu2 = Math.floor(Math.random() * 8);
    var cpu3 = Math.floor(Math.random() * 8);
    while (cpu2 === cpu1) cpu2 = Math.floor(Math.random() * 8);
    while (cpu3 === cpu1 || cpu3 == cpu2) cpu3 = Math.floor(Math.random() * 8);

    //
    // remove this once all character sheets are finished to have random CPU characters
    cpu1 = 1;
    cpu2 = 3;
    cpu3 = 7;
    // remove this once all character sheets are finished to have random CPU characters
    //

    Promise.all([

      createCharacter('character', characterSelection),
      createCharacter('CPU-1', cpu1),
      createCharacter('CPU-2', cpu2),
      createCharacter('CPU-3', cpu3),
      loadLevel(levelSelection),

  ])
  .then(([Character, Enemy, Player3, Player4, level]) => {

      levelObject = level;
      if (levelSelection === 'PinkCity') {
        Character.pos.set(400, 200); //sets the character position
        Enemy.pos.set(900, 280); Enemy.heading = -1; //sets enemy pos and heading
        Player3.pos.set(450, 480); Player3.heading = 1; //sets enemy pos and heading
        Player4.pos.set(800, 480); Player4.heading = -1; //sets enemy pos and heading

        levelMusic = new sound('./sound/Wild_Pogo.mp3');
        levelMusic.sound.volume = .1; //level volume
        levelMusic.sound.loop = true; //loops the level song
        levelMusic.play(); //plays the level song
      }
      if (levelSelection === 'FutureTown') {
        Character.pos.set(300, 200); //sets the character position
        Enemy.pos.set(700, 400); Enemy.heading = -1; //sets enemy pos and heading
        Player3.pos.set(500, 200); Player3.heading = -1; //sets enemy pos and heading
        Player4.pos.set(1000, 280); Player4.heading = -1; //sets enemy pos and heading

        levelMusic = new sound('./sound/SWbattle.mp3');
        levelMusic.sound.volume = .1; //level volume
        levelMusic.sound.loop = true; //loops the level song
        levelMusic.play(); //plays the level song
      }
      if (levelSelection === 'FutureCity') {
        Character.pos.set(300, 200); //sets the character position
        Enemy.pos.set(700, 400); Enemy.heading = -1; //sets enemy pos and heading
        Player3.pos.set(500, 200); Player3.heading = -1; //sets enemy pos and heading
        Player4.pos.set(1000, 280); Player4.heading = -1; //sets enemy pos and heading

        levelMusic = new sound('./sound/PulsePower.mp3');
        levelMusic.sound.volume = .1; //level volume
        levelMusic.sound.loop = true; //loops the level song
        levelMusic.play(); //plays the level song
      }
      if (levelSelection === 'Waterfall') {
        Character.pos.set(300, 200); //sets the character position
        Enemy.pos.set(700, 400); Enemy.heading = -1; //sets enemy pos and heading
        Player3.pos.set(500, 200); Player3.heading = -1; //sets enemy pos and heading
        Player4.pos.set(1000, 280); Player4.heading = -1; //sets enemy pos and heading

        levelMusic = new sound('./sound/Jurassic.mp3'); // "The thrilling and powerful soundtrack really makes the whole game have an epic and prehistoric feel. 10/10" - IGN
        levelMusic.sound.volume = .1; //level volume
        levelMusic.sound.loop = true; //loops the level song
        levelMusic.play(); //plays the level song
      }
      if (levelSelection === 'LightMeows') {
        Character.pos.set(300, 200); //sets the character position
        Enemy.pos.set(700, 400); Enemy.heading = -1; //sets enemy pos and heading
        Player3.pos.set(500, 200); Player3.heading = -1; //sets enemy pos and heading
        Player4.pos.set(1000, 280); Player4.heading = -1; //sets enemy pos and heading

        levelMusic = new sound('./sound/RedEyes.mp3');
        levelMusic.sound.volume = .1; //level volume
        levelMusic.sound.loop = true; //loops the level song
        levelMusic.play(); //plays the level song
      }
      if (levelSelection === 'BlueNight') {
        Character.pos.set(300, 200); //sets the character position
        Enemy.pos.set(700, 400); Enemy.heading = -1; //sets enemy pos and heading
        Player3.pos.set(500, 200); Player3.heading = -1; //sets enemy pos and heading
        Player4.pos.set(1000, 280); Player4.heading = -1; //sets enemy pos and heading

        levelMusic = new sound('./sound/MysteryofBetelgeuse.mp3');
        levelMusic.sound.volume = .1; //level volume
        levelMusic.sound.loop = true; //loops the level song
        levelMusic.play(); //plays the level song
      }
      if (levelSelection === 'Ocean') {
        Character.pos.set(300, 200); //sets the character position
        Enemy.pos.set(700, 400); Enemy.heading = -1; //sets enemy pos and heading
        Player3.pos.set(500, 200); Player3.heading = -1; //sets enemy pos and heading
        Player4.pos.set(1000, 280); Player4.heading = -1; //sets enemy pos and heading

        levelMusic = new sound('./sound/TurboKnightRasengan.mp3');
        levelMusic.sound.volume = .1; //level volume
        levelMusic.sound.loop = true; //loops the level song
        levelMusic.play(); //plays the level song
      }
      if (levelSelection === 'Dojo') {
        Character.pos.set(300, 200); //sets the character position
        Enemy.pos.set(700, 400); Enemy.heading = -1; //sets enemy pos and heading
        Player3.pos.set(500, 200); Player3.heading = -1; //sets enemy pos and heading
        Player4.pos.set(1000, 280); Player4.heading = -1; //sets enemy pos and heading

        levelMusic = new sound('./sound/Impossible.mp3');
        levelMusic.sound.volume = .1; //level volume
        levelMusic.sound.loop = true; //loops the level song
        levelMusic.play(); //plays the level song
      }

      level.comp.layers.push(createCollisionLayer(level));

      level.addEntity(Character); //adds character to the level
      level.addEntity(Enemy);
      level.addEntity(Player3);
      level.addEntity(Player4);

      //sets up controls
      // const input = setupKeyboard(Character);
      const controllerInput = setUpControllers(Character);

      // Draw character icons and lives
      var playerNum = 1;
      level.entities.forEach(entity => {



        playerNum++;
      });

      ['mousedown', 'mousemove'].forEach(eventName => {
          canvas.addEventListener(eventName, event => {
            if (!isPaused) {
              if (event.buttons === 1) {
                  Character.vel.set(0, 0);
                  Character.pos.set(event.offsetX, event.offsetY);
              }
            }
          });
      });
      readyFight(level, Character);
      });
}





function loadScene(name) {
  //console.log(name);
  const scene = new Scene(name);
  const sceneBackgroundLayer = createSceneBackgroundLayer(scene);   //background layer
  scene.comp.layers.push(sceneBackgroundLayer);

  if (name === 'levelSelect') { //load in level image previews to the display
    const levelPreviewLayer = createLevelPreviewLayer(scene);   //background layer
    scene.comp.layers.push(levelPreviewLayer);
  }

  if (name === 'charSelect') { // char select scene
    const modeLayer = createModesLayer(scene);   //mode layer
    scene.comp.layers.push(modeLayer);
  }

  const spriteLayer = createSpriteLayer(scene.entities);    //entity layer
  scene.comp.layers.push(spriteLayer);
  //console.log(scene.comp.layers);
  return scene;
}

function loadDialog(name, dialogNum) {
  var lEnviros = [  //level list
    'PinkCity', 'FutureTown', 'FutureCity', 'Waterfall',
    'LightMeows', 'BlueNight', 'Ocean', 'Dojo'
  ];
  const scene = new Scene(name);
  const dialogLevelBackgroundLayer = createDialogLevelLayer(lEnviros[dialogNum - 1]);   //background layer
  scene.comp.layers.push(dialogLevelBackgroundLayer);

  const dialogBackgroundLayer = createDialogBackgroundLayer(scene, dialogNum);   //background layer  CHANGE!!!

  scene.comp.layers.push(dialogBackgroundLayer);

  return scene;
}


function readyFight(level, Character) {
  var displayFightTimer = startFightDelay;
  var totalTime = displayFightTimer;
  var img = new Image();
  img.src = './SceneBackgrounds/controlsBig.png';
  masterTimer.update = function update(deltaTime) {
    
      displayFightTimer--;
      level.update(deltaTime);
      level.comp.draw(myContext);
      if (displayFightTimer > totalTime/1.5) {
        myContext.globalAlpha = 1.0;
        myContext.strokeStyle = 'red';
        myContext.fillStyle = 'white';
        myContext.lineWidth = 4;
        myContext.font = "130px Arial";
        var txt = "READY!!!";
        var txtWidth = myContext.measureText(txt).width;
        myContext.fillText(txt, 1280/2 - txtWidth/2, 720/2);
        myContext.strokeText(txt, 1280/2 - txtWidth/2, 720/2);
        myContext.drawImage(img, 0, 0, 696, 256, 1280/2 - 174, 720/2 + 20, 348, 128);

      } else if (displayFightTimer > totalTime/3 && displayFightTimer < totalTime/1.5) {
        myContext.globalAlpha = 1.0;
        myContext.strokeStyle = 'red';
        myContext.fillStyle = 'white';
        myContext.lineWidth = 4;
        myContext.font = "130px Arial";
        var txt = "SET!!!";
        var txtWidth = myContext.measureText(txt).width;
        myContext.fillText(txt, 1280/2 - txtWidth/2, 720/2);
        myContext.strokeText(txt, 1280/2 - txtWidth/2, 720/2);
        myContext.drawImage(img, 0, 0, 696, 256, 1280/2 - 174, 720/2 + 20, 348, 128);

      } else if (displayFightTimer > 0 && displayFightTimer < totalTime/3) {
        myContext.globalAlpha = 1.0;
        myContext.strokeStyle = 'red';
        myContext.fillStyle = 'white';
        myContext.lineWidth = 4;
        myContext.font = "130px Arial";
        var txt = "FIGHT!!!";
        var txtWidth = myContext.measureText(txt).width;
        myContext.fillText(txt, 1280/2 - txtWidth/2, 720/2);
        myContext.strokeText(txt, 1280/2 - txtWidth/2, 720/2);
        myContext.drawImage(img, 0, 0, 696, 256, 1280/2 - 174, 720/2 + 20, 348, 128);

      } else if (displayFightTimer === 0) {
        Character.input.listenTo(window);
      }
      if (isPaused) pauseScreen();
    }
}

function pauseScreen () {
  myContext.globalAlpha = 0.3;
  myContext.fillStyle = 'black';
  myContext.fillRect(0,0,1280,720);
  myContext.strokeStyle = 'black';
  myContext.globalAlpha = 0.8;
  myContext.lineWidth = 15;
  myContext.strokeRect(15,0,myCanvas.width - 30,myCanvas.height);

  myContext.globalAlpha = 0.8;
  myContext.strokeStyle = 'black';
  myContext.fillStyle = 'grey';
  myContext.lineWidth = 4;
  myContext.font = "90px Arial";
  var txt = "Pawsed";
  var txtWidth = myContext.measureText(txt).width;
  myContext.fillText(txt, 1280/2 - txtWidth/2, 720/2);
  myContext.strokeText(txt, 1280/2 - txtWidth/2, 720/2);

  var img = new Image();
  img.src = './SceneBackgrounds/controlsBig.png';
  myContext.drawImage(img, 0, 0, 696, 256, 1280/2 - 174, 720/2 + 20, 348, 128);
}
