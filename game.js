class Game {

  constructor() {
    this.world = {
      DOMcontainer : document.getElementById('map-container'),
      gravity : 1,
      friction : 0.9,
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

    /**
     * WORLD BOUNDARIES
     */
    // Out of boundaries on the left
    if (object.x < 0) { object.x = 0; object.speed_x = 0; }
    // Out of boundaries on the right
    else if (object.x + object.width > worldWidth) { object.x = worldWidth - object.width; object.speed_x = 0; }

    // Out of boundaries on the top
    if (object.y < 0) { object.y = 0; object.speed_y = 0;}
    // Out of boundaries on the bottom
    else if (object.y + object.height > worldHeight) { object.jumping = false; object.y = worldHeight - object.height; object.speed_y = 0; }
  }

  collideObjectWithObstacles(source_obj, source_obstacle) {

    let obstacle = source_obstacle.getBoundingClientRect();
    let object = source_obj.getHurtBoxCoordinates();

    let rect1 = object;
    let rect2 = obstacle;

    // THERE IS AABB Collision
    if (rect1.x < rect2.x + rect2.width &&
       rect1.x + rect1.width > rect2.x &&
       rect1.y < rect2.y + rect2.height &&
       rect1.height + rect1.y > rect2.y) {

         let old_object_bottom = object.y_old + object.height;
         let object_bottom = object.y + object.height;
         let obstacle_bottom = obstacle.y + obstacle.height;

         let old_object_right = object.x_old + object.width;
         let object_right = object.x + object.width;
         let obstacle_right = obstacle.x + obstacle.width

         let old_object_left = object.x_old;
         let object_left = object.x;
         let obstacle_left = obstacle.x;

         let old_object_top = object.y_old;
         let object_top = object.y;
         let obstacle_top = obstacle.y;


         if (object_bottom > obstacle_top && old_object_bottom <= obstacle_top) {
           console.log("COLLISION - BOTTOM player with TOP obstacle");
           source_obj.setHurtboxCoordinates({
             y : obstacle_top - object.height, // - 0.01,
             speed_y : 0,
             jumping : false
           })
         }

         if (object_right > obstacle_left && old_object_right <= obstacle_left) {
           console.log("COLLISION - RIGHT player with LEFT obstacle")
           source_obj.setHurtboxCoordinates({
             x : obstacle_left - object.width, // - 0.01,
             speed_x : 0
           })
         }

         if (object_left < obstacle_right && old_object_left >= obstacle_right) {
           console.log("COLLISION - LEFT player with RIGHT obstacle")
           source_obj.setHurtboxCoordinates({
             x : obstacle_right, // + 0.01,
             speed_x : 0
           })
         }

         if (object_top < obstacle_bottom && old_object_top >= obstacle_bottom) {
           console.log("COLLISION - TOP player with BOTTOM obstacle")
           source_obj.setHurtboxCoordinates({
             y : obstacle_bottom,
             speed_y : 0
           })
          }

    }

  }

  updateWorld() {
    this.world.player.speed_y += this.world.gravity;
    this.world.player.update();

    this.world.player.speed_x *= this.world.friction;
    this.world.player.speed_y *= this.world.friction;

    this.collideObjectWithWorld(this.world.player);


    // Loop on all obstacles
    let obstacles = document.querySelectorAll('.obstacle');
    obstacles.forEach(obstacle => {
      this.collideObjectWithObstacles(this.world.player, obstacle);
    })

  }

  renderWorld() {
    // render world
    // world render

    // render player
    this.world.player.render();
  }

  gameLoop() {

    this.world.player.currentActions = ['character'];

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
