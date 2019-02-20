//Controller settings for an XBOX ONE controller

const controllers = {}; //array of controllers
var A_buttonPressed = false;
var B_buttonPressed = false;
var X_buttonPressed = false;
var Y_buttonPressed = false;

function setUpControllers(entity) {
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

    //BUTTON SECTION------------------------------------------------------------
    
    // A Button----------------------------
		if (controllers[controllerNUM].buttons[0].pressed){  // A button
			if (controllers[controllerNUM].A_buttonPressed === false) {
				controllers[controllerNUM].A_buttonPressed = true;
        // do A button stuff
        entity.punch.start();
        entity.Punching = true;
        entity.updateAnimation();
        //
			}
		} else {
			controllers[controllerNUM].A_buttonPressed = false;
		}
    //------------------------------------

    // B Button---------------------------
		if (controllers[controllerNUM].buttons[1].pressed){  // B button???
			if (controllers[controllerNUM].B_buttonPressed === false) {
				controllers[controllerNUM].B_buttonPressed = true;
        // do B button stuff
        if (!entity.Throwing) {
          entity.Throwing = true;
          entity.updateAnimation();
          window.setTimeout(function() {
          ThrowProjectile("fireball", entity);
          entity.Throwing = false;
          entity.updateAnimation();} , 280)
        }
        //
			}
		} else {
			controllers[controllerNUM].B_buttonPressed = false;
		}





    //JOYSTICK SECTION----------------------------------------------------------
    //left right action
		if (controllers[controllerNUM].axes[0] > 0.1) { //go right
			entity.go.dir = 1;
			//console.log('RIGHT');
		} else if (controllers[controllerNUM].axes[0] < -0.1) { //go left
			entity.go.dir = -1;
			//console.log('LEFT');
		} else if (controllers[controllerNUM].axes[0] < 0.1 & controllers[controllerNUM].axes[0] > -0.1 ) { // stops the kitty
			entity.go.dir = 0;
		}
    //--------------------------------------------------------------------------

    //jump and passdown JOYSTICK SECTION----------------------------------------


    //--------------------------------------------------------------------------

	} else {  //---------catches if there are no controllers connected------------
		//console.log('no Controller connected');
	}
}
