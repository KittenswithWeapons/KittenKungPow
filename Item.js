//item class
function createItem(name) {
    const Item = new Entity(name); //creates the Item as an entity
    Item.type = 'Item';
    Item.size.set(32, 32);         //default size of the Item.

    if (name === 'health') {
      Item.size.set(32, 61); //beer size     *not 64 y because of tile collider checkY buffer size
    }

    Item.pos.set(getRandomInt(100, 1180),-60);   // set x to random............................
    Item.addTrait(new Velocity());
    Item.addTrait(new PassDown());
    Item.addTrait(new Jump());


    Item.draw = function (context) {
      var img = new Image();
      img.onload = function () {
      context.drawImage(img, Item.pos.x, Item.pos.y); //position the level preview image
      }
      img.src = "./Items/beer.png";
    }


    return Item;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
