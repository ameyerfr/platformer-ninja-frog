class Game {

  constructor() {
    this.world = {
      DOMcontainer : document.getElementById('map-container'),
      gravity : 1.5,
      friction : 0.85,
      player : null,
      enemies : [],
      obstacles : []
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

  //
  // Collide a Character type object with all the obstacles in the world
  //
  collideCharWithObstacle(source_obj, obstacle) {

    let obstacleRects = obstacle.clientRects;
    let object = source_obj.getHurtBoxCoordinates();

    let rect1 = object;
    let rect2 = obstacleRects;

    // THERE IS AABB Collision
    if (rect1.x < rect2.x + rect2.width &&
       rect1.x + rect1.width > rect2.x &&
       rect1.y < rect2.y + rect2.height &&
       rect1.height + rect1.y > rect2.y) {

         let old_object_bottom = object.y_old + object.height;
         let object_bottom = object.y + object.height;
         let obstacle_bottom = obstacleRects.y + obstacleRects.height;

         let old_object_right = object.x_old + object.width;
         let object_right = object.x + object.width;
         let obstacle_right = obstacleRects.x + obstacleRects.width

         let old_object_left = object.x_old;
         let object_left = object.x;
         let obstacle_left = obstacleRects.x;

         let old_object_top = object.y_old;
         let object_top = object.y;
         let obstacle_top = obstacleRects.y;


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

  collidePlayerWithEnemies(player, enemies) {

    let playerRects = player.getHurtBoxCoordinates();

    let old_player_bottom = playerRects.y_old + playerRects.height;
    let player_bottom = playerRects.y + playerRects.height;

    this.world.enemies.forEach(enemy => {

      let enemyRects = enemy.getHurtBoxCoordinates();
      let enemy_top = enemyRects.y;

      if ( player.isColliding(enemy) ) {
        console.log("PLAYER COLLIDING ENEMY")

        if ( player_bottom > enemy_top && old_player_bottom <= enemy_top) {
          console.log("COLLIDING ENEMY ON ITS TOP")

          player.setHurtboxCoordinates({
            speed_y : -50,
            jumping : true
          })

        }
      }
    })

  }

  updateWorld() {

    let charactersToUpdate = [this.world.player, ...this.world.enemies];

    // Update each character with gravity and friction
    // Handle collision with world boundaries
    charactersToUpdate.forEach(character => {
      character.speed_y += this.world.gravity;
      character.update();

      character.speed_x *= this.world.friction;
      character.speed_y *= this.world.friction;

      this.collideObjectWithWorld(character);
    })

    // Collide player with all the enemies of the world
    this.collidePlayerWithEnemies(this.world.player);

    // Collide player with all the obstacles of the world
    this.world.obstacles.forEach(obstacle => {
      this.collideCharWithObstacle(this.world.player, obstacle)
    });

  }

  renderWorld() {
    // render world
    // world render

    // render player
    this.world.player.render();

    // render Enemies
    this.world.enemies.forEach(enemy => enemy.render())
  }

  gameLoop() {

    // Reset player state
    this.world.player.resetState();

    // Reset enemies state
    this.world.enemies.forEach(enemy => enemy.resetState())

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

  addPlayer(character) {
    this.world.player = character;
    this.world.DOMcontainer.appendChild(character.DOMcontainer);
  }

  addEnemy(enemy) {
    this.world.enemies.push(enemy)
    this.world.DOMcontainer.appendChild(enemy.DOMcontainer);
  }

  listenToControls() {
    window.onkeydown = this.controlsHandler.bind(this);
    window.onkeyup   = this.controlsHandler.bind(this);
  }

  /**
   * GENERATE A GAME - CALL #1
   */
  generateObstacles(obstacles) {

    obstacles.forEach(obstacle_config => {
      obstacle_config.parentEl = this.world.DOMcontainer;
      this.world.obstacles.push(new Obstacle(obstacle_config))
    })

  }

  /**
   * GENERATE A GAME - CALL #2
   */
  init() {

    this.listenToControls();

    requestAnimationFrame((timestamp) => {
      this.gameLoop(timestamp);
    })
  }

}
