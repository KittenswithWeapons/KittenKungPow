
const controllers = {};
var buttonPressed = false;

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

function getControllers(){
	console.log(controllers);
}

function addController(controller){           //may have to order, so that the controller that plugs in first gets controller[0], may. #maybebug
	controllers[controller.index] = controller;

}

//controller controls
function controllerUpdate(entity, controllerNUM){
	//console.log('updated');
	if (controllers[controllerNUM] != null){   //checks for controller connected
    //BUTTON SECTION
		if (controllers[controllerNUM].buttons[0].pressed){  // A button to jump
			//console.log('A pressed');
			if (controllers[controllerNUM].buttonPressed === false) {
				entity.jump.start();
				controllers[controllerNUM].buttonPressed = true;
			}
		} else {
			controllers[controllerNUM].buttonPressed = false;
		}
    //JOYSTICK SECTION
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

	} else {
		//console.log('no Controller connected');
	}
}
