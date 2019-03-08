//Controller settings for an XBOX ONE controller

const controllers = {}; //array of controllers
var A_buttonPressed = false;
var B_buttonPressed = false;
var X_buttonPressed = false;
var Y_buttonPressed = false;
var Start_buttonPressed = false;
var Select_buttonPressed = false;
var right = false;
var left = false;
var idle = false;
var up = false;

function setUpControllers() {
    window.addEventListener("gamepadconnected", function(e) {
		  var gp = navigator.getGamepads()[e.gamepad.index];
		  addController(gp);
		  console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
				  gp.index, gp.id,
				  	gp.buttons.length, gp.axes.length);
		});

  	window.addEventListener("gamepaddisconnected", function(e) {
  		  console.log("Gamepad disconnected from index %d: %s",
  		    e.gamepad.index, e.gamepad.id);
  		});
}

//prints list of controllers to console
function getControllers(){
	console.log(controllers);
}

//adds a controller to the array of controllers
function addController(controller){  //may have to order, so that the controller that plugs in first gets controller[0], may. #maybebug
	controllers[controller.index] = controller;
}

//controller controls method ---------------------
function controllerUpdate(entity, controllerNUM){
	//console.log(getControllers());

	if (controllers[controllerNUM] != null){   //checks for controller connected
    //level based pause
    if (entity === null) {
      // Start Button-----------------------------------------------------------------
  		if (controllers[controllerNUM].buttons[9].pressed){  // Y button???
  			if (controllers[controllerNUM].Start_buttonPressed === false) {
  				controllers[controllerNUM].Start_buttonPressed = true;
          // do Start button stuff
          console.log('pause');
          isPaused = !isPaused; //pauses
          //
  			}
  		} else {
  			controllers[controllerNUM].Start_buttonPressed = false;
  		}
      return;
      //--------------------------------------------------------------------------
    }



    //BUTTON SECTION------------------------------------------------------------

    // A Button-----------------------------------------------------------------
		if (controllers[controllerNUM].buttons[0].pressed){  // A button
			if (controllers[controllerNUM].A_buttonPressed === false) {
				controllers[controllerNUM].A_buttonPressed = true;
        // do A button stuff
        if (!isPaused) {
          entity.Jumping = true;
          entity.grounded = false;
          entity.jump.start();
          entity.updateAnimation();
        }
        //
			}
		} else {
			controllers[controllerNUM].A_buttonPressed = false;
		}
    //--------------------------------------------------------------------------

    // B Button-----------------------------------------------------------------
		if (controllers[controllerNUM].buttons[1].pressed){  // B button???
			if (controllers[controllerNUM].B_buttonPressed === false) {
				controllers[controllerNUM].B_buttonPressed = true;
        // do B button stuff
        if (!isPaused) {
          entity.Heavy = true;
          entity.updateAnimation();
        }
        //
			}
		} else {
			controllers[controllerNUM].B_buttonPressed = false;
		}
    //--------------------------------------------------------------------------

    // X Button-----------------------------------------------------------------
		if (controllers[controllerNUM].buttons[2].pressed){  // X button???
			if (controllers[controllerNUM].X_buttonPressed === false) {
				controllers[controllerNUM].X_buttonPressed = true;
        // do X button stuff
        if (!isPaused) {
          entity.Light = true;
          entity.updateAnimation();
        }
        //
			}
		} else {
			controllers[controllerNUM].X_buttonPressed = false;
		}
    //--------------------------------------------------------------------------

    // Y Button-----------------------------------------------------------------
		if (controllers[controllerNUM].buttons[3].pressed){  // Y button???
			if (controllers[controllerNUM].Y_buttonPressed === false) {
				controllers[controllerNUM].Y_buttonPressed = true;
        // do Y button stuff
        if (!isPaused) {
          if (!entity.Special) {
            entity.Special = true;
            entity.updateAnimation();
          }
        }
        //
			}
		} else {
			controllers[controllerNUM].Y_buttonPressed = false;
		}
    //--------------------------------------------------------------------------



    // Select Button-----------------------------------------------------------------
		if (controllers[controllerNUM].buttons[8].pressed){  // Y button???
			if (controllers[controllerNUM].Select_buttonPressed === false) {
				controllers[controllerNUM].Select_buttonPressed = true;
        // do Select button stuff
        CPUsEnabled = !CPUsEnabled;
        //
			}
		} else {
			controllers[controllerNUM].Select_buttonPressed = false;
		}
    //--------------------------------------------------------------------------


    //**************************************************************************
    //**************************************************************************
    //**************************************************************************


    //JOYSTICK SECTION----------------------------------------------------------
    //left right action
		if (controllers[controllerNUM].axes[0] > 0.4) { //go right
      if (!right) {
        if (!isPaused) {
          entity.Walking = true;
          if(entity.go.dir === 0) {
            entity.go.dir = 1;
          } else if (entity.go.dir === -1){
            entity.go.dir *= -1;
          }
          entity.updateAnimation();
          if(entity.dustFinished == true) {
              entity.dustFinished = false;
          }
        }
        idle = false;
        right = true;
      }
			//console.log('RIGHT');
		} else if (controllers[controllerNUM].axes[0] < -0.4) { //go left
        if (!left) {
          if (!isPaused) {
            entity.Walking = true;
            if(entity.go.dir === 0) {
              entity.go.dir = -1;
            } else if (entity.go.dir === 1){
              entity.go.dir *= -1;
            }
            entity.updateAnimation();
            if(entity.dustFinished == true) {
                entity.dustFinished = false;
            }
          }
          idle = false;
          left = true
        }
			//console.log('LEFT');
		} else if (controllers[controllerNUM].axes[0] < 0.4 & controllers[controllerNUM].axes[0] > -0.4 ) { // stops the kitty
			entity.go.dir = 0;
      entity.Walking = false;
      right = false;
      left = false;
      if (!idle) {
        idle = true;
        entity.updateAnimation();
      }
		}
    //--------------------------------------------------------------------------

    //jump and passdown JOYSTICK SECTION----------------------------------------

    if (controllers[controllerNUM].axes[1] > 0.5) { //go down
      if (!down) {
        if (!isPaused) {
          if (entity.grounded) {
            entity.passdown.start();
          }
        }
      }
		} else if (controllers[controllerNUM].axes[1] < -0.5) { //go up
        if (!up) {
          up = true;
          if (!isPaused) {
            entity.Jumping = true;
            entity.grounded = false;
            entity.jump.start();
            entity.updateAnimation();
          }
        }
		} else if (controllers[controllerNUM].axes[1] < 0.5 & controllers[controllerNUM].axes[1] > -0.5 ) { // stops the kitty
			//do nothing
      entity.passdown.cancel();
      down = false;
      up = false;
		}



    //--------------------------------------------------------------------------

	} else {  //---------catches if there are no controllers connected------------
		//console.log('no Controller connected');
	}
}
