// export default class SpriteSheet {
    function constructor(image, width, height) {
        this.image = image;
        this.width = width;
        this.height = height;
        this.tiles = new Map();
    }

    function define(name, x, y, width, height) {
        const buffer = document.createElement('canvas');
        buffer.width = width;
        buffer.height = height;
        buffer
            .getContext('2d')
            .drawImage(
                this.image,
                x,
                y,
                width,
                height,
                0,
                0,
                width,
                height);
        this.tiles.set(name, buffer)
    }

    function defineTile(name, x, y) {
        this.define(name, x * this.width, y * this.height, this.width, this.height);
    }

    function draw(name, context, x, y) {
        const buffer = this.tiles.get(name);
        context.drawImage(buffer, x, y);
    }

    function drawTile(name, context, x, y) {
        this.draw(name, context, x * this.width, y * this.height);
    }
// }
