var singlePlayerFlag = false;

var SingleplayerLevels = [
  ['PinkCity', 'FutureTown', 'FutureCity', 'Waterfall'],
  ['LightMeows', 'BlueNight', 'Ocean', 'Dojo']
];

var SPlevelchoice = 0;
var SPenemy = 0;


function SinglePlayer(canvas, context, characterSelection) {
    singlePlayerFlag = true;

    canvas.removeEventListener('keypress', function (e) {
      var key = e.which || e.keyCode;
      if (key === 13) { // 13 is enter
        console.log('enter');
      }
    });

    levelSelection = SingleplayerLevels[SPlevelchoice]; //which level to load

    levelSelection = 'PinkCity';
    Promise.all([

      createCharacter('character', characterSelection),
      createCharacter('CPU-1', SPenemy),
      loadLevel(levelSelection),

  ])
  .then(([Character, Enemy, level]) => {

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


      //sets up controls
      const input = setupKeyboard(Character);
      const controllerInput = setUpControllers(Character);

      // Draw character icons and lives
      var playerNum = 1;
      level.entities.forEach(entity => {
        playerNum++;
      });

      input.listenTo(window);


      masterTimer.update = function update(deltaTime) {
          level.update(deltaTime);
          level.comp.draw(context);
      }

      });

}
