class Scene{
    constructor(sceneName) {
        this.SceneName = sceneName;
        this.comp = new Compositor();
        this.entities = new Set();
    }

    addEntity(entity) {
      this.entities.add(entity);
    }

    removeEntity(entity) {
      this.entities.delete(entity);
    }

    clearScene() {
      this.entities.clear();
    }

    update(deltaTime) {
        this.entities.forEach(entity => {
            entity.update(deltaTime);
        });
    }
}
