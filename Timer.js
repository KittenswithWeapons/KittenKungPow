class Timer {

    //this class may have to be reworked to make animation easier

    
    constructor(deltaTime = 1/60) {

        let accumulatedTime = 0;
        let lastTime = 0;

        this.updateProxy = (time) => {
            accumulatedTime += (time - lastTime) / 1000;

            while (accumulatedTime > deltaTime) {
                this.update(deltaTime);       //timer.update is defined in main, currently.
                accumulatedTime -= deltaTime;
            }

            lastTime = time;

            this.enqueue();
        }
    }

    enqueue() {
        requestAnimationFrame(this.updateProxy);

    }

    start() {
        this.enqueue();

    }
}
