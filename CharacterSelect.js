function selectCharacters(canvas, context) {
  cursorX = 400;
  cursorY = 300;
  var cursorImg = new Image();
  cursorImg.onload = function () {context.drawImage(cursorImg, cursorX, cursorY);}
  cursorImg.src = './SceneBackgrounds/Cursor.png';

  CseletedNum = 0;
  Cselected = new Array();
  CChoices = new Array('Karate Cat','Second Cat','3','4','5','6','7','8');

  Cselected[0] = CChoices[CseletedNum];
  Cselected[1] = CChoices[CseletedNum + 1];

 //gotta add timer and update to move the cursor, make a cursor class

  return Cselected;
}
