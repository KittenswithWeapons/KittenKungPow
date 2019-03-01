class Timer {

    constructor(deltaTime = 1/60) {
        let accumulatedTime = 0;
        let lastTime = 0;
        this.timerkill = false;

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
        if(!this.timerkill) {
            requestAnimationFrame(this.updateProxy);
        }
    }

    start() {
        this.enqueue();

    }

    stop() {
        this.timerkill = true;
        cancelAnimationFrame(this.updateProxy);
    }
}
