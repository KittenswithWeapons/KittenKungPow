function studioDisplay(canvas, context) {
  Promise.all([
    loadScene('Studio'),
])
.then(([Scene]) => {


    //Timer for the Character Selection Screen
    masterTimer.update = function update(deltaTime) {
    Scene.update(deltaTime);
    Scene.comp.draw(context);
    }

    });
}
