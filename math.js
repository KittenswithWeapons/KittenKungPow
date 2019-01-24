// export class Matrix {
    function constructorMatrix() {
        this.grid = [];
    }

    function forEach(callback) {
        this.grid.forEach((column, x) => {
            column.forEach((value, y) => {
                callback(value, x, y);
            });
        });
    }

    function get(x, y) {
        const col = this.grid[x];
        if (col) {
            return col[y];
        }
        return undefined;
    }

    function set(x, y, value) {
        if (!this.grid[x]) {
            this.grid[x] = [];
        }

        this.grid[x][y] = value;
    }
// }

// export class Vec2 {
    function constructorVector(x, y) {
        this.set(x, y);
    }

    function set(x, y) {
        this.x = x;
        this.y = y;
    }
// }
