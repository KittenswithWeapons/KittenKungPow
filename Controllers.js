
const controllers = {};
var controllerFlag = false;
var buttonPressed = false;
export function setUpControllers(entity) {

    window.addEventListener("gamepadconnected", function(e) {
		  var gp = navigator.getGamepads()[e.gamepad.index];
		  addController(gp);
		  controllerFlag = true;
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


function addController(controller){
	controllers[controller.index] = controller;
	
}

//controller controls

export function controllerUpdate(entity){
	//console.log('updated');
	if (controllerFlag){   //checks for controller connected
		
		
		if (controllers[0].buttons[0].pressed){  // A button to jump
			console.log('A pressed');
			if (buttonPressed === false) {
				entity.jump.start();
				buttonPressed = true;
			}
		} else {
			buttonPressed = false;
		}
		
		if (controllers[0].axes[0] > 0.1) { //go right
			entity.go.dir = 1;
			console.log('RIGHT');
		} else if (controllers[0].axes[0] < -0.1) { //go left
			entity.go.dir = -1;
			console.log('LEFT');
		} else if (controllers[0].axes[0] < 0.1 & controllers[0].axes[0] > -0.1 ) { // stops the kitty
			entity.go.dir = 0;
		}
		
		
		
		
		
		
		
		
	} else {
		console.log('no Controller connected');
	}
	
	
	
	
	
	
}