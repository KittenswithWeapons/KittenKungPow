//entity colliding
  class EntityCollider {
    constructor() {
      this.players = new Set();
    }


  addPlayerCollider(player) {
    this.players.add(player);
  }

  removePlayerCollider(player) {
    this.players.remove(player);
  }

  update(deltaTime){
    this.players.forEach(entity => {
        //check all for collision
    });
  }
}
