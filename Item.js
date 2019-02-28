//item class
function createItem(name) {
    const Item = new Entity(name); //creates the Item as an entity
    Item.Iname = name;
    Item.type = 'Item';
    Item.size.set(32, 32);         //default size of the Item.
    Item.src = "./Items/fish.png"; //default value

    if (name === 'health') {
      Item.size.set(26, 43); //milk size     *not 46 y because of tile collider checkY buffer size
      Item.src = "./Items/milk.png";
    }

    else if (name === 'damage') {
      Item.size.set(40, 40); //fish size     *not 43 y because of tile collider checkY buffer size
      Item.src = "./Items/fish.png";
    }

    else if (name === 'speed') {
      Item.size.set(40, 37); //choco size     *not 40 y because of tile collider checkY buffer size
      Item.src = "./Items/choco.png";
    }
    else if (name === 'pickler') {
      Item.size.set(42, 36); //pickle size     *not 39 y because of tile collider checkY buffer size
      Item.src = "./Items/pickle.png";
    }
    else if (name === 'berry') {
      Item.size.set(41, 38); //pickle size     *not 41 y because of tile collider checkY buffer size
      Item.src = "./Items/berry.png";
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
      img.src = Item.src;



    }


    return Item;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
