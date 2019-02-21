const PRESSED = 1;
const RELEASED = 0;

class keyBoardState {
	constructor() {
		this.keyStates = new Map(); //holds the current state of a key
		this.keyMap = new Map(); //holds the callback functions for a code
		this.frozen = false;
	}
	

	addMapping(code, callback) {
		this.keyMap.set(code, callback);
	}
	

	handleEvent(event) {
			const {code} = event;
			
			
			
			if (!this.keyMap.has(code)){
				return;
			}
			
			event.preventDefault();
			
			const keyState = event.type === 'keydown' ? PRESSED:RELEASED;
			
			if(this.keyStates.get(code) === keyState) {
				return;
			}
			
			this.keyStates.set(code, keyState);
			//console.log(this.keyStates);
			
			this.keyMap.get(code)(keyState);
	}
	
	
	listenTo(window) {
		['keydown', 'keyup'].forEach(eventName => {
		window.addEventListener(eventName, event => {
			this.handleEvent(event);
			console.log(event);
			});
		});
	}
}