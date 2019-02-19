function createCursor(name){
        const Cursor = new Entity(name);

        Cursor.size.set(40, 65); //set to actuall pixel size of Cursor
        Cursor.pos.set(360, 310);

        var img = new Image();
        img.onload = function () {
           //context.drawImage(img, this.pos.x, this.pos.y);
         }
        img.src = './SceneBackgrounds/Cursor.png';

        Cursor.draw = function (context) {
          context.drawImage(img, this.pos.x, this.pos.y);
        }

        return Cursor;
}
