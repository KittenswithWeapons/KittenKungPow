function createCursor(name){
        const Cursor = new Entity(name);

        Cursor.size.set(2*52, 2*60); //set to actuall pixel size of Cursor
        Cursor.pos.set(280, 275);

        var img = new Image();
        img.onload = function () {
           //context.drawImage(img, this.pos.x, this.pos.y);
         }
        img.src = './SceneBackgrounds/pawCursor.png';

        Cursor.draw = function (context) {
          context.drawImage(img, this.pos.x, this.pos.y);
        }

        return Cursor;
}
