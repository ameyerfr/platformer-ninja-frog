class Game {

  constructor() {
    this.world = {
      DOMcontainer : document.getElementById('map-container'),
      gravity : 0.5,
      friction : 0.85,
      player : null
    }
    this.controls = {
      left  : { active : false, pressed : false },
      right : { active : false, pressed : false },
      jump  : { active : false, pressed : false }
    }
  }

  controlsHandler(e) {

    let pressed = (e.type === "keydown") ? true : false;

    switch (e.code) {
      case 'ArrowLeft'  : this.updateControls('left', pressed); break;
      case 'ArrowRight' : this.updateControls('right', pressed); break;
      case 'Space'      : this.updateControls('jump', pressed); break;
    }

  }

  updateControls(control, pressed) {
    let controlObj = this.controls[control];
    if(controlObj.pressed != pressed) controlObj.active = pressed;
    controlObj.pressed = pressed;
  }

  getWorldHeight() {
    return this.world.DOMcontainer.getBoundingClientRect().height;
  }

  getWorldWidth() {
    return this.world.DOMcontainer.getBoundingClientRect().width;
  }

  collideObjectWithWorld(object) {
    let worldHeight = this.getWorldHeight();
    let worldWidth = this.getWorldWidth();

    // Out of boundaries on the left
    if (object.x < 0) { object.x = 0; object.speed_x = 0; }
    // Out of boundaries on the right
    else if (object.x + object.width > worldWidth) { object.x = worldWidth - object.width; object.speed_x = 0; }

    // Out of boundaries on the top
    if (object.y < 0) { object.y = 0; object.speed_y = 0;}
    // Out of boundaries on the bottom
    else if (object.y + object.height > worldHeight) { object.jumping = false; object.y = worldHeight - object.height; object.speed_y = 0; }
  }

  updateWorld() {
    this.world.player.speed_y += this.world.gravity;
    this.world.player.update();

    this.world.player.speed_x *= this.world.friction;
    this.world.player.speed_y *= this.world.friction;

    this.collideObjectWithWorld(this.world.player);
  }

  renderWorld() {
    // render world
    // world render

    // render player
    this.world.player.render();
  }

  gameLoop() {

    this.world.player.currentActions = [];

    if ( this.controls.left.active )  { this.world.player.moveLeft() }
    if ( this.controls.right.active ) { this.world.player.moveRight() }
    if ( this.controls.jump.active )  {
      this.world.player.jump();
      this.controls.jump.active = false;
    }

    this.updateWorld();
    this.renderWorld();

    setTimeout(requestAnimationFrame((timestamp) => {
      this.gameLoop(timestamp);
    }), 1000/30)

  }

  addCharacter(character) {
    this.world.player = character;
    this.world.DOMcontainer.appendChild(character.DOMcontainer);
  }

  listenToControls() {
    window.onkeydown = this.controlsHandler.bind(this);
    window.onkeyup   = this.controlsHandler.bind(this);
  }

  init() {
    this.listenToControls();
    requestAnimationFrame((timestamp) => {
      this.gameLoop(timestamp);
    })
  }

}
