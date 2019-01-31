//punch trait
class Punch extends Trait {
    constructor() {
        super('punch');
        this.punchPower = 10;
        this.engageTime = 0;
        this.duration = 0.3;
    }

    start() {
  			this.engageTime = this.duration;
  	}

  	cancel() {
  		this.engageTime = 0;
  	}

    update(entity, deltaTime) {
      if (this.engageTime > 0) {
        this.engageTime -= deltaTime;
      }
    }


}
