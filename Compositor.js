// export default class Compositor {
    function constructor() {
        this.layers = [];
    }

    function draw(context) {
        this.layers.forEach(layer => {
            layer(context);
        });
    }
// }
