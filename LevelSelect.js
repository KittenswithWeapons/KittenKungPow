function selectLevel(canvas, context) {

  var cursorImg = new Image();
  cursorImg.onload = function () {context.drawImage(cursorImg, 400, 300);}
  cursorImg.src = './SceneBackgrounds/Cursor.png';

  Lselected = new Array();
  LChoices = new Array('1','2','3','4','5','6','7','8');




  return Lselected;

}
