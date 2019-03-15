function setupKeyboard(entity, keyboard) {
    const input = keyboard || new keyBoardState(); //new keyboard

    input.addMapping('Space', keyState => { //jump
        if (!isPaused) {
        if (keyState) {
            entity.Jumping = true;
            entity.grounded = false;
            entity.jump.start();
            entity.updateAnimation();
        }
      }
    });

    input.addMapping('KeyW', keyState => { //jump
      if (!isPaused) {
      if (keyState) {
          entity.Jumping = true;
          entity.grounded = false;
          entity.jump.start();
          entity.updateAnimation();
      }
    }
  });

    input.addMapping('ShiftLeft', keyState => { //headingLock
      //console.log(keyState);
      if (keyState) {
          entity.headingLock = true;
          entity.updateAnimation();
      } else {
        entity.headingLock = false;
        entity.updateAnimation();
      }
  });

    input.addMapping('ArrowLeft', keyState => { //punch
      if (!isPaused) {
        if (keyState) {
          entity.Light = true;
          entity.updateAnimation();
        }
      }
    });

    input.addMapping('ArrowUp', keyState => { //Fireball
      if (!isPaused) {
        if (keyState) {
          if (!entity.Special) {
            entity.Special = true;
            entity.updateAnimation();
          }
        }
      }
    });

    input.addMapping('ArrowRight', keyState => { //Kick
      if (!isPaused) {
        if (keyState) {
            entity.Heavy = true;
            entity.updateAnimation();
        }
      }
    });

    input.addMapping('KeyD', keyState => { //go right
      if (!isPaused) {
        if (keyState) {
          entity.Walking = true;
          entity.go.dir += 1;
           entity.updateAnimation();
        } else {
          if(!entity.Walking) {
            entity.go.dir = 0;
          } else {
            if(entity.dustFinished == true) {
              entity.dustFinished = false;
            }
            entity.Walking = false;
              entity.go.dir -= 1;
          }
          entity.updateAnimation();
        }
      }
    });

    input.addMapping('KeyA', keyState => { //go left
      if (!isPaused) {
        if (keyState) {
          entity.Walking = true;
          entity.go.dir -= 1;
          entity.updateAnimation();
        } else {
          if(!entity.Walking) {
            entity.go.dir = 0;
          } else {
            if(entity.dustFinished == true) {
              entity.dustFinished = false;
            }
            entity.Walking = false;
              entity.go.dir += 1;
          }
          entity.updateAnimation();
        }
      }
    });

    input.addMapping('KeyS', keyState => { //go down
      if (!isPaused) {
        if (keyState) {
          entity.passdown.start();
        } else {
          entity.passdown.cancel();
        }
      }
    });

    // input.addMapping('KeyC', keyState => { //Enable CPU movement
    //   if (!isPaused) {
    //   if (keyState) {
    //     CPUsEnabled = !CPUsEnabled;
    //   }
    // }
    // });

    input.addMapping('KeyP', keyState => { // Pause/Unpause
      if (keyState) {
        isPaused = !isPaused;
      }

    });

    input.addMapping('KeyM', keyState => { // Mute/Unmute
      if (keyState) {
        if (levelMusic.sound.volume !== 0) levelMusic.sound.volume = 0;
        else levelMusic.sound.volume = 0.1;
      }

    });

    input.addMapping('Digit1', keyState => {if (keyState) entity.choice = 0; entity.updateAnimation();});
    input.addMapping('Digit2', keyState => {if (keyState) entity.choice = 1; entity.updateAnimation();});
    input.addMapping('Digit3', keyState => {if (keyState) entity.choice = 2; entity.updateAnimation();});
    input.addMapping('Digit4', keyState => {if (keyState) entity.choice = 3; entity.updateAnimation();});
    input.addMapping('Digit5', keyState => {if (keyState) entity.choice = 4; entity.updateAnimation();});
    input.addMapping('Digit6', keyState => {if (keyState) entity.choice = 5; entity.updateAnimation();});
    input.addMapping('Digit7', keyState => {if (keyState) entity.choice = 6; entity.updateAnimation();});
    input.addMapping('Digit8', keyState => {if (keyState) entity.choice = 7; entity.updateAnimation();});
    input.addMapping('Digit9', keyState => {if (keyState) entity.choice = 8; entity.updateAnimation();});

    entity.input = input;
    return input;
}

function removeMovement(entity) {
  entity.input.removeMapping('KeyA');
  entity.input.removeMapping('KeyD');
  entity.input.removeMapping('Space');
  entity.go.dir = 0;
  entity.Walking = false;
  entity.updateAnimation();
}

function restoreMovement(entity) {
  entity.input.addMapping('KeyD', keyState => { //go right
    if (!keyState) {
      entity.input.removeMapping('KeyD');
      entity.input.addMapping('KeyD', keyState => { //go right
        if (keyState) {
          entity.Walking = true;
          entity.go.dir += 1;
          entity.updateAnimation();
        } else {
          if(!entity.Walking) {
            entity.go.dir = 0;
          } else {
            if(entity.dustFinished == true) {
              entity.dustFinished = false;
            }
            entity.Walking = false;
              entity.go.dir -= 1;
          }
          entity.updateAnimation();
        }
      });
    } else {
      entity.Walking = true;
      entity.go.dir += 1;
      entity.updateAnimation();
      entity.input.removeMapping('KeyD');
      entity.input.addMapping('KeyD', keyState => { //go right
        if (keyState) {
          entity.Walking = true;
          entity.go.dir += 1;
          entity.updateAnimation();
        } else {
          if(!entity.Walking) {
            entity.go.dir = 0;
          } else {
            if(entity.dustFinished == true) {
              entity.dustFinished = false;
            }
            entity.Walking = false;
              entity.go.dir -= 1;
          }
          entity.updateAnimation();
        }
      });
    }
  });

  entity.input.addMapping('KeyA', keyState => { //go left
      if (!keyState) {
        entity.input.removeMapping('KeyA');
        entity.input.addMapping('KeyA', keyState => { //go left
          if (keyState) {
            entity.Walking = true;
            entity.go.dir -= 1;
            entity.updateAnimation();
          } else {
            if(!entity.Walking) {
              entity.go.dir = 0;
            } else {
              if(entity.dustFinished == true) {
                entity.dustFinished = false;
              }
              entity.Walking = false;
                entity.go.dir += 1;
            }
            entity.updateAnimation();
          }
        });
      } else {
        entity.Walking = true;
        entity.go.dir -= 1;
        entity.updateAnimation();
        entity.input.removeMapping('KeyA');
        entity.input.addMapping('KeyA', keyState => { //go left
          if (keyState) {
            entity.Walking = true;
            entity.go.dir -= 1;
            entity.updateAnimation();
          } else {
            if(!entity.Walking) {
              entity.go.dir = 0;
            } else {
              if(entity.dustFinished == true) {
                entity.dustFinished = false;
              }
              entity.Walking = false;
                entity.go.dir += 1;
            }
            entity.updateAnimation();
          }
        });
      }
  });

  entity.input.addMapping('Space', keyState => { //jump
    if (keyState) {
        entity.Jumping = true;
        entity.grounded = false;
        entity.jump.start();
        entity.updateAnimation();
    }
  });
}
