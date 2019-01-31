
function createCharacter() {
    return loadCharacterSprite()
    .then(sprite => {
        const Character = new Entity('character');
        Character.size.set(18, 29); //set to actuall pixel size of character, determines collision box. kat is 18,29
        var vel = new Velocity();
        Character.addTrait(new Velocity());
        Character.addTrait(new Jump());
        Character.addTrait(new Go());
        Character.addTrait(new PassDown());

        Character.draw = function drawCharacter(context) {
            sprite.draw('character', context, this.pos.x, this.pos.y);
        }


        return Character;
    });
}
