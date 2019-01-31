//punch trait
class Punch extends Trait {
    constructor() {
        super('punch');
        this.punchPower = 10;
        this.engageTime = 0;
        this.duration = 1.0;
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
        entity.Punching = true;
        if (this.engageTime < 0) {
          entity.Punching = false;
          entity.updateAnimation();
        }
      }
    }


}
